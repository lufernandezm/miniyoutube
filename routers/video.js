const express = require('express')
const controller = require('../controllers/video')
const router = express.Router()
const multer = require('multer')
const storage = require('../src/utils/multer.js')

const upload = multer({ storage });

router.post('/videos', upload.fields([{ name: 'video', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]),
    async (req, res) => {
        try {
            const uploaded = await controller.uploadVideo(req.files)
            console.log('uploaded', uploaded)
            const thumbnail = uploaded.thumbnail
            const url = uploaded.url
            await controller.postVideo(req.body, thumbnail, url)
            const videos = await controller.getVideos()
            res.render('index', {
                videos
            })

        } catch (error) {
            res.render('404', {
                title: '400',
                name: 'Lu Madrid',
                errorMessage: 'Could not created video.'
            })
        }
    })

router.patch('/videos', async (req, res) => {
        try {

            await controller.updateVideo(req.body)
            res.send({
                status: 200,
                message: 'ok'
            })

        } catch (error) {
            res.status(400).send({
                status: 400
            })
        }
    })

module.exports = router