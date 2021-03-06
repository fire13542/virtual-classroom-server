const mongoose = require('mongoose'); 
const bcrypt = require('bcryptjs');

mongoose.Promise = global.Promise;

const DB_URL = require('./db-url').DB_URL;

const teacherSchema = mongoose.Schema({
    name: String,
    email: String, 
    password: String, 
    image: {type: String, default: 'default-teacher-image.png'},
    createdCourses: {
        type: [{id: String, name: String, courseCode: String, image: String}],
        default: []
    }
}); 

const Teacher = mongoose.model('teacher', teacherSchema); 
exports.Teacher = Teacher;

const Course = require('./course.model').Course;
const Student = require('./student.model').Student;

exports.getTeacherData = id => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                return Teacher.findById(id);
            })
            .then(data => {
                mongoose.disconnect();
                resolve(data);
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
}; 

exports.updateTeacher = (id, name, email) => {
    return new Promise((resolve, reject) => {
        mongoose
        .connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => {
            return Teacher.findOneAndUpdate({_id: id}, {
                name: name, 
                email: email
            })
        })
        .then(teacher => {
            if(teacher){
                mongoose.disconnect();
                teacher.password = '';
                resolve(teacher);
            }
            else {reject('there is no teacher match this id')}
        })
        .catch(err => {
            mongoose.disconnect();
            reject(err);
        })
    })
}

exports.deleteTeacher = async (teacher) => {
    try {
        await mongoose.connect(DB_URL, {useNewUrlParser: true});
        await Teacher.findByIdAndDelete(teacher._id);
        for(let course of teacher.createdCourses){
            await Course.findByIdAndDelete(course.id);
        await Student.updateMany(null, 
            { $pull: { enrolledCourses: {id: course.id} } });
        }
        mongoose.disconnect()
        return
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}

exports.changeImage = async (teacherId, image) => {
    try {
        await mongoose.connect(DB_URL);
        await Teacher.findByIdAndUpdate(teacherId, {
            image: image
        });
        mongoose.disconnect();
        return;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}

exports.changePassword = async (email, newPassword) => {
    try {
        newHashedPassword = await bcrypt.hash(newPassword, 10);
        await mongoose.connect(DB_URL);
        await Teacher.findOneAndUpdate({email: email}, {
            password: newHashedPassword
        });
        mongoose.disconnect();
        return;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}

