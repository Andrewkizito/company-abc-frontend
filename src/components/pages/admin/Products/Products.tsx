// Importing helper modules
import { useState } from 'react'
import propsTypes from 'prop-types'

// Importing core components
import { AppBar, Box, Container, Tab, Tabs, Typography } from '@mui/material'
import Layout from '../core/Layout'

// Importing screens
import Listing from './sections/Listing'
import ProductManager from './sections/ProductManager'

// TabPanelProps
interface TabPanelProps {
  children?: React.ReactNode
  dir?: string
  index: number
  value: number
}

const TabPanel: React.FC<TabPanelProps> = (props) => {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

// Tabpanel proptypes
TabPanel.propTypes = {
  children: propsTypes.any,
  dir: propsTypes.string.isRequired,
  index: propsTypes.number.isRequired,
  value: propsTypes.number.isRequired
}

const Products: React.FC = () => {
  // State to control tabs
  const [value, setValue] = useState<number>(0)

  return (
    <Layout>
      <Container maxWidth="lg">
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={(e, newValue: number) => setValue(newValue)}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab
              label="Products In Inventory"
              sx={{ textTransform: 'capitalize' }}
            />
            <Tab
              label="Create New Product"
              sx={{ textTransform: 'capitalize' }}
            />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0} dir={'x'}>
          <Listing />
        </TabPanel>
        <TabPanel value={value} index={1} dir={'x'}>
          <ProductManager />
        </TabPanel>
      </Container>
    </Layout>
  )
}

export default Products
