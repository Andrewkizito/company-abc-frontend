// Importing helper modules
import { AxiosError, type AxiosResponse } from 'axios'
import { api } from 'src/utils/modules'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initShop, type ShopState } from 'src/context/shopSlice'

// Importing core components
import { Box, Container, Grid } from '@mui/material'
import { notificationsTheme } from 'src/utils/theme'
import { Store } from 'react-notifications-component'
import Product from 'src/components/ui/Product'
import Loader from 'src/components/ui/Loader'

const Products: React.FC = () => {
  // Intializing dispatch
  const dispatch = useDispatch()

  // Getting shop items
  const items = useSelector(
    (state: { shop: ShopState }) => state.shop.shop_items
  )

  // State to handle loading
  const [loading, setLoading] = useState<boolean>(true)

  // Fetching data on pageload
  useEffect(() => {
    if (loading) {
      api
        .get('/products', { headers: { Authorization: 'hello' } })
        .then((res: AxiosResponse) => dispatch(initShop(res.data)))
        .catch((err) => {
          const erroMessage: string = err.response ? err.response.data : err.message
          Store.addNotification({
            ...notificationsTheme,
            type: 'danger',
            title: 'Error',
            message: erroMessage
          })
        })
        .finally(() => { setLoading(false) })
    }
  }, [loading, dispatch])

  if (loading) return <Loader label="Loading Products, Please Wait" />

  return (
    <Box sx={{ py: '3rem' }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {items?.map((item, i) => (
            <Grid item key={i} xs={12} sm={6} md={4}>
              <Product {...item} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default Products
