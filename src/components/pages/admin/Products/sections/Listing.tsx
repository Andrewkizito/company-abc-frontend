// Importing helper modules
import { api, getImageUrl } from 'src/utils/modules'
import { type AuthState } from 'src/context/authSlice'
import { type AxiosResponse } from 'axios'
import { type ShopItem } from 'src/context/shopSlice'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'

// Importing core components
import { Box, Grid, Rating, Typography } from '@mui/material'
import { notificationsTheme } from 'src/utils/theme'
import { Store } from 'react-notifications-component'
import Loader from 'src/components/ui/Loader'

const Listing: React.FC = () => {
  // Getting auth token
  const { token } = useSelector((state: { auth: AuthState }) => state.auth)
  // State to handle stock items
  const [data, setData] = useState<ShopItem[] | null>(null)
  // State to handle loading
  const [loading, setLoading] = useState<boolean>(true)

  // Fetching data on pageload
  useEffect(() => {
    if (loading) {
      api
        .get('/products', { headers: { Authorization: token } })
        .then((res: AxiosResponse) => { setData(res.data) })
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
  }, [loading, token])

  if (loading) return <Loader label="Loading Products, Please Wait" />

  return (
    <Box>
      <Grid container spacing={3}>
        {data?.map((item, i) => (
          <Grid key={i} item xs={12} sm={6} md={4}>
            <Box sx={{ border: '1px solid #ccc' }}>
              <Box
                sx={{
                  img: {
                    width: '100%',
                    height: '100%',
                    objectPosition: 'center',
                    objectFit: 'cover'
                  }
                }}
                height={260}
              >
                <img src={getImageUrl(item.image)} alt="" />
              </Box>
              <Box p="1rem">
                <Typography fontWeight={600} fontSize={'1rem'} variant="h4">
                  {item.productName}
                </Typography>
                <Typography
                  color="#555"
                  mb={'0.5rem'}
                  fontSize={'0.85rem'}
                  variant="subtitle1"
                >
                  {item.description}
                </Typography>
                <Box
                  display={'flex'}
                  justifyContent="space-between"
                  alignItems={'center'}
                  my="1rem"
                >
                  <Typography variant="h6" fontSize={'0.85rem'}>
                    Price: UGX {item.price} / {item.unit}
                  </Typography>
                  <Rating
                    size="small"
                    readOnly
                    value={item.rating}
                    precision={0.5}
                  />
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default Listing
