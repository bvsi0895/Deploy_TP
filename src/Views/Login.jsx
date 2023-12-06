import React, { useState } from 'react'
import logo from '../../src/assets/logo.png'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'



const Login = () => {

  const { loginWithRedirect } = useAuth0()
const [errorMessage, setErrorMessage] = useState({
  message: ''
})
 const history = useNavigate()

  const [isSignedUp, setIsSignedUp] = useState(true)
  const handleLogin = (e) => {
    e.preventDefault()
    setIsSignedUp(!isSignedUp)
  }

  const [userData, setUserData] = useState({
    mail: "",
    password: "",
  })

  const handleChange = (event) => {
    const property = event.target.name 
    const value = event.target.value
    setUserData({...userData, [property]:value})
  }
  
  const submit = (e) => {
      e.preventDefault()

      if(isSignedUp) { 
        fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
           mail: userData.mail,
           password: userData.password
         }),
      })
      .then((res) => res.json())
      .then((res) => {
       if (res === 'Faltan datos') {
        setErrorMessage({
          message: 'Todos los campos deben ser completados'
        })
       }
       else if (res === 'Datos incorrectos') {
         setErrorMessage({
          message: 'Los datos son incorrectos. Vuelva a intentarlo.'
         })
       }
     else { 
      localStorage.setItem("loggedIn", true)
      localStorage.setItem("userEmail", res.mail)
      history("/")
      window.location.reload()
      
    };
    })
    .catch((error) => console.log(error))
  }
    else {
      fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
           mail: userData.mail,
           password: userData.password
         }),
      })
      .then((res) => res.json())
      .then((res) => {
          if (res === 'Faltan datos') {
            setErrorMessage({
              message: 'Todos los campos deben ser completados'
            })
          }
          if (res === 'Registro exitoso') {
            history("/registroexitoso")
            window.location.reload()
          }
      })
      .catch((error) => console.log(error))
    }
      }
  


  return (
    <div>
      <form method={'post'}  onSubmit={submit}>
        <img src={logo}></img>
        <h1>{isSignedUp ? 'Login' : 'Sign Up'}</h1>
      <label htmlFor='mail'>Mail: </label>
      <input type='text' id='mail' name='mail' value={userData.mail} onChange={handleChange}></input>
      <br></br>
      <label htmlFor='password'>Password:</label>
      <input type='text' id='password' name='password' value={userData.password} onChange={handleChange}></input>
      <br></br>
      <h4>{errorMessage.message}</h4> <br></br>
      <input type='submit'></input> <br></br>
      <button onClick={loginWithRedirect}>Sign In with Google </button>
      {!isSignedUp ? 
      <div>
        <label htmlFor='rol'> </label>
      <select name='rol' id='rol'>
        <option value={'cliente'}>Cliente</option>
        <option value={'admin'}>Administrador</option>
      </select>
      </div>
       
      : ''}
      <h4>{isSignedUp ? "Don't have an account?" : "Already have an account?"}</h4>
      <button onClick={handleLogin}>{isSignedUp ? 'Sign Up' : 'Login'}</button>
       
      </form>
    </div>
  )
}

export default Login