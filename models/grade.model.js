const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const DB_URL = 'mongodb://localhost:27017/virtual-classroom';

const gradeSchema = mongoose.Schema({
    studentId: String,
    quizId: String,
    guizName: String,
    courseName: String,
    grade: Number
})

const Grade = mongoose.model('grade', gradeSchema);
exports.Grade = Grade;

exports.newGrade = async (gradeData) => {
    try {
        await mongoose.connect(DB_URL);
        let grade = new Grade(gradeData);
        let g = await grade.save();
        mongoose.disconnect();
        return g;
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