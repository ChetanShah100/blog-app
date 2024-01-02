import React from 'react'
import './Navbar.css'
import {useNavigate} from 'react-router-dom'
const Navbar = () => {

  const navigate=useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user);

  function handleLogOut(){
  localStorage.clear();
  navigate('/login')
  }

  console.log(user.profilePic);
  const profilePics=user.profilePic;
  console.log(profilePics)
  const imageUrl= profilePics.split('\\uploads\\')[1];
  console.log(imageUrl)
  return (
    <div>
      <>
      <div className='Navbar'>
            <h2 style={{marginLeft:"50px"}}>Blog</h2>
            <div className='link'>
                                                                    
              <h4 > MyPost</h4>
              <h4 className='blog'>Blog</h4>
              <h4><span className='Welcome'>Welcome: </span><span style={{whiteSpace:'nowrap'}}>{user.userName}</span></h4>
              <img src={`http://localhost:7000/uploads/${imageUrl}`} style={{width:"40px",height:"40px"}}></img>
              <button onClick={handleLogOut}>Logout</button>
            </div>
       </div>
       
      </>
    </div>
  )
}

export default Navbar
