import React from 'react'
import './Footer.css'
import Swal from 'sweetalert2'


const Footer = () => {
  return (
    <div className='footer'>
      <h3>Contact Us</h3>
      <div className="footer-column1">
        <section>
            <p>
            Name
        </p>
        
            <input type="text" placeholder='Name'/>
        
        </section>
        <aside>
            <p>Email</p>
            
                <input type="text" placeholder='Email'/>
            
        </aside>   
      </div>
      <div  className='footer-column2'>
        <section>
        <p>
            Message
        </p>
        <input type="text" />
        </section>
        <aside><button onClick={()=>Swal.fire("Thank you For Contact Our Service we'll reach out to soon!")}>Submit</button></aside>
      </div>
    </div>
  )
}

export default Footer
