const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const crypto = require("crypto");
const shortid = require("shortid");
const rp = require("request-promise");
const querystring = require("querystring");

exports.dataBaseTest = functions.https.onRequest((request, response) => {
  db = admin.firestore();

  const documentReference = db.doc("recievers/reciever-schema");

  documentReference.get().then((documentSnapshot) => {
    if (documentSnapshot.exists) {
      let data = documentSnapshot.data();
      console.log(`Retrieved data: ${JSON.stringify(data)}`);
    }

    response.send(`Retrieved data: ${JSON.stringify(data)}`);
  });
});

exports.getHugger = functions.https.onRequest((request, response) => {
  db = admin.firestore();
  let huggerName = "";
  if (request.body && request.body.shortHash) {
    db.collection("recievers")
      .where("shortHash", "==", request.body.shortHash)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.docs[0].exists) {
          const data = querySnapshot.docs[0].data();
          huggerName = data.huggers[0];
          response.send({ huggerName: huggerName });
        }
      })
      .catch((error) => {
        response.send("Error in finding request");
        console.log("Error occured:" + error);
      });
  } else {
    response.send("Wrong request information");
  }
});

exports.createReciever = functions.https.onRequest((request, response) => {
  db = admin.firestore();
  if (request.body && request.body.number) {
    const number = request.body.number;
    const numberHash = crypto
      .createHash("sha256")
      .update(number)
      .digest("base64");

    const shortHash = shortid.generate(number);

    const searchingForUniqueID = true;
    let i = 5;
    while (searchingForUniqueID && i < 5) {
      db.collection("recievers")
        .where("shortHash", "==", shortHash)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.docs[0].exists)
            shortHash = shortid.generate(number);
          else searchingForUniqueID = false;
        })
        .catch((error) => {
          console.log("Error occured:" + error);
        });
      console.log("While loop");
      i += 1;
    }

    db.collection("recievers")
      .doc()
      .set({
        huggers: ["Robert", "Josef"],
        shortHash: shortHash,
        longHash: numberHash,
        stopSendingSms: false,
      })
      .then(() => {
        console.log("Document was written successfully");
        response.send("Wrote number to firestore");
      })
      .catch((error) => {
        response.send("Error when writing:" + error);
      });
  } else if (request.body && request.body.searchNumber) {
    const number = request.body.searchNumber;
    const numberHash = crypto
      .createHash("sha256")
      .update(number)
      .digest("base64");

    db.collection("recievers")
      .where("longHash", "==", numberHash)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.docs[0]) {
          const data = querySnapshot.docs[0].data();
          response.send(`This is the reciever ${JSON.stringify(data)}`);
        } else {
          response.send(`Didn't find the reciever`);
        }
      })
      .catch((error) => {
        response.send("Error was made " + error);
      });
  } else if (request.body && request.body.searchId) {
    const number = request.body.searchId;
    const numberHash = crypto.createHash("sha256").update(number).digest("hex");

    const reference = db.collection("recievers").doc(numberHash);

    reference
      .get()
      .then((reciever) => {
        const data = reciever.data();
        response.send(`This is the reciever from ID ${JSON.stringify(data)}`);
      })
      .catch((error) => {
        response.send("Error was made from ID" + error);
      });
  }
});

exports.stopSms = functions.https.onRequest((request, response) => {
  //This function will stop sms towards a specific phone number,
  //it is activated from the link a

  db = admin.firestore();

  const documentReference = db.doc("recievers/hashnumber1");

  documentReference.get().then((documentSnapshot) => {
    if (documentSnapshot.exists) {
      let data = documentSnapshot.data();
      console.log(`Retrieved data: ${JSON.stringify(data)}`);
    }

    response.send("Checking back" + documentSnapshot);
  });
});

exports.sendSms = functions.https.onRequest((request, response) => {
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

  console.log("After reference" + recieverReference);

  recieverReference
    .get()
    .then((recieverSnapshot) => {
      if (recieverSnapshot.empty) createNewReciever(numberHash);
      if (recieverSnapshot.exists) {
        let data = recieverSnapshot.data();
        console.log(`After stopsms: ${JSON.stringify(data)}`);
        // Check if reciever doesn't want sms
        if (data.stopSms) {
          //statusRecievers.push({ index: i, reason: "Doesn't want Sms" });
          return;
        }
        response.send("Inside the array");
        // Add  request.body.senderName to array of huggers
      }

      // Send sms to the reciever
    })
    .catch((error) => {
      console.log("Error recieving" + error);
    });
});
