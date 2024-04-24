import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { useLocation, useNavigate } from 'react-router-dom'
import NavImage from '/navimage.png'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { storeProvider } from '../Context/Context';

const Navbar = () => {
  const location = useLocation();
  const hideNavbarOnRoutes = ['/userProfile'];
  const shouldHideNavbar = hideNavbarOnRoutes.includes(location.pathname);
  const navigate =useNavigate()
  const {userLogInData}=useContext(storeProvider)
  // const [userLoginData,setUserLoginData]=useState(userLogInData)
  const userLoginData=userLogInData
  console.log(userLogInData)
  // useEffect(()=>{
  //     setUserLoginData(userLogInData)
  // },[userLogInData])
  console.log(userLogInData,"userLoginData")
  return (
    <nav className={`${shouldHideNavbar?"nonSticky-nav":"nav"}`}>
      <div className="nav-left">
        <div className="nav-left1">
            <img onClick={()=>navigate('/')} src={NavImage} alt="" />
            <p onClick={()=>navigate('/')}>The Sword Mechanic Shop</p>
        </div>
        <div 
        className="nav-left2"
        >
            <ul>
           <li><Link to="/placeOrder" className='link'>Place Order</Link></li>
                <li><Link to="/meetTeam" className='link'>Meet Our Team</Link></li>
            </ul>
        </div>
      </div>
      <div className="nav-right">
     
      <section>
        {!userLoginData?.email?(<button onClick={()=>navigate("/signUp")}>SIGN IN</button>): (<p style={{color:"white"}}>{userLoginData.email}</p>)}
       {!userLoginData?.img?(<FontAwesomeIcon onClick={()=>navigate("/userProfile")} style={{color:"white"}}icon={faUser} />):(<img onClick={()=>navigate("/userProfile")} style={{width:"2rem",height:"2rem",borderRadius:"50%"}} src={userLoginData.img} alt="UserImage"/>
      )}
      
        </section>
      </div>
    </nav>
  )
}

export default Navbar
