// Importing core components
import { Box, Typography } from '@mui/material'
import { Spinner } from 'react-activity'
import propTypes from 'prop-types'

interface LoaderProps {
  label: string
}

const Loader: React.FC<LoaderProps> = ({ label }) => {
  return (
    <Box
      height={400}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Spinner color="royalblue" size={20} speed={1} animating={true} />
      <Typography variant="subtitle2">{label}</Typography>
    </Box>
  )
}

Loader.propTypes = {
  label: propTypes.string.isRequired
}

export default Loader
