const Video = require('../models/Video')
const Comment = require('../models/Comment')

const postComment= async(commentData) => {

    try {
        const createdComment = await Comment.save(commentData.commentInfo)
        Video.findByIdAndUpdate({ _id : ObjectId(commentData.videoId),  $addToSet: { comments: createdComment._id } })
        return 
        
    } catch (error) {
        res.status(400).send()
    }
}

module.exports = {
    postComment
}