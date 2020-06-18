const mongoose = require('mongoose');
const fileManager = require('file-manager-js');

mongoose.Promise = global.Promise;

const DB_URL = require('./db-url').DB_URL;

const courseModel = require('./course.model');
const discussionModel = require('./discussion.model');

const lessonSchema = mongoose.Schema({
    courseId: String,
    name: String,
    screen: {
        type: String,
        default: ''
    },
    links: {
        type: [{statement: String, link: String}],
        default: []
    },
    files: {
        type: [String],
        default: []
    },
    discussionId: String, 
    createDate: Date
})

const Lesson = mongoose.model('lesson', lessonSchema);
exports.Lesson = Lesson;

const Course = require('./course.model').Course;

exports.createNewLesson = async (courseId, courseName, lessonName, teacherId, teacherName, members) => {
    try {
        let discussionId = await discussionModel.createNewDiscussion(teacherId, teacherName, members);
        await mongoose.connect(DB_URL);
        let lesson = new Lesson({
            courseId: courseId,
            name: lessonName,
            discussionId: discussionId,
            createDate: Date.now()
        });
        await lesson.save();
        await courseModel.Course.findByIdAndUpdate(courseId, {
            $push: {
                lessons: {id: lesson._id, name: lesson.name}
            }
        },
        {new: true});
        mongoose.disconnect();
        await fileManager.createDir('./teachers/' + teacherId + '/' + courseName + '/' + lessonName);
        return lesson;
    } catch (error) {
        console.log(error);
        mongoose.disconnect();
        throw new Error(error);
    }
}

exports.deleteLesson = async (lessonId, courseId, lessonName, courseName, teacherId) => {
    try {
        await fileManager.removeDir('./teachers/' + teacherId + '/' + courseName + '/' + lessonName);
        await mongoose.connect(DB_URL);
        await Lesson.findByIdAndDelete(lessonId);
        await Course.findByIdAndUpdate(courseId, {
            $pull: {lessons: {id: lessonId}}
        })
        mongoose.disconnect();
        return;
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
}

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
        await mongoose.connect(DB_URL, {useNewUrlParser: true});
        await Lesson.findByIdAndUpdate(lessonId, {
            $push: {
                links: link
            }
        });
        mongoose.disconnect();
        return link;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}

exports.removeLink = async (lessonId, link) => {
    try {
        await mongoose.connect(DB_URL, {useNewUrlParser: true});
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
        await mongoose.connect(DB_URL, {useNewUrlParser: true});
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
        await mongoose.connect(DB_URL, {useNewUrlParser: true});
        await Lesson.findByIdAndUpdate(lessonData.lessonId, {
            $pull: {
                files: filename
            }
        });
        
        await fileManager.removeFile('./teachers/'+lessonData.teacherId+'/'+lessonData.courseName+'/'+lessonData.lessonName+'/'+filename)

        mongoose.disconnect();
        return;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}

