const express = require('express')
const router = express.Router()
const api = require('/Users/davidnunez/Documents/protoWebsite/server_scripts/api')
const userAuth = api.userAuth
const getTrack = api.getTrack
const getAlbum = api.getAlbum
const clientID = process.env.CLIENT_ID

router.use(express.static('public'))

router.get('/', (req, res) => {
    console.log('request "/" received')
    res.sendFile('public/index.html')
})

router.get('/login', (req, res) => {
    /*
    console.log('request "/login" received')
    userAuth().then(result => {
        res.send(result.data)
    })*/
    res.redirect(`https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=code&redirect_uri=http://127.0.0.1:3000/&scope=user-read-private%20user-read-email%20user-top-read`)
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