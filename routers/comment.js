const express = require('express')
const Comment = require('../models/Comment')
const controller = require('../controllers/comment')
const router = express.Router()
router.post('/comments', async (req, res) => {

    const commentData = new Comment({
        ...req.body
    })

    const createdComment = controller.postComment(commentData)

        res.status(201).send({
            status: 201,
            message: 'Comment created successfully!',
            data: comment})
        
    
})

module.exports = router