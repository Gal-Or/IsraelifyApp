import React from "react";
import { ReactSVG } from "react-svg";
import facebookIcon from "../assets/icons/facebook.svg";
import googleIcon from "../assets/icons/google.svg";
import appleIcon from "../assets/icons/apple.svg";
import { NavLink, useNavigate } from "react-router-dom";

import { userService } from '../services/user-local.service.js'
import { useState, useContext } from "react";
import { UserContext } from '../RootCmp.jsx'



export function SignUpForm() {

  const navigate = useNavigate()
  const [loggedinUser, setLoggedinUser] = useContext(UserContext)
  const [userToSignup, setUserToSignup] = useState(userService.getEmptyUser())

  function handleGuestClick() {
    setLoggedinUser({ username: 'guest', fullname: 'guest', imgUrl: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png' })
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    try {
      const user = await userService.signup(userToSignup)
      setLoggedinUser(user)
      navigate('/')
    } catch (err) {
      console.log('err:', err)
    }
  }

  function handleChange(ev) {
    let { value, name: field, type } = ev.target
    value = type === 'number' ? +value : value
    setUserToSignup(prevUser => ({ ...prevUser, [field]: value }))
  }

  return (
    <div className="sign-in-form">
      <h1>Sign up to start listening</h1>

      <form>
        <div className="input-group">
          <label htmlFor="login-username">Username</label>
          <input
            name="username"
            value={userToSignup.username}
            type="text"
            id="login-username"
            placeholder="Username"
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="login-username">Full Name</label>
          <input
            name="fullname"
            value={userToSignup.fullname}
            type="text"
            id="login-username"
            placeholder="Full Name"
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label htmlFor="login-password">Password</label>
          <input
            name="password"
            value={userToSignup.password}
            type="password"
            id="login-password"
            placeholder="Password"
            onChange={handleChange}
          />
        </div>
        <div className="remember-me">
          <input type="checkbox" id="remember-me" />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <button type="submit" className="login-btn" onClick={handleSubmit}>
          Connection
        </button>
      </form>
      <hr />
      <div className="social-login">
        <button className="social-button google">
          <ReactSVG src={googleIcon} className="icon" />
          Continue with Google
        </button>
        <button className="social-button facebook">
          <ReactSVG src={facebookIcon} className="icon" />
          Continue with Facebook
        </button>
        <button className="social-button apple">
          <ReactSVG src={appleIcon} className="icon" />
          Continue with Apple
        </button>
        <NavLink to="/">
          <button className="social-button guest" onClick={() => { handleGuestClick() }} >Continue as guest</button>
        </NavLink>
      </div>
      <a href="#" className="forgot-password">
        Forgot your password?
      </a>
      <hr />
      <div className="sign-up">
        <p>Don't have an account?</p>
        <NavLink to={'/signup'}>Subscribe to Spotify</NavLink>
      </div>
    </div>
  );
}
