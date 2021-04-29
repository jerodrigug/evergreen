import axios from 'axios'

const getSMSContacts = async () => {
  return await axios.get(
    `https://us-central1-topicostelematica.cloudfunctions.net/api/contacts`
  )
}

const getEmailContacts = async () => {
  return await axios.get(
    `https://us-central1-topicostelematica.cloudfunctions.net/api/emails`
  )
}

const postOneContact = async (name, number) => {
  const data = JSON.stringify({ name, number })
  try {
    const response = await axios.post(
      `https://us-central1-topicostelematica.cloudfunctions.net/api/contact`,
      data
    )
    console.log('contacto posteado')
    return response
  } catch (error) {
    console.error(error)
  }
}

const postOneEmail = async (name, email) => {
  const data = JSON.stringify({ name, email })
  try {
    const response = await axios.post(
      `https://us-central1-topicostelematica.cloudfunctions.net/api/email`,
      data
    )
    console.log('email posteado')
    return response
  } catch (error) {
    console.error(error)
  }
}

const sendSms = async (number, text) => {
  const data = JSON.stringify({ number, text })
  try {
    const response = await axios.post(
      `https://us-central1-topicostelematica.cloudfunctions.net/api/sendsms`,
      data
    )
    console.log('sms enviado')
    return response
  } catch (error) {
    console.error(error)
  }
}

const sendEmail = async (email, text) => {
  const data = JSON.stringify({ email, text })
  try {
    const response = await axios.post(
      `https://us-central1-topicostelematica.cloudfunctions.net/api/sendemail`,
      data
    )
    console.log('email enviado')
    return response
  } catch (error) {
    console.error(error)
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getSMSContacts,
  getEmailContacts,
  postOneContact,
  postOneEmail,
  sendSms,
  sendEmail,
}
