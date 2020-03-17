const discussionModel = require('../models/discussion.model');
const commentModel = require('../models/comment.model');



exports.getDiscussionComments = (req, res, next) => {
    commentModel
        .getDiscussionComments(req.body.discussionId)
        .then(comments => {
            res.json(comments);
        })
        .catch(err => {
            res.json({
                error: true,
                errMsg: err
            })
        })
}

