import React from 'react'
import Navbar from '../components/Navbar'
import './Home.css'
import HomeSword from '/Homemain.jpeg'
import Sword from '/sword.jpeg'
import Bow from '/bow.jpeg'
import Man from '/man.jpeg'
import Helmet from '/helmet.jpeg'
import Footer from '../components/Footer/Footer'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { storeProvider } from '../Context/Context';

const Home = () => {
  const navigate=useNavigate()
  
  
  return (
    <div className="home">    
      <main className="home-main">
          <img src={HomeSword} alt="HomeSword" />
        <div className="home-text"><p className="p">WELCOME TO </p><p> SWORD MECHANIC SHOP</p></div>
        <p>We specialize in custom blacksmithing projects</p>
        <button onClick={()=>navigate("/placeOrder")}>View our Services</button>      
      </main>
      <section className='home-section'>
        <h3 className='freshanvil'>Fresh off the Anvil</h3>
        <div className="home-2">
      <div className="home-section-card">
        <img src={Man} alt="" />
        <div className='box'>
        <h4>Chainmail Armor</h4>
        <p>Tested against goblin archers</p>
        </div>

      </div>
      <div className='home-section-card'>
      <img src={Sword} alt="" />
      <div className='box'>
        <h4>Broad Sword</h4>
        <p>Able to slice through orcs with ease</p>
        </div>

      </div>
      <div className='home-section-card'>
      <img src={Helmet} alt="" />
      <div className='box'>
        <h4>Full Helm</h4>
        <p>Designed specifically for better field of vision</p>
        </div>

      </div>
      <div className='home-section-card'>
      <img src={Bow} alt="" />
      <div className='box'>
        <h4>Long Bow</h4>
       
        <p>Ablet to shoot over 300 yards with ease</p>
        </div>
      </div>
      </div>
      </section>
      <Footer/>
    </div>
  )
}

export default Home
