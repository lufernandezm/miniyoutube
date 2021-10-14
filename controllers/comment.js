const Video = require('../models/Video')
const Comment = require('../models/Comment')

const postComment= async(commentData) => {
    const { commentInfo, videoId} = commentData
    commentInfo.creation_date = Date.now()
    
    try {
        const newComment = new Comment(commentInfo)
        const createdComment = await newComment.save()
        await Video.findByIdAndUpdate( videoId,  {$addToSet: { comments: createdComment._id }} )
        return createdComment
        
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    postComment
}