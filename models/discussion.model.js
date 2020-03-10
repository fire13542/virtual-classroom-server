const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const DB_URL = 'mongodb://localhost:27017/virtual-classroom';

const discussionSchema = mongoose.Schema({
    members: [{id: String, name: String, character: String}] // character: {teacher / student}
});

const Discussion = mongoose.model('discussion', discussionSchema);
exports.Discussion = Discussion;


