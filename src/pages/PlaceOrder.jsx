import React from 'react'
import './PlaceOrder.css'
import Custom_Order from '../../public/custom-order.jpeg'
import Buy_Order from '../../public/buy.jpeg'
import Repair_Order from '../../public/repair.jpeg'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {
    const navigate=useNavigate()
  return (
    <div className='placeorder'>
        <h2>Our Services</h2>
     <div className='placeorder-container'>
        <div className='placeorder-container-box'>
            <h4>Custom Orders</h4>
            <img className='image'src={Custom_Order} alt="customOrder" />
            <button onClick={()=>navigate("/customOrder")}>Create Cusom Order</button>
        </div>
        <div className='placeorder-container-box'>
        <h4>Request Repair Serive</h4>
            <img src={Repair_Order} alt="" />
            <button onClick={()=>navigate("/repairrequest")}>Request Repair</button>
        </div>
        <div className='placeorder-container-box'>
        <h4>Purchase Exisiting Items</h4>
            <img src={Buy_Order} alt="" />
            <button>Browse Items(coming soon)</button>
        </div>
     </div>
    </div>
  )
}

export default PlaceOrder
