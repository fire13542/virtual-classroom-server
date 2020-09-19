const mongoose = require('mongoose'); 
const bcrypt = require('bcryptjs');

mongoose.Promise = global.Promise;

const DB_URL = require('./db-url').DB_URL;

const studentSchema = mongoose.Schema({
    name: String,
    email: String, 
    password: String, 
    image: {type: String, default: 'default-student-image.png'},
    enrolledCourses: {
        type: [{id: String, name: String, teacherId: String, teacherName: String, image: String}],
        default: []
    }
}); 

const Student = mongoose.model('student', studentSchema); 
exports.Student = Student;

const Course = require('./course.model').Course;

exports.getStudentData = id => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                return Student.findById(id);
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

exports.updateStudent = (id, name, email) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
            .then(() => {
                return Student.findOneAndUpdate({_id: id}, {
                    name: name, 
                    email: email
                })
            })
            .then(student => {
                if(student){
                    mongoose.disconnect();
                    student.password = '';
                    resolve(student);
                }
                else {reject('there is no student match this id')}
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            })
    })
}

exports.deleteStudent = async (student) => {
    try {
        await mongoose.connect(DB_URL, {useNewUrlParser: true});
        await Student.findByIdAndDelete(student._id);
        for(let course of student.enrolledCourses){
            await Course.findByIdAndUpdate(course.id, {
                $pull: {
                    members: {id: student._id, name: student.name, image: student.image}
                }
            })
        }
        mongoose.disconnect();
        return;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}

exports.changeImage = async (studentId, image) => {
    try {
        await mongoose.connect(DB_URL);
        await Student.findByIdAndUpdate(studentId, {
            image: image
        });
        await Course.updateMany({'members.id': studentId},{
            $set: {
                'members.$[].image': image
            }
        });
        mongoose.disconnect();
        return;
    } catch (error) {
        console.log(error)
        mongoose.disconnect();
        throw new Error(error);
    }
}

exports.changePassword = async (email, newPassword) => {
    try {
        newHashedPassword = await bcrypt.hash(newPassword, 10);
        await mongoose.connect(DB_URL);
        await Student.findOneAndUpdate({email: email}, {
            password: newHashedPassword
        });
        mongoose.disconnect();
        return;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}

exports.enrollCourse = async (studentId, studentName, studentImage, courseCode) => {
    try {
        await mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
        let course = await Course.findOne({courseCode: courseCode});
        if(!course){
            throw 'there is no course with this code'
        }
        let courseData = {
            id: course._id, 
            name: course.name, 
            teacherId: course.teacherId, 
            teacherName: course.teacherName, 
            image: course.image
        }
        await Student.findByIdAndUpdate(studentId, {
            $push: {
                enrolledCourses: courseData
            }
        });
        await Course.findByIdAndUpdate(course._id, {
            $push: {
                members: {id: studentId, name: studentName, image: studentImage}
            }
        });
        return courseData;
    } catch (error) {
        throw error;
    }
}

exports.leaveCourse = async (student, course) => {
    try {
        await mongoose.connect(DB_URL, {useNewUrlParser: true});
        await Student.findByIdAndUpdate(student.id, {
            $pull: {
                enrolledCourses: course
            }
        });
        await Course.findByIdAndUpdate(course.id, {
            $pull: {
                members: student
            }
        });
        mongoose.disconnect();
        return;
    } catch (error) {
        throw new Error(error);
    }
}
