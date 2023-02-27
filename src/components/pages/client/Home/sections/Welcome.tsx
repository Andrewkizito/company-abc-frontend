// Importing core components
import { Box, Button, Container, Grid, Typography } from '@mui/material'

const Welcome: React.FC = () => {
  return (
    <Box
      height={600}
      sx={{
        backgroundImage:
          'linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url(\'/bg.jpg\')',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Container maxWidth="lg">
        <Grid container>
          <Grid item sm={12} md={6} lg={7}>
            <Typography
              color={'primary.main'}
              variant="h3"
              fontSize={{ xs: '1.5rem', sm: '2rem', md: '3rem' }}
            >
              Taking Farming To The Next Level.
            </Typography>
            <Typography color="#fff" mb={'2rem'} variant="body1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              luctus, turpis vel rutrum condimentum, nunc ante porta velit, id
              pharetra nunc odio dignissim arcu. Etiam id semper mi. Mauris
              placerat felis ipsum, a finibus erat accumsan pellentesque.
            </Typography>
            <Button
              size="large"
              variant="contained"
              sx={{ textTransform: 'capitalize', width: 200, mr: '1rem' }}
            >
              Place Order
            </Button>
            <Button
              color="inherit"
              size="large"
              variant="contained"
              sx={{
                textTransform: 'capitalize',
                width: 200,
                mt: { xs: 2, sm: 2, md: 0 }
              }}
            >
              Track Order
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Welcome
