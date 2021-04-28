const { db } = require('../util/admin')
const Vonage = require('@vonage/server-sdk')

const vonage = new Vonage({
  apiKey: 'f5ea7a63',
  apiSecret: '4MK9DFulv9x1xf03',
})

exports.sendSms = (request, response) => {
  const from = 'Spirt APIs'
  const to = request.body.number
  const text = request.body.text
  vonage.message.sendSms(from, to, text, (err, responseData) => {
    if (err) {
      console.log(err)
    } else {
      if (responseData.messages[0]['status'] === '0') {
        console.log('Message sent successfully.')
        response.json({ response: 'success' })
      } else {
        console.log(
          `Message failed with error: ${responseData.messages[0]['error-text']}`
        )
      }
    }
  })
}

exports.getAllContacts = (request, response) => {
  db.collection('contacts')
    .get()
    .then((data) => {
      let contacts = []
      data.forEach((doc) => {
        contacts.push({
          id: doc.id,
          name: doc.data().name,
          number: doc.data().number,
        })
      })
      return response.json(contacts)
    })
    .catch((err) => {
      console.error(err)
      return response.status(500).json({ error: err.code })
    })
}

exports.postOneContact = (request, response) => {
  const newContactItem = {
    name: request.body.name,
    number: request.body.number,
  }
  db.collection('contacts')
    .add(newContactItem)
    .then((doc) => {
      const responseContactItem = newContactItem
      responseContactItem.id = doc.id
      return response.json(responseContactItem)
    })
    .catch((err) => {
      response.status(500).json({ error: 'Something went wrong' })
      console.error(err)
    })
}
