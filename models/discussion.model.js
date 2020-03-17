const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const DB_URL = 'mongodb://localhost:27017/virtual-classroom';

const discussionSchema = mongoose.Schema({
    members: [{id: String, name: String, character: String}] // character: {teacher / student}
});

const Discussion = mongoose.model('discussion', discussionSchema);
exports.Discussion = Discussion;


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

exports.newDiscussion = async (discussionData) => {
    try {
        await mongoose.connect(DB_URL);
        let discussion = new Discussion(discussionData);
        let d = await discussion.save();
        mongoose.disconnect();
        return d._id;
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


