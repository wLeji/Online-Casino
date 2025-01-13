import React, { useEffect, useState } from "react";
import supabase from "../../helper/supabaseClient.js";
import { useNavigate } from "react-router-dom";

import HeaderComponent from "../../components/Header/Header.jsx";

import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);

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
    </div>
  );
}

export default Dashboard;
