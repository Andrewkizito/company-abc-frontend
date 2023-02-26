// Importing helper functions
import { api } from 'src/utils/modules'
import { type CartItem, clearCart } from 'src/context/shopSlice'
import { useDispatch } from 'react-redux'
import propTypes from 'prop-types'

// Importing core components
import {
  LocationCityOutlined,
  MonetizationOnOutlined,
  Person,
  PhoneAndroidOutlined
} from '@mui/icons-material'
import {
  Box,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@mui/material'
import { Spinner } from 'react-activity'
import { type AxiosResponse } from 'axios'
import { Store } from 'react-notifications-component'
import { notificationsTheme } from 'src/utils/theme'

type PlainFunction = (value: boolean) => void

interface SummaryProps {
  form: Record<string, string>
  cart: CartItem[]
  totalPrice: number
  loading: boolean
  setLoading: PlainFunction
}

const Summary: React.FC<SummaryProps> = ({
  form,
  cart,
  totalPrice,
  loading,
  setLoading
}) => {
  const dispatch = useDispatch()

  function placeOrder (): void {
    const payload: any = {
      ...form,
      totalPrice,
      cart
    }

    api.post('/orders', payload).then((res: AxiosResponse) => {
      console.log(res)
    }).catch((err: any) => {
      Store.addNotification({
        ...notificationsTheme,
        type: 'danger',
        title: 'Error',
        message: err.message
      })
      dispatch(clearCart(null))
    }).finally(() => { setLoading(true) })
  }

  return (
    <Box py="1rem">
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={12} md={6}>
          <List>
            <ListItem>
              <IconButton>
                <Person />
              </IconButton>
              <ListItemText primary={'Your Name'} secondary={form.name} />
            </ListItem>
            <ListItem>
              <IconButton>
                <PhoneAndroidOutlined />
              </IconButton>
              <ListItemText
                primary={'Phone Number'}
                secondary={form.phone_number}
              />
            </ListItem>
            <ListItem>
              <IconButton>
                <LocationCityOutlined />
              </IconButton>
              <ListItemText primary={'Location'} secondary={form.location} />
            </ListItem>
            <ListItem>
              <IconButton>
                <MonetizationOnOutlined />
              </IconButton>
              <ListItemText
                primary={'Total Cost'}
                secondary={`Ugx - ${totalPrice}`}
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Typography variant="h6" fontWeight={500}>
            Order Summary
          </Typography>
          {cart.map((item, i) => (
            <Box
              key={i}
              sx={{
                p: '1rem',
                my: '0.5rem',
                bgcolor: '#f4f4f4'
              }}
            >
              <Box>
                <Typography
                  variant="subtitle1"
                  fontWeight={700}
                  fontSize={'0.8rem'}
                >
                  {item.productName}({item.quantity} {item.unit})
                </Typography>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  color="success.main"
                  fontSize={'0.8rem'}
                >
                  UGX {totalPrice}
                </Typography>
              </Box>
            </Box>
          ))}
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Button
            fullWidth
            variant="contained"
            sx={{ textTransform: 'capitalize' }}
            onClick={placeOrder}
            disabled={loading}
            endIcon={
              loading && (
                <Spinner color="#fff" size={10} speed={1} animating={true} />
              )
            }
          >
            {loading ? 'Placing order' : 'Place order'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

Summary.propTypes = {
  form: propTypes.any.isRequired,
  cart: propTypes.array.isRequired,
  loading: propTypes.bool.isRequired,
  setLoading: propTypes.func.isRequired,
  totalPrice: propTypes.number.isRequired
}

export default Summary
