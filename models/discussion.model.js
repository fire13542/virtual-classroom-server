const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const DB_URL = 'mongodb://localhost:27017/virtual-classroom';

const discussionSchema = mongoose.Schema({
    members: [{id: String, name: String, character: String}] // character: {teacher / student}
});

const Discussion = mongoose.model('discussion', discussionSchema);
exports.Discussion = Discussion;

exports.createNewDiscussion = async (teacherId, teacherName, members) => {
    try {
        mongoose.connect(DB_URL);
        let dicussionMembers = [];
        dicussionMembers.push({id: teacherId, name: teacherName, character: 'teacher'});
        members.forEach(member => {
            dicussionMembers.push({id: member.id, name: member.name, character: 'student'});
        });
        let discussion = new Discussion({
            members: dicussionMembers
        });
        let d = await discussion.save();
        mongoose.disconnect();
        return d._id;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
    
}

exports.getMembers = async (discussionId) => {
    try {
        await mongoose.connect(DB_URL);
        let members = await Discussion.findById(discussionId).members;
        mongoose.disconnect();
        return members;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}

exports.addMemberToDiscussion = async (discussionId, member) => {
    try {
        await mongoose.connect(DB_URL);
        await Discussion.findByIdAndUpdate(discussionId, {
            $push: {
                members: member
            }
        });
        mongoose.disconnect();
        return;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}

exports.removeMember = async (memberId) => {
    try {
        await mongoose.connect(DB_URL);
        await Discussion.findByIdAndUpdate(discussionId, {
            $pull: {
                members: member
            }
        });
        mongoose.disconnect();
        return;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}


exports.removeDiscussion = async (discussionId) => {
    try {
        await mongoose.connect(DB_URL);
        await Discussion.findByIdAndDelete(discussionId);
        mongoose.disconnect();
        return;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}


