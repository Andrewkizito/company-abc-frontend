// Importing core components
import { Box, Button, Typography } from '@mui/material'
import propTypes from 'prop-types'

type RefetchFunction = (value: boolean) => void;

interface NodataProps {
  label: string;
  refetch?: RefetchFunction;
}

const NoData: React.FC<NodataProps> = ({ label, refetch }) => {
  return (
    <Box
      height={400}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="subtitle2">{label}</Typography>
      {refetch && <Button onClick={() => refetch(true)}>Refresh</Button>}
    </Box>
  )
}

NoData.propTypes = {
  label: propTypes.string.isRequired,
  refetch: propTypes.func,
}

export default NoData
