import { Link } from "react-router-dom"
import "./Navbar.css"
import { auth, db } from "../firebase"
import { updateDoc, doc } from "firebase/firestore" 
import { signOut } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../Context/auth"


const Navbar = () => {
  let navigate = useNavigate()
  const { user } = useContext(AuthContext);
  const handleSignOut = async () => {
    await updateDoc(doc(db, "rooms", auth.currentUser.uid), {
      isOnline: false,
    });
    await signOut(auth);
    navigate("/") 
  };
  return (
      <nav>
          <h3>
          <Link to="/">Chat Application</Link>    
          </h3>
      <div>
        {user ? (
            <>
          <Link to="/profile"className="prof pro">profile</Link>
          <Link to="/login" onClick={handleSignOut} className="login pro">Logout</Link>
          </>
        )
          :
          (
            <>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
          </>    
          )}
              
          </div>
    </nav>
  )
}

export default Navbar