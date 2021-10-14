const Video = require('../models/Video')
const Comment = require('../models/Comment')
const cloudinary = require('../src/utils/cloudinary.js')

const getVideos = async (sort) => {

    try {
        return await Video.find({})
            .sort({ creation_date: sort })

    } catch (error) {
        console.error(error)
        res.status(500).send()
    }
}
const filterVideos = async (sort, search) => {

    try {
        return await Video.find({ $or: [{ title: { $regex: search, $options: 'i' } }, { tags: { $all: [search] } }] })
            .sort({ creation_date: sort })

    } catch (error) {
        console.error(error)
        res.status(500).send()
    }
}

const getView = async (_id) => {

    try {

        const video = await Video.findById(_id)
        const idComments = video.comments
        const comments = await Comment.find({ _id: { $in: idComments } })

        return { video, comments }

    } catch (error) {
        console.error(error)
        res.status(500).send()
    }
}

const uploadVideo = async (media) => {
    try {
    
        const arrayMedia = Object.entries(media)
        console.log('arrayMedia',arrayMedia)
        const imgUploaded = await cloudinary.v2.uploader.upload(arrayMedia[0][1][0].path)
        console.log('imgUploaded',imgUploaded)
        const videoUploaded = await cloudinary.v2.uploader.upload(arrayMedia[1][1][0].path,{ resource_type: "video" })
        console.log('videoUploaded',videoUploaded)
        const mediaUploade = {
            thumbnail: imgUploaded.url,
            url: videoUploaded.url
        }

        return mediaUploade
    } catch (error) {
        console.error(error)
    }
}

const postVideo = async (data, thumbnail, url) => {
    const { tags } = data

    data.creation_date = Date.now()
    data.tags = tags.split(" ")
    data.likes_counter = 0
    data.dislikes_counter = 0
    data.comments = []
    data.thumbnail = thumbnail
    data.url = url

    try {
        const newVideo = new Video(data)
        const createdVideo = await newVideo.save()
        return createdVideo

    } catch (error) {
        res.status(400).send()
    }
}

const updateVideo = async (data) => {

    try {
        if (data.action === 'like') {
            await Video.findByIdAndUpdate(data.videoId, { likes_counter: data.qty })
        } else {
            await Video.findByIdAndUpdate(data.videoId, { dislikes_counter: data.qty })
        }
        return 0

    } catch (error) {
        res.status(400).send()
    }
}

module.exports = {
    filterVideos,
    getVideos,
    getView,
    uploadVideo,
    postVideo,
    updateVideo
}