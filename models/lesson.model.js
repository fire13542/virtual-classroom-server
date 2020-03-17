const mongoose = require('mongoose');
const fileManager = require('file-manager-js');

mongoose.Promise = global.Promise;

const DB_URL = 'mongodb://localhost:27017/virtual-classroom';

const lessonSchema = mongoose.Schema({
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
    discussionId: String
})

const Lesson = mongoose.model('lesson', lessonSchema);
exports.Lesson = Lesson;

exports.getLessonById = async id => {
    try {
        await mongoose.connect(DB_URL)
        let lesson = await Lesson.findById(id);
        if(lesson){
            mongoose.disconnect();
            return lesson;
        }
        else{
            throw "No Lesson with this ID";
        }
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}

exports.addLink = async (lessonId, link) => {
    try {
        await mongoose.connect(DB_URL);
        await Lesson.findByIdAndUpdate(lessonId, {
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

exports.removeLink = async (lessonId, link) => {
    try {
        await mongoose.connect(DB_URL);
        await Lesson.findByIdAndUpdate(lessonId, {
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

exports.uploadFile = async (lessonId, filename) => {
    try {
        await mongoose.connect(DB_URL);
        await Lesson.findByIdAndUpdate(lessonId, {
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

exports.removeFile = async (lessonData, filename) => {
    try {
        await mongoose.connect(DB_URL);
        await Lesson.findByIdAndUpdate(lessonData.lessonId, {
            $push: {
                files: filename
            }
        });

        await fileManager.removeFile('./teachers/'+lessonData.teacherId+'/'+lessonData.courseName+'/'
                                        +lessonData.lessonName+'/'+filename)

        mongoose.disconnect();
        return;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}

