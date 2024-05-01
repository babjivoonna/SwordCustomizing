import React, { useEffect, useState } from 'react'
import './SignUp.css'
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useContext } from 'react';
import * as Yup from 'yup'
import { storeProvider } from '../Context/Context';



const SignUp = () => {
  const { setUserLogInData, setUserSignUpData,}=useContext(storeProvider)

    const navigate=useNavigate()
    const [data, setData] = useState({
        email:"",
        name:"",
        phoneNumber:"",
        password:"",
        cpassword:"",
        gender:"",
        img:"",
        google:false
      });
      const [guestData,setGuestData]=useState({email:""})
      const [errors,setErrors]=useState({})
      const validationSchema=Yup.object({
        name:Yup.string().required("First Name is Required"),
        lastName:Yup.string().required("Last Name is Required"),
        email:Yup.string().required("Email is Required").email("Invalid email format"),
        phoneNumber:Yup.string().matches(/^\d{10}$/,"phone Number be 10 digits").required(),
        password:Yup.string().required("Password is required").min(5,"Password must be at least 8 characters").matches(/[!@#$^(),.?":{}|<>]/,"Password must contain at least one symbol")
        .matches(/[0-9]/,"Password must contain at least one  number").matches(/[A-Z]/,"Password must contain at least one uppercase number").matches(/[a-z]/,"password must contain at least one lowercase"),
        cpassword:Yup.string().oneOf([Yup.ref("password")],"Passwords must match").required("Confirm password is required"),
        gender:Yup.string().required("Gender is required")
      })
      const [googleUserDetails,setGoogleUerDetials]=useState()
      const handleChange = (e) => {
        if(errors){
          setErrors({})
        }
        let value= e.target.value,
          name = e.target.name;
        setData((prevdata) => {
          return { ...prevdata, [name]: value };
        });
      };

      useEffect(()=>{
        if(googleUserDetails){
          const {picture,email,name,iat}=googleUserDetails
          setData((prev)=>{
            return {...prev,img:picture,email,name,password:iat,cpassword:iat,google:true}
          })
        }
       
      },[googleUserDetails])
      useEffect(()=>{
        if(data.img){
          handleGoogleSubmit()
          navigate("/")
        }
      },[data])
      const retriveData=JSON.parse(localStorage.getItem("signUp"))||[]
      const handlesubmit=async(e)=>{
         e.preventDefault()
         try{
          await validationSchema.validate(data,{abortEarly:false});
          localStorage.setItem("signUp",JSON.stringify([...retriveData,data]))
          navigate("/signIn")
         }catch(error){
            const newError={}
            error.inner.forEach((err)=>{
              newError[err.path]=err.message
            })
            setErrors(newError)
         }
           
          }
          const handleGoogleSubmit=()=>{
            let totalData=[...retriveData,data]
            if(retriveData){
              localStorage.setItem("signUp",JSON.stringify([...retriveData,data]))
              localStorage.setItem("logIn",JSON.stringify(data))
              setUserSignUpData(totalData)
              setUserLogInData(data)

           
          }
         }
         useEffect(()=>{
          if(guestData.email){
            navigate("/")
          }
         },[guestData])
         const guestUser=()=>{
          let guest={...guestData}
            guest.email="GuestUserWithBabji"
          setGuestData(guest
        ); 
        let totalData=[...retriveData,guest]
            if(retriveData){
              localStorage.setItem("signUp",JSON.stringify([...retriveData,guest]))
              localStorage.setItem("logIn",JSON.stringify(guest))
              setUserSignUpData(totalData)
              setUserLogInData(guest)
            }
          
         }
      
  return (
    <div className='SignUp'>
     
      <form  className="form"onSubmit={handlesubmit}>
        <h2>SingUP</h2>
        <p>
        <GoogleLogin
        style={{marginLeft:"rem"}}
  onSuccess={credentialResponse => {
    let token=jwtDecode(credentialResponse?.credential)
    setGoogleUerDetials(token)
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>
</p>
Or
  <button onClick={guestUser}>Login As a Guest User</button>
       {/* <section onClick={()=>handleGoogleSignUp ()} className='google'> 
       
       <img src="https://clipartcraft.com/images/google-logo-transparent-2.png" alt="GoogleImage" /> 
       <button > Continue wiht Google</button>
       </section> */}
        
        <div>
        
      <label htmlFor='name'>Name:
        </label>
        <input type="text"  name="name" value={data.name}    onChange={handleChange} />
        {errors.name&&<div style={{color:"red"}}>{errors.name}</div>}
        </div>
        <div>
        <label htmlFor="email">Email:
      </label>
      <input type="text" name="email" onChange={handleChange} />
      {errors.email&&<div style={{color:"red"}}>{errors.email}</div>}
      </div>
      <div>
        <label htmlFor="phonenumber">PhoneNumber:
      </label>
      <input type="text" name="phonenumber" onChange={handleChange} />
      {errors.phoneNumber&&<div style={{color:"red"}}>{errors.phoneNumber}</div>}
      </div>
      <div>
      <label htmlFor="password">Password:
      </label> 
      <input type="text" name="password"value={data.password}   onChange={handleChange} />
      {errors.password&&<div style={{color:"red"}}>{errors.password}</div>}
      </div>
      <div>
      <label htmlFor="cpassword">ConfirmPassword:
      </label>
      <input type="text" name="cpassword" value={data.cpassword}  onChange={handleChange} />
      {errors.cpassword&&<div style={{color:"red"}}>{errors.cpassword}</div>}
      </div>
      <div>
        <label htmlFor="gender"> Gender:
      </label>
            <select name="gender" value={data.gender} onChange={handleChange}>
              <option>select</option>
                <option>male</option>
                <option>female</option>
                <option>others</option>
            </select>
            {errors.gender&&<div style={{color:"red"}}>{errors.gender}</div>}
      </div>
      <p  style={{color:"white",cursor:"pointer"}}>Already have an accout?<button onClick={()=>navigate('/signIn')} className='sign-btn'>LogIn</button>or<button onClick={()=>navigate("/")} className='sign-btn'>➡️Home</button></p>
      <button type="submit">submit</button>
      </form>
     
    </div>
  )
}

export default SignUp
