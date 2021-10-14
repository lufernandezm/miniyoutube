const express = require('express')
const controller = require('../controllers/video')
const router = express.Router()
const multer = require('multer')
const storage = require('../src/utils/multer.js')

const upload = multer({ storage });

router.post('/videos', upload.fields([{ name: 'video', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]),
    async (req, res) => {
        try {
            // controller.uploadVideo(req.files)
            const thumbnail = "https://image.tmdb.org/t/p/w500/wqaaWAlXgLNGdAemU7wNvFZ70hr.jpg"
            const url = "www.url.com"
            const createdVideo = await controller.postVideo(req.body, thumbnail, url)
            res.status(201).send({
                status: 201,
                message: "Video created successfully!",
                data: createdVideo
            })

        } catch (error) {
            res.status(400).send(error)
        }
    })

module.exports = router