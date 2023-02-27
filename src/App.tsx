//  Importing helper fucntion
import { api } from './utils/modules'
import { type AuthState, authSuccess } from './context/authSlice'
import { type AxiosResponse } from 'axios'
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { initCart } from './context/shopSlice'
import { ReactNotifications } from 'react-notifications-component'
import { useDispatch, useSelector } from 'react-redux'
import React, { useMemo, useEffect, useCallback } from 'react'
import generateRoutes, { type AppRoute } from './utils/routes'

const App: React.FC = () => {
  // Function to dispatch actions
  const dispatch = useDispatch()

  // Navigation function
  const navigate = useNavigate()

  // Getting current path
  const { pathname } = useLocation()

  // Getting current authentication state
  const { isAuthenticated } = useSelector(
    (state: { auth: AuthState }) => state.auth
  )

  // Generate path to redirect user to
  const redirectPath: string = useMemo(() => {
    if (pathname.startsWith('/admin')) {
      return '/admin'
    } else return '/'
  }, [pathname])

  // Generating routes depending on authentication state
  const routes: AppRoute[] = useMemo(
    () => generateRoutes(isAuthenticated),
    [isAuthenticated]
  )

  const initializeApp = useCallback(() => {
    dispatch(initCart(null))
    // Getting token from localstorage
    const token: string | null = localStorage.getItem('authToken')

    // Saving current path
    const currentPath: string = pathname

    if (token !== null) {
      const parsedToken = JSON.parse(token)
      api
        .get('auth/status', { headers: { Authorization: parsedToken } })
        .then((res: AxiosResponse) => {
          if (res.data === true) {
            dispatch(authSuccess(parsedToken))
          } else {
            if(currentPath.startsWith('/admin')){
              navigate('/admin')
            }
            localStorage.removeItem('authToken')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [dispatch])

  useEffect(() => {
    initializeApp()
    const interval = setInterval(() => {
      initializeApp()
    }, 10000)

    return () => {
      clearInterval(interval)
    }
  }, [initializeApp])

  return (
    <>
      <ReactNotifications />
      <Routes>
        {routes.map((item) => {
          if (item.nested != null) {
            return (
              <Route key={item.title} path={item.path} element={item.component}>
                {item.nested.map((item) => (
                  <Route
                    key={item.title}
                    path={item.path}
                    element={item.component}
                  />
                ))}
              </Route>
            )
          } else {
            return (
              <Route
                key={item.title}
                path={item.path}
                element={item.component}
              />
            )
          }
        })}
        <Route path="*" element={<Navigate to={redirectPath} />} />
      </Routes>
    </>
  )
}

export default App
