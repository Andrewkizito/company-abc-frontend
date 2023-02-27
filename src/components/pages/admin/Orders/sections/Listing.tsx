// Importing helper functions
import { api } from 'src/utils/modules'
import { AuthState } from 'src/context/authSlice'
import { AxiosResponse } from 'axios'
import { CartItem } from 'src/context/shopSlice'
import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import propTypes from 'prop-types'

// Importing core components
import { AppBar, Box, Tab, Tabs, Typography } from '@mui/material'
import { Order, Orders, OrderStatus } from '../Orders'
import { Store } from 'react-notifications-component'
import { notificationsTheme } from 'src/utils/theme'
import Cards, { CartProps } from './Cards'
import Loader from 'src/components/ui/Loader'
import TableData from './TableData'
import {
  AttachMoneyOutlined,
  CheckCircleOutlineOutlined,
  DoNotDisturb,
  PendingActionsOutlined,
} from '@mui/icons-material'
import NoData from 'src/components/ui/NoData'

type RefetchFunction = (value: boolean) => void;

interface OrderListingProps {
  data: Orders;
  refetch: RefetchFunction;
}

type ApproveOrderPayload = {
  _id: string;
  name: string;
  totalPrice: number;
  cart: CartItem[];
  phoneNumber: string;
};

type RejectOrderPayload = {
  _id: string;
  name: string;
  reason: string;
  cart: CartItem[];
  phoneNumber: string;
};

const OrderListing: React.FC<OrderListingProps> = ({ data, refetch }) => {
  // Get Auth token
  const { token } = useSelector((state: { auth: AuthState }) => state.auth)

  // State to control tabs
  const [value, setValue] = useState<number>(0)

  // Loading state
  const [loading, setLoading] = useState<string>('')

  // UI Tabs to hold orders
  const tabs: OrderStatus[] = ['APPROVED', 'REJECTED', 'COMPLETED']

  // Data mapping
  const dataMapping: { [key: number]: OrderStatus } = {
    0: 'PENDING',
    1: 'APPROVED',
    2: 'REJECTED',
    3: 'COMPLETED',
  }

  // Generating data depending on active step
  const currentDataSet: Order[] = useMemo(() => {
    const currentData =
      data[dataMapping[value].toLowerCase() as keyof typeof data]
    if (typeof currentData === 'number') {
      return []
    }
    return currentData
  }, [value])

  //Approve Order function
  function approveOrder(id: string): void {
    const item: Order = data.pending.filter((item) => item._id === id)[0]
    const payload: ApproveOrderPayload = {
      _id: item._id,
      name: item.name,
      totalPrice: item.totalPrice,
      phoneNumber: item.phoneNumber,
      cart: item.cart,
    }
    // Checking if form only includes valid values
    const isPayloadValid = !Object.values(payload).includes('')
    if (isPayloadValid) {
      //Start loading
      setLoading('Approving Order, Please Wait')
      //Sending credentials to backend for authentication
      api
        .patch('orders/approve', payload, { headers: { Authorization: token } })
        .then((res: AxiosResponse) => {
          Store.addNotification({
            ...notificationsTheme,
            type: 'success',
            title: 'Done',
            message: res.data,
            onRemoval: () => refetch(true),
          })
        })
        .catch((err) => {
          const erroMessage: string = err.response
            ? err.response.data
            : err.message
          Store.addNotification({
            ...notificationsTheme,
            type: 'danger',
            title: 'Error',
            message: erroMessage,
          })
        })
        .finally(() => {
          //Stop loading
          setLoading('')
        })
    }
  }

  // Reject Order function
  function rejectOrder(id: string, reason: string): void {
    const item: Order = data.pending.filter((item) => item._id === id)[0]
    const payload: RejectOrderPayload = {
      _id: item._id,
      name: item.name,
      phoneNumber: item.phoneNumber,
      cart: item.cart,
      reason: reason,
    }
    // Checking if form only includes valid values
    const isPayloadValid = !Object.values(payload).includes('')
    if (isPayloadValid) {
      //Start loading
      setLoading('Rejecting Order, Please Wait')
      //Sending credentials to backend for authentication
      api
        .patch('orders/reject', payload, { headers: { Authorization: token } })
        .then((res: AxiosResponse) => {
          Store.addNotification({
            ...notificationsTheme,
            type: 'success',
            title: 'Done',
            message: res.data,
            onRemoval: () => refetch(true),
          })
        })
        .catch((err) => {
          const erroMessage: string = err.response
            ? err.response.data
            : err.message
          Store.addNotification({
            ...notificationsTheme,
            type: 'danger',
            title: 'Error',
            message: erroMessage,
          })
        })
        .finally(() => {
          //Stop loading
          setLoading('')
        })
    }
  }

  // Delete Order function
  function deleteOrder(id: string): void {
    if (id) {
      //Start loading
      setLoading('Deleting Order, Please Wait')
      //Sending credentials to backend for authentication
      api
        .delete('orders/', { headers: { Authorization: token },data: {  _id: id} })
        .then((res: AxiosResponse) => {
          Store.addNotification({
            ...notificationsTheme,
            type: 'success',
            title: 'Done',
            message: res.data,
            onRemoval: () => refetch(true),
          })
        })
        .catch((err) => {
          const erroMessage: string = err.response
            ? err.response.data
            : err.message
          Store.addNotification({
            ...notificationsTheme,
            type: 'danger',
            title: 'Error',
            message: erroMessage,
          })
        })
        .finally(() => {
          //Stop loading
          setLoading('')
        })
    }
  }

  //Complete Order function
  function completeOrder(id: string): void {
    if (id) {
      //Start loading
      setLoading('Approving Order, Please Wait')
      //Sending credentials to backend for authentication
      api
        .patch(
          'orders/complete',
          { _id: id },
          { headers: { Authorization: token } }
        )
        .then((res: AxiosResponse) => {
          Store.addNotification({
            ...notificationsTheme,
            type: 'success',
            title: 'Done',
            message: res.data,
            onRemoval: () => refetch(true),
          })
        })
        .catch((err) => {
          const erroMessage: string = err.response
            ? err.response.data
            : err.message
          Store.addNotification({
            ...notificationsTheme,
            type: 'danger',
            title: 'Error',
            message: erroMessage,
          })
        })
        .finally(() => {
          //Stop loading
          setLoading('')
        })
    }
  }

  // Data slots
  const dataSlots: CartProps[] = useMemo(() => {
    return [
      {
        title: 'Total Orders',
        icon: (
          <AttachMoneyOutlined sx={{ fontSize: '3.5rem' }} color="warning" />
        ),
        count: data.total,
      },
      {
        title: 'Pending Orders',
        icon: (
          <PendingActionsOutlined sx={{ fontSize: '3.5rem' }} color="primary" />
        ),
        count: data.pending.length,
      },
      {
        title: 'Approved Orders',
        icon: (
          <CheckCircleOutlineOutlined
            sx={{ fontSize: '3.5rem' }}
            color="success"
          />
        ),
        count: data.approved.length,
      },
      {
        title: 'Rejected Orders',
        icon: <DoNotDisturb sx={{ fontSize: '3.5rem' }} color="error" />,
        count: data.rejected.length,
      },
    ]
  }, [data])

  return (
    <Box>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={(e, newValue: number) => setValue(newValue)}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab
            label={'All Orders'}
            sx={{ textTransform: 'capitalize', color: '#555' }}
          />
          {tabs.map((item) => (
            <Tab
              key={item}
              label={`${item.toLocaleLowerCase()} Orders`}
              sx={{ textTransform: 'capitalize', color: '#555' }}
            />
          ))}
        </Tabs>
      </AppBar>
      {loading ? (
        <Loader label={loading} />
      ) : (
        <>
          <Box
            sx={{
              p: '1rem',
              minHeight: 500,
              border: '1px solid #ccc',
            }}
          >
            <Cards slots={dataSlots} />
            <Typography
              color="primary.main"
              ml="0.5rem"
              mt="2rem"
              fontSize={'0.9rem'}
              variant="h6"
              textTransform={'capitalize'}
            >
              {dataMapping[value].toLocaleLowerCase()} Orders.
            </Typography>
            <TableData
              data={data}
              activeSlot={dataMapping[value].toLocaleLowerCase()}
              addActions={value === 0 && true}
              approveOrder={approveOrder}
              deleteOrder={deleteOrder}
              completeOrder={completeOrder}
              rejectOrder={(id: string, reason: string) =>
                rejectOrder(id, reason)
              }
            />
            {currentDataSet.length === 0 && (
              <NoData
                label={`No ${dataMapping[
                  value
                ].toLocaleLowerCase()} orders found`}
              />
            )}
          </Box>
        </>
      )}
    </Box>
  )
}

OrderListing.propTypes = {
  data: propTypes.any.isRequired,
  refetch: propTypes.func.isRequired,
}

export default OrderListing
