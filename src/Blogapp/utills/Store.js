import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware } from "@reduxjs/toolkit";
import authSlice from "../Features/Auth/authSlice";
import {thunk} from 'redux-thunk'
import BlogSlice from "../Features/Blog/BlogSlice";
import CommentSlice from "../Features/Comment/CommentSlice";
const store = configureStore(
    {
        reducer : {
           
            user : authSlice,
            Blog:BlogSlice,
            comment:CommentSlice,
        },

    },
    applyMiddleware(thunk) 
);          

export default store;