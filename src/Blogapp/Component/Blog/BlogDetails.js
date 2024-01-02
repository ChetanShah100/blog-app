import React, { useEffect } from "react";
import Navbar from "../../Navbar/Navbar";
import "./BlogDetails.css";
import { useParams,Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBlogDetails } from "../../Features/Blog/BlogSlice";
const BlogDetails = () => {
  const param = useParams();
  const { id } = param;
  const dispatch = useDispatch();
  const blog_detail = useSelector((state)=>state.Blog);
  const {blog_Details , comments}  = blog_detail;
  const {title, description } = blog_Details;
  console.log('comments: ',comments);
  useEffect(() => {
    console.log(id);
    dispatch(getBlogDetails(id));
  }, []);
   
  return (
    <>
      <Navbar />
     
      <div className="BlogDetails">
      <div className="BlogDetails-img">
      </div>
      <div style={{marginLeft:"20px"}}>
      <h1>{title}</h1>
         <h3>{description}</h3>
         <h3 style={{marginTop:"120px"}}><Link style={{textDecoration:"none"}} to={`/comment/${id}`}>Add Comment:💬</Link></h3>
      </div> 
      </div>
    
      {
        comments && comments.map((comment)=>{
          const{profilePic}=comment.userId
          const imageUrl=profilePic.split('\\uploads\\')[1];
          return(
            <>
            
            <div className="comments">
            
             <div className="comments-2">
             <img src={`http://localhost:7000/uploads/${imageUrl}`} alt="userImage"></img>
             <h4>{comment.userId.userName}</h4>
            <h3>Comment</h3>
            <h2>{comment.comment}</h2>
            
          <h4>{comment.createdAt.slice(0,10)}</h4>
             </div>
             </div>
            
             
           
            </>
          )
        })
      }
      
    </>
  );
};

export default BlogDetails;
