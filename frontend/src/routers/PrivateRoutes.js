import { Navigate } from 'react-router-dom'
import MainLayout from '../layout'

const PrivateRoutes = ({ Component }) => {
  const getToken = localStorage.getItem('token')

  if (getToken) {
    return (
      <MainLayout>
        <Component />
      </MainLayout>
    )
  }
  return <Navigate to={'/login'} />
}

export default PrivateRoutes
