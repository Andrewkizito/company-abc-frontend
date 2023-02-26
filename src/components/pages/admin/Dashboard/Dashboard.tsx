// Importing core components
import { Container } from '@mui/material'
import Layout from '../core/Layout'
import Cards from './sections/Cards'

const Dashboard: React.FC = () => {
  return (
    <Layout>
      <Container maxWidth="xl">
        <Cards />
      </Container>
    </Layout>
  )
}

export default Dashboard
