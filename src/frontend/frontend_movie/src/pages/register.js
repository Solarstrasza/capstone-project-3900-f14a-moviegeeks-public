import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {useNavigate } from "react-router-dom";
import Link from '@mui/material/Link';
import {
  auth,
  registerWithEmailAndPass,
  EmailError
} from "../components/Auth";
import "./stylesheets/register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user] = useAuthState(auth);
  const history = useNavigate();

  // Error handling.
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [showEmailInvalid, setShowEmailInvalid] = useState(false);
  const [showNameEmpty, setShowNameEmpty] = useState(false);

  // Register user.
  const register = () => {
    if (!name) {
      setShowNameEmpty(true);
    } else {
      setShowNameEmpty(false);
    }
    if (!email) {
      setShowEmailInvalid(true);
    } else {
      setShowEmailInvalid(false);
    }
    if (password.length < 6) {
        setShowPasswordError(true);
    } else {
      setShowPasswordError(false);
    }
    if (EmailError == "invalid-email") {
      setShowEmailInvalid(true);
    }
    registerWithEmailAndPass(name, email, password)
  }

  useEffect(() => {
    if (user) { // once the user is registered, redirect to homepage.
        history('/homepage');
    }
  });

  return (
    <div className="register">
      <div className="register__container">
        <div className="register_text">
          Register
        </div>
        <input
          type="text"
          className="register__textBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Username"
        />
        { showNameEmpty ? <div className = "warning_text">Your username needs to be non-empty.</div> : null }
        <br />
        <input
          type="text"
          className="register__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
        />
         { showEmailInvalid ? <div className = "warning_text">Your email is invalid. Please try again.</div> : null }
        <br />
        <input
          type="password"
          className="register__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        { showPasswordError ? <div className = "warning_text">Your password needs to be at least 6 characters long.</div> : null }
        <br />
        <button className="register__btn" onClick={register}>
          Register
        </button>
        
        <div>
          Already have an account? 
          <Link 
          href="/login" 
          underline="none"
          > Login</Link> now.
        </div>
      </div>
    </div>
  );
}
export default Register;