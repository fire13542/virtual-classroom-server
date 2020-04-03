const express = require('express');
const path = require('path');
const cors = require('cors');


const authRouter = require('./routes/auth.route');
const studentRouter = require('./routes/student.route');
const teacherRouter = require('./routes/teacher.route');
const lessonRouter = require('./routes/lesson.route');


const app = express();

app.use(cors());

const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.onlineTeachers = {};
io.onlineStudents = {};

// io.on('connection', socket => {
//     console.log('new');
//     socket.on('a', () => {
//         socket.emit('b');
//     })
// })

app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'images')));
app.use(express.static(path.join(__dirname, 'teachers')))


// app.get('/', (req, res, next) => {
//     res.sendFile(path.join(__dirname, 'views', 'index.html'));
// })
app.use('/', authRouter);
app.use('/student', studentRouter);
app.use('/teacher', teacherRouter);
app.use('/lesson', lessonRouter);

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log("server listen on port " + port);
});