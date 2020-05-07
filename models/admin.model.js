const mongoose = require('mongoose'); 
const bcrypt = require('bcryptjs');

mongoose.Promise = global.Promise;

const DB_URL = 'mongodb://localhost:27017/virtual-classroom';

const adminSchema = mongoose.Schema({
    adminName: String,
    password: String
}); 

const Admin = mongoose.model('admin', adminSchema); 
exports.Admin = Admin;

