const mongoose = require('mongoose')

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, 
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    creation_date: {
        type: Number,
        required: true
    },
    likes_counter: {
        type: Number
    },
    dislikes_counter: {
        type: Number
    },
    thumbnail: {
        type: String,
        required: true,
        trim: true
    },
    tags: {
        type: Array,
        required: true
    },
    comments: {
        type: Array
    },
    url: {
        type: String,
        required: true
    }
})


const Video = mongoose.model('Video', videoSchema)

module.exports = Video