import React, { useEffect, useState } from "react";
import supabase from "../../helper/supabaseClient.js";
import { useNavigate } from "react-router-dom";

import HeaderComponent from "../../components/Header/Header.jsx";
import BetAmount from "../../components/Bet/BetAmount.jsx";
import PlaceBet from "../../components/Bet/PlaceBet.jsx";
import RealTimeRollComponent from "../../components/Bet/RealTimeRoll.jsx";
import { Place } from "@mui/icons-material";

function Roulette() {
    const navigate = useNavigate();
    const [username, setUsername] = useState(null);
    const [betAmount, setBetAmount] = useState(0); // État partagé pour l'amount
  
    useEffect(() => {
      const fetchUsername = async () => {
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError) {
          console.error("Erreur récupération utilisateur :", userError.message);
          return;
        }
  
        const user = userData?.user;
        if (!user) {
          // S'il n'y a pas d'utilisateur, on redirige vers /login
          navigate("/login");
          return;
        }
  
        const { data, error } = await supabase
          .from("profiles")
          .select("username")
          .eq("user_id", user.id)
          .single();
  
        if (error) {
          console.error("Erreur en récupérant le profil :", error.message);
          return;
        }
        setUsername(data.username);
      }
  
      fetchUsername();
  
    }, [navigate]);
  
    return (
      <div>
        <HeaderComponent />
        
        <h1 style={{ textAlign: "center" }}>Roulette</h1>
        <RealTimeRollComponent />
        
        <div style={{ width: "90%", margin: "auto" }}>
                <BetAmount betAmount={betAmount} onBetAmountChange={setBetAmount} />
                <PlaceBet betAmount={betAmount} />
        </div>
        
      </div>
    );
  }

export default Roulette;