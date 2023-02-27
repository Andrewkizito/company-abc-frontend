// Importing helper modules
import { getImageUrl } from 'src/utils/modules'
import { useDispatch } from 'react-redux'
import propTypes from 'prop-types'

// Importing core components
import { Box, Button, Rating, Typography } from '@mui/material'
import { addItemToCart, type ShopItem } from 'src/context/shopSlice'

const Product: React.FC<ShopItem> = ({
  productName,
  description,
  price,
  rating,
  image,
  unit,
  stock
}) => {
  // Function to dispatch actions
  const dispatch = useDispatch()

  return (
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
        <img src={getImageUrl(image)} alt=""/>
      </Box>
      <Box p="1rem">
        <Typography fontWeight={600} fontSize={'1rem'} variant="h4">
          {productName}
        </Typography>
        <Typography
          color="#555"
          mb={'0.5rem'}
          fontSize={'0.85rem'}
          variant="subtitle1"
        >
          {description}
        </Typography>
        <Box
          display={'flex'}
          justifyContent="space-between"
          alignItems={'center'}
          my="1rem"
        >
          <Typography variant="h6" fontSize={'0.85rem'}>
            Price: UGX {price} / {unit}
          </Typography>
          <Rating size="small" readOnly value={rating} precision={0.5} />
        </Box>
        <Button
          onClick={() =>
            {
              if(stock > 0){
                dispatch(
                  addItemToCart({
                    productName,
                    price,
                    quantity: 1,
                    unit
                  })
                )
              }
            }
          }
          disabled={stock < 1}
          variant="contained"
          fullWidth
        >
          {stock < 1 ? 'Out Of Stock' : 'Add To Cart'}
        </Button>
      </Box>
    </Box>
  )
}

Product.propTypes = {
  productName: propTypes.string.isRequired,
  description: propTypes.string.isRequired,
  price: propTypes.number.isRequired,
  rating: propTypes.number.isRequired,
  image: propTypes.string.isRequired,
  unit: propTypes.string.isRequired,
  stock: propTypes.number.isRequired
}

export default Product
