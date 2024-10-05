import React from 'react'

function Navbar({registeration,LoginNav}) {
  return (
    <div className='Navbarsection'>
        <h3>Food Munch</h3>
        <div>
            <span onClick={LoginNav}>Login /</span>
            <span onClick={registeration}> Register</span>
        </div>
    </div>

  )
}

export default Navbar
