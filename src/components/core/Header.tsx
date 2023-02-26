// Importing helper modules
import generateRoutes, { type AppRoute } from 'src/utils/routes'
import { type ShopState } from 'src/context/shopSlice'
import { useSelector } from 'react-redux'
import propTypes from 'prop-types'

// Importing core components
import {
  Box,
  Container,
  type CSSObject,
  IconButton,
  ListItemButton,
  ListItemText,
  Badge
} from '@mui/material'
import { Link } from 'react-router-dom'
import { Menu, ShoppingCart } from '@mui/icons-material'

type PlainFunction = () => void

interface HeaderProps {
  openSidebar: PlainFunction
}

const Header: React.FC<HeaderProps> = ({ openSidebar }) => {
  const { cart } = useSelector((state: { shop: ShopState }) => state.shop)

  // Generating routes
  const routes: AppRoute[] = generateRoutes().filter(
    (item) => !item.isAdminRoute
  )

  const centerStyles: CSSObject = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }

  return (
    <Box
      sx={{
        height: 75,
        zIndex: 2,
        width: '100vw',
        position: 'fixed',
        bgcolor: 'background.paper'
      }}
    >
      <Container maxWidth='lg'>
        <Box
          sx={{
            ...centerStyles,
            img: { height: 70 }
          }}
        >
          <img src={'/logo.png'} alt='logo' />
          <Box
            sx={{
              ...centerStyles,
              display: { xs: 'none', sm: 'none', md: 'flex' }
            }}
          >
            {routes.map((item) => (
              <ListItemButton key={item.title}>
                <Link to={item.path}>
                  {item.path === '/cart'
                    ? (
                    <Badge color='primary' badgeContent={cart.length}>
                      <ShoppingCart htmlColor="#fff" />
                    </Badge>
                      )
                    : (
                    <ListItemText
                      primary={item.title}
                      primaryTypographyProps={{ color: '#fff' }}
                    />
                      )}
                </Link>
              </ListItemButton>
            ))}
          </Box>
          <IconButton
            sx={{
              display: { xs: 'block', sm: 'block', md: 'none' }
            }}
            aria-label="menu-button"
            onClick={() => { openSidebar() }}
          >
            <Menu htmlColor="#fff" />
          </IconButton>
        </Box>
      </Container>
    </Box>
  )
}

Header.propTypes = {
  openSidebar: propTypes.func.isRequired
}

export default Header
