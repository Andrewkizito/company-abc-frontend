// Importing helper functions
import React, { useMemo, useRef } from 'react'
import propsTypes from 'prop-types'

// Importing core components
import { CameraAltOutlined, Delete } from '@mui/icons-material'
import { Box, type CSSObject, IconButton, Typography } from '@mui/material'

type PlainFunction = (value: any) => void

interface ImageUploaderProps {
  label: string
  value: string
  setValue: PlainFunction
  setImage: PlainFunction
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  label,
  value,
  setValue,
  setImage
}) => {
  // Ref to hold file input element
  const fileInput = useRef<HTMLInputElement | null>(null)

  // Value Validity check
  const isValueValid: boolean = useMemo(() => Boolean(value), [value])

  // function to handle file selected
  function fileHandler (file: File | null): void {
    if (file !== null) {
      setImage(file)
      setValue(URL.createObjectURL(file))
    }
  }

  const styles: Record<string, CSSObject> = {
    centeredContent: {
      height: 350,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px dashed #ccc',
      img: {
        width: '100%',
        height: '100%',
        objecFit: 'cover',
        objectPosition: 'center'
      }
    },
    blockContent: {
      height: 350,
      display: 'block',
      border: '1px dashed #ccc',
      img: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center'
      }
    }
  }

  return (
    <Box>
      <input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          fileHandler((e.target.files != null) ? e.target.files[0] : null)
          e.target.value = ''
        }}
        ref={(el) => (fileInput.current = el)}
        type={'file'}
        accept="image/*"
        style={{ display: 'none' }}
      />
      <Typography mb={'0.5rem'} fontSize={'0.9rem'} variant="subtitle1">
        {label}
      </Typography>
      <Box sx={isValueValid ? styles.blockContent : styles.centeredContent}>
        {isValueValid
          ? (
          <Box
            sx={{
              height: '100%',
              width: '100%',
              position: 'relative'
            }}
          >
            <Box position={'absolute'} right={2} top={2} zIndex={2}>
              <IconButton
                color="error"
                onClick={() => {
                  setValue('')
                  setImage(null)
                }}
              >
                <Delete htmlColor="#555" fontSize="small" />
              </IconButton>
            </Box>
            <img src={value} alt="" />
          </Box>
            )
          : (
          <IconButton
            onClick={() => { fileInput.current?.click() }}
          >
            <CameraAltOutlined htmlColor="#555" fontSize="large" />
          </IconButton>
            )}
      </Box>
    </Box>
  )
}

ImageUploader.propTypes = {
  label: propsTypes.string.isRequired,
  value: propsTypes.string.isRequired,
  setValue: propsTypes.func.isRequired,
  setImage: propsTypes.func.isRequired
}

export default ImageUploader
