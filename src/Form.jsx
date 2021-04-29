import React, { useEffect, useState } from 'react'
import { Form, Formik, Field } from 'formik'
import { TextField, Select } from 'formik-material-ui'

import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'

import EvergreenLogo from './images/EvergreenLogo.png'
import contactService from './services/contactService'

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
  marginTop: { marginTop: theme.spacing(2) },
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
        const response = await contactService.getSMSContacts()
        setContacts(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchContacts()
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
            contact_type: '',
            receiver: '',
            email: '',
            phone_number: '',
            message: '',
          }}
          onSubmit={handleSubmit}
        >
          {(form) => {
            const { channel, contact_type } = form.values

            const handleReceiverChange = (_, { props }) => {
              const { value } = props
              form.setFieldValue('receiver', value)

              form.setFieldValue(
                'phone_number',
                contacts.find((contact) => contact.id === value).number
              )
            }

            const receivers = channel === 'sms' ? contacts : null

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

                <FormControl
                  variant="outlined"
                  fullWidth
                  className={classes.marginTop}
                >
                  <InputLabel id="contact_type-label">
                    Tipo de contacto
                  </InputLabel>
                  <Field
                    labelId="contact_type-label"
                    name="contact_type"
                    label="Tipo de contacto"
                    required
                    component={Select}
                  >
                    <MenuItem value="">
                      <em>Selecciona una opción</em>
                    </MenuItem>
                    <MenuItem value="new">Nuevo</MenuItem>
                    <MenuItem value="existent">Existente</MenuItem>
                  </Field>
                </FormControl>

                {contact_type === 'existent' ? (
                  <FormControl
                    variant="outlined"
                    fullWidth
                    className={classes.marginTop}
                  >
                    <InputLabel id="contact_type-label">
                      Destinatario
                    </InputLabel>
                    <Field
                      labelId="receiver-label"
                      name="receiver"
                      label="Remitente"
                      component={Select}
                      onChange={handleReceiverChange}
                      required
                    >
                      <MenuItem value="">
                        <em>Selecciona una opción</em>
                      </MenuItem>
                      {receivers.map((contact) => (
                        <MenuItem value={contact.id}>{contact.name}</MenuItem>
                      ))}
                    </Field>
                  </FormControl>
                ) : (
                  <Field
                    variant="outlined"
                    margin="normal"
                    label="Remitente"
                    name="receiver"
                    component={TextField}
                    disabled={contact_type === ''}
                    required
                    autoFocus
                    fullWidth
                  />
                )}

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
                    required={channel === 'sms'}
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
