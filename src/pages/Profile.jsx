import React, { useEffect, useState } from 'react'
import './Profile.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCheck, faHammer, faBox } from '@fortawesome/free-solid-svg-icons';
import {Objects} from '../pages/Data'
import { useContext } from 'react';
import { storeProvider } from '../Context/Context';

const Profile = () => {
  const customOrders=JSON.parse(localStorage.getItem("customOrder"))||[]
  const repairOrders=JSON.parse(localStorage.getItem("RepairOrders"))||[]
  const [orderStep,setOrderStep]=useState("Orders")
  const [userRepairOrders,setUserOrders]=useState(repairOrders)
  const[userCustomOrders,setUserCustomOrders]=useState(customOrders)
  const [orderType,setOrderType]=useState("")
  const [popup,setPopUp]=useState(false)
  const [selectedObj,setSelectedObj]=useState({})
  const {userLogInData}=useContext(storeProvider)
  
 
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };

  const formattedDateTime = currentDateTime.toLocaleDateString('en-US', options);
  useEffect(() => {
    if (orderType === "") {
      orderTrack();
    }
  }, [orderStep, orderType]);
  
  const orderTrack=()=>{
    if(orderStep==="Orders"){
   setUserOrders(repairOrders)
     return
    }
    if(orderStep==="inProgress"){
      const filterOrder=repairOrders.filter((ele)=>ele.inProgress==="inProgress")
      setUserOrders(filterOrder)
      return
    }
    if(orderStep==="Ready for pickup"){
      const filterOrder=repairOrders.filter((ele)=>ele.inProgress==="completed")
      setUserOrders(filterOrder)
      return
    }
    if(orderStep==="completed"){
      const filterOrder=repairOrders.filter((ele)=>ele.inProgress==="completed")
      setUserOrders(filterOrder)
      return
    }
  }
  // console.log({userRepairOrders})
  const orderTrack2=()=>{
    if(orderType==="Orders"){
      setUserCustomOrders(customOrders)
      return
    }
    if(orderType==="inProgress"){
      const filterOrder=customOrders.filter((ele)=>ele.inProgress==="inProgress")
      setUserCustomOrders(filterOrder)
      return
    }
    if(orderType==="Ready for pickup"){
      const filterOrder=customOrders.filter((ele)=>ele.inProgress==="completed")
      setUserCustomOrders(filterOrder)
      return
    }
    if(orderType==="completed"){
      const filterOrder=customOrders.filter((ele)=>ele.inProgress==="completed")
      setUserCustomOrders(filterOrder)
      return
    }
  }
  console.log(currentDateTime,"currentDateTime")
  useEffect(()=>{
    orderTrack2()
    console.log("orderType")
  },[orderType])
  const slicing = (string) => {
    let array = string.split("");
    let slicedArray = array.slice(0, 13); 
    let joinedString = slicedArray.join(""); 
    return `${joinedString}...`; 
}
const popupAppear=(ordertype,obj,img)=>{
    if(ordertype==="repairOrder"){
      setSelectedObj(obj)
      setPopUp((prev)=>!prev)
    }
   else{
      let filtobj={...obj}
      filtobj.img=img
      setSelectedObj(filtobj)
      setPopUp((prev)=>!prev)
    }
}
console.log({selectedObj})

  return (
    <>
    <div className={`Profile ${popup&&"profile-filter"}`}>
      <div className='Profile-aside'>
        <section onClick={()=>setOrderType("")}>
            <h2  style={{borderBottom:" 1px solid white",textAlign:"center", width:"20rem"}}>Repairs</h2>
          <p onClick={()=>setOrderStep("Orders")}><FontAwesomeIcon icon={faStar} className={`icon ${orderStep==="Orders"&&'order-select'}`} />Order</p>
          <p onClick={()=>setOrderStep("inProgress")}><FontAwesomeIcon icon={faHammer} className={`icon ${orderStep==="inProgress"&&'order-select'}`} />In Progress()</p>
          <p onClick={()=>setOrderStep("Ready for pickup")}> <FontAwesomeIcon icon={faBox} className={`icon ${orderStep==="Ready for pickup"&&'order-select'}`} />Ready for pickup()</p>
          <p onClick={()=>setOrderStep("completed")}><FontAwesomeIcon icon={faCheck}  className={`icon ${orderStep==="completed"&&'order-select'}`}/>Completed()</p>
        </section>
        <aside onClick={()=>setOrderStep("")}>
        <h2 style={{borderBottom:" 1px solid white",textAlign:"center", width:"20rem"}}>Custom Order</h2> 
          <p onClick={()=>setOrderType("Orders")}><FontAwesomeIcon icon={faStar} className={`icon ${orderType==="Orders"&&'order-select'}`} />Order</p>
          <p onClick={()=>setOrderType("inProgress")}><FontAwesomeIcon icon={faHammer} className={`icon ${orderType==="inProgress"&&'order-select'}`} />In Progress()</p>
          <p onClick={()=>setOrderType("Ready for pickup")}> <FontAwesomeIcon icon={faBox} className={`icon ${orderType==="Ready for pickup"&&'order-select'}`} />Ready for pickup()</p>
          <p onClick={()=>setOrderType("completed")}><FontAwesomeIcon icon={faCheck} className={`icon ${orderType==="completed"&&'order-select'}`} />Completed()</p> 
        </aside>
      </div>
      <div
      className='Profile-section'
      >
        <div className='Profile-user-orders'>
         {!orderType&&<div className='Profile-user-orderslist'>
            <p>Repair Id</p>
            <p>Des..</p>
            <p>Email</p>
            <p>Date</p>
            <p>Stage</p>
           
          </div>}

          {
          !orderType&&userRepairOrders?.map((ele,index)=>{
            
              return(
          <div  key={index} className='Profile-user-orderslist1'>
            
            <p onClick={()=>popupAppear("repairOrder",ele)} className='img'><img src={ele.img} alt="" />{Date.now()}</p>
            <p>{slicing(ele.description)}</p>
            <p>{slicing(userLogInData.email)}</p>
            <p>{formattedDateTime}</p>
            <p>{ele.inProgress}</p>
          
          </div>

              )
            })
          }
          {
           orderType&& <div className='Profile-user-orderslist'>
            <p>Order Id</p>
            <p>Name</p>
            <p>Email</p>
            <p>Date</p>
            <p>Stage</p>
           
          </div>
          }
          {

            orderType&&  userCustomOrders?.map((ele,index)=>{
              let filterObj=Objects.find((el)=>el.name===ele.img)
              return(
          <div  key={index}className='Profile-user-orderslist1'>
            <p  onClick={()=>popupAppear("customOrder",ele,filterObj.img)} className='img'><img src={filterObj.img} alt="" />{Date.now()}</p>
            <p>{filterObj.name}</p>
            <p>{slicing(userLogInData.email)}</p>
            <p>{formattedDateTime}</p>
            <p>{ele.inProgress}</p>        
          </div>
              )
            })
          }
          
        </div>
      </div>
    </div>
      {
        popup&&<div className='popup'>
          <div className='popup-head'>
            <span>{Date.now()}</span>
            <span className="close" onClick={()=>setPopUp((prev)=>!prev)} >
              &times;
            </span>
          </div>
          <div className='popup-main'>
            <section>
                <p>itemType</p>
               {selectedObj.materialType&&<p className='sel-name'>{selectedObj.materialType}</p>}
               {selectedObj.description&& <p className='sel-des'>{selectedObj.description}</p> 
            }
           {selectedObj.materialType&& <img className='sel-name-img' src={selectedObj.img} alt="" />}
               
            </section>
           {selectedObj.name&&<aside>
              <p>Material Type</p> 
              <p>{selectedObj.materialType}</p>
            </aside>}
          </div>
          <div className='popup-footer'>
            {selectedObj.materialType&&<p style={{ marginLeft:"5rem",width:"10rem"}}>Upgrades</p>}
            {
             selectedObj.materialType&&selectedObj.upGrades.map((ele)=>{
              return <p> <p className='tick-container'><FontAwesomeIcon icon={faCheck} className='tick'/></p>{ele}</p>
             }) 
            

            }
           {selectedObj.description&& <img className='rep-img' src={selectedObj.img} alt="" />}
          </div>
          <button onClick={()=>setPopUp((prev)=>!prev)}>close</button>
        </div>
      }
      </>
  )
}

export default Profile
