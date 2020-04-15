const https = require('https')
const querystring = require('querystring')

const username = process.env.GATSBY_SMS_USERNAME
const password = process.env.GATSBY_SMS_PASSWORD

const postFields = {
    from: "+46766864403",
    to: "+46701653568",
    message: "DIGITAL HUGS SAVE THE WORLD"
}

const key = new Buffer(username + ':' + password).toString('base64')
const postData = querystring.stringify(postFields)

const options = {
    hostname: 'api.46elks.com',
    path: '/a1/SMS',
    method: 'POST',
    headers: {
        'Authorization': 'Basic ' + key
    }
}


const callback = (response) => {
    var str = ''
    response.on('data', (chunk) => {
        str += chunk
    })

    response.on('end', () => {
        console.log(str)
    })
}

// Start the web request.
var request = https.request(options, callback)

// Send the real data away to the server.
request.write(postData)

// Finish sending the request.
request.end()