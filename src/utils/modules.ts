/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { type AxiosInstance } from 'axios'

export const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
})

export function getImageUrl(key: string): string {
  return `http://localhost:5000/images/${key}`
}

export function updateState(
  field: string,
  value: string | number,
  updateFunction: any
): void {
  updateFunction((prevState: any) => ({
    ...prevState,
    [field]: value,
  }))
}

export function validateObject(data: Record<string, string | number>): boolean {
  let validity = true
  for (const key in data) {
    const valueToBoolean = Boolean(data[key])
    if (valueToBoolean) validity = false
  }
  return validity
}