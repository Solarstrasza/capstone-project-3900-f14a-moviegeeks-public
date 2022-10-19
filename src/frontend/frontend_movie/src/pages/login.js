import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, loginWithEmailAndPass } from "../components/Auth";
import { useAuthState } from "react-firebase-hooks/auth";
import "./stylesheets/login.css";
import Link from '@mui/material/Link';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const login = () => {
    loginWithEmailAndPass(email, password);
  }
  useEffect(() => {
    if (loading) {
      // trigger a loading screen
      return;
    }
    if (user) navigate("/");
  }, [user, loading]);

  return (
    <div className="login">
      <div className="login__container">
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"/>

        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"/>

        <button className="login__btn" onClick={login}>
          Login
        </button>
        <div>
          <Link href="/reset"
          underline="none"
          >Forgot Password</Link>
        </div>
        <div>
          Don't have an account? <Link 
          href="/register"
          underline="none"
          >Register</Link> now.
        </div>
      </div>
    </div>
  );
}

export default Login;