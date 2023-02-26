/* eslint-disable @typescript-eslint/no-explicit-any */
// Importing helper functions
import { updateState } from 'src/utils/modules'
import propTypes from 'prop-types'

// Importing core components
import { Box, Typography } from '@mui/material'
import TextInput from 'src/components/ui/TextInput'

interface FormProps {
  form: {[key:string]: string | number }
  setForm: any
}

const Form: React.FC<FormProps> = ({ form, setForm }) => {

  return (
    <Box py={'1.5rem'}>
      <Typography mb={'1rem'} fontSize={'1.4rem'} variant="body1">
        Complete Your Order.
      </Typography>
      <TextInput
        label="Your Name"
        inputProps={{
          value: form.name,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => { updateState('name', e.target.value, setForm) }
        }}
      />
      <TextInput
        label="Phone Number"
        inputProps={{
          value: form.phoneNumber,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => { updateState('phoneNumber', e.target.value, setForm) }
        }}
      />
      <TextInput
        label="Location"
        inputProps={{
          value: form.location,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => { updateState('location', e.target.value, setForm) }
        }}
      />
    </Box>
  )
}

Form.propTypes = {
  form: propTypes.any.isRequired,
  setForm: propTypes.func.isRequired
}

export default Form
