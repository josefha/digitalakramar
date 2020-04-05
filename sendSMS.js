const https = require('https')
const querystring = require('querystring')

const username = 'u14558844917d657f6c3903e6f5980ba2'
const password = 'DA2EE7B1BC58202592B55909E8BCA2B6'
const postFields = {
  from:    "+46766864403",
  to:      "+46701653568", 
  message: "DIGITAL HUGS SAVE THE WORLD"
}

const key = new Buffer(username + ':' + password).toString('base64')
const postData = querystring.stringify(postFields)

const options = {
  hostname: 'api.46elks.com',
  path:     '/a1/SMS',
  method:   'POST',
  headers:  {
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