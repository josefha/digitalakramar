const functions = require("firebase-functions");
const rp = require("request-promise");
const querystring = require("querystring");

exports.swishPayment = functions.https.onRequest((request, response) => {
  console.log("in swish payment function");
  const number = request.query.number;
  // const amount = request.query.amount
  const amount = 1;

  // functions.config().elks.username
  const testConfig = {
    payeeAlias: "1231181189",
    host: "https://mss.cpc.getswish.net/swish-cpcapi",
    cert: functions.config().swish.test_pem,
    key: functions.config().swish.test_key,
    ca: functions.config().swish.testca,
  };

  const config = testConfig;

  const postFields = {
    payeePaymentReference: "0123456789",
    callbackUrl: "https://webhook.site/a8f9b5c2-f2da-4bb8-8181-fcb84a6659ea",
    payeeAlias: config.payeeAlias,
    payerAlias: number,
    amount: amount,
    currency: "SEK",
  };
  const postData = querystring.stringify(postFields);
  rp({
    uri: config.host + "/api/v1/paymentrequests",
    method: "POST",
    body: postData,
  })
    .then((result) => {
      const resultJson = JSON.parse(result);
      if (resultJson.status.localeCompare("failed") == 0) {
        response.send("Failed.");
      } else {
        response.send("Succeed");
      }
      console.log(result);
    })
    .catch((reason) => {
      response.send("Error: " + reason);
    });
});
