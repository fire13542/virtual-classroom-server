const mongoose = require('mongoose');
const randomString = require('randomstring');
const fileManager = require('file-manager-js');

mongoose.Promise = global.Promise;

const DB_URL = 'mongodb://localhost:27017/virtual-classroom';

const courseSchema = mongoose.Schema({
    name: String,
    courseCode: String,
    image: {type: String, default: 'default-course-image.png'},
    teacherId: String,
    teacherName: String,
    members: {
        type: [{id: String, name: String, image: String}],
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
                                                        courseCode: course.courseCode,
                                                        image: course.image
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

exports.deleteCourse = async (teacherId, courseData) => {
    try {
        await fileManager.removeDir('./teachers/'+teacherId+'/'+courseData.name);
        await mongoose.connect(DB_URL);
        let teacher = await Teacher.findByIdAndUpdate(teacherId, {
            $pull: {createdCourses: {id: courseData.id} }
        },
        {new: true});
        await Student.updateMany(null, 
                                { $pull: { enrolledCourses: {id: courseData.id} } });
        await Course.findByIdAndDelete(courseData.id);
        mongoose.disconnect()
        return teacher;
    } catch (error) {
        mongoose.disconnect();
        console.log(error)
        throw new Error(error);
    }
}


exports.courseImage = async (courseId, image) => {
    try {
        await mongoose.connect(DB_URL);
        Course.findByIdAndUpdate(courseId, {
            image: image
        });
        mongoose.disconnect();
        return;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}

exports.changeCourseCode = async (courseId) => {
    let courseCode = '';
    let isUnique = false;
    try {
        await mongoose.connect(DB_URL, {useNewUrlParser: true});
        while(!isUnique){
            courseCode = randomString.generate(10);
            let course = await Course.findOne({courseCode: courseCode});
            if(course) isUnique = false;
            else isUnique = true;
        }
        Course.findByIdAndUpdate(courseId, {courseCode})
        mongoose.disconnect();
        return courseCode;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error).message;
    }
}

exports.removeStudentFromCourse = async (courseId, student) => {
    try {
        await mongoose.connect(DB_URL, {useNewUrlParser: true});
        await Course.findByIdAndUpdate(courseId, {
            $pull: {
                members: student
            }
        });
        await Student.findByIdAndUpdate(student.id, {
            $pull: {
                enrolledCourses: {id: courseId}
            }
        });
        mongoose.disconnect()
        return;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error)
    }
}