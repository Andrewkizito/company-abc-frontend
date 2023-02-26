// Importing core components
import { Menu, Notifications } from '@mui/icons-material'
import { Avatar, Badge, Box, IconButton, Typography } from '@mui/material'

const Header: React.FC = () => {
  return (
    <Box
      right={0}
      padding="1rem"
      height={'70px'}
      position={'fixed'}
      width={'calc(100vw - 280px)'}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <IconButton>
          <Menu />
        </IconButton>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Badge badgeContent={5} color="primary">
            <Notifications htmlColor="#555" />
          </Badge>
          <Avatar sx={{ bgcolor: 'royalblue', ml: '2rem' }}>
            <Typography variant="body1" color="#fff">
              A
            </Typography>
          </Avatar>
        </Box>
      </Box>
    </Box>
  )
}

export default Header
