import React, { useState, useEffect } from 'react';
import supabase from '../../helper/supabaseClient';

import getCoins from "../../helper/getCoins";
import getBets from "../../helper/getBets";
import PersonIcon from '@mui/icons-material/Person';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';

import BetSection from "./BetSection";

const PlaceBet = (betAmount) => {
    const [coins, setCoins] = useState(null);
    const [bets, setBets] = useState([]);
    const [redBets, setRedBets] = useState([]);
    const [blackBets, setBlackBets] = useState([]);
    const [greenBets, setGreenBets] = useState([]);
    
    const colors = {
        redbut: '#DE4B42',
        blackbut: '#31353D',
        greenbut: '#03C74D',
    };

    const betColor = async (color) => {
        if (!betAmount.betAmount || betAmount.betAmount <= 0) {
            console.error("Veuillez entrer un montant de mise valide.");
            return;
        }
        // Récupère l'utilisateur connecté
        const { data: userData, error: userError } = await supabase.auth.getUser();
    
        if (userError) {
            console.error("Erreur lors de la récupération de l'utilisateur :", userError.message);
            alert("Erreur lors de la récupération de l'utilisateur : " + userError.message);
            return;
        }
    
        const userId = userData?.user?.id; // Récupère l'UUID de l'utilisateur
    
        if (!userId) {
            console.error("Utilisateur non connecté.");
            alert("Utilisateur non connecté.");
            return;
        }
    
        // Appelle la fonction RPC avec l'UUID
        const { data, error } = await supabase.rpc("place_bet", {
            p_user_id: userId, // UUID de l'utilisateur
            p_bet_amount: betAmount.betAmount, // Montant de la mise
            p_color: color, // Couleur choisie
        });
    
        if (error) {
            console.error("Erreur lors du placement de la mise :", error.message);
            alert("Erreur lors du placement de la mise : " + error.message);
        } else {
            console.log(data); // Affiche "Mise effectuée" ou "Pas assez de coins"
            
            // Mise effectuée avec succès, rafraîchit les coins
            fetchCoins();
        }
    };

    const fetchCoins = async () => {
        const { coins, error } = await getCoins();
        if (error) {
            console.error("Erreur lors de la récupération des coins :", error);
            return;
        }
        setCoins(coins);
    };

    const fetchBets = async () => {
        const { bets, error } = await getBets();
        if (error) {
            console.error("Erreur lors de la récupération des paris :", error);
            return;
        }
        setBets(bets);
        setRedBets(bets.filter((bet) => bet.color === "red")); // Filtre les paris rouges
        setBlackBets(bets.filter((bet) => bet.color === "black")); // Filtre les paris noirs
        setGreenBets(bets.filter((bet) => bet.color === "green")); // Filtre les paris verts
    };

    useEffect(() => {
        fetchBets();

        // Mettre à jour les paris toutes les 2 secondes
        const interval = setInterval(() => {
            fetchBets();
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ 
            width: '100%',
            height: '700px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxSizing: 'border-box',
        }}>
            <BetSection
                title="Red Bets" // Utilisé uniquement comme titre visuel
                color_but={colors.redbut}
                color="red"
                bets={redBets}
                onPlaceBet={betColor}
            />
            <BetSection
                title="Black Bets"
                color_but={colors.blackbut}
                color="black"
                bets={blackBets}
                onPlaceBet={betColor}
            />
            <BetSection
                title="Green Bets"
                color_but={colors.greenbut}
                color="green"
                bets={greenBets}
                onPlaceBet={betColor}
            />
        </div>
    );
};

export default PlaceBet;
