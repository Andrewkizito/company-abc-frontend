// Importing theme related dependencies
import { createTheme, type Theme } from '@mui/material'
import { type iNotification } from 'react-notifications-component'

const CustomTheme: Theme = createTheme({
  palette: {
    background: {
      default: '#232f3e',
      paper: '#1e2832'
    }
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        sx: { textTransform: 'capitalize', mr: '0.5rem' }
      }
    },
    MuiPaper: {
      defaultProps: {
        sx: {
          borderRadius: 'none'
        }
      }
    }
  },
  typography: {
    fontFamily: 'Nunito'
  }
})

export const notificationsTheme: iNotification = {
  type: 'default',
  insert: 'top',
  container: 'bottom-right',
  animationIn: ['animate__animated', 'animate__fadeIn'],
  animationOut: ['animate__animated', 'animate__fadeOut'],
  dismiss: {
    duration: 5000,
    onScreen: true
  }
}

export default CustomTheme
