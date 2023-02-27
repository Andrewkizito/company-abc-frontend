// Importing helper functions
import { type AuthState } from 'src/context/authSlice'
import { api, updateState } from 'src/utils/modules'
import { type ShopItem } from 'src/context/shopSlice'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

// Importing core components
import { Box, Button, Grid, Rating, Typography } from '@mui/material'
import { Spinner } from 'react-activity'
import { type AxiosResponse } from 'axios'
import { Store } from 'react-notifications-component'
import { notificationsTheme } from 'src/utils/theme'
import ImageUploader from 'src/components/ui/ImageUploader'
import TextInput from 'src/components/ui/TextInput'

const ProductManager: React.FC = () => {
  const { token } = useSelector((state: { auth: AuthState }) => state.auth)
  const [form, setForm] = useState<ShopItem>({
    productName: '',
    description: '',
    price: 0,
    unit: '',
    image: '',
    rating: 5,
    stock: 0,
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [image, setImage] = useState<File | null>(null)

  function submit(): void {
    // Checking if form only includes valid values
    const invalidFormValues: string[] = []
    for (const key in form) {
      const value = Boolean(form[key as keyof typeof form])
      if (!value) {
        invalidFormValues.push(key)
      }
    }

    if (invalidFormValues.length === 0 && image != null) {
      setLoading(true)
      const payload: Record<string, string | number | File> = {
        ...form,
        image: image.name,
        uploadFile: image,
      }
      const formData = new FormData()
      for (const field in payload) {
        const value = payload[field]
        formData.append(
          field,
          typeof value === 'number' ? value.toString() : value
        )
      }

      api
        .post('/products', formData, { headers: { Authorization: token } })
        .then((res: AxiosResponse) => {
          Store.addNotification({
            ...notificationsTheme,
            type: 'success',
            title: 'Done',
            message: res.data,
            onRemoval: () => {
              setForm({
                productName: '',
                description: '',
                price: 0,
                unit: '',
                image: '',
                rating: 5,
                stock: 0,
              })
            },
          })
        })
        .catch((err) => {
          Store.addNotification({
            ...notificationsTheme,
            type: 'danger',
            title: 'Error',
            message: err.response.data,
          })
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      Store.addNotification({
        ...notificationsTheme,
        type: 'danger',
        title: 'Error',
        message: `Missing but required(${invalidFormValues.join(', ')})`,
      })
    }
  }

  return (
    <Box mt="1rem">
      <Typography variant="h5">Add New Product</Typography>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={6}>
          <TextInput
            label={'Product Name'}
            inputProps={{
              disabled: loading,
              placeholder: 'Enter Product Name',
              value: form.productName,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                updateState('productName', e.target.value, setForm)
              },
            }}
          />
          <TextInput
            label={'Description'}
            inputProps={{
              disabled: loading,
              placeholder: 'Enter Description',
              value: form.description,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                updateState('description', e.target.value, setForm)
              },
            }}
          />
          <TextInput
            label={'Product Units'}
            inputProps={{
              disabled: loading,
              placeholder: 'Product Measuring Units(kgs, ltr)',
              value: form.unit,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                updateState(
                  'unit',
                  e.target.value.toLocaleLowerCase(),
                  setForm
                )
              },
            }}
          />
          <TextInput
            label={'Price'}
            inputProps={{
              disabled: loading,
              placeholder:
                form.unit !== '' ? `Price Per ${form.unit}` : 'Price Per Unit',
              value: form.price,
              type: 'number',
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                updateState(
                  'price',
                  e.target.value === '' ? 0 : parseInt(e.target.value),
                  setForm
                )
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ImageUploader
            label={'Product Photo'}
            value={form.image}
            setValue={(imageUrl: string) => {
              updateState('image', imageUrl, setForm)
            }}
            setImage={setImage}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextInput
            label={'Total Stock'}
            inputProps={{
              disabled: loading,
              placeholder: 'Total Amount In Stock',
              value: form.stock,
              type: 'number',
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                updateState(
                  'stock',
                  e.target.value === '' ? 0 : parseInt(e.target.value),
                  setForm
                )
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography mb={'0.5rem'} fontSize={'0.9rem'} variant="subtitle1">
            Rating
          </Typography>
          <Rating
            precision={0.5}
            value={form.rating}
            onChange={(e: React.SyntheticEvent, newValue: number | null) => {
              updateState('rating', newValue !== null ? newValue : 0, setForm)
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            fullWidth
            onClick={submit}
            endIcon={
              loading && (
                <Spinner color="#fff" size={10} speed={1} animating={true} />
              )
            }
          >
            {loading ? 'Saving...' : 'Save Product'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ProductManager
