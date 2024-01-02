import React, { useEffect, useState } from "react";
import "./AddBlog.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Navbar from "../../Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { AddNewBlog } from "../../Features/Blog/BlogSlice";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
const AddBlog = () => {
  const dispatch = useDispatch();
  const [pic, setPic] = useState("");
  const navigate = useNavigate();
  const BlogData = useSelector((state) => state.Blog);
  let { error, blogCreate_msg, loading } = BlogData;  
                                                       
  useEffect(() => {
    if (error) {
      toast.error(error, { position: toast.POSITION.TOP_CENTER });
      
    }
    if (blogCreate_msg) {
      toast.success(blogCreate_msg, { position: toast.POSITION.TOP_CENTER });
       setTimeout(()=>{
        navigate("/BlogList")
       },500)
    }
  }, [blogCreate_msg, error]);
                                 

  const initialState = {
    title: "",
    description: "",
  };
  const validationSchema = yup.object().shape({
    title: yup.string().required("enter title"),
    description: yup.string().required("please enter your disc"),
  });

  const handleSubmit = (values) => {
    console.log("value", values);
    let obj = {
      ...values,
      blogPic: pic.name,
    };
    console.log(obj);
    dispatch(AddNewBlog(obj));
  };

  const picSelect = (e) => {
    console.log(e.target.files[0])
    setPic(e.target.files[0]);
  };
  return (
    <>
      <Navbar />
      <ToastContainer />
      <Formik
        initialValues={initialState}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <div className="Blog-new">
          <h2>Add Blog</h2>
          <hr></hr>
          <Form>
            <Field type="text" placeholder="title" name="title"></Field>
            <br></br>
            <br></br>
            <ErrorMessage name="title"></ErrorMessage>
            <Field
              id="disc"
              type="text"
              placeholder="description"
              name="description"
            ></Field>
            <br></br>
            <br></br>
            <ErrorMessage name="description"></ErrorMessage>
             <br></br>
             <input type="file" name="blogPic" onChange={picSelect}></input>
            <button type="submit" value="submit">submit</button> 
          </Form>
        </div>
      </Formik>
    </>
  );
};

export default AddBlog;
