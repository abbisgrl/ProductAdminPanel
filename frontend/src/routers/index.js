import { Route, Routes } from 'react-router-dom'
import Login from '../features/auth/Login.js'
import Signup from '../features/auth/Signup.js'
import PublicRoutes from './PublicRoutes.js'
import PrivateRoutes from './PrivateRoutes.js'
import Dashboard from '../features/dashboard/index.js'

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoutes Component={Dashboard} />} exact />
      <Route path="/login" element={<PublicRoutes Component={Login} />} exact />
      <Route
        path="/signUp"
        element={<PublicRoutes Component={Signup} />}
        exact
      />
    </Routes>
  )
}

export default Routers
