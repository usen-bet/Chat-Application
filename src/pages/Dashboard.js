import "./dash.css"
import { Link } from "react-router-dom"

const Dashboard = () => {
  return (
      <div className="dashboard">
          <p>Welcome to </p>
          <h1>
          Chatsapp
          </h1>
          
          <span>
          <Link to="/login">
          <button className="dash-btn">
              Login
          </button> 
              </Link>
              <Link to="/register">
          <button className="dash-btn">
              Sign Up
          </button>               
              </Link>
          </span>
          


    </div>
  )
}

export default Dashboard