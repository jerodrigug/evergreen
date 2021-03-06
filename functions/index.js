const functions = require('firebase-functions')
const app = require('express')()
const cors = require('cors')
app.use(cors())

const { getAllContacts, postOneContact, sendSms } = require('./api/sms')
const { getAllEmails, postOneEmail, sendEmail } = require('./api/email')

app.get('/contacts', getAllContacts)
app.post('/contact', postOneContact)
app.post('/sendsms', sendSms)
app.get('/emails', getAllEmails)
app.post('/email', postOneEmail)
app.post('/sendemail', sendEmail)

exports.api = functions.https.onRequest(app)
