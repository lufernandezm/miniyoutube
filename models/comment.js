const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true.valueOf, 
        trim: true
    },
    text: {
        type: String,
        trim: true
    },
    creation_date: {
        type: Number,
        required: true
    }
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment