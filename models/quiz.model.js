const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const DB_URL = 'mongodb://localhost:27017/virtual-classroom';

const quizSchema = mongoose.Schema({
    quizName: String,
    maxGrade: Number,
    courseId: String,
    quizDate: Date,
    quizEnd: Date,
    // status: String, // Waiting | Running | Terminating 
    questions: {
        type: [{
            questionText: String,
            trueAnswer: String,
            choices: [String],
            grades: Number
        }],
        default:[]
    },
    attendants: {
        type: [{
            studentId: String, 
            studentName: String
        }],
        default: []
    }
})

const Quiz = mongoose.model('quiz', quizSchema);
exports.Quiz = Quiz;

const Course = require('./course.model').Course;
const gradeModel = require('./grade.model');

exports.newQuiz = async (quizData) => {
    try {
        await mongoose.connect(DB_URL);
        let quiz = new Quiz(quizData);
        let q = await quiz.save();
        // setTimeout(() => {
        //     mongoose.connect(DB_URL, {useNewUrlParser: true});
        //     Quiz.findByIdAndUpdate(q._id, {status: "Running"});
        //     mongoose.disconnect();
        // }, q.quizDate - Date.now());
        // setTimeout(() => {
        //     mongoose.connect(DB_URL, {useNewUrlParser: true});
        //     Quiz.findByIdAndUpdate(q._id, {status: "Terminating"});
        //     mongoose.disconnect();
        // }, q.quizEnd - Date.now());
        await Course.findByIdAndUpdate(q.courseId, {
            $push: {
                quizes: {id: q._id, name: q.quizName}
            }
        })
        mongoose.disconnect();
        return q;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}

exports.deleteQuiz = async (courseId, quizId) => {
    try {
        await mongoose.connect(DB_URL);
        await Quiz.findByIdAndDelete(quizId);
        await Course.findByIdAndUpdate(courseId, {
            $pull: {
                quizes: {id: quizId}
            }
        });
        await gradeModel.Grade.deleteMany({quizId: quizId});
        mongoose.disconnect();
        return;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}

exports.getQuizById = async (quizId) => {
    try {
        await mongoose.connect(DB_URL);
        let quiz = await Quiz.findById(quizId);
        mongoose.disconnect();
        let q = {
            _id: quiz._id,
            quizName: quiz.quizName,
            maxGrade: quiz.maxGrade,
            quizDate: quiz.quizDate,
            quizEnd: quiz.quizEnd
        }
        return q;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}

exports.getStudentQuizQuestions = async (quizId, attendantStudent) => {
    try {
        let questions;
        await mongoose.connect(DB_URL, {useNewUrlParser: true});
        let quiz = await Quiz.findById(quizId);
        if(quiz.attendants.filter(student => student.studentId == attendantStudent.id)[0]){
            mongoose.disconnect();
            throw 'you can not complete the quiz';
        } 
        else {
            await Quiz.findByIdAndUpdate(quizId, {
                $push: {
                    attendants: {studentId: attendantStudent.id, studentName: attendantStudent.name}
                }
            });
            questions = quiz.questions;
            mongoose.disconnect();
            return questions;
        }
    } catch (error) {
        mongoose.disconnect();
        throw error;
    }
}

exports.getTeacherQuizQuestions = async (quizId) => {
    try {
        await mongoose.connect(DB_URL, {useNewUrlParser: true});
        let quiz = await Quiz.findById(quizId);
        mongoose.disconnect();
        return quiz.questions;
    } catch (error) {
        mongoose.disconnect();
        throw error;
    }
}

exports.finishQuiz = async (quiz, student, answers) => {
    try {
        await mongoose.connect(DB_URL, {useNewUrlParser: true});
        let q = await Quiz.findById(quiz.id);
        let questions = q.questions;
        let quizGrade = 0;
        for(let i=0; i<questions.length; i++){
            if(questions[i].trueAnswer === answers[i]){
                quizGrade += questions[i].grades;
            }
        }
        let studentGrade = {
            studentId: student.id,
            studentName: student.name, 
            quizId: quiz.id,
            quizName: quiz.name,
            courseName: quiz.courseName,
            grade: quizGrade
        };
        let g = gradeModel.Grade(studentGrade);
        await g.save();
        mongoose.disconnect();
        return g;
    } catch (error) {
        mongoose.disconnect();
        return;
    }
}

exports.addQuestion = async (quizId, status, question) => {
    try {
        await mongoose.connect(DB_URL);
        if(status === "Waiting"){
            await Quiz.findByIdAndUpdate(quizId, {
                $push: {
                    questions: question
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

exports.removeQuestion = async (quizId, status, question) => {
    try {
        await mongoose.connect(DB_URL);
        if(status === "Waiting") {
            await Quiz.findByIdAndUpdate(quizId, {
                $pull: {
                    questions: question
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

exports.runQuiz = async (quizId, status) => {
    try {
        await mongoose.connect(DB_URL);
        if(status === "Running") throw "Quiz is Running";
        if(status === "Terminated") throw "Quiz is Terminated";
        if(status === "Waiting") {
            await Quiz.findByIdAndUpdate(quizId, {status: "Running"});
        }
        mongoose.disconnect();
        return;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}



