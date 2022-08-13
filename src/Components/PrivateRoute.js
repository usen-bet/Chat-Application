import { Outlet, Navigate } from 'react-router-dom'
import { AuthContext } from '../Context/auth'
import { useContext } from 'react'


const PrivateRoute = ({ children, ...rest }) => {
    const { user } = useContext(AuthContext)
  return (
   user ? <Outlet /> : <Navigate to="/login" />
  )
}

export default PrivateRoute