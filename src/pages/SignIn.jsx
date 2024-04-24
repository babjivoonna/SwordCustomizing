import React, { useEffect, useState } from 'react'
import './SignIn.css'
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useContext } from 'react';
import { storeProvider } from '../Context/Context';



const SignIn = () => {
    const [data, setData] = useState({
        email:"",
        password:"",
        img:""
         
      });
      const {userSignUpData, setUserLogInData}=useContext(storeProvider)
      const [googleUserDetails,setGoogleUerDetials]=useState()
      const navigate=useNavigate()
    const handleChange = (e) => {
        let value= e.target.value,
          name = e.target.name;
        setData((prevdata) => {
          return { ...prevdata, [name]: value };
        });
      };
      useEffect(()=>{
        handleGoogleSubmit()
         
      },[googleUserDetails])
      useEffect(()=>{

        if(data.email&&googleUserDetails){
          console.log("data")
          handleGooglesUserValidation()
        } 
      },[data])
      
     
      const handlesubmit=(e)=>{
          e.preventDefault()
          if(data.email&&data.password){
            const filterData=userSignUpData.find((ele)=>ele.email===data.email)
          if(filterData.email===data.email){
            localStorage.setItem("logIn",JSON.stringify(data))
            setUserLogInData(data)
            navigate("/")
          }
          else{
            alert("email or password incorrect")
          }
          }
          else{
            alert("email and password must be filled")
          }
        }
        const handleGoogleSubmit=()=>{
          if(googleUserDetails){
          let passwordValue= googleUserDetails.iat
         let  email = googleUserDetails.email;
         let img=googleUserDetails.picture
        setData((prevdata) => {
          return { ...prevdata, email:email,password:passwordValue,img:img};
        });
      }
        }
        const handleGooglesUserValidation=()=>{
          const filterData=userSignUpData.find((ele)=>ele.google===true)
          if(filterData.email===data.email){
            localStorage.setItem("logIn",JSON.stringify([...retrieveData,data]))
            navigate("/")
          }
        }
  return (
    <div className='SignIn'>
    <form  className="form1"onSubmit={handlesubmit}>
      <h2>SingIN</h2>
      <GoogleLogin
  onSuccess={credentialResponse => {
    let token=jwtDecode(credentialResponse?.credential)
    setGoogleUerDetials(token)
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>;
      {/* <section onClick={()=>LogIn()} className='google'> 
       
       <img src="https://clipartcraft.com/images/google-logo-transparent-2.png" alt="GoogleImage" /> 
       <button > Continue wiht Google</button>
       </section> */}
      <div>
      <label htmlFor="email">Email:
    </label>
    <input type="text" name="email" onChange={handleChange} />
    </div>
    
    <div>
    <label htmlFor="password">Password:
    </label> 
    <input type="text" name="password"value={data.password}   onChange={handleChange} />
    </div>
    <p style={{color:"white"}}> Don't have an account?  <button onClick={()=>navigate('/signUp')}className='sign-btn'>SingUP</button></p>
    <button type="submit">submit</button>
    </form>
  </div>

  )
}

export default SignIn
