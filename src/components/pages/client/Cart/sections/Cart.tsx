// Importing helper functions
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  clearCart,
  increaseItemQuantity,
  reduceItemQuantity,
  type ShopState,
  removeItemFromCart
} from 'src/context/shopSlice'

// Importing core components
import { Add, Delete, Remove } from '@mui/icons-material'
import { Box, Button, Container, IconButton, Typography } from '@mui/material'
import Checkout from './Checkout'

const Cart: React.FC = () => {
  // Intialising dispatch and navigate function.
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Getting cart from redux store.
  const { cart } = useSelector((state: { shop: ShopState }) => state.shop)

  function clearAllItemInCart (): void {
    if (window.confirm('Clear All Items In Cart')) {
      dispatch(clearCart(null))
    }
  }

  return (
    <Box py="2rem">
      <Container maxWidth="lg">
        <Typography variant="h5" mb={'1rem'}>
          Items In Your Cart.({cart.length})
        </Typography>
        {cart.length > 0
          ? (
          <Box>
            {cart.map((item, i) => (
              <Box
                key={i}
                my={'0.4rem'}
                p={'1rem'}
                bgcolor={'#f1efef'}
                display="flex"
                justifyContent="space-between"
              >
                <Box>
                  <Typography variant="h5" fontWeight={700} fontSize={'0.9rem'}>
                    {item.productName}
                  </Typography>
                  <Typography
                    variant="body1"
                    fontWeight={600}
                    fontSize={'0.9rem'}
                  >
                    Quantity: {item.quantity} {item.unit}
                  </Typography>
                  <Typography
                    variant="body1"
                    fontWeight={600}
                    fontSize={'0.9rem'}
                    mb={'1rem'}
                  >
                    Price: UGX {item.price}
                  </Typography>
                  <Button
                    onClick={() =>
                      dispatch(removeItemFromCart(item.productName))
                    }
                    color="error"
                    size="small"
                    sx={{ textTransform: 'capitalize' }}
                    startIcon={<Delete fontSize="small" />}
                  >
                    Delete Item
                  </Button>
                </Box>
                <Box mt="1rem">
                  <IconButton
                    color="success"
                    onClick={() =>
                      dispatch(
                        increaseItemQuantity({
                          productName: item.productName,
                          quantity: 1
                        })
                      )
                    }
                  >
                    <Add />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() =>
                      dispatch(
                        reduceItemQuantity({
                          productName: item.productName,
                          quantity: 1
                        })
                      )
                    }
                  >
                    <Remove />
                  </IconButton>
                </Box>
              </Box>
            ))}
            <Button
              onClick={clearAllItemInCart}
              color="error"
              variant="contained"
              sx={{ textTransform: 'capitalize' }}
            >
              Clear Cart
            </Button>
            <Checkout cart={cart} />
          </Box>
            )
          : (
          <Box>
            <Typography variant="h6">No Items In Your Cart.</Typography>
            <Button onClick={() => { navigate('/') }} variant="contained">
              Start Shopping
            </Button>
          </Box>
            )}
      </Container>
    </Box>
  )
}

export default Cart
