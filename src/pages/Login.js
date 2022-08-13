import { useState } from 'react'
import "./Register.css"
import { signInWithEmailAndPassword } from 'firebase/auth';
import { updateDoc, doc } from 'firebase/firestore';
import { db, auth } from "../firebase"
import { Navigate } from "react-router-dom";


const Login = () => {
    const [move, setMove] = useState(false)
    const [data, setData] = useState({
        email: "",   
        password: "",
        error: null,
        loading: false,
    });

    if (move) {
        return <Navigate to="/home" />
    }

    const { email, password, error, loading } = data;
    
    const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

    const handleSubmit = async (e) => {
     
    e.preventDefault();
    setData({ ...data, error: null, loading: true });
    if (!email || !password) {
      setData({ ...data, error: "All fields are required" });
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      await updateDoc(doc(db, "rooms", result.user.uid), {
        isOnline: true,
      });
      setData({
        email: "",
        password: "",
        error: null,
        loading: false,
      }); 
        setMove(true)
      
    } catch (err) {
      setData({ ...data, error: err.message, loading: false });
    }
  };
    return (
        <section>
            <h3> Login To Your  Account</h3>
            <form className='form' onSubmit={handleSubmit}>
                {/* <div className="input_container">
                    <label htmlFor='name'>
                        Name 
                    </label>
                    <input
                        type="text"
                        name="name"
                        onChange={handleChange}
                        value={name}
                    />
                </div> */}
                <div className="input_container">
                    <label htmlFor='Email'>
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        value={email}
                    />
                </div>
                <div className="input_container">
                    <label htmlFor='Password'>
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={password}
                    />
                </div>
                {error ? <p className='error'>{error}</p>:null}
                <div className='btn_container'>
                    <button className='btn' disabled={loading}>{loading ? "Loading..." : "Login"}</button>   
                </div>
            </form>
        </section>
    );
};

export default Login 