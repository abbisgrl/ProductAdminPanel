import { Navigate } from 'react-router-dom'

const PublicRoutes = ({ Component }) => {
  const getToken = localStorage.getItem('token')

  if (getToken) {
    return <Navigate to={'/'} />
  }
  return <Component />
}

export default PublicRoutes
