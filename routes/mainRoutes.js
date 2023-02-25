const express = require('express')
const router = express.Router()
const getAuth = require('/Users/davidnunez/Documents/protoWebsite/server_scripts/api')

router.get('/', (req, res) => {
    console.log('request "/" received')
    res.send('Homepage')
})

router.get('/token', (req, res) => {
    console.log('request "/token" received')
    getAuth()
    .then(result => {
        res.send(result)
    })
})

router.get('/data', (req, res) => {
    console.log('request "/data" received')
    res.send('Showing data...')
})

module.exports = router