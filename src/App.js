import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/Home"
import Register from './pages/Register';
import Login from "./pages/Login"
import AuthProvider from "./Context/auth"
import PrivateRoute from './Components/PrivateRoute';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <AuthProvider>
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          
          <Route element={<PrivateRoute />} >
            <Route element={<Home />} path="/home" exact /> 
            <Route path="/profile" element={ <Profile />} exact/>  
          </Route>
    </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
