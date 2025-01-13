import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../helper/supabaseClient";
import Button from '@mui/material/Button';

import "./Home.css";
import { use } from "react";

function Home() {
  const navigate = useNavigate();


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


  return (
    <div className="page-container">
      <div className="log-reg-buttons">
        <Button variant="outlined" href="/login" id="button">
          Login
        </Button>
        <Button variant="outlined" href="/register" id="button">
          Register
        </Button>
      </div>
    </div>
  );
}

export default Home;
