const express = require('express')
const router = express.Router()
const api = require('/Users/davidnunez/Documents/protoWebsite/server_scripts/api')
const userAuth = api.userAuth
const getTrack = api.getTrack
const getAlbum = api.getAlbum

router.use(express.static('public'))

router.get('/', (req, res) => {
    console.log('request "/" received')
    res.sendFile('public/index.html')
})

router.get('/access', (req, res) => {
    console.log('request "/access" received')
    const apiResponse = userAuth()
    res.send(apiResponse)
})

router.get('/track', (req, res) => {
    console.log('request "/track" received')
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