// Importing helper functions
import generateRoutes, { type AppRoute } from 'src/utils/routes'
import { useSelector } from 'react-redux'
import { type ShopState } from 'src/context/shopSlice'
import propTypes from 'prop-types'

// Importing core components
import {
  Box,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Badge
} from '@mui/material'
import { CloseOutlined, ShoppingCart } from '@mui/icons-material'
import { Link } from 'react-router-dom'

type PlainFunction = () => void
interface SidebarProps {
  visible: boolean
  closeSideBar: PlainFunction
}

const Sidebar: React.FC<SidebarProps> = ({
  visible,
  closeSideBar
}) => {
  const { cart } = useSelector((state: { shop: ShopState }) => state.shop)
  const routes: AppRoute[] = generateRoutes().filter(
    (item) => !item.isAdminRoute
  )

  return (
    <Box
      aria-label="sidebar"
      aria-hidden={visible}
      width={300}
      height={'100vh'}
      sx={{
        right: 0,
        zIndex: 3,
        p: '1rem',
        position: 'fixed',
        transform: visible ? 'translateX(0%)' : 'translateX(100%)',
        transition: 'all 0.5s'
      }}
      bgcolor="background.paper"
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexDirection: 'row'
        }}
      >
        <List>
          {routes.map((item) => (
            <ListItemButton key={item.path}>
              <Link to={item.path}>
                {item.path === '/cart'
                  ? (
                  <Badge
                    variant="standard"
                    color="primary"
                    badgeContent={cart.length}
                  >
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
        </List>
        <IconButton
          aria-label="close-sidebar"
          size="small"
          onClick={() => { closeSideBar() }}
        >
          <CloseOutlined color="error" />
        </IconButton>
      </Box>
    </Box>
  )
}

Sidebar.propTypes = {
  visible: propTypes.bool.isRequired,
  closeSideBar: propTypes.func.isRequired
}

export default Sidebar
