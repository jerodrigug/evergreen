import axios from 'axios'

export const getSMSContacts = async () => {
  return await axios.get(
    `https://us-central1-topicostelematica.cloudfunctions.net/api/contacts`
  )
}

export const getEmailContacts = async () => {
  return await axios.get(
    `https://us-central1-topicostelematica.cloudfunctions.net/api/emails`
  )
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getSMSContacts, getEmailContacts }
