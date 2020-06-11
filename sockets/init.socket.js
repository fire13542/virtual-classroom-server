module.exports = io => {
    io.on("connection", socket => {
        socket.on("joinStudentNotificationsRoom", studentId => {
            socket.join(studentId);
        });
        socket.on("joinTeacherNotificationsRoom", teacherId => {
            socket.join(teacherId);
        })
        socket.on("studentGoOnline", studentId => {
            io.onlineStudents[studentId] = true;
            socket.on("disconnect", () => {
                io.onlineStudents[studentId] = false;
            });
        });
        socket.on("teacherGoOnline", teacherId => {
            io.onlineTeachers[teacherId] = true;
            socket.on("disconnect", () => {
                io.onlineTeachers[teacherId] = false;
            });
        });
        socket.on("joinCourses", (courses) => {
            for(course of courses) socket.join(course);
        })
    });
};

