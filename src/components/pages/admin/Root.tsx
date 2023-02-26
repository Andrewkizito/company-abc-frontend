import { type ReactElement } from 'react'
import { Outlet } from 'react-router-dom'

const Root: React.FC = (): ReactElement => {
  return <Outlet></Outlet>
}

export default Root
