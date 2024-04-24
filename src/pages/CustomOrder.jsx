import React, { useState } from 'react'
import './CustomOrder.css'
import  {FontAwesomeIcon}  from '@fortawesome/react-fontawesome';
import {faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { Objects } from './Data';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';



const upGradePackeges=["Flaming","Shock","Masterworkd Quality","Defender","Serrated","Mystic Runes","Gleaming","Soulbound"
,"Frost","Keen","Vorpal Edge","Vicious","Thunderous Blows","Venomous","Thunderous Blows","Venomous Coating","Returning"]
const CustomOrder = () => {
  const [dropDown,setDropDown]=useState(["Iron","Steel","Mithril","Adamantine","Dragonbone","Obsidain"])
  const [selected,setSelected]=useState("")
  const [upgradePackages,setUpgradePackages]=useState({materialType:"",upGrades:[],img:[],date:"",inProgress:""})
  const [isOpen,setIsOpen]=useState(false)
  const [orderSuccessful,setOrderSuccessful]=useState(false)
  const navigate=useNavigate()
  const addCustomItem = (itemName) => {
    setSelected(itemName);
  };
  
  const upGradeItems = (e) => {
    if (e.target.checked) {
      setUpgradePackages((prev) => ({
        ...prev,
        upGrades: [...prev.upGrades, e.target.value],
        img: selected,
        inProgress:"inProgress"
      }));
    } else {
      const filtered = upgradePackages.upGrades.filter((ele) => ele !== e.target.value);
      setUpgradePackages((prev) => ({ ...prev, upGrades: filtered }));
    }
  };
  const retrieve=JSON.parse(localStorage.getItem("customOrder"))||[]
  const handleSubmit=()=>{
    localStorage.setItem("customOrder",JSON.stringify([...retrieve,upgradePackages]))
    setOrderSuccessful(!orderSuccessful)
    {Swal.fire({
      title: "Order Placed!",
      text: "You placed the order!",
      icon: "success"
    })}

  }
  console.log({upgradePackages})
  
  return (
    <div className={orderSuccessful?"Order":""}>
    {!orderSuccessful&&( <div className='CustomOrder'>
    <div className='customOrder-container'>
        {Objects.map((ele)=>{
         return <div onClick={()=>addCustomItem(ele.name)} className={`customOrder-container-box  ${selected===ele.name&&"select"}`}>
          <img src={ele.img} alt="LongSword" />
          <h4>{ele.name}</h4>
          <button>Select</button>
      </div>
        })}
              </div>
              <div className='customOrder-DropDown'>
           <div className='customOrder-DropDown-Box'
           onClick={()=>{setIsOpen(!isOpen)}}
           ><p>{upgradePackages.materialType?upgradePackages.materialType:"Select Option"}</p> <p ><FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} /></p></div>
           {
            isOpen&& <div className='customOrder-DropDown-SelectBox'>
              {
                dropDown.map((ele)=>{
                  return (
                    <p className={upgradePackages.materialType===ele&&"customOrder-select"} onClick={()=>setUpgradePackages((prev)=>({...prev,materialType:ele}))}>{ele}</p>
              )
                })
              }
            </div>
           }
       <div className='upGradePackeges'>
           {
           upGradePackeges.map((ele)=>{
            return(<div>
              <input type="checkbox" value={ele} onChange={upGradeItems}/>
              <p>{ele}  (Lorem ipsum dolor sit amet consectetur.)</p>
            </div>)
           })
           }
       </div>
              </div>
       <button onClick={handleSubmit}>Submit Order</button>
       
    </div>)}
    {
        orderSuccessful&& <div style={{ width:"30rem",height:"10rem",display:"flex",flexDirection:"column",alignItems:"center",gap:"10px"}}>
         
          <p>✅</p>
          <p>Order Created SuccessFully</p>
          <p>Your order has been created, we'll email you when it's ready</p>
          <button onClick={()=>navigate("/")}>Go to Home</button>
          <button onClick={()=>navigate("/userProfile")}>Too See Order Track</button>
        </div>
       }
    </div>
  )
}

export default CustomOrder
