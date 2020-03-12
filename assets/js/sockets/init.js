const socket = io();

let character = '';
id = '';
courses = []; // array of courses codes for courses nitfications 

socket.on("connect", () => {
    if(character === 'teacher') {
        socket.emit("joinTeacherNotificationsRoom", id);
        socket.emit("teacherGoOnline", id);
        socket.emit("joinCourses", courses);
    }
    else if(character === 'student') {
        socket.emit("joinStudentNotificationsRoom", id);
        socket.emit("studentGoOnline", id);
        socket.emit("joinCourses", courses);
    }
});


