const mongoose = require('mongoose'); 
const bcrypt = require('bcryptjs');

mongoose.Promise = global.Promise;

const DB_URL = 'mongodb://localhost:27017/virtual-classroom';

const teacherSchema = mongoose.Schema({
    name: String,
    email: String, 
    password: String, 
    image: {type: String, default: 'default-teacher-image.png'},
    createdCourses: {
        type: [{id: String, name: String, courseCode: String}],
        default: []
    }
}); 

const Teacher = mongoose.model('teacher', teacherSchema); 
exports.Teacher = Teacher;

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

exports.updateTeacher = (id, name, password, image) => {
    return new Promise((resolve, reject) => {
        mongoose
        .connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => {
            return bcrypt.hash(password, 10);
        })
        .then(hashedPassword => {
            console.log('a')
            return Teacher.findByIdAndUpdate(id, {
                name: name, 
                password: hashedPassword
            })
        })
        .then(teacher => {
            if(teacher){
                mongoose.disconnect();
                resolve();
            }
            else {reject('there is no teacher match this id')}
        })
        .catch(err => {
            mongoose.disconnect();
            reject(err);
        })
    })
}

exports.deleteTeacher = (id) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                return Teacher.deleteOne({_id: id});
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

