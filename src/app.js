const path = require('path')
const express = require('express')
const hbs = require('hbs')
const videoRouter = require('../routers/video')
const controller = require('../controllers/Video')
require('./db/mongoose')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)

hbs.registerPartials(partialsPath)

app.use(express.json())
app.use(videoRouter)
app.use(express.static(publicDirectoryPath))

app.get('', async (req, res) => {

    if (req.query.search) {
        const { sort = 'desc', search } = req.query
        const videos = await controller.filterVideos(sort, search)
        res.render('index', {
            videos
        })
    } else {
        const { sort = 'desc' } = req.query
        const videos = await controller.getVideos(sort)
        res.render('index', {
            videos
        })
    }
})

app.get('/videos/:id', async (req, res) => {

    const _id = req.params.id

    try {
        const view = await controller.getView(_id)
        res.render('view', {
            video: view.video,
            comments: view.comments
        })
    } catch (error) {
        res.render('404', {
            title: '404',
            name: 'Lu Madrid',
            errorMessage: 'Page not found.'
        })
    }
})

app.get('/add', (req, res) => {
    res.render('add', {
        helpText: 'This is some helpful text.',
        title: 'Add',
        name: 'Lu Madrid'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Lu Madrid',
        errorMessage: 'Page not found.'
    })
})

module.exports = app