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
import TotalStats from '../features/sales/TotalStats/TotalStats.js'
import DailyStats from '../features/sales/DailyStats/DailyStats.js'
import MonthlyStats from '../features/sales/MonthlyStats/MonthlyStats.js'
import Breakdown from '../features/sales/BreakdownChart/Breakdown.js'
import AddProduct from '../features/products/AddProducts.js'
import AddCustomer from '../features/customer/AddCustomer.js'
import AddTransaction from '../features/transactions/AddTransaction.js'

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
        path="/addproduct"
        element={<PrivateRoutes Component={AddProduct} />}
      />
      <Route
        path="/viewproducts"
        element={<PrivateRoutes Component={Products} />}
      />
      <Route
        path="/addcustomer"
        element={<PrivateRoutes Component={AddCustomer} />}
      />
      <Route
        path="/viewcustomers"
        element={<PrivateRoutes Component={Customers} />}
      />
      <Route
        path="/addtransactions"
        element={<PrivateRoutes Component={AddTransaction} />}
      />
      <Route
        path="/viewtransactions"
        element={<PrivateRoutes Component={Transactions} />}
      />
      <Route
        path="/geography"
        element={<PrivateRoutes Component={GeographicMap} />}
      />
      <Route
        path="/totalstats"
        element={<PrivateRoutes Component={TotalStats} />}
      />
      <Route
        path="/dailystats"
        element={<PrivateRoutes Component={DailyStats} />}
      />
      <Route
        path="/monthlystats"
        element={<PrivateRoutes Component={MonthlyStats} />}
      />
      <Route
        path="/breakdown"
        element={<PrivateRoutes Component={Breakdown} />}
      />
    </Routes>
  )
}

export default Routers
