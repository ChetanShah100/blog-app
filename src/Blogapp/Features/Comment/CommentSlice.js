import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

let initialState={
    cmtCreate_msg:'',
    loading :false,
    error:'',
}

///Async Add comment 
export const CreateComment=createAsyncThunk(
'blog/comment',
  async(body,thunkAPI)=>{
    const response=await axios.post(`http://localhost:7000/comment/add/${body.blogId}`,{...body},
    );
    console.log("response",response)
    return response.data;

  }

);

const commentSlice=createSlice({
    name:"comment",
    initialState,
    reducers:{
        clearState:(state)=>{
            state.cmtCreate_msg='';
            state.error='';
        }
    },



    extraReducers:(builder)=>{
        builder
        .addCase(CreateComment.pending,(state)=>{
            state.cmtCreate_msg='';
            state.error='';
            state.loading=true;
        })
        .addCase(CreateComment.fulfilled,(state,{payload})=>{
           state.loading="false";
           state.cmtCreate_msg=payload.message;
           console.log('comment add  successful')
           console.log("fulfilled")
           
        })
        .addCase(CreateComment.rejected,(state,{payload})=>{
            state.loading=false;
            state.error=payload.error;
        })
        
    }
})

 export default commentSlice.reducer;
 export const{clearState}=commentSlice.actions;