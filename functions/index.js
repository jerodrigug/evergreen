const functions = require('firebase-functions');
const app = require('express')();

const { getAllContacts, postOneContact } = require('./api/sms');

app.get('/contacts', getAllContacts);

app.post('/contact', postOneContact);
exports.api = functions.https.onRequest(app);
