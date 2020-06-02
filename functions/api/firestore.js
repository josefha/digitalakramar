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
/*
{
    "shortID": "FghWE32fe"
}
*/
exports.getHugger = functions.https.onRequest((request, response) => {
  db = admin.firestore();
  if (request.body && request.body.shortID) {
    db.collection("hugs")
      .doc(request.body.shortID)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          const data = snapshot.data();
          if (data.name) response.send({ huggerName: data.name });
        } else {
          response.status(404).send("Hug doesn't exist");
        }
      })
      .catch((error) => {
        console.log("Error occured:" + error);
        response.send("Error in finding request");
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
    while (searchingForUniqueID) {
      db.collection("hugs")
        .doc(shortHash)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) shortHash = shortid.generate(number);
          else searchingForUniqueID = false;
        })
        .catch((error) => {
          console.log("Error occured:" + error);
        });
      console.log("While loop");
    }

    db.collection("recievers")
      .doc()
      .set({
        hugs: ["Robert", "Josef"],
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
  const createNewReciever = (numberHash, shortID) => {
    console.log("Created new reciever");
    db.collection("recievers")
      .doc()
      .set({
        longHash: numberHash,
        hugs: [shortID],
        stopSendingSms: false,
      });
  };
  const validatedRequestBody = (body) =>
    body && body.recievers && body.senderName;

  if (!validatedRequestBody(request.body)) {
    response.send("Cloud function sendSms getting wrong data");
    return;
  }
  const searchForUniqueID = (senderName) => {
    const shortHash = shortid.generate(senderName);
    const searchingForUniqueID = true;
    let i = 5;
    while (searchingForUniqueID && i < 5) {
      console.log("searchingForUniqueID, shortHash:" + shortHash);
      db.collection("hugs")
        .doc(shortHash)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) shortHash = shortid.generate(senderName);
          else searchingForUniqueID = false;
        })
        .catch((error) => {
          console.log("Error occured in searchingForUniqueID:" + error);
        });
      i += 1;
    }
    return shortHash;
  };
  // Setup for firestore and elks api service
  db = admin.firestore();
  const username = functions.config().elks.username;
  const password = functions.config().elks.password;
  const senderName = request.body.senderName;
  /*
    "senderName": "Robert",
    "recievers": ["+46700383373"]
  */

  const shortID = searchForUniqueID(senderName);
  db.collection("hugs").doc(shortID).set({ name: senderName });

  request.body.recievers.forEach((number, i) => {
    let friendInfo = "Info: ";
    const numberHash = crypto
      .createHash("sha256")
      .update(number)
      .digest("base64");

    db.collection("recievers")
      .where("longHash", "==", numberHash)
      .get()
      .then((querySnapshots) => {
        if (querySnapshots.size == 0) {
          createNewReciever(numberHash, shortID);
          friendInfo += "Created - ";
        } else {
          const recieverSnapshot = querySnapshots.docs[0];
          if (recieverSnapshot && recieverSnapshot.exists) {
            let data = recieverSnapshot.data();
            const newHugs = data.hugs;
            newHugs.push(shortID);
            console.log(`Document found with name '${recieverSnapshot.id}'`);

            db.collection("recievers")
              .doc(recieverSnapshot.id)
              .update({ hugs: newHugs });
            friendInfo += "Updated - ";

            console.log(`After update: ${JSON.stringify(data)}`);
            /*
            response.send(
              `Updated existing reciever: ${JSON.stringify(newHugs)}`
            );
            */

            // Check if reciever doesn't want sms
            if (data.stopSendingSms) {
              friendInfo += " Does not want SMS";
              //statusRecievers.push({ index: i, reason: "Doesn't want Sms" });
              return;
            } else {
              // Send sms to reciever
            }
            // Add hug to reciever doc
          }
        }
      })
      .catch((error) => {
        console.log("Erorr catched" + error);
      });
  });
});
