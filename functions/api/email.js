const sgMail = require('@sendgrid/mail')
const { db } = require('../util/admin')
sgMail.setApiKey(
  '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'
)

exports.getAllEmails = (request, response) => {
  db.collection('emails')
    .get()
    .then((data) => {
      let emails = []
      data.forEach((doc) => {
        emails.push({
          id: doc.id,
          name: doc.data().name,
          email: doc.data().email,
        })
      })
      return response.json(emails)
    })
    .catch((err) => {
      console.error(err)
      return response.status(500).json({ error: err.code })
    })
}

exports.postOneEmail = (request, response) => {
  const newEmailItem = {
    name: request.body.name,
    email: request.body.email,
  }
  db.collection('emails')
    .add(newEmailItem)
    .then((doc) => {
      const responseEmailItem = newEmailItem
      responseEmailItem.id = doc.id
      return response.json(responseEmailItem)
    })
    .catch((err) => {
      response.status(500).json({ error: 'Something went wrong' })
      console.error(err)
    })
}

exports.sendEmail = (request, response) => {
  const msg = {
    to: request.body.email,
    from: 'josemb125@gmail.com',
    subject: 'Spirit te envio un mensaje bebe',
    text: request.body.text,
  }
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
      return response.json({ response: 'Email sent pai' })
    })
    .catch((error) => {
      console.error(error)
    })
}
