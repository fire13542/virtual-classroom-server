const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const bcrypt = require('bcryptjs');

const DB_URL = 'mongodb://localhost:27017/virtual-classroom';

const Student = require('./student.model').Student;
const Teacher = require('./teacher.model').Teacher;


exports.createNewStudent = (name, email, password) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                return Student.findOne({email: email});
            })
            .then(student => {
                if(student) {
                    mongoose.disconnect();
                    reject('email is already existed');
                }
                else {
                    return bcrypt.hashSync(password, 10);
                }
            }).then(hashedPassword => {
                let student = new Student({
                    name: name,
                    email: email,
                    password: hashedPassword
                })
                return student.save();
            }).then(() => {
                mongoose.disconnect();
                resolve();
            }).catch(err => {
                mongoose.disconnect();
                reject(err)
                })
        })

};


exports.studentLogin = (email, password) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
            return Student.findOne({email: email});
            })
            .then(student => {
                if(!student) {
                    mongoose.disconnect();
                    reject('there is no student matches this email');
                }
                else {
                    bcrypt
                        .compare(password, student.password)
                        .then(same => {
                            if(!same){
                                mongoose.disconnect();
                                reject('password is incorrect')
                            } else {
                                mongoose.disconnect();
                                resolve(student);
                            }
                        })
                }
            }).catch(err => {
                mongoose.disconnect();
                reject(err);
            })
        })
};


exports.createNewTeacher = (name, email, password) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
            .then(() => {
                return Teacher.findOne({email: email});
            })
            .then(teacher => {
                if(teacher){
                    mongoose.disconnect();
                    reject('email is already existed');
                }
                else {
                    return bcrypt.hash(password, 10);
                }
            }).then(hashedPassword => {
                let teacher = new Teacher({
                    name: name,
                    email: email,
                    password: hashedPassword
                })
                return teacher.save();
            }).then(() => {
                mongoose.disconnect();
                resolve();
            }).catch(err => {
                mongoose.disconnect();
                reject(err)
            })
    })
};


exports.teacherLogin = (email, password) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
            return Teacher.findOne({email: email});
            })
            .then(teacher => {
                if(!teacher) {
                    mongoose.disconnect();
                    reject('there is no teacher matches this email');
                }
                else {
                    bcrypt
                        .compare(password, teacher.password)
                        .then(same => {
                            if(!same){
                                mongoose.disconnect();
                                reject('password is incorrect')
                            } else {
                                mongoose.disconnect();
                                resolve(teacher);
                            }
                        })
                }
            }).catch(err => {
                mongoose.disconnect();
                reject(err);
            })
        })
};

