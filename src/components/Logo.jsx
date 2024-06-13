import React from 'react'
import Logo from  "../assets/blog-logo.svg"

function Logo({width="100%"}) {
  return (
    <div>
      <img src={Logo} alt="Logo" style={{width}} />
    </div>
  )
}

export default Logo
