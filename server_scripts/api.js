const axios = require('axios')
const clientID = 'ae347d7db2a34bc9abd757c6e41a5ca9';
const clientSecret = 'da818a429104499ea25921dac5fcd6b6';
const spotifyUrl = 'https://api.spotify.com/v1'
let clientToken = ''

const auth = async () => {
    const res = await axios.post('https://accounts.spotify.com/api/token', { grant_type: 'client_credentials' }, {
    headers: {
        'Authorization': 'Basic YWUzNDdkN2RiMmEzNGJjOWFiZDc1N2M2ZTQxYTVjYTk6ZGE4MThhNDI5MTA0NDk5ZWEyNTkyMWRhYzVmY2Q2YjY=',
        'Content-Type': 'application/x-www-form-urlencoded'
    }})
    clientToken = res.data.access_token
}

const getTrack = async () => {
    const res = await axios.get(`${spotifyUrl}/tracks/33bsk1Zn8QAAJnE7erlCtP`, {
        headers: {
            'Authorization': `Bearer ${clientToken}`
        }
    })
    //Logic for expired token
    if(res.status == 401){
        console.log(res.status+ '\nBad or expired token, refreshing token and retrying automatically...')
        auth()
        getTrack()
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
console.log('api has been loaded')

module.exports = {
    getTrack,
    getAlbum
}