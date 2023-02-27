// Importing helper modules
import { Order, Orders, OrderStatus } from '../Orders'
import propTypes from 'prop-types'

// Importing core components
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material'
import { CancelOutlined, TaskAltOutlined } from '@mui/icons-material'

type ApprovalFunction = (id: string) => void;
type RejectionFunction = (id: string, reason: string) => void;

interface TableDataProps {
  data: Orders;
  addActions: boolean;
  approveOrder?: ApprovalFunction;
  rejectOrder?: RejectionFunction;
}

interface TableRow {
  _id: string;
  name: string;
  phoneNumber: string;
  totalOrder: number;
  orderStatus: OrderStatus;
}

function generateTableRow(data: Order): TableRow {
  return {
    _id: data._id,
    name: data.name,
    phoneNumber: data.phoneNumber,
    totalOrder: data.totalPrice,
    orderStatus: data.orderStatus,
  }
}

const TableData: React.FC<TableDataProps> = ({
  data,
  addActions,
  approveOrder,
  rejectOrder,
}) => {
  return (
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
            Total Order
          </TableCell>
          {addActions && (
            <TableCell
              sx={{
                fontWeight: 800,
              }}
            />
          )}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.pending
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
                          } else window.alert('Please suppply a valid reason')
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
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}

TableData.propTypes = {
  data: propTypes.any.isRequired,
  addActions: propTypes.bool.isRequired,
  approveOrder: propTypes.func,
  rejectOrder: propTypes.func,
}

export default TableData
