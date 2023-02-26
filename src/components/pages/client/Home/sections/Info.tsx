// Importing core components
import { Box, Container, Grid, Typography } from '@mui/material'
import Slot, { type SlotProps } from 'src/components/ui/Slot'

const slots: SlotProps[] = [
  {
    title: 'Find Products',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc luctus, turpis vel rutrum condimentum..',
    icon: '/icons/shopping.png'
  },
  {
    title: 'Checkout',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc luctus, turpis vel rutrum condimentum..',
    icon: '/icons/order.png'
  },
  {
    title: 'Order Fullfilment',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc luctus, turpis vel rutrum condimentum..',
    icon: '/icons/package.png'
  },
  {
    title: 'Delivery',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc luctus, turpis vel rutrum condimentum..',
    icon: '/icons/delivery.png'
  }
]

const Info: React.FC = () => {
  return (
    <Box py={'3rem'}>
      <Container maxWidth="lg">
        <Typography
          textAlign={'center'}
          variant="h4"
          sx={{
            '::after': {
              content: "' '",
              display: 'block',
              height: 3,
              width: 100,
              bgcolor: 'primary.main',
              margin: '0.5rem auto'
            }
          }}
        >
          How It Works.
        </Typography>
        <Typography m="0.5rem auto" maxWidth={600} variant="body1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc luctus,
          turpis vel rutrum condimentum, nunc ante porta velit, id pharetra nunc
          odio dignissim arcu.
        </Typography>
        <Grid container spacing={2} mt={'1rem'}>
          {slots.map((item, i) => (
            <Grid key={i} item xs={12} sm={6} md={3} lg={3}>
              <Slot
                title={`${i + 1}. ${item.title}`}
                description={item.description}
                icon={item.icon}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default Info
