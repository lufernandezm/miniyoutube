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
        const mediaUploaded = Object.entries(media).map((e) =>
            cloudinary.v2.uploader.upload(e[1][0].path)
        );
        console.log('mediaUploaded', mediaUploaded)
        const responses = await Promise.all(mediaUploaded);
        console.log('responses', responses)

    } catch (error) {
        console.error(error)
        res.status(500).send()
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
        console.log('aqui1')
        const createdVideo = await newVideo.save()
        console.log('aqui2')
        return createdVideo

    } catch (error) {
        res.status(400).send()
    }
}

module.exports = {
    filterVideos,
    getVideos,
    getView,
    uploadVideo,
    postVideo
}