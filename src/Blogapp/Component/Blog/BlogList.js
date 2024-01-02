import React, { useEffect } from "react";
import "./BlogList.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { listBlog } from "../../Features/Blog/BlogSlice";

const BlogList = () => {
  const dispatch = useDispatch();
  const blogData = useSelector((state) => state.Blog);
  // console.log(blogData)
  const { blog_Data } = blogData;
  useEffect(() => {
    dispatch(listBlog());
  }, []);
  return (
    <>
      <Navbar />
      <div className="Blog">
        <div className="Blog-1">
        <div>
          <h2 style={{color:"tomato",marginLeft:"20px"}}>MY Blog</h2>
          </div>
          <div>
          <button style={{width:"100%"}}>
            <Link to="/AddBlog" style={{textDecoration:"none", color:"black",fontWeight:"bold", }}>AddBlog</Link>
          </button>
          </div>
        </div>
        <div className="blog-3">
            {blog_Data &&
              blog_Data.map(({ _id, title, description , blogPic,createdAt }) => {
                console.log('blogpic:',blogPic);
                
                return (
                  <>
                  <Link to={`/BlogDetails/${_id}`} style={{textDecoration:"none",color:"black"}}>
                  <div className="blog-3a" >
                    <div className="blog-3aImg">
                     <img src={`http://localhost:7000/uploads/${blogPic}`} alt='blogImages'/>
                    </div>
                    <h3>{title}</h3>
                    <p className="des">{description}</p>
                    <h5 style={{marginTop:"40px"}}> Date:{createdAt.slice(0,10)}</h5>
                    
                    </div>
                  </Link>
                  </>
                );
              })}
          
        </div>
      </div>
    </>
  );
};

export default BlogList;
