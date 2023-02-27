// Importing helper modules
import { type ReactElement } from 'react'

// Importing client pages
import Home from 'src/components/pages/client/Home/Root'
import Cart from 'src/components/pages/client/Cart/Root'

// Importing admin pages
import Login from 'src/components/pages/admin/Login/Login'
import AdminRoot from 'src/components/pages/admin/Root'
import Products from 'src/components/pages/admin/Products/Products'
import Orders from 'src/components/pages/admin/Orders/Orders'

export interface AppRoute {
  title: string;
  path: string;
  component: ReactElement;
  isAdminRoute: boolean;
  nested?: Array<{
    title: string;
    path: string;
    component: ReactElement;
  }>;
}

function generateRoutes(isAuthenticated = false): AppRoute[] {
  const routes: AppRoute[] = [
    {
      title: 'Shop',
      path: '/',
      component: <Home />,
      isAdminRoute: false,
    },
    {
      title: 'Cart',
      path: '/cart',
      component: <Cart />,
      isAdminRoute: false,
    },
    {
      title: 'Admin',
      path: '/admin',
      component: <AdminRoot />,
      isAdminRoute: true,
      nested: !isAuthenticated
        ? [
            {
              title: 'Login',
              path: '',
              component: <Login />,
            },
          ]
        : [
            {
              title: 'Products',
              path: '',
              component: <Products />,
            },

            {
              title: 'Orders',
              path: 'orders',
              component: <Orders />,
            },
          ],
    },
  ]
  return routes
}

export default generateRoutes
