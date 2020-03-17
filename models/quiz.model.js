const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const DB_URL = 'mongodb://localhost:27017/virtual-classroom';

const quizSchema = mongoose.Schema({
    quizName: String,
    maxGrade: Number,
    courseId: String,
    questions: {
        type: [{
            question: String,
            trueAnswer: String,
            choices: [String]
        }],
        default:[]
    }
})

const Quiz = mongoose.model('quiz', quizSchema);
exports.Quiz = Quiz;

exports.newQuiz = async (quizData) => {
    try {
        await mongoose.connect(DB_URL);
        let quiz = new Quiz(quizData);
        await quiz.save();
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
        return quiz;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}

exports.addQuestion = async (quizId, question) => {
    try {
        await mongoose.connect(DB_URL);
        await Quiz.findByIdAndUpdate(quizId, {
            $push: {
                questions: question
            }
        })
        mongoose.disconnect();
        return;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}

exports.removeQuestion = async (quizId, question) => {
    try {
        await mongoose.connect(DB_URL);
        await Quiz.findByIdAndUpdate(quizId, {
            $pull: {
                questions: question
            }
        })
        mongoose.disconnect();
        return;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}

