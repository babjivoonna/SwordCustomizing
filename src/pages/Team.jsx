import React from 'react'
import './Team.css'
import Thrain from '../../public/dwarf1.jpeg'
import Chotu from '../../public/dwarf2.jpeg'
import Dwarf from '../../public/dwarf3.jpeg'



const Team = () => {
  return (
    <div className='Team'>
      <h1>Meet Out Black Smiths</h1>
      <div className='Team-box box-1'>
        <img src={Thrain} alt="Thrain" />
        <p> <h2>Thrain Inforge</h2>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam et accusantium perferendis voluptatibus aut voluptatem laudantium quos earum dolorum eveniet!</p>
      </div>
      <div className='Team-box'>
        <p> <h2>Chota Bheem </h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, nesciunt illo vel voluptates debitis autem tempore quasi ab dolores labore!</p>
        <img src={Chotu} alt="Chotu" />
      </div>
      <div className='Team-box'>
      <img src={Dwarf} alt="Dwarf" />
        <p> <h2>Dwarf Inforge</h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus hic consectetur beatae nostrum atque accusantium eveniet repellat qui, perferendis quo?</p>
      </div>
    </div>
  )
}

export default Team
