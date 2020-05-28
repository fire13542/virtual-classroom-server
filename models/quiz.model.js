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
        setTimeout(() => {
            mongoose.connect(DB_URL, {useNewUrlParser: true});
            Quiz.findByIdAndUpdate(q._id, {status: "Running"});
            mongoose.disconnect();
        }, q.quizDate - Date.now());
        setTimeout(() => {
            mongoose.connect(DB_URL, {useNewUrlParser: true});
            Quiz.findByIdAndUpdate(q._id, {status: "Terminating"});
            mongoose.disconnect();
        }, q.quizEnd - Date.now())
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
        return {quizName, maxGrade, quizDate, quizEnd, status} = quiz;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}

exports.getQuizQuestions = async (quizId) => {
    try {
        let questions;
        await mongoose.connect(DB_URL, {useNewUrlParser: true});
        let quiz = await Quiz.findById(quizId);
        // if(quiz.status !== "Running", Date.now() >= quiz.quizData && Date.now() <= quiz.quizEnd){
        //     quiz.status = "Running";
        //     Quiz.findByIdAndUpdate(quizId, {status: "Running"})
        // }
        // if(quiz.status === "Running") {
        //     questions = quiz.questions;
        // }
        // else {
        //     throw "Quiz is " + quiz.status;
        // }
        questions = quiz.questions;
        mongoose.disconnect();
        return questions;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}

exports.attend = async (quizId, attendantStudent) => {
    try {
        await mongoose.connect(DB_URL, {useNewUrlParser: true});
        await Quiz.findByIdAndUpdate(quizId, {
            $push: {
                attendants: attendantStudent
            }
        });
        mongoose.disconnect();
        return;
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



