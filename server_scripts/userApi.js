const axios = require('axios')
const env = require('dotenv').config()
const clientID = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const base64String = process.env.BASE64_STRING
const spotifyUrl = 'https://api.spotify.com/v1'

const initializeUser = async (code, redirectURI) => {
    const tokens = await getUserTokens(code, redirectURI)
    const userData = await getUser(tokens)
    const user = {
        id: userData.id,
        email: userData.email,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        scope: tokens.scope
    }
    return user
}

const getUser = async tokens => {
    const res = await axios.get(`${spotifyUrl}/me`, {
        headers: {
            'Authorization': `Bearer ${tokens.access_token}`
        }
    })
    //console.log(res.data)
    return res.data
}

const getUserTokens = async (code, redirectURI) => {
    const res = await axios.post('https://accounts.spotify.com/api/token', { grant_type: 'authorization_code', code: code, redirect_uri: redirectURI }, {
        headers: {
            'Authorization': `Basic ${base64String}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        }})
    //console.log(res.data)
    return res.data
}

module.exports = {
    initializeUser,
    getUserTokens
}