const Video = require('../models/Video')
const Comment = require('../models/Comment')
const getVideos = async(sort) => {

    try {
    return await Video.find({})
        .sort({ creation_date: sort })

    } catch (error) {
        console.error(error)
        res.status(500).send()
    }
}
const filterVideos = async(sort, search) => {

    try {
    return await Video.find({ $or:[{ title :{ $regex : search, $options : 'i' } }, { tags :{ $all : [search] } }]})
        .sort({ creation_date: sort })

    } catch (error) {
        console.error(error)
        res.status(500).send()
    }
}

const getView= async(_id) => {

    try {

        const video = await Video.findById(_id)
        const idComments = video.comments
        const comments = await Comment.find({ _id : { $in : idComments } })
        
        return {video, comments}
        
    } catch (error) {
        console.error(error)
        res.status(500).send()
    }
}

module.exports = {
    filterVideos,
    getVideos,
    getView
}