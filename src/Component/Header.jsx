import React from 'react'
import './Header.css'
const Header = () => {
  return (
    <div className='header-main'>
        <div className='head-name'>
            <div className='head-logo'>
            <i style={{color:"white", marginTop:"30px",marginLeft:"10px"}} class="fa-solid fa-bars"></i>

            </div>
            <h2 style={{color:"white", marginBottom:"30px"}}>Notes</h2>
        </div>
    </div>
  )
}

export default Header