const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const DB_URL = 'mongodb://localhost:27017/virtual-classroom';

const quizSchema = mongoose.Schema({
    quizName: String,
    maxGrade: Number,
    courseId: String,
    quizDate: Date,
    quizEnd: Date,
    status: String, // Waiting | Running | Terminating 
    questions: {
        type: [{
            question: String,
            trueAnswer: String,
            choices: [String]
        }],
        default:[]
    },
    attendants: {
        type: [{
            studentId: String, 
            studentName: String, 
            attendTime: Date
        }],
        default: []
    }
})

const Quiz = mongoose.model('quiz', quizSchema);
exports.Quiz = Quiz;

exports.newQuiz = async (quizData) => {
    try {
        await mongoose.connect(DB_URL);
        let quiz = new Quiz(quizData);
        let q = await quiz.save();
        mongoose.disconnect();
        return q;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}

exports.deleteQuiz = async (quizId) => {
    try {
        await mongoose.connect(DB_URL);
        await Quiz.findByIdAndDelete(quizId);
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
        return {quizName, maxGrade, quizDate, duration, status} = quiz;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
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

exports.getQuizQuestion = async (quizId) => {
    try {
        let questions;
        await mongoose.connect(DB_URL);
        let quiz = await Quiz.findById(quizId);
        if(quiz.status === "Running") {
            questions = quiz.questions;
        }
        else {
            throw "Quiz is " + quiz.status;
        }
        mongoose.disconnect();
        return questions;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}

