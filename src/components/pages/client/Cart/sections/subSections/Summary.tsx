/* eslint-disable @typescript-eslint/no-explicit-any */
// Importing helper functions
import { api } from 'src/utils/modules'
import { type CartItem, clearCart } from 'src/context/shopSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import propTypes from 'prop-types'

// Importing core components
import {
  LocationCityOutlined,
  MonetizationOnOutlined,
  Person,
  PhoneAndroidOutlined,
} from '@mui/icons-material'
import {
  Box,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material'
import { Spinner } from 'react-activity'
import { type AxiosResponse } from 'axios'
import { Store } from 'react-notifications-component'
import { notificationsTheme } from 'src/utils/theme'

// Function Interface
type PlainFunction = (value: boolean) => void;

// Defining Component Props
interface SummaryProps {
  form: Record<string, string>;
  cart: CartItem[];
  totalPrice: number;
  loading: boolean;
  setLoading: PlainFunction;
}

const Summary: React.FC<SummaryProps> = ({
  form,
  cart,
  totalPrice,
  loading,
  setLoading,
}) => {
  // Function to trigger action on global state
  const dispatch = useDispatch()

  // Function for navigation
  const navigate = useNavigate()

  // Place order function
  function placeOrder(): void {
    // Start loading
    setLoading(true)

    // Generating paylaod
    const payload: any = {
      ...form,
      totalPrice,
      cart,
    }

    //Sending order request to backend
    api
      .post('/orders', payload)
      .then((res: AxiosResponse) => {
        //Showing success notification
        Store.addNotification({
          ...notificationsTheme,
          type: 'success',
          title: 'Done',
          message: res.data,
          //Clearing cart once the notification has been removed
          onRemoval: () => {
            dispatch(clearCart(null))
            navigate('/')
          },
        })
      })
      .catch((err: any) => {
        // Showing error notification
        Store.addNotification({
          ...notificationsTheme,
          type: 'danger',
          title: 'Error',
          message: err.response.data,
        })
      })
      .finally(() => {
        // Stopping loading once promise has resolved
        setLoading(false)
      })
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
                secondary={form.phoneNumber}
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
                bgcolor: '#f4f4f4',
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

// Components PropTypes
Summary.propTypes = {
  form: propTypes.any.isRequired,
  cart: propTypes.array.isRequired,
  loading: propTypes.bool.isRequired,
  setLoading: propTypes.func.isRequired,
  totalPrice: propTypes.number.isRequired,
}

export default Summary
