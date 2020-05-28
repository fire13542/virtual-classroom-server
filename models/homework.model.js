const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const DB_URL = 'mongodb://localhost:27017/virtual-classroom';

const homeworkSchema = mongoose.Schema({
    name: String,
    createDate: Date,
    toDate: Date,
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

const Homework = mongoose.model('homework', homeworkSchema);
exports.Homework = Homework;


exports.createNewHomework = async (courseId, courseName, homeworkName, toDate, teacherId, teacherName, members) => {
    try {
        let discussionId = await discussionModel.createNewDiscussion(teacherId, teacherName, members);
        await mongoose.connect(DB_URL);
        let homework = new Homework({
            courseId: courseId,
            name: homeworkName,
            discussionId: discussionId,
            createDate: Date.now(),
            toDate: toDate
        });
        await homework.save();
        await courseModel.Course.findByIdAndUpdate(courseId, {
            $push: {
                homeworks: {id: homework._id, name: homework.name, toDate: homework.toDate}
            }
        },
        {new: true});
        mongoose.disconnect();
        await fileManager.createDir('./teachers/' + teacherId + '/' + courseName + '/homeworks/' +  homeworkName);
        return homework;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}

exports.deleteHomework = async (homeworkId, courseId, homeworkName, courseName, teacherId) => {
    try {
        await fileManager.removeDir('./teachers/' + teacherId + '/' + courseName + '/homeworks/' + homeworkName);
        await mongoose.connect(DB_URL, {useNewUrlParser: true});
        await Homework.findByIdAndDelete(homeworkId);
        await Course.findByIdAndupdate(courseId, {
            $pull: {homeworks: {id: homeworkId}}
        })
        mongoose.disconnect();
        return;
    } catch (error) {
        throw new Error(error);
    }
}

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
        await mongoose.connect(DB_URL, {useNewUrlParser: true});
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
        await mongoose.connect(DB_URL, {useNewUrlParser: true});
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
        await mongoose.connect(DB_URL, {useNewUrlParser: true});
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
        await mongoose.connect(DB_URL, {useNewUrlParser: true});
        await Homework.findByIdAndUpdate(homeworkData.homeworkId, {
            $pull: {
                files: filename
            }
        });

        await fileManager.removeFile('./teachers/'+homeworkData.teacherId+'/'+homeworkData.courseName+'/homeworks/'+homeworkData.homeworkName+'/'+filename);

        mongoose.disconnect();
        return;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}

exports.uploadSolution = async (homeworkId, solution) => {
    try {
        await mongoose.connect(DB_URL, {useNewUrlParser: true});
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

