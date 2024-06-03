import React from "react";
import { ReactSVG } from "react-svg";
import facebookIcon from "../assets/icons/facebook.svg";
import googleIcon from "../assets/icons/google.svg";
import appleIcon from "../assets/icons/apple.svg";
import { NavLink } from "react-router-dom";

import { useContext } from "react";
import { UserContext } from '../RootCmp.jsx'


export function SignInForm() {

  const [loggedinUser, setLoggedinUser] = useContext(UserContext)

  function handleGuestClick() {
    setLoggedinUser({ username: 'guest', fullname: 'guest', imgUrl: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png' })
  }

  return (
    <div className="sign-in-form">
      <h1>Connecting to Spotify</h1>
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
      <form>
        <div className="input-group">
          <label htmlFor="login-username">Email address or username</label>
          <input
            type="text"
            id="login-username"
            placeholder="Email address or username"
          />
        </div>
        <div className="input-group">
          <label htmlFor="login-password">Password</label>
          <input type="password" id="login-password" placeholder="Password" />
          <button
            type="button"
            aria-label="Show password"
            className="password-toggle"
          ></button>
        </div>
        <div className="remember-me">
          <input type="checkbox" id="remember-me" />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <button type="submit" className="login-btn">
          Connection
        </button>
      </form>
      <a href="#" className="forgot-password">
        Forgot your password?
      </a>
      <hr />
      <div className="sign-up">
        <p>Don't have an account?</p>
        <a href="#">Subscribe to Spotify</a>
      </div>
    </div>
  );
}
