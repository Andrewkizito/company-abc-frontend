// Importing core components
import { Box, Typography } from '@mui/material'
import propTypes from 'prop-types'

export interface SlotProps {
  icon: string
  title: string
  description: string
}

const Slot: React.FC<SlotProps> = ({ title, description, icon }) => {
  return (
    <Box
      sx={{
        p: '1rem',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        img: { mb: '1.5rem', height: 80 }
      }}
    >
      <img src={icon} alt="icon" />
      <Box>
        <Typography fontWeight={500} fontSize={'1.2rem'} variant="h5">
          {title}
        </Typography>
        <Typography
          color="#555"
          mb={'0.5rem'}
          fontSize={'0.85rem'}
          variant="subtitle1"
        >
          {description}
        </Typography>
      </Box>
    </Box>
  )
}

Slot.propTypes = {
  title: propTypes.string.isRequired,
  description: propTypes.string.isRequired,
  icon: propTypes.string.isRequired
}

export default Slot
