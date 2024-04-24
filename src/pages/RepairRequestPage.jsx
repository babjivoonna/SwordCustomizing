import React, { useState } from 'react'
import './RepairRequestPage.css'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const RepairRequestPage = () => {
    const [selectFile,setSelectedFile]=useState({img:"",description:"",inProgress:""})
    const [orderSuccessful,setOrderSuccessful]=useState(false)
    const navigate=useNavigate()
    const handleChange=(e,type)=>{
        if (type === 'file') {
            const file = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = () => {
                setSelectedFile(prevState => ({ ...prevState, img: reader.result }));
              };
              reader.readAsDataURL(file);
            }
          } 
    if(type=="text"){
        setSelectedFile((prev)=>({...prev,description:e.target.value,inProgress:"inProgress"}))
  
    }      
}
const retrieveObj=JSON.parse(localStorage.getItem("RepairOrders"))||[]
const handleSubmit=()=>{
    if((selectFile.img&&selectFile.description)!==""){
        localStorage.setItem("RepairOrders",JSON.stringify([...retrieveObj,selectFile]))
      setOrderSuccessful((prev)=>!prev)
      {Swal.fire({
        title: "Repair Request Placed!",
        text: "You Repair Request will we solved soon!",
        icon: "success"
      })}
        
    }
}
    
  return (
    <div className='Repair-Request'>
       {!orderSuccessful&& <div>
        <h2>Submit Repair Request</h2>
        <p>Please provide the necessary details about the repair needed</p>
        </div>}
     {!orderSuccessful&&<div className='Repair-Request-form'>
        <div className='Repair-Request-form-column1'>
        <h4>Upload and Image</h4>
        <input type="file" onChange={(e)=>handleChange(e,"file")} />
        </div>
        <div className='Repair-Request-form-column2'>
        <h4>Description</h4>
        <input type="text" onChange={(e)=>handleChange(e,"text")}/>
        <button onClick={handleSubmit}>Submit Order</button>
        </div>
      </div>}
      {
        orderSuccessful&& <div style={{ width:"30rem",height:"10rem",display:"flex",flexDirection:"column",alignItems:"center",gap:"10px"}}>
          <p>✅</p>
          <p>Order Created SuccessFully</p>
          <p>Your order has been created, we'll email you when it's ready</p>
          <button className='btn' onClick={()=>navigate("/")}>Go to Home</button>
          <button className='btn' onClick={()=>navigate("/userProfile")}>To Track The Order</button>
        </div>
       }
    </div>
  )
}

export default RepairRequestPage
