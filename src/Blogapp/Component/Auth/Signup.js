import React, { useEffect, useState } from 'react'
import './Signup.css'
import {Field, Form, Formik,ErrorMessage} from 'formik'
import * as yup from 'yup'
import { clearState,signupUser } from '../../Features/Auth/authSlice'
import {useDispatch, useSelector} from 'react-redux'
import {ToastContainer,toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import {Link} from 'react-router-dom'
const Signup = () => {
   
    const dispatch = useDispatch();
    const [pic,setPic]=useState("")
     const data=useSelector((state)=>state.user);
     let{error,message,loading}=data;

    useEffect(()=>{
      if(error){
        toast.error(error,{position:toast.POSITION.TOP_CENTER})
      }
      if(message){
        toast.success(message,{position:toast.POSITION.TOP_CENTER})
      }
    })
     const initialState={
        userName:'',       
        userEmail:'',
        userPassword:'',
        userCity:'',
        userState:''
     }
     const validationSchema= yup.object().shape({
        userName:yup.string().required("please enter your name"),
        userEmail:yup.string().required().email("please enter your name"),
        userPassword:yup.string().required("please enter your name").min(8,"password must be a 8 char"),
        userCity:yup.string().required("please enter your name"),
        userState:yup.string().required("please enter your name")
      })
    const handleSubmit=(values)=>{
        let obj={  
            profilePic:pic,
            ...values,      
           }
          //  console.log(obj)
           dispatch(signupUser(obj))
      }
      const picSelect=(e)=>{
        setPic(e.target.files[0]);
      }

  return (
    <>
  <ToastContainer/>
    <Formik 
            initialValues={initialState}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
    >
    <div className='main'>
    <div className='signup'>
        <h1> Sign Up</h1>
       <Form>   
                  <Field type='Text' placeholder='Full Name' name="userName"></Field><br></br><br></br>
                  <ErrorMessage name="userName"></ErrorMessage>
                  <Field type='Text' placeholder='Email ID' name="userEmail"></Field><br></br><br></br>
                  <ErrorMessage name="userEmail"></ErrorMessage>
                  
                  <Field type='password' placeholder='password' name="userPassword"></Field><br></br><br></br>
                  <ErrorMessage name="userPassword"></ErrorMessage>
                  <Field type='text' placeholder='city' name="userCity"></Field><br></br><br></br>
                  <ErrorMessage name="userCity"></ErrorMessage>
                  <Field type='text' placeholder='state' name="userState"></Field><br></br><br></br>
                  <ErrorMessage name="userState"></ErrorMessage>
                  <input type="file" placeholder='choose image' onChange={picSelect}></input><br></br>

                  <input id='button' style={{width:"20%", marginLeft:"160px"}} type='submit' value='Sign Up'></input><br></br>
                  <p style={{textAlign:"center"}}>I have already an account</p>
                  <h4 style={{textAlign:"center"}}><Link to='/login'>Login</Link></h4>
       </Form>
       
    </div>

    </div>
    </Formik>
    </>
  )
}

export default Signup

