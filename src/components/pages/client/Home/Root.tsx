// Importing core components
import Layout from 'src/components/core/Layout'
import Info from './sections/Info'
import Products from './sections/Products'
import Welcome from './sections/Welcome'

const Root: React.FC = () => {
  return (
    <Layout>
      <>
        <Welcome />
        <Products />
        <Info />
      </>
    </Layout>
  )
}

export default Root
