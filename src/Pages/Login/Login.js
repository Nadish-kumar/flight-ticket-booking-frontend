import React from 'react'
import "./Login.css"
import { useFormik } from 'formik';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      },
    onSubmit:async (values) => {
      try {
        var response = await axios.post(`http://localhost:5000/user/login`,values).then((res) => { return res.data})
        console.log(response._id)
        sessionStorage.setItem("id",response._id)
        sessionStorage.setItem("email",response.email)
        navigate("/home")
      } catch (error) {
        alert("No user Found,Please Sign-up your account")
      }
     
    },
  });

  return (
    <div>
      <h1 className='heading'>Flight ticket Booking</h1>
      <div className='box'>
        <h4>Login your account</h4>
        <form onSubmit={formik.handleSubmit}>
        <div className='ref'>
        <label>Email :</label>
         <input type="email"       onChange={formik.handleChange} name="email"
         value={formik.values.email} />
        </div>
        <div>
     
        <label>Password</label>
         <input type="password"  onChange={formik.handleChange} name="password"
         value={formik.values.password} />
        </div>
  
         <button type='submit' className='btn btn-success mt-2'>Login</button>
         <Link to="/signup">
         <button className='btn btn-success mt-2'>Signup</button>
         </Link>
         
         </form>
      </div>
    </div>
  )
}

export default Login