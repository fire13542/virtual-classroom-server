const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');

websiteUrl = 'http://localhost:3000/'

const authRouter = require('./routes/auth.route');
const adminRouter = require('./routes/admin.route');
const studentRouter = require('./routes/student.route');
const teacherRouter = require('./routes/teacher.route');
const courseRouter = require('./routes/course.route');
const lessonRouter = require('./routes/lesson.route');
const contactRouter = require('./routes/contact-us.route');
const blogRouter = require('./routes/blog.route');


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
app.use(express.static(path.join(__dirname, 'teachers')));


app.use('/', authRouter);
app.use('/', contactRouter);
app.use('/', blogRouter);
app.use('/admin', adminRouter);
app.use('/student', studentRouter);
app.use('/teacher', teacherRouter);
app.use('/course', courseRouter);
app.use('/lesson', lessonRouter);


app.post('/upload-image', 
        multer({
            storage: multer.diskStorage({
                destination: (req, file, cb) => {
                    cb(null, "images/blog-images/");
                },
                filename: (req, file, cb) => {
                    cb(null, Date.now() + "-" + file.originalname);
                }
            })
        }).single("image"), 
        (req, res, next) => {
            res.json({
                imageUrl: websiteUrl + 'blog-images/' + req.file.filename
            })
        })


const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log("server listen on port " + port);
});