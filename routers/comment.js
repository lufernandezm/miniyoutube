const express = require('express')
const Comment = require('../models/Comment')
const controller = require('../controllers/comment')
const router = express.Router()

router.post('/videos/comments', async (req, res) => {
    try {
        await controller.postComment(req.body)
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