/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {  useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { storeContext } from '../../context/StoreContext'

const LoginPopup = ({ setShowLogin }) => {
    const {url} = useContext(storeContext)
    const [currState, setCurrState] = useState("Login")
    const [data, setData] = useState({
        name: "",
        email: "",
        password:""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
    }

    const onLogin = async (event) => {
        
    }

    

  return (
      <div className='login-popup'>
          <form onSubmit={onLogin} className='login-popup-container' action="">
              <div className="login-popup-title">
                  <h2>{currState}</h2>
                  <a href=''>
                    <img  onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
                  </a>
              </div>
              <div className="login-popup-inputs">
                  {currState==="Login"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />}
                  
                  <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your Email' required />
                  <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
              </div>
              <button>{ currState ==="Sign Up"?"Create Account":"Login"}</button>
              <div className="login-popup-condition">
                  <input type="checkbox" required />
                  <p>By continuing, i agree to the term of use & privacy policy</p>
              </div>
              {
                  currState === "Login"
                      ? <p>Create a new Account? <span onClick={()=>setCurrState("Sign Up")}>  Click here</span></p> :
                      <p>Already have an Account?  <span onClick={()=>setCurrState("Login")}>  Login here</span></p>
              }
              
              
          </form>
      </div>
  )
}

export default LoginPopup