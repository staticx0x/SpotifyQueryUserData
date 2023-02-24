const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    console.log('request "/" received')
    res.send('Homepage')
})

router.get('/token', (req, res) => {
    console.log('request "/token" received')
    res.send("Getting token...")
})

router.get('/data', (req, res) => {
    console.log('request "/data" received')
    res.send('Showing data...')
})

module.exports = router