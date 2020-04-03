const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const DB_URL = 'mongodb://localhost:27017/virtual-classroom';

const gradeSchema = mongoose.Schema({
    studentId: String,
    quizId: String,
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

exports.updateGrade = async (quizId, studentId, grade) => {
    try {
        await mongoose.connect(DB_URL);
        await Grade.findOneAndUpdate({quizId, studentId}, {grade});
        mongoose.disconnect();
        return;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}

exports.getCourseGrades = async (courseId) => {
    try {
        await mongoose.connect(DB_URL);
        let grades = await Grade.find({courseId});
        mongoose.disconnect();
        return grades;
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

