const mongoose = require('mongoose'); 
const bcrypt = require('bcryptjs');

mongoose.Promise = global.Promise;

const DB_URL = require('./db-url').DB_URL;

const adminSchema = mongoose.Schema({
    adminName: String,
    password: String
}); 

const Admin = mongoose.model('admin', adminSchema); 
exports.Admin = Admin;

