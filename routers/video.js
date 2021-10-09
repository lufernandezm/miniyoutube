const express = require('express')
const Video = require('../models/Video')
const controller = require('../controllers/video')
const router = express.Router()

router.post('/videos', async (req, res) => {

    const video = new Video({
        ...req.body
    })

    try {
        await video.save()
        res.status(201).send({
            status: 201,
            message: 'Video created successfully!',
            data: video
        })

    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router