import { Route, Routes } from 'react-router-dom'
import Login from '../features/auth/Login.js'
import Signup from '../features/auth/Signup.js'
import PublicRoutes from './PublicRoutes.js'
import PrivateRoutes from './PrivateRoutes.js'
import Dashboard from '../features/dashboard/index.js'
import Products from '../features/products/index.js'
import Customers from '../features/customer/index.js'
import Transactions from '../features/transactions/index.js'
import GeographicMap from '../features/geographicMap/index.js'

const Routers = () => {
  return (
    <Routes>
      <Route path="/login" element={<PublicRoutes Component={Login} />} exact />
      <Route
        path="/signUp"
        element={<PublicRoutes Component={Signup} />}
        exact
      />
      {['/', '/dashboard'].map((path) => (
        <Route
          path={path}
          element={<PrivateRoutes Component={Dashboard} />}
          exact
        />
      ))}
      <Route
        path="/products"
        element={<PrivateRoutes Component={Products} />}
      />
      <Route
        path="/customers"
        element={<PrivateRoutes Component={Customers} />}
      />
      <Route
        path="/transactions"
        element={<PrivateRoutes Component={Transactions} />}
      />
      <Route
        path="/geography"
        element={<PrivateRoutes Component={GeographicMap} />}
      />
    </Routes>
  )
}

export default Routers
