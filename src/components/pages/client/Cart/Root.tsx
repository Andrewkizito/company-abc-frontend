// Importing core components
import { type ReactElement } from 'react'
import Layout from 'src/components/core/Layout'
import Cart from './sections/Cart'

const Root: React.FC = (): ReactElement => {
  return (
    <Layout>
      <Cart />
    </Layout>
  )
}

export default Root
