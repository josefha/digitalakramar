const functions = require('firebase-functions');
const rp = require('request-promise')
const querystring = require('querystring')

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
            res.status(200).send("You're good to go, human.")
        }
        else {
            res.status(401).send("Recaptcha verification failed. Are you a robot?")
        }
    }).catch(reason => {
        console.log("Recaptcha request failure", reason)
        res.status(500).send("Recaptcha request failed.")
    })
})

exports.sendSms = functions.https.onRequest((request, response) => {
    const number = request.query.number
    const username = functions.config().elks.username
    const password = functions.config().elks.password

    const postFields = {
        from: "DigitalKram",
        to: number,
        message: "DIGITAL HUGS SAVE THE WORLD"
    }

    const postData = querystring.stringify(postFields)

    rp({
        uri:'https://' + username + ':' + password + '@api.46elks.com/a1/SMS',
        method: 'POST',
        body: postData
    }).then(result => {
        const resultJson = JSON.parse(result)
        if(resultJson.status.localeCompare("failed") == 0){
            response.send("Failed.")
        } else {
            response.send("SMS is sent!")
        }
        console.log(result)
    }).catch(reason => {
        response.send("Error: " + reason)
    })
})