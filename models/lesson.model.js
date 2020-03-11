const mongoose = require('mongoose');

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
            throw new Error("No Message with this ID");
        }
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}
