import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

let initialState={
    blogCreate_msg:'',
    blogList_msg:'',
    blogDetails_mag:'',
    blog_Data:'',
    blog_Details:'',
    loading: false,
    error:'',
    count:'',
    comments : ''
}
//GetBlogDetails

export const getBlogDetails=createAsyncThunk(
    "blog/BlogDetails",
    async (id,thunkAPI)=>{
        console.log(id);
        const response=await fetch(`http://localhost:7000/blog/details/${id}`,{
            method:"get",
            header:{
                Accept:"application/json",
                "Context-type":"application/json",

            },
        });
        let data=await response.json();
        console.log("data",data)
        return data;
    }

)

export const AddNewBlog=createAsyncThunk(
    'blog/Add',
    async (body,thunkAPI)=>{
        console.log(body)
        const response =await axios.post("http://localhost:7000/blog/create",body,{
            headers:{
                Accept:"application/json",
                "context-type" :"multiple/form-data",
            },
        });
        return response;
    }
)
export const listBlog=createAsyncThunk(
   'blog/List',
   async (thunkAPI)=>{
     const response =await fetch("http://localhost:7000/blog/blogs",{
        method:'get',
        header:{
            "Content-Type":"multipart/form-data",
        }
     });
     let data=await response.json();
     console.log("blog retrieve from server",data);
     if(data.success){
        console.log("get data success")
        return data;
     }
     else{
        return thunkAPI.rejectWithValue(data);
     }
   }
)


const BlogSlice = createSlice({
    name:'blog',
    initialState,
    reducers:{
        clearState : (state) =>{
            state.blogCreate_msg ="";
            state.error = "";
            
        },

    },

    extraReducers :(builder)=>{
      builder
      ///Add blog
        .addCase(AddNewBlog.pending, (state,{payload}) =>{
            console.log("Pending.....");
            state.loading = true;
            state.error = "";
            state.blogCreate_msg = ""
        })
        .addCase(AddNewBlog.fulfilled, (state,{payload}) =>{
            state.loading = false;
            console.log("Successful.....",payload);
            state.blogCreate_msg = payload.data.message;
        })
        .addCase(AddNewBlog.rejected,(state,{payload}) =>{
            console.log("This is Error.....",payload);
            console.log("Request Rejected")
            state.loading = false;
            state.error = payload.error;
            console.log("I am error function")
        })
        .addCase(listBlog.pending,(state)=>{
            state.loading=true;
        })
        .addCase(listBlog.fulfilled,(state,{payload})=>{
            state.loading=false;
            if(payload.error){
                 state.error=payload.error;
            }else{
                state.blogList_msg=payload.message;
                state.blog_Data=payload.blog;
                state.count=payload.count;
            }
        })
           .addCase(listBlog.rejected,(state,{payload})=>{
        state.loading=false;
        state.error=payload.error;
              })
       .addCase(getBlogDetails.pending,(state,{payload})=>{
          state.loading=true;
          state.error="";
          state.blogDetails_mag="";
          state.blog_Details="";
       })
       .addCase(getBlogDetails.fulfilled,(state,{payload})=>{
        state.loading=false;
        if(payload.error){
             state.error=payload.error;
            state.blogCreate_msg="";

         }else{
             state.blogDetails_mag=payload.message;
            state.blog_Details=payload.blog;
            state.comments = payload.comment;
            state.error="";

         }
        })
      .addCase(getBlogDetails.rejected,(state,{payload})=>{
     state.loading=false;
     state.error=payload.error;
      state.blogDetails_mag="";
      state.blog_Details="";

       });
          
                        
    }

})
                                 
                             
export default BlogSlice.reducer
export const {clearState}=BlogSlice.actions