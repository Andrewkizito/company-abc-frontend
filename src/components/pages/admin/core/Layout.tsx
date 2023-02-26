// Importing helper functions
import { type ReactElement } from 'react'
import propTypes from 'prop-types'

// Importing core components
import { Box } from '@mui/material'
import Sidebar from './Sidebar'
import Header from './Header'

const Layout: React.FC<{ children: ReactElement }> = ({ children }) => {
  return (
    <Box position={'relative'} height={'100vh'} bgcolor="#fff">
      <Header />
      <Sidebar />
      <Box
        right={0}
        bottom={0}
        pt="1rem"
        pb="2rem"
        position={'absolute'}
        overflow={'scroll'}
        height={'calc(100vh - 70px)'}
        width={'calc(100vw - 280px)'}
      >
        {children}
      </Box>
    </Box>
  )
}

Layout.propTypes = {
  children: propTypes.any.isRequired
}

export default Layout
