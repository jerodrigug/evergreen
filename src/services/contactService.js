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

// eslint-disable-next-line import/no-anonymous-default-export
export default { getSMSContacts, getEmailContacts, postOneContact }
