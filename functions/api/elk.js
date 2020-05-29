const functions = require("firebase-functions");
const rp = require("request-promise");
const querystring = require("querystring");

exports.sendSms = functions.https.onRequest((request, response) => {
  const number = request.query.number;
  const username = functions.config().elks.username;
  const password = functions.config().elks.password;

  const postFields = {
    from: "DigitalKram",
    to: number,
    message: "DIGITAL HUGS SAVE THE WORLD",
  };

  const postData = querystring.stringify(postFields);

  rp({
    uri: "https://" + username + ":" + password + "@api.46elks.com/a1/SMS",
    method: "POST",
    body: postData,
  })
    .then((result) => {
      const resultJson = JSON.parse(result);
      if (resultJson.status.localeCompare("failed") == 0) {
        response.send("Failed.");
      } else {
        response.send("SMS is sent!");
      }
      console.log(result);
    })
    .catch((reason) => {
      response.send("Error: " + reason);
    });
});
