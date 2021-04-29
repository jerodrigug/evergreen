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
