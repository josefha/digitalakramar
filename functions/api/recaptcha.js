const functions = require("firebase-functions");
const rp = require("request-promise");

exports.checkRecaptcha = functions.https.onRequest((req, res) => {
  const response = req.query.response;
  console.log("recaptcha response", response);
  rp({
    uri: "https://recaptcha.google.com/recaptcha/api/siteverify",
    method: "POST",
    formData: {
      secret: functions.config().recaptcha.secret,
      response: response,
    },
    json: true,
  })
    .then((result) => {
      console.log("recaptcha result", result);
      if (result.success) {
        res.status(200).send("You're good to go, human.");
      } else {
        res.status(401).send("Recaptcha verification failed. Are you a robot?");
      }
    })
    .catch((reason) => {
      console.log("Recaptcha request failure", reason);
      res.status(500).send("Recaptcha request failed.");
    });
});
