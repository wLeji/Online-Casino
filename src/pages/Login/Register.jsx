import React, { useState, useEffect } from "react";
import supabase from "../../helper/supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      // Récupérer l'utilisateur via la nouvelle méthode getUser()
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error("Erreur récupération utilisateur :", userError.message);
        return;
      }

      const user = userData?.user;
      if (user) {
        // S'il y a un utilisateur, on redirige vers /dashboard
        navigate("/dashboard");
        return;
      }
    };

    fetchUser();
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    if (data) {
      setMessage("User account created!");
    }

    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div>
      <br />
      <div className="account-box">
        <form onSubmit={handleSubmit}>

          <div className="account-entries">

            <TextField 
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              id="outlined-basic"
              label="Email"
              variant="outlined"
              type="email"
              required
            />

            <TextField
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              required
            />

            <TextField
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              id="outlined-password-input"
              label="Confirm Password"
              type="password"
              autoComplete="current-password"
              required
            />

          </div>

          <div className="register-msg">
            {message && <span>{message}</span>}
          </div>

          <div className="account-buttons">
            <Button variant="outlined" type="submit" id="button">Register</Button>
          </div>
          <div className="account-gotoregister">
            <span>Already have an account ?</span>
            <Link to="/login" id="login-txt">Login</Link>

          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
