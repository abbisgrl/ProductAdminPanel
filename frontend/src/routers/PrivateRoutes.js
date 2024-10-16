import { Navigate } from 'react-router-dom'

const PrivateRoutes = ({ Component }) => {
  const getToken = localStorage.getItem('token')

  if (getToken) {
    return <Component />
  }
  return <Navigate to={'/login'} />
}

export default PrivateRoutes
