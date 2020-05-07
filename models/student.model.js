const mongoose = require('mongoose'); 
const bcrypt = require('bcryptjs');

mongoose.Promise = global.Promise;

const DB_URL = 'mongodb://localhost:27017/virtual-classroom';

const studentSchema = mongoose.Schema({
    name: String,
    email: String, 
    password: String, 
    image: {type: String, default: 'default-student-image.png'},
    enrolledCourses: {
        type: [{id: String, name: String, teacherName: String}],
        default: []
    }
}); 

const Student = mongoose.model('student', studentSchema); 
exports.Student = Student;

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
                return Student.findByIdAndUpdate(id, {
                    name: name, 
                    email: email
                })
            })
            .then(student => {
                if(student){
                    mongoose.disconnect();
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

exports.deleteStudent = (id) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                return Student.findByIdAndDelete(id);
            })
            .then(() => {
                mongoose.disconnect();
                resolve();
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
}

exports.changeImage = async (studentId, image) => {
    try {
        await mongoose.connect(DB_URL);
        await Student.findByIdAndUpdate(studentId, {
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