// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

const swish = require("./api/swish");
exports.swishPayment = swish.swishPayment;

const elk = require("./api/elk");
exports.sendSms = elk.sendSms;

const recaptcha = require("./api/recaptcha");
exports.checkRecaptcha = recaptcha.checkRecaptcha;
