const functions = require("firebase-functions");
const rp = require("request-promise");
const querystring = require("querystring");

exports.sendSms = functions.https.onRequest((request, response) => {
  const number = request.query.number;

  const createNewReciever = (numberHash) => {
    db.collection("recievers");
    console.log("Got into the create function");
  };
  const validatedRequestBody = (body) => {
    return body && body.recievers && body.senderName;
  };

  if (!validatedRequestBody(request.body)) {
    response.send("Cloud function sendSms getting wrong data");
    return;
  }

  // Setup for firestore and elks api service
  db = admin.firestore();
  const username = functions.config().elks.username;
  const password = functions.config().elks.password;

  /*
    "senderName": "Robert",
    "recievers": ["+46700383373"]
  */
  //const statusRecievers = [{ index: -1, reason: "schema" }];

  request.body.recievers.forEach((number, i) => {
    console.log("Entered the array");
    const numberHash = crypto
      .createHash("sha256")
      .update(number)
      .digest("base64");

    //  const recieverReference =
    db.collection("recievers")
      .where("mobileNumberHash", "==", "34GH35")
      .get()
      .then((allSnapshots) => {
        allSnapshots.forEach((snapshot) => {
          response.send(`End of function: ${JSON.stringify(snapshot.data())}`);
        });
      });
  });

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
