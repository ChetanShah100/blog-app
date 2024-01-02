import React, { useEffect } from 'react'
import './Login.css'
import { Formik, Form,Field,ErrorMessage} from 'formik'
import * as yup from "yup"
import { useDispatch, useSelector } from 'react-redux'
import { signInUser,clearState } from '../../Features/Auth/authSlice'
import { ToastContainer,toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom'
import {Link} from 'react-router-dom'
const Login = () => {

  const navigate=useNavigate();
const dispatch=useDispatch()
const data=useSelector((state)=>state.user);
let{error,message,loading}=data;
 
useEffect(()=>{
  if(error){
    toast.error(error,{position:toast.POSITION.TOP_CENTER})
    setTimeout(() => {
      dispatch(clearState())
      navigate('/Login')
   }, 1000);
  }
  if(message){
    toast.success(message,{position:toast.POSITION.TOP_CENTER})
    setTimeout(() => {
      dispatch(clearState())
      navigate('/BlogList')
   }, 1000);
  }
})

   const  defaultvalue={
    userEmail:'',
    userPassword:''

   }

   const validationSchema= yup.object().shape({
          userEmail:yup.string().required().email("please enter your name"),
          userPassword:yup.string().required("please enter your name").min(8,"password must be a 8 char"),
        })
            
        const handleSubmit =  (values) => {
            //console.log("value",values);
            let obj={
              ...values
            }
            dispatch(signInUser(obj))
          };
  return (
   <>
   <ToastContainer/>
   <Formik
             initialValues={defaultvalue}
             validationSchema={validationSchema}
             onSubmit={handleSubmit}
               >
    <div className='container'>
    <div className='login'>
         <h1>Login</h1>
         <Form>
                  <Field type='Text' placeholder='Email ID' name="userEmail"></Field><br></br><br></br>
                  <ErrorMessage name="userEmail"></ErrorMessage>
                  <Field type='password' placeholder='password' name="userPassword"></Field><br></br><br></br>
                  <ErrorMessage name="userPassword"></ErrorMessage><br></br>
                  <h5 style={{marginLeft:"250px", marginTop:"-10px"}}>Forgot password</h5>
                  <input  id='btn' type='submit' value="login"></input>
                  <p style={{textAlign:"center"}}>I dont have an account</p>
                  <h4 style={{textAlign:"center"}}><Link to='/signup'>Register</Link></h4>
         </Form>
    </div>
    </div>
    </Formik>
   </>
  )
}

export default Login
