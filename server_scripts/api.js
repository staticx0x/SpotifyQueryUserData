const axios = require('axios')
const clientID = 'ae347d7db2a34bc9abd757c6e41a5ca9';
const clientSecret = 'da818a429104499ea25921dac5fcd6b6';

const auth = async () => {
    const res = await axios.post('https://accounts.spotify.com/api/token', { grant_type: 'client_credentials' }, {
    headers: {
        'Authorization': 'Basic YWUzNDdkN2RiMmEzNGJjOWFiZDc1N2M2ZTQxYTVjYTk6ZGE4MThhNDI5MTA0NDk5ZWEyNTkyMWRhYzVmY2Q2YjY=',
        'Content-Type': 'application/x-www-form-urlencoded'
    }})
    return res.data.access_token
}

const getTrack = async () => {
    const res = await axios.get('https://api.spotify.com/v1/tracks/33bsk1Zn8QAAJnE7erlCtP', {
        headers: {
            'Authorization': `Bearer BQDBrfNcYTv1R_JG84Jrkb05bc-M6ACfCTYP9fu8dWa1UDR8MCU_KXSXc7azn7nzjbwkB-4C2c-eHpK-KV_o55MmOEx_1Ufp1UejEwUuQtEYaxwf2Igc`
        }
    })
    //const data = [ res.data.]
    console.log(res.data)
}
getTrack()
module.exports = auth