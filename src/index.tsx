// Importing react modules
import ReactDOM from 'react-dom/client'

// Importing APP root
import App from './App'

// Importing redux setup
import { Provider } from 'react-redux'
import AppStore from './context/store'

// Importing theme setup
import { ThemeProvider } from '@mui/material'
import CustomTheme from './utils/theme'

// Importing styles
import './index.css'
import 'react-activity/dist/library.css'
import 'react-notifications-component/dist/theme.css'
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <Provider store={AppStore}>
    <BrowserRouter>
      <ThemeProvider theme={CustomTheme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
)
