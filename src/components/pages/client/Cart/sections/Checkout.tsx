// Importing helper functions
import { type CartItem } from 'src/context/shopSlice'
import { validateObject } from 'src/utils/modules'
import { useMemo, useState } from 'react'
import propTypes from 'prop-types'

// Importing core components
import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography
} from '@mui/material'
import {
  KeyboardArrowLeftOutlined,
  KeyboardArrowRightOutlined
} from '@mui/icons-material'
import { Store } from 'react-notifications-component'
import { notificationsTheme } from 'src/utils/theme'
import Form from './subSections/Form'
import Summary from './subSections/Summary'

const steps: string[] = ['Fill In Details', 'Confirm Order Details']

interface CheckoutProps {
  cart: CartItem[]
}

const Checkout: React.FC<CheckoutProps> = ({ cart }) => {
  // Place order steps
  const [activeStep, setStep] = useState<number>(0)
  // UI Loading State
  const [loading, setLoading] = useState<boolean>(false)
  // User details state
  const [form, setForm] = useState<{
    name: string
    phone_number: string
    location: string
  }>({
    name: '',
    location: '',
    phone_number: ''
  })

  // Calculating total cost of all items in cart.
  const totalPrice: number = useMemo(() => {
    let result = 0
    cart.forEach((item) => (result = result + item.price))
    return result
  }, [cart])

  const checkValidity: () => boolean = (): boolean => validateObject(form)

  return (
    <Box my={'0.4rem'} py={'1rem'}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === 0 && <Form form={form} setForm={() => setForm} />}
      {activeStep === 1 && (
        <Summary
          loading={loading}
          setLoading={setLoading}
          form={form}
          totalPrice={totalPrice}
          cart={cart}
        />
      )}
      <Box display={'flex'}>
        <Button
          onClick={() => { setStep((prevValue) => prevValue - 1) }}
          disabled={activeStep === 0 || loading}
          color="inherit"
        >
          <KeyboardArrowLeftOutlined />{' '}
          <Typography variant="body2">Back</Typography>
        </Button>
        <Button
          onClick={() => {
            if (checkValidity()) setStep((prevValue) => prevValue + 1)
            else {
              Store.addNotification({
                ...notificationsTheme,
                type: 'warning',
                title: 'Warning',
                message:
                  'Your name, phone number and location are all required'
              })
            }
          }}
          disabled={activeStep === 1 || loading}
          color="inherit"
        >
          <Typography variant="body2">Next</Typography>
          <KeyboardArrowRightOutlined />{' '}
        </Button>
      </Box>
    </Box>
  )
}

Checkout.propTypes = {
  cart: propTypes.array.isRequired
}

export default Checkout
