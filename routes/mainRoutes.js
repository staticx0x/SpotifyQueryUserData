const express = require('express')
const router = express.Router()
const api = require('/Users/davidnunez/Documents/protoWebsite/server_scripts/api')
const getTrack = api.getTrack
const getAlbum = api.getAlbum

router.use(express.static('public'))

router.get('/', (req, res) => {
    console.log('request "/" received')
    res.sendFile('public/index.html')
})

router.get('/track', (req, res) => {
    console.log('request "/token" received')
    getTrack()
        .then(result => {
            res.send(result)
        })
})

router.get('/album', (req, res) => {
    console.log('request "/data" received')
    getAlbum()
        .then(result => {
            res.send(result)
        })
})

module.exports = router