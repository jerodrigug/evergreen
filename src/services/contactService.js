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
