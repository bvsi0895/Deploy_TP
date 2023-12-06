import React from 'react'
import { Link } from 'react-router-dom'

const RegistroExitoso = () => {
  return (
    <div>
        <h3> Su registro se ha realizado correctamente. Por favor vuelva a login e ingrese su usuario y contraseña.</h3>
        <Link to={'/login'}><button>Volver a Login</button></Link>
        
    </div>
    
  )
}

export default RegistroExitoso