const mongoose = require('mongoose');
const randomString = require('randomstring');
const fileManager = require('file-manager-js');

mongoose.Promise = global.Promise;

const DB_URL = 'mongodb://localhost:27017/virtual-classroom';

const courseSchema = mongoose.Schema({
    name: String,
    courseCode: String,
    teacherId: String,
    teacherName: String,
    members: {
        type: [{id: String, name: String}],
        default: []
    },
    lessons: {
        type: [{id: String, name: String}],
        default: []
    },
    homeworks: {
        type: [{id: String, name: String}],
        default: []
    },
    quizes: {
        type: [{id: String, name: String}],
        default: []
    }
})

const Course = mongoose.model('course', courseSchema);
exports.Course = Course;

const Teacher = require('./teacher.model').Teacher;
const Student = require('./student.model').Student;

exports.getCourseById = async id => {
    try {
        await mongoose.connect(DB_URL)
        let course = await Course.findById(id);
        if(course){
            mongoose.disconnect();
            return course;
        }
        else{
            throw new Error("No Course with this ID");
        }
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}

exports.createNewCourse = async (teacherId, courseName) => {
    let courseCode = '';
    let isUnique = false;

    try {
        await mongoose.connect(DB_URL, {useUnifiedTopology: true ,useNewUrlParser: true, useFindAndModify: false})
        
        let teacherCourse = await Course.findOne({name: courseName, teacherId: teacherId});
        if(teacherCourse) throw new Error('you have already course with this name')
        
        while(!isUnique){
            courseCode = randomString.generate(10);
            let course = await Course.findOne({courseCode: courseCode});
            if(course) isUnique = false;
            else isUnique = true;
            }

        let course = new Course({
            name: courseName,
            courseCode: courseCode,
            teacherId: teacherId
        })

        await course.save();

        let teacher = await Teacher.findByIdAndUpdate(teacherId, {$push: {createdCourses: {
                                                        id: course._id, 
                                                        name: course.name, 
                                                        courseCode: course.courseCode
                                                    }}},
                                                    {new: true}
                                                    )
        
        mongoose.disconnect();
        await fileManager.createDir('./teachers/' + teacherId + '/' + courseName);
        return teacher;

    } catch (error) {
        mongoose.disconnect();
        throw new Error(error).message;
    }
}


