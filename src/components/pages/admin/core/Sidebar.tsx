// Importing core components
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography
} from '@mui/material'
import { Link, useLocation } from 'react-router-dom'

const Sidebar: React.FC = () => {
  // Paths
  const routes: Array<{ title: string, path: string }> = [
    {
      title: 'Products',
      path: '/admin'
    },
    {
      title: 'Orders',
      path: '/admin/orders'
    }
  ]

  // current path
  const { pathname } = useLocation()

  return (
    <Box
      left={0}
      width={280}
      height={'100vh'}
      bgcolor="#1f1e22"
      position={'fixed'}
      p={'0.5rem 1rem'}
    >
      <Typography py="0.5rem" textAlign={'center'} variant="h6" color="#fff">
        ABC
      </Typography>
      <List>
        {routes.map((item, i) => (
          <Link to={item.path} key={i}>
            <ListItemButton
              sx={{
                borderRadius: 1,
                bgcolor: item.path === pathname ? 'primary.main' : 'inherit'
              }}
            >
              <ListItemText
                primary={item.title}
                primaryTypographyProps={{
                  color: '#fff',
                  fontWeight: 300,
                  fontSize: '0.9rem'
                }}
              />
            </ListItemButton>
          </Link>
        ))}
      </List>
    </Box>
  )
}

export default Sidebar
