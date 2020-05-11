const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const crypto = require("crypto");
const rp = require("request-promise");
const querystring = require("querystring");

// path: `.env.${process.env.NODE_ENV}`,

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

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

exports.dataBaseTest = functions.https.onRequest((request, response) => {
  db = admin.firestore();

  const documentReference = db.doc("recievers/reciever-schema");

  documentReference.get().then((documentSnapshot) => {
    if (documentSnapshot.exists) {
      let data = documentSnapshot.data();
      console.log(`Retrieved data: ${JSON.stringify(data)}`);
    }

    response.send("Checking back" + documentSnapshot);
  });
});

exports.stopSms = functions.https.onRequest((request, response) => {
  /*
  This function will stop sms towards a specific phone number, 
  it is activated from the link a


  db = admin.firestore();

  const documentReference = db.doc("recievers/hashnumber1");

  documentReference.get().then((documentSnapshot) => {
    if (documentSnapshot.exists) {
      let data = documentSnapshot.data();
      console.log(`Retrieved data: ${JSON.stringify(data)}`);
    }

    response.send("Checking back" + documentSnapshot);
  });

  */
});

exports.sendSms = functions.https.onRequest((request, response) => {
  if (!validatedRequestBody(request.body)) {
    response.send("Cloud function sendSms getting wrong data");
    return;
  }

  // Setup for firestore and elks api service
  db = admin.firestore();
  const username = functions.config().elks.username;
  const password = functions.config().elks.password;

  const successfulNumbers = [];

  request.body.recievers.forEach((number, i) => {
    const numberHash = crypto
      .createHash("sha256")
      .update(number)
      .digest("base64");

    const recieverReference = db
      .collection("recievers")
      .where("mobileNumberHash", "==", "34GH34");

    recieverReference
      .get()
      .then((recieverSnapshot) => {
        if (recieverSnapshot.empty) createNewReciever(numberHash);
        else if (recieverSnapshot.exists) {
          // if exists: Check if reciever doesn't want sms
          // Add  request.body.senderName to array of huggers
          // Send sms to the reciever
        }
      })
      .catch((error) => {
        Console.log("Error recieving" + error);
      });
  });

  /*
  const postFields = {
    from: "DigitalKram",
    to: request.body.recipients[0],
    message: "DIGITAL HUGS SAVE THE WORLD",
  };

  // Instead of stringify here, json: true in the rp call shold allow stringification
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
    */
  response.send("Checking back");

  const createNewReciever = (numberHash) => {
    db.collection("recievers");
  };

  const validatedRequestBody = (body) => {
    return body && body.recievers && body.senderName;
  };
});
