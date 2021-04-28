const functions = require('firebase-functions');
const app = require('express')();

const { getAllContacts, postOneContact } = require('./api/sms');
const { getAllEmails, postOneEmail } = require('./api/email');

app.get('/contacts', getAllContacts);
app.post('/contact', postOneContact);
app.get('/emails', getAllEmails);
app.post('/email', postOneEmail);

exports.api = functions.https.onRequest(app);
