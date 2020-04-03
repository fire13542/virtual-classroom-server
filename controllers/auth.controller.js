const authModel = require('../models/auth.model');


exports.postSignup = (req, res, next) => {
    if(req.body.isStudent){
        authModel
            .createNewStudent(req.body.name, req.body.email, req.body.password)
            .then(() => res.json({
                signup: true
            }))
            .catch(err => res.json({
                signup: false,
                errMsg: err
            }));
    }
    else if(req.body.isTeacher){
        authModel
            .createNewTeacher(req.body.name, req.body.email, req.body.password)
            .then(() => res.json({
                signup: true
            }))
            .catch(err => res.json({
                signup: false,
                errMsg: err
            }));
    }
}




/*
    login

    request: 
    {
        email, password, isStudent/isTeacher 
    }

    response: 
    {
        login: true/false, errMsg
    }

*/


exports.postLogin = (req, res, next) => {
    console.log(req.body);
    if(req.body.isStudent){
        authModel
            .studentLogin(req.body.email, req.body.password)
            .then(student => res.json({
                login: true,
                student: student
            }))
            .catch(err => res.json({
                login: false,
                errMsg: err
            }));
    }
    else if(req.body.isTeacher){
        authModel
            .teacherLogin(req.body.email, req.body.password)
            .then(teacher => res.json({
                login: true,
                teacher: teacher
            }))
            .catch(err => res.json({
                login: false,
                errMsg: err
            }));
    }
    
}

