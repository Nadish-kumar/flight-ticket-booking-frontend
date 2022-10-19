import React from 'react'
import { useFormik } from 'formik';
import axios from "axios"
import {useNavigate} from "react-router-dom"


const Signup = () => {
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      password : ''
    },
    onSubmit: async(values) => {
       var response = await axios.post(`http://localhost:5000/user/sign`,values).then((res) => { return res.data})
       console.log(response)
       navigate("/home")
    },
  });

  return (
    
           <div>
      <h1 className='heading'>Flight ticket Booking</h1>
      <div className='box'>
        <h4>Sign up your account</h4>
        <form onSubmit={formik.handleSubmit}>
        <div className='ref'>
     <label>Name</label>
         <input type="text" onChange={formik.handleChange} name="name"
         value={formik.values.name} />
        </div>
        <div>
     <label>Phone no</label>
         <input type="number" onChange={formik.handleChange} name="phone"
         value={formik.values.phone} />
        </div>

        <div className='ref'>
        <label>Email :</label>
         <input type="email" onChange={formik.handleChange} name="email"
         value={formik.values.email} />
        </div>
        <div>
     <label>Password</label>
         <input type="password" onChange={formik.handleChange} name="password"
         value={formik.values.password} />
        </div>
  

         <button className='btn btn-success mt-2'>Signup</button>
         </form>
      </div>
    </div>
    
  )
}

export default Signup