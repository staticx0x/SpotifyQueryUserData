const express = require('express')
const router = express.Router()
const api = require('/Users/davidnunez/Documents/protoWebsite/server_scripts/api')
const userApi = require('/Users/davidnunez/Documents/protoWebsite/server_scripts/userApi')
const db = require('/Users/davidnunez/Documents/protoWebsite/server_scripts/database')
const updateUsers = db.updateUsers
const initializeUser = userApi.initializeUser
const getTrack = api.getTrack
const getAlbum = api.getAlbum
const clientID = process.env.CLIENT_ID
const redirectURI = 'http://127.0.0.1:3000/login/code/'

router.use(express.static('public'))

router.get('/', (req, res) => {
    console.log('request "/" received')
    res.sendFile('public/index.html')
})

router.get('/login', (req, res) => {
    res.redirect(`https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=code&redirect_uri=${redirectURI}&scope=user-read-private%20user-read-email%20user-top-read`)
})

router.get('/login/code', async (req, res) => {
    const code = req.query.code
    const user = await initializeUser(code, redirectURI)
    const exists = updateUsers(user)
    console.log(exists)
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