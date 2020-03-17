const lessonModel = require('../models/lesson.model');

exports.uploadFile = (req, res, next) => {
    lessonModel
        .uploadFile(req.body.lessonId, req.file.filename)
        .then(() => {
            res.json({
                fileUploaded: true
            });
        })
        .catch(err => {
            res.json({
                error: true,
                errMsg: err
            })
        })
}