// Importing helper modules
import { api, getImageUrl } from 'src/utils/modules'
import { type AuthState } from 'src/context/authSlice'
import { type AxiosResponse } from 'axios'
import { type ShopItem } from 'src/context/shopSlice'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'

// Importing core components
import { Box, Button, Grid, Rating, Typography } from '@mui/material'
import { notificationsTheme } from 'src/utils/theme'
import { Store } from 'react-notifications-component'
import Loader from 'src/components/ui/Loader'
import NoData from 'src/components/ui/NoData'

const Listing: React.FC = () => {
  // Getting auth token
  const { token } = useSelector((state: { auth: AuthState }) => state.auth)
  // State to handle stock items
  const [data, setData] = useState<ShopItem[] | null>(null)
  // State to handle loading
  const [loading, setLoading] = useState<string>(
    'Loading Products Please Wait'
  )

  // Fetching data on pageload
  useEffect(() => {
    if (loading) {
      api
        .get('/products', { headers: { Authorization: token } })
        .then((res: AxiosResponse) => {
          setData(res.data)
        })
        .catch((err) => {
          const erroMessage: string = err.response
            ? err.response.data
            : err.message
          Store.addNotification({
            ...notificationsTheme,
            type: 'danger',
            title: 'Error',
            message: erroMessage,
          })
        })
        .finally(() => {
          setLoading('')
        })
    }
  }, [loading, token])

  // Function to update stock
  function updateStock(id: string | undefined) {
    if (id) {
      const newStockValue: string | null = window.prompt(
        'Enter new stock value'
      )
      if (newStockValue) {
        const newStock: number | undefined = parseInt(newStockValue)
        if (newStock) {
          //Start loading
          setLoading('Updating Stock, Please Wait')
          //Sending credentials to backend for authentication
          api
            .patch(
              '/products',
              { _id: id, newStock },
              {
                headers: { Authorization: token },
              }
            )
            .then((res: AxiosResponse) => {
              Store.addNotification({
                ...notificationsTheme,
                type: 'success',
                title: 'Done',
                message: res.data,
                onRemoval: () => setLoading(''),
              })
            })
            .catch((err) => {
              const erroMessage: string = err.response
                ? err.response.data
                : err.message
              Store.addNotification({
                ...notificationsTheme,
                type: 'danger',
                title: 'Error',
                message: erroMessage,
              })
            })
            .finally(() => {
              //Stop loading
              setLoading('')
            })
        } else window.alert('Enter a valid amount')
      }
    }
  }

  return (
    <Box>
      {loading ? (
        <Loader label="Loading Products, Please Wait" />
      ) : (
        <>
          <Grid container spacing={3}>
            {data ? (
              data.map((item, i) => (
                <Grid key={i} item xs={12} sm={6} md={4}>
                  <Box sx={{ border: '1px solid #ccc' }}>
                    <Box
                      sx={{
                        img: {
                          width: '100%',
                          height: '100%',
                          objectPosition: 'center',
                          objectFit: 'cover',
                        },
                      }}
                      height={260}
                    >
                      <img src={getImageUrl(item.image)} alt="" />
                    </Box>
                    <Box p="1rem">
                      <Typography
                        fontWeight={600}
                        fontSize={'1rem'}
                        variant="h4"
                      >
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
                      <Typography variant="h6" fontSize={'0.85rem'}>
                        Stock Left: {item.stock} {item.unit}
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
                      <Button fullWidth onClick={() => updateStock(item._id)}>
                        Update Stock
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              ))
            ) : (
              <NoData
                label="No Data Available"
                refetch={() => setLoading('Loading Products, Please Wait')}
              />
            )}
          </Grid>
        </>
      )}
    </Box>
  )
}

export default Listing
