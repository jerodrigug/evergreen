import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Form, Formik, Field } from 'formik'
import { TextField, Select } from 'formik-material-ui'

import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
// import TextField from '@material-ui/core/TextField'
// import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'

import EvergreenLogo from './images/EvergreenLogo.png'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  img: {
    width: '200px',
    marginTop: theme.spacing(-2),
    marginBottom: theme.spacing(-2),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function SignIn() {
  const [contacts, setContacts] = useState({})
  const classes = useStyles()

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        console.log('hola')
        const response = await axios.get(
          `https://us-central1-topicostelematica.cloudfunctions.net/api/contacts`
        )
        const res = await response.json()
        console.log(res)
      } catch (error) {
        console.error(error)
      }
    }

    fetchContacts()
    // console.log('hola')
    // axios
    //   .get(
    //     `https://us-central1-topicostelematica.cloudfunctions.net/api/contacts`
    //   )
    //   .then((res) => {
    //     console.log()
    //     const contact = res.data
    //     setContacts({ contact })
    //   })
    // console.log('adios')
  }, [])

  const handleSubmit = (values, form) => {
    console.log(values)
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img src={EvergreenLogo} alt="EverGreen logo" className={classes.img} />
        <Typography component="h1" variant="h5">
          Envíar un mensaje
        </Typography>

        <Formik
          initialValues={{
            channel: '',
            email: 'hola',
            phone_number: '300',
            message: '',
          }}
          onSubmit={handleSubmit}
        >
          {({ values }) => {
            const { channel } = values
            return (
              <Form>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="channel-label">Canal</InputLabel>
                  <Field
                    labelId="channel-label"
                    name="channel"
                    label="Canal"
                    required
                    component={Select}
                  >
                    <MenuItem value="">
                      <em>Selecciona una opción</em>
                    </MenuItem>
                    <MenuItem value="email">Correo electrónico</MenuItem>
                    <MenuItem value="sms">SMS</MenuItem>
                  </Field>
                </FormControl>

                {channel === 'email' && (
                  <Field
                    variant="outlined"
                    margin="normal"
                    label="Correo electrónico"
                    name="email"
                    autoComplete="email"
                    component={TextField}
                    required={channel === 'email'}
                    autoFocus
                    fullWidth
                  />
                )}

                {channel === 'sms' && (
                  <Field
                    variant="outlined"
                    margin="normal"
                    label="Número de celular"
                    name="phone_number"
                    component={TextField}
                    required={values.channel === 'sms'}
                    autoFocus
                    fullWidth
                  />
                )}

                <Field
                  variant="outlined"
                  margin="normal"
                  name="message"
                  label="Mensaje"
                  component={TextField}
                  required
                  fullWidth
                  multiline
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Envíar
                </Button>
              </Form>
            )
          }}
        </Formik>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}
