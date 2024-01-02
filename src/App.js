import logo from './logo.svg';
import './App.css';
import Signup from './Blogapp/Component/Auth/Signup';
import Login from './Blogapp/Component/Auth/Login';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import AddBlog from './Blogapp/Component/Blog/AddBlog';
import BlogList from './Blogapp/Component/Blog/BlogList';
import Navbar from './Blogapp/Navbar/Navbar';
import BlogDetails from './Blogapp/Component/Blog/BlogDetails';
import Comment from './Blogapp/Component/Comments/Comment';
function App() {
  return (
    <>
    
     {/* <BlogList/> */}
    {/* <AddBlog/>  */}
     <BrowserRouter>
      <Routes> 
       <Route path='/AddBlog' element={<AddBlog/>}></Route>
        <Route path='/BlogList' element={<BlogList/>}></Route>        
        <Route path='/login' element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/BlogDetails/:id" element={<BlogDetails/>}></Route>
        <Route path="/Comment/:id" element={<Comment/>}></Route>       
      </Routes>
    </BrowserRouter>
     
  
    </>
  );
}

export default App;
