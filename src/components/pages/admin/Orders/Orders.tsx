// Importing helper functions
import { api } from 'src/utils/modules'
import { type AuthState } from 'src/context/authSlice'
import { AxiosError, type AxiosResponse } from 'axios'
import { type CartItem } from 'src/context/shopSlice'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'

// importing core components
import { Container } from '@mui/material'
import { Store } from 'react-notifications-component'
import { notificationsTheme } from 'src/utils/theme'
import Layout from '../core/Layout'
import Loader from 'src/components/ui/Loader'
import OrderListing from './sections/Listing'
import NoData from 'src/components/ui/NoData'

// Different statuses of an order
export type OrderStatus = 'APPROVED' | 'REJECTED' | 'COMPLETED' | 'PENDING';

// Order data fields
export interface Order {
  _id: string;
  name: string;
  phoneNumber: string;
  orderStatus: OrderStatus;
  totalPrice: number;
  location: string;
  cart: CartItem[];
}

// Orders api response data fields
export interface Orders {
  approved: Order[];
  pending: Order[];
  completed: Order[];
  rejected: Order[];
  total: number;
}

const Orders: React.FC = () => {
  // Getting auth token
  const { token } = useSelector((state: { auth: AuthState }) => state.auth)
  // State to handle stock items
  const [data, setData] = useState<Orders | null>(null)
  // State to handle loading
  const [loading, setLoading] = useState<boolean>(true)

  // Fetching data on pageload
  useEffect(() => {
    /* Checking if we are loading, inorder
       to be able to refetch data when needed */
    if (loading) {
      api
        .get('/orders', { headers: { Authorization: token } })
        .then((res: AxiosResponse) => {
          setData(res.data)
        })
        .catch((err: AxiosError) => {
          Store.addNotification({
            ...notificationsTheme,
            type: 'danger',
            title: 'Error',
            message: err.message,
          })
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [loading, token])

  return (
    <Layout>
      <Container maxWidth="xl">
        {loading ? (
          <Loader label="Loading Products, Please Wait" />
        ) : (
          <>
            {data && data.total > 0 && (
              <OrderListing
                data={data}
                refetch={(value) => setLoading(value)}
              />
            )}
            {data?.total === 0 && (
              <NoData
                label="No Data Available"
                refetch={(value) => setLoading(value)}
              />
            )}
          </>
        )}
      </Container>
    </Layout>
  )
}

export default Orders
