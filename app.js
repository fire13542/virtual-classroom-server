const express = require('express');
const path = require('path');


const authRouter = require('./routes/auth.route');
const studentRouter = require('./routes/student.route');
const teacherRouter = require('./routes/teacher.route');


const app = express();

app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'images')));


app.use('/', authRouter);
app.use('/student', studentRouter);
app.use('/teacher', teacherRouter);


app.listen(3000, err => {
    console.log(err);
    console.log('server listen on port 3000');
});