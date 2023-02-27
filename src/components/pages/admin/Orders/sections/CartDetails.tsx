// Importing helper modules
import propTypes from 'prop-types'
import { type Cart } from './TableData'

// Importing core components
import { Box, Modal, Typography } from '@mui/material'

type CloseFunction = () => void;

interface CartDetailsProps {
  cart: Cart | null;
  closeModal: CloseFunction;
}

const CartDetails: React.FC<CartDetailsProps> = ({ cart, closeModal }) => {
  return (
    <Modal open={Boolean(cart)} onClose={closeModal}>
      <Box
        sx={{
          position: 'absolute' as const,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          bgcolor: '#fff',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography fontSize={'1.2rem'} variant="h6" component="h2">
          Items Orders({cart?.items.length})
        </Typography>
        {cart?.items.map((item) => (
          <Box
            key={item.productName}
            sx={{
              p: '1rem',
              my: '0.5rem',
              bgcolor: '#f4f4f4',
            }}
          >
            <Typography
              variant="subtitle1"
              fontWeight={700}
              fontSize={'0.8rem'}
            >
              {item.productName}
            </Typography>
            <Typography
              fontSize={'0.8rem'}
              fontWeight={400}
            >
              Quantity Ordered - {item.quantity} {item.unit}
            </Typography>
            <Typography
              fontSize={'0.8rem'}
              fontWeight={400}
            >
              Price Per {item.unit} - Ugx {item.price / item.quantity} 
            </Typography>
          </Box>
        ))}
        <Typography fontSize={'0.9rem'} sx={{ mt: 2 }}>
          Total Cost: Ugx{' '}
          <span style={{ fontWeight: 600 }}>{cart?.totalPrice}</span>
        </Typography>
      </Box>
    </Modal>
  )
}

CartDetails.propTypes = {
  cart: propTypes.any.isRequired,
  closeModal: propTypes.func.isRequired,
}

export default CartDetails
