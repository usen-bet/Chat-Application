import { useState } from 'react'
import "./Register.css"
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc, Timestamp } from 'firebase/firestore';
import { db, auth } from "../firebase"
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        error: null,
        loading: false,
    });

    const navigate = useNavigate();

    const { name, email, password, error, loading } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
          if (!name || !email || !password) {
      setData({ ...data, error: "All fields are required" });
        }
        try {
            const result = await createUserWithEmailAndPassword(
                auth,
                email,  
                password
            );
            await setDoc(doc(db, 'rooms', result.user.uid), {
                uid: result.user.uid,
                name,
                email,
                createdAt: Timestamp.fromDate(new Date()),
                isOnline: true,
                        
            })
            setData({
                name: "",
                email: "",
                password: "",
                error: null,
                loading: false,
            })

            navigate("/home")
        } catch(err ) {setData({ ...data, error: err.message, loading: false });}
    }
    return (
        <section>
            <h3> Create An Account</h3>
            <form className='form' onSubmit={handleSubmit}>
                <div className="input_container">
                    <label htmlFor='name'>
                        Name 
                    </label>
                    <input
                        type="text"
                        name="name"
                        onChange={handleChange}
                        value={name}
                    />
                </div>
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
                    <button className='btn' disabled={loading}>{loading ? "Loading..." : "Register"}</button>   
                </div>
            </form>
        </section>
    );
};

export default Register