const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const randomString = require('randomstring');

const authModel = require('../models/auth.model');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'o.class.virtual.classroom@gmail.com',
      pass: 'poi098)(*'
    }
  });


// check if token is valid ---------------
var decodedToken='';
exports.verifyToken = (req,res,next) => {
  let token = req.headers.token;

  jwt.verify(token, 'secret', function(err, tokendata){
    if(err){
      return res.status(400).json({tokenError: true, message: 'Unauthorized request'});
    }
    if(tokendata){
      decodedToken = tokendata;
      next();
    }
  })
}
// -----------------------------------



// -----------------------Signup---------------------------
exports.postSignup = (req, res, next) => {
    //check if email is existed by sending a message to it
    
    let mailOptions = {
        from: 'o.class.virtual.classroom@gmail.com',
        to: req.body.email,
        subject: 'Welcome in O-Class',
        html: `<h1> O-Class Virtual Classroom </h1> 
                <h2> O-Class is a web application that help teacher to create virtual classroom environment 
                    to make education process easier, more efficiant and more entertaining </h2>
                <h3> in O-Class in addition to virtual class environment, 
                    we provide some articles that help teachers and students 
                    how they can interact with E-Learning Effectively </h3>`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            res.json({
                signup: false,
                errMsg: error
            })
        } else {
            if(!info.accepted.includes(req.body.email)){
                res.json({
                    signup: false,
                    errMsg: "this email can not recieve our message"
                })
            }
        }
    });

    // --------------------------------------
    
    if(req.body.isStudent){
        authModel
            .createNewStudent(req.body.name, req.body.email, req.body.password)
            .then(student => {
                let token = jwt.sign({studentId: student._id}, 'secret', {expiresIn : '12h'});
                student.password = '';
                let studentRes = {};
                studentRes.student = student;
                studentRes.token = token;
                return studentRes;
            })
            .then(studentRes => {
                res.json({
                    signup: true,
                    student: studentRes.student,
                    token: studentRes.token
                })
            })
            .catch(err => res.json({
                signup: false,
                errMsg: err
            }));
    }
    else if(req.body.isTeacher){
        authModel
            .createNewTeacher(req.body.name, req.body.email, req.body.password)
            .then(teacher => {
                let token = jwt.sign({teacherId: teacher._id}, 'secret', {expiresIn : '12h'});
                teacher.password = '';
                let teacherRes = {};
                teacherRes.teacher = teacher;
                teacherRes.token = token;
                return teacherRes;
            })
            .then(teacherRes => {
                res.json({
                    signup: true,
                    teacher: teacherRes.teacher,
                    token: teacherRes.token
                })
            })
            .catch(err => res.json({
                signup: false,
                errMsg: err
            }));
    }
}

// -------------------end sign up---------------------



// ----------------------Login------------------------

/*
    login

    request: 
    {
        email, password, isStudent/isTeacher 
    }

    response: 
    {
        login: true, student/teacher data
        or
        login false, errMsg
    }

*/


exports.postLogin = (req, res, next) => {
    if(req.body.isStudent){
        authModel
            .studentLogin(req.body.email, req.body.password)
            .then(student => {
                let token = jwt.sign({studentId: student._id}, 'secret', {expiresIn : '12h'});
                student.password = '';
                let studentRes = {};
                studentRes.student = student;
                studentRes.token = token;
                return studentRes;
            })
            .then(studentRes => res.status(200).json({
                login: true,
                student: studentRes.student,
                token: studentRes.token
            }))
            .catch(err => {
                res.status(401).json({
                    login: false,
                    errMsg: err
                })
            });
    }
    else if(req.body.isTeacher){
        authModel
            .teacherLogin(req.body.email, req.body.password)
            .then(teacher => {
                let token = jwt.sign({teacherId: teacher._id}, 'secret', {expiresIn : '12h'});
                teacher.password = '';
                let teacherRes = {};
                teacherRes.teacher = teacher;
                teacherRes.token = token;
                return teacherRes;
            })
            .then(teacherRes => res.status(200).json({
                login: true,
                teacher: teacherRes.teacher,
                token: teacherRes.token
            }))
            .catch(err => res.status(401).json({
                login: false,
                errMsg: err
            }));
    }
    
}

// -----------------------end of login-----------------------------


// -----------------------admin Login------------------------------

exports.adminLogin = (req, res, next) => {
    authModel
        .adminLogin(req.body.adminName, req.body.password)
        .then(admin => {
            let token = jwt.sign({adminId: admin._id}, 'secret', {expiresIn : '3h'});
            return token;
        })
        .then(token => {
            return res.status(200).json({
                login: true,
                token: token
            })
        })
        .catch(err => {
            res.status(401).json({
                login: false,
                errMsg: err
            })
        })
}

exports.adminSignup = (req, res, next) => {
    authModel
        .adminSignup(req.body.adminName, req.body.password)
        .then(admin => {
            res.json({
                admin
            })
        })
}


// ------------------reset password--------------------
exports.resetPassword = (req, res, next) => {
    if(!authModel.checkIfEamilExisted(req.body.character, req.body.email)) {
        res.json({
            reset: false,
            errMsg: 'this email is not registered'
        })
        return;
    } 
    else {
        let resetNumber = randomString.generate({
            length: 5,
            charset: 'numeric'
        });
        let expiredDate = Date.now() + 3600000;

        let mailOptions = {
            from: 'o.class.virtual.classroom@gmail.com',
            to: req.body.email,
            subject: 'Reset Password',
            text: `Reset Number is: ${resetNumber}`
        };

        transporter.sendMail(mailOptions, function(error, info){
        if(error) {
            res.json({
                reset: false,
                errMsg: 'this email can not recieve our message 1'
            })
        } else if(!info.accepted.includes(req.body.email)){
            res.json({
                reset: false,
                errMsg: 'this email can not recieve our message'
            })
        }
        if(info.accepted.includes(req.body.email)) {
            res.json({
                reset: true,
                resetNumber: resetNumber,
                expiredDate: expiredDate
            })
        }
        }); 
    }
}