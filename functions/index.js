const functions = require('firebase-functions');
const rp = require('request-promise')

 // path: `.env.${process.env.NODE_ENV}`,

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});

exports.checkRecaptcha = functions.https.onRequest((req, res) => {
    const response = req.query.response
    console.log("recaptcha response", response)
    rp({
        uri: 'https://recaptcha.google.com/recaptcha/api/siteverify',
        method: 'POST',
        formData: {
            secret: functions.config().recaptcha.secret,
            response: response
        },
        json: true
    }).then(result => {
        console.log("recaptcha result", result)
        if (result.success) {
            res.send("You're good to go, human.")
        }
        else {
            res.send("Recaptcha verification failed. Are you a robot?")
        }
    }).catch(reason => {
        console.log("Recaptcha request failure", reason)
        res.send("Recaptcha request failed.")
    })
})

/*
const callSmsApi = () => {
        const https = require('https')
        const querystring = require('querystring')

        const username = process.env.GATSBY_SMS_USERNAME
        const password = process.env.GATSBY_SMS_PASSWORD

        const postFields = {
            from: "+46766864403",
            to: "+46707240529",
            message: "DIGITAL HUGS SAVE THE WORLD"
        }

        const key = new Buffer(username + ':' + password).toString('base64')
        const postData = querystring.stringify(postFields)

        const options = {
            hostname: 'api.46elks.com',
            path: '/a1/SMS',
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + key,
                // 'Access-Control-Allow-Origin:': 'http://localhost:8000/'
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
        console.log("sending");
    }
*/