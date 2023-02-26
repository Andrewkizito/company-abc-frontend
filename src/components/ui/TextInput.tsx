// Importing helper functions
import propTypes from 'prop-types'

// Importing core components
import { Box, Typography } from '@mui/material'

interface TextInputProps {
  label: string
  inputProps: any
}

const TextInput: React.FC<TextInputProps> = ({ label, inputProps }) => {
  return (
    <Box
      sx={{
        mb: '1rem',
        input: {
          height: 50,
          width: '100%',
          borderRadius: 1,
          border: '1px solid #ccc',
          px: '0.5rem'
        }
      }}
    >
      <Typography mb={'0.5rem'} fontSize={'0.9rem'} variant="subtitle1">
        {label}
      </Typography>
      <input {...inputProps} />
    </Box>
  )
}

TextInput.propTypes = {
  label: propTypes.string.isRequired,
  inputProps: propTypes.object.isRequired
}

export default TextInput
