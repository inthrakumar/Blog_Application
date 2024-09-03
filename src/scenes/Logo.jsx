import React from 'react'
import logo from  "../assets/blog-logo.svg"

function Logo({width="100%"}) {
  return (
    <div>
      <img src={logo} alt="Logo" style={{width}} />
    </div>
  )
}

export default Logo
