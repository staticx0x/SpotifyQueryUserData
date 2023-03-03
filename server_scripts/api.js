const axios = require('axios')
const env = require('dotenv').config()
const clientID = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const base64String = process.env.BASE64_STRING
const spotifyUrl = 'https://api.spotify.com/v1'
let clientToken = ''

const auth = async () => {
    const res = await axios.post('https://accounts.spotify.com/api/token', { grant_type: 'client_credentials' }, {
        headers: {
            'Authorization': `Basic ${base64String}`,
            'Content-Type': 'application/x-www-form-urlencoded'
    }})
    clientToken = res.data.access_token
}

const getTrack = async () => {
    let retry = 0
    const res = await axios.get(`${spotifyUrl}/tracks/33bsk1Zn8QAAJnE7erlCtP`, {
        headers: {
            'Authorization': `Bearer ${clientToken}`
    }})
    //Will attempt one retry with a new token ***THIS IS BUGGED AND WILL RESULT IN INFINITE LOOP***
    if(res.status == 401 && retry == 0){
        console.log(res.status + '\nBad or expired token, refreshing token and retrying automatically...')
        auth()
        return getTrack()
    }
    //Send response back
    return res.data
}

const getAlbum = async () => {
    const res = await axios.get(`${spotifyUrl}/albums/13PxecK9Bart7ir6STafXP`, {
        headers: {
            'Authorization': `Bearer ${clientToken}`
        }
    })
    console.log(res.status)
    return res.data
}

auth()

module.exports = {
    getTrack,
    getAlbum,
}