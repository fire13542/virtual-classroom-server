const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const DB_URL = require('./db-url').DB_URL;

const gradeSchema = mongoose.Schema({
    studentId: String,
    studentName: String, 
    quizId: String,
    quizName: String,
    courseName: String,
    grade: Number
})

const Grade = mongoose.model('grade', gradeSchema);
exports.Grade = Grade;

exports.newGrade = async (gradeData) => {
    try {
        await mongoose.connect(DB_URL);
        let grade = new Grade({
            studentId: gradeData.studentId,
            studentName: gradeData.studentName, 
            quizId: gradeData.quizId,
            quizName: gradeData.quizName,
            courseName: gradeData.courseName,
            grade: gradeData.grade
        });
        await grade.save();
        mongoose.disconnect();
        return grade;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}

exports.getStudentGrades = async (studentId) => {
    try {
        await mongoose.connect(DB_URL);
        let grades = await Grade.find({studentId});
        mongoose.disconnect();
        return grades;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}

exports.getQuizGrades = async (quizId) => {
    try {
        await mongoose.connect(DB_URL);
        let grades = await Grade.find({quizId});
        mongoose.disconnect();
        return grades;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}