/* eslint-disable @typescript-eslint/no-explicit-any */
// Importing helper functions
import propTypes from 'prop-types'

// Importing core components
import { Box, Grid, Typography } from '@mui/material'

export interface CartProps {
  title: string
  count: number | string
  icon: any
}

const Card: React.FC<CartProps> = ({ title, count, icon }) => (
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
    {icon}
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
  count: propTypes.oneOfType([propTypes.string,propTypes.number]).isRequired,
  icon: propTypes.any.isRequired
}

const Cards: React.FC<{slots: CartProps[]}> = ({slots}) => {

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

Cards.propTypes = {
    slots: propTypes.array.isRequired
}

export default Cards
