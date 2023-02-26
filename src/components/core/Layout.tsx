// Importing interfaces
import { type ReactElement, useState } from 'react'
import propTypes from 'prop-types'

// Importing core components
import { Box } from '@mui/material'
import Header from './Header'
import Sidebar from './Sidebar'

interface LayoutProps {
  children: ReactElement
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarVisible, setVisibility] = useState<boolean>(false)

  return (
    <Box height={'100vh'} position="relative">
      <Header openSidebar={() => { setVisibility(true) }} />
      <Sidebar
        visible={isSidebarVisible}
        closeSideBar={() => { setVisibility(false) }}
      />
      <Box pt={'75px'}>{children}</Box>
    </Box>
  )
}

Layout.propTypes = {
  children: propTypes.any.isRequired
}

export default Layout
