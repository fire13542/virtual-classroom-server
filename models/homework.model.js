const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const DB_URL = 'mongodb://localhost:27017/virtual-classroom';

const homeworkSchema = mongoose.Schema({
    name: String,
    screen: String,
    links: {
        type: [{statement: String, link: String}],
        default: []
    },
    files: {
        type: [String],
        default: []
    },
    solutions: {
        type: [{studentId: String, studentName: String, solutionFile: String}],
        default: []
    },
    discussionId: String
})

const Homework = mongoose.model('homework', lessonSchema);
exports.Homework = Homework;

exports.getHomeworkById = async id => {
    try {
        await mongoose.connect(DB_URL)
        let homework = await Homework.findById(id);
        if(homework){
            mongoose.disconnect();
            return homework;
        }
        else{
            throw "No Homework with this ID";
        }
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}

exports.addLink = async (homeworkId, link) => {
    try {
        await mongoose.connect(DB_URL);
        await Homework.findByIdAndUpdate(homeworkId, {
            $push: {
                links: link
            }
        });
        mongoose.disconnect();
        return;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}

exports.removeLink = async (homeworkId, link) => {
    try {
        await mongoose.connect(DB_URL);
        await Homework.findByIdAndUpdate(homeworkId, {
            $pull: {
                links: link
            }
        });
        mongoose.disconnect();
        return;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}

exports.uploadFile = async (homeworkId, filename) => {
    try {
        await mongoose.connect(DB_URL);
        await Homework.findByIdAndUpdate(homeworkId, {
            $push: {
                files: filename
            }
        });
        mongoose.disconnect();
        return;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}

exports.removeFile = async (homeworkData, filename) => {
    try {
        await mongoose.connect(DB_URL);
        await Lesson.findByIdAndUpdate(homeworkData.homeworkId, {
            $push: {
                files: filename
            }
        });

        await fileManager.removeFile('./teachers/'+homeworkData.teacherId+'/'+homeworkData.courseName+'/'
                                        +homeworkData.homeworkName+'/'+filename)

        mongoose.disconnect();
        return;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}

exports.uploadSolution = async (homeworkId, solution) => {
    try {
        await mongoose.connect(DB_URL);
        await Homework.findByIdAndUpdate(homeworkId, {
            $push: {
                solutions: solution
            }
        })
        mongoose.disconnect();
        return;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}

