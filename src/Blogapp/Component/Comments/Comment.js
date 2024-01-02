import React, { useEffect } from 'react'
import './Comment.css'
import { Formik,Field,Form, ErrorMessage } from 'formik'
import * as yup from "yup"
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { CreateComment, clearState } from '../../Features/Comment/CommentSlice'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import Navbar from '../../Navbar/Navbar'
const Comment = () => {
    const navigate=useNavigate()
   const params=useParams();
   const dispatch=useDispatch();
   const {id}=params;
   const comment=useSelector((state)=>state.comment);
   const {cmtCreate_msg,error}=comment;
                                                                              
   const user = JSON.parse(localStorage.getItem('user'));


   useEffect(()=>{
    if(cmtCreate_msg){
        toast.success(cmtCreate_msg,{position:toast.POSITION.TOP_CENTER})
        dispatch(clearState());
        setTimeout(()=>{
            navigate(`/BlogDetails/${id}`)
        },500)
    }
    if(error){
        toast.error(error,{position:toast.POSITION.TOP_CENTER})

    }
   },[cmtCreate_msg,error]);
    const initialState={
        comment:""
    }
    const validationSchema=yup.object().shape({
        comment:yup.string().required("enter the comment")
    })
    const handleSubmit=(values)=>{
    const obj={
        ...values,
        blogId : id,
        userId : user._id,
    }
    console.log(obj)
    dispatch(CreateComment(obj));
    }
  return (
   <>
   <Navbar/>
   <ToastContainer/>
    <div className='comment'>
       <h2>Comment</h2>
    <hr></hr>
    <Formik
    initialValues={initialState}
    validationSchema={validationSchema}
    onSubmit={handleSubmit}
    >
    <Form>
   <Field type='text' placeholder='Enter your Comment' name="comment"></Field>
   <ErrorMessage name='comment'></ErrorMessage>
  <button type='submit'>Add</button>
  </Form>
  </Formik>
    </div>
   </>
  )
}

export default Comment
