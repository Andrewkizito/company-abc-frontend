// Importing helper modules
import { type CartItem } from 'src/context/shopSlice'
import { useMemo, useState } from 'react'
import { Order, Orders, OrderStatus } from '../Orders'
import propTypes from 'prop-types'

// Importing core components
import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material'
import {
  CancelOutlined,
  Delete,
  ShoppingCartCheckout,
  TaskAltOutlined,
} from '@mui/icons-material'
import CartDetails from './CartDetails'

type ApprovalFunction = (id: string) => void;
type RejectionFunction = (id: string, reason: string) => void;

interface TableDataProps {
  data: Orders;
  activeSlot: string;
  addActions: boolean;
  approveOrder?: ApprovalFunction;
  deleteOrder?: ApprovalFunction;
  rejectOrder?: RejectionFunction;
  completeOrder?: ApprovalFunction;
}

interface TableRow {
  _id: string;
  name: string;
  phoneNumber: string;
  location: string;
  totalOrder: number;
  orderStatus: OrderStatus;
  cart: CartItem[];
}

export interface Cart {
  items: CartItem[];
  totalPrice: number;
}

function generateTableRow(data: Order): TableRow {
  return {
    _id: data._id,
    name: data.name,
    phoneNumber: data.phoneNumber,
    cart: data.cart,
    totalOrder: data.totalPrice,
    orderStatus: data.orderStatus,
    location: data.location,
  }
}

const TableData: React.FC<TableDataProps> = ({
  data,
  addActions,
  activeSlot,
  approveOrder,
  deleteOrder,
  rejectOrder,
  completeOrder,
}) => {
  // State to hold cart items
  const [cart, setCart] = useState<Cart | null>(null)

  // Generating data depending on active slot
  const currentDataSet: Order[] = useMemo(() => {
    const currentData = data[activeSlot as keyof typeof data]
    if (typeof currentData === 'number') {
      return []
    }
    return currentData
  }, [activeSlot])

  return (
    <>
      <CartDetails cart={cart} closeModal={() => setCart(null)} />
      <Table
        sx={{
          minWidth: 650,
          mt: '1rem',
        }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                fontWeight: 800,
              }}
            >
              Customer&apos;s Name
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 800,
              }}
            >
              Phone Number
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 800,
              }}
            >
              Location
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 800,
              }}
            >
              Order Items
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 800,
              }}
            >
              Total Order
            </TableCell>
            {addActions ||
              (['approved', 'rejected', 'completed'].includes(activeSlot) && (
                <TableCell
                  sx={{
                    fontWeight: 800,
                  }}
                />
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {currentDataSet
            .map((item) => generateTableRow(item))
            .map((row) => (
              <TableRow
                key={row.name}
                sx={{
                  '&:last-child td, &:last-child th': {
                    border: 0,
                  },
                }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.phoneNumber}</TableCell>
                <TableCell>{row.location}</TableCell>
                <TableCell>
                  <Tooltip
                    title="Open Details"
                    onClick={() =>
                      setCart({ totalPrice: row.totalOrder, items: row.cart })
                    }
                  >
                    <Button
                      variant="text"
                      color="inherit"
                      endIcon={<ShoppingCartCheckout />}
                    >
                      {row.cart.length} {row.cart.length > 1 ? 'Items' : 'Item'}
                    </Button>
                  </Tooltip>
                </TableCell>
                <TableCell>Ugx - {row.totalOrder}</TableCell>
                {addActions && (
                  <TableCell align="right">
                    <Box justifyContent="flex-end" display="flex">
                      <Tooltip
                        title="Approve Order"
                        onClick={() => {
                          if (addActions && approveOrder) {
                            if (window.confirm('Approve this order')) {
                              approveOrder(row._id)
                            }
                          }
                        }}
                      >
                        <IconButton color="success">
                          <TaskAltOutlined />
                        </IconButton>
                      </Tooltip>
                      <Tooltip
                        title="Reject Order"
                        onClick={() => {
                          if (addActions && rejectOrder) {
                            const value: string | null = prompt(
                              'Enter reason for rejecting this order'
                            )
                            if (value) {
                              if (
                                window.confirm('Start order rejection process?')
                              )
                                rejectOrder(row._id, value)
                            } else
                              window.alert('Please suppply a valid reason')
                          }
                        }}
                      >
                        <IconButton color="error">
                          <CancelOutlined />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                )}
                {activeSlot === 'approved' && completeOrder && (
                  <TableCell align="right">
                    <Button
                      fullWidth
                      color="success"
                      onClick={() => completeOrder(row._id)}
                    >
                      Complete Order
                    </Button>
                  </TableCell>
                )}
                {['rejected', 'completed'].includes(activeSlot) &&
                  deleteOrder && (
                    <TableCell>
                      <Tooltip
                        title={'Delete order'}
                        onClick={() => {
                          if (
                            window.confirm('Delete order, this is irreversible')
                          )
                            deleteOrder(row._id)
                        }}
                      >
                        <IconButton color="error">
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  )}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  )
}

TableData.propTypes = {
  data: propTypes.any.isRequired,
  activeSlot: propTypes.any.isRequired,
  addActions: propTypes.bool.isRequired,
  approveOrder: propTypes.func,
  deleteOrder: propTypes.func,
  completeOrder: propTypes.func,
  rejectOrder: propTypes.func,
}

export default TableData
