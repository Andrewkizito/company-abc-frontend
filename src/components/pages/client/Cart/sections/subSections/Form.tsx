// Importing helper functions
import { updateState } from 'src/utils/modules'
import propTypes from 'prop-types'

// Importing core components
import { Box, Typography } from '@mui/material'
import TextInput from 'src/components/ui/TextInput'

type PlainFunction = () => void

interface FormProps {
  form: Record<string, string>
  setForm: PlainFunction
}

const Form: React.FC<FormProps> = ({ form, setForm }) => {
  console.log(form)

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
