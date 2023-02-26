// Importing helper functions
import propTypes from 'prop-types'

// Importing core components
import {
  AttachMoneyOutlined,
  CheckCircleOutlineOutlined,
  PendingActionsOutlined,
  ShoppingCartOutlined
} from '@mui/icons-material'
import { Box, Grid, Typography } from '@mui/material'

interface CartProps {
  title: string
  count: number | string
  Icon: any
}

const Card: React.FC<CartProps> = ({ title, count, Icon }) => (
  <Box
    p="1rem"
    sx={{
      height: 120,
      display: 'flex',
      bgcolor: '#fbfbfb',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 18px 24px #0000001f'
    }}
  >
    <Icon htmlColor="royalblue" sx={{ fontSize: '3.5rem' }} />
    <Box>
      <Typography
        textAlign={'right'}
        variant="h5"
        fontWeight={600}
        fontSize={'1rem'}
      >
        {title}
      </Typography>
      <Typography textAlign={'right'} variant="subtitle1" color="royalblue">
        {count}
      </Typography>
    </Box>
  </Box>
)

Card.propTypes = {
  title: propTypes.string.isRequired,
  count: propTypes.number.isRequired,
  Icon: propTypes.any.isRequired
}

const Cards: React.FC = () => {
  const slots: CartProps[] = [
    {
      title: 'Products',
      Icon: ShoppingCartOutlined,
      count: 200
    },
    {
      title: 'Total Sales',
      Icon: AttachMoneyOutlined,
      count: 'UGX - 40000'
    },
    {
      title: 'Pending Orders',
      Icon: PendingActionsOutlined,
      count: 2
    },
    {
      title: 'Fullfilled Orders',
      Icon: CheckCircleOutlineOutlined,
      count: 5
    }
  ]
  // const result = formatMoney(1000);
  // console.log(result);

  return (
    <Grid container spacing={2}>
      {slots.map((item, i) => (
        <Grid item key={i} xs={12} sm={6} md={3}>
          <Card {...item} />
        </Grid>
      ))}
    </Grid>
  )
}

export default Cards
