// Importing helper functions
import { type AxiosResponse } from 'axios'
import { authSuccess } from 'src/context/authSlice'
import { api, updateState, validateObject } from 'src/utils/modules'
import { Store } from 'react-notifications-component'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

// Importing core components
import { Box, Button, Typography } from '@mui/material'
import { notificationsTheme } from 'src/utils/theme'
import { Spinner } from 'react-activity'
import TextInput from 'src/components/ui/TextInput'

const Login: React.FC = () => {
  const dispatch = useDispatch()
  const [form, setForm] = useState<Record<string, string>>({
    username: '',
    password: ''
  })
  const [loading, setLoading] = useState<boolean>(false)

  function submit (): void {
    // Checking if form only includes valid values
    const isFormValid: boolean = validateObject(form)
    if (isFormValid) {
      setLoading(true)
      api
        .post('auth/login', { ...form })
        .then((res: AxiosResponse) => {
          Store.addNotification({
            ...notificationsTheme,
            type: 'success',
            title: 'Done',
            message: 'Credentials authenticated successfully',
            onRemoval: () => {
              dispatch(authSuccess(res.data))
            }
          })
        })
        .catch((err) => {
          console.log(err)
          Store.addNotification({
            ...notificationsTheme,
            type: 'danger',
            title: 'Error',
            message: err.response.data
          })
        })
        .finally(() => { setLoading(false) })
    }
  }

  return (
    <Box
      height={'100vh'}
      bgcolor="#ccc"
      display={'flex'}
      justifyContent="center"
      alignItems={'center'}
    >
      <Box
        borderRadius={1}
        maxWidth={470}
        width={'95%'}
        bgcolor="#fff"
        p="3rem 1.5rem"
      >
        <Typography fontWeight={600} mb="1rem" variant="h6">
          Sign Into Admin Panel.
        </Typography>
        <TextInput
          label="Username"
          inputProps={{
            placeholder: 'Your username',
            value: form.username,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => { updateState('username', e.target.value, setForm) }
          }}
        />
        <TextInput
          label="Password"
          inputProps={{
            placeholder: 'Your password',
            value: form.password,
            type: 'password',
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => { updateState('password', e.target.value, setForm) }
          }}
        />
        <Button
          variant="contained"
          disabled={loading}
          fullWidth
          sx={{
            textTransform: 'capitalize'
          }}
          endIcon={
            loading && (
              <Spinner color="#fff" size={10} speed={1} animating={true} />
            )
          }
          onClick={submit}
        >
          {loading ? 'Signing In' : 'Sign In'}
        </Button>
      </Box>
    </Box>
  )
}

export default Login
