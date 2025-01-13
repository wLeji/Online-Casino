import React, { useState } from 'react';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import getCoins from "../../helper/getCoins";

const BetAmount = ({ betAmount, onBetAmountChange }) => {
    const [clickedButton, setClickedButton] = useState(null); // État pour suivre le bouton cliqué

    const handleChange = (e) => {
        const value = parseInt(e.target.value, 10) || 0; // Convertit en nombre
        onBetAmountChange(value); // Met à jour la valeur partagée
    };

    const handleButtonClick = (callback, buttonName) => {
        setClickedButton(buttonName); // Met à jour l'état avec le bouton cliqué
        setTimeout(() => setClickedButton(null), 100); // Réinitialise après 100ms
        callback(); // Exécute la fonction passée en callback
    };

    const baseButtonStyle = {
        backgroundColor: '#31353D', // Fond gris foncé
        border: '0', // Pas de bordure
        borderRadius: '5px', // Coins arrondis
        color: 'white', // Couleur du texte
        padding: '8px', // Espacement interne
        marginLeft: '5px', // Marge à gauche
        outline: 'none', // Supprime la bordure bleue
        cursor: 'pointer', // Curseur main
        transition: 'transform 0.3s, background-color 0.3s', // Transition fluide
    };

    const clickedButtonStyle = {
        backgroundColor: '#555', // Fond gris sombre au clic
        color: 'white', // Couleur du texte blanc
    };

    return (
        <div
            style={{
                backgroundColor: '#1A1E23',
                borderRadius: '5px', // Coins arrondis
                border: '2px solid #16181D', // Bordure subtile
                padding: '5px', // Espacement interne
                marginBottom: '10px', // Marge en bas
                display: 'flex', // Alignement horizontal
                justifyContent: 'space-between', // Espace entre les éléments
                alignItems: 'center', // Aligne verticalement
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <LocalAtmIcon 
                    style={{
                        color: 'white', // Couleur de l'icône
                        fontSize: '28px', // Taille de l'icône
                    }}
                />
                <input
                    type="text"
                    value={betAmount} // Utilise la valeur partagée
                    onChange={handleChange}
                    style={{
                        backgroundColor: 'transparent', // Fond transparent
                        border: '0', // Bordure subtile
                        color: 'white', // Couleur du texte
                        padding: '5px', // Espacement interne
                        outline: 'none', // Supprime la bordure bleue
                        width: '100px', // Largeur fixe pour le champ de texte
                    }}
                />
            </div>
            <div style={{ display: 'flex', gap: '5px' }}>
                <button
                    onClick={() => handleButtonClick(() => onBetAmountChange(0), 'reset')}
                    style={{
                        ...baseButtonStyle,
                        ...(clickedButton === 'reset' ? clickedButtonStyle : {}),
                    }}
                    onMouseOver={(e) => (e.target.style.transform = 'translateY(-3px)')}
                    onMouseOut={(e) => (e.target.style.transform = 'translateY(0)')}
                >
                    Reset
                </button>
                <button
                    onClick={() => handleButtonClick(() => onBetAmountChange(betAmount + 1), 'increment')}
                    style={{
                        ...baseButtonStyle,
                        ...(clickedButton === 'increment' ? clickedButtonStyle : {}),
                    }}
                    onMouseOver={(e) => (e.target.style.transform = 'translateY(-3px)')}
                    onMouseOut={(e) => (e.target.style.transform = 'translateY(0)')}
                >
                    +1
                </button>
                <button
                    onClick={() => handleButtonClick(() => onBetAmountChange(betAmount + 10), 'increment10')}
                    style={{
                        ...baseButtonStyle,
                        ...(clickedButton === 'increment10' ? clickedButtonStyle : {}),
                    }}
                    onMouseOver={(e) => (e.target.style.transform = 'translateY(-3px)')}
                    onMouseOut={(e) => (e.target.style.transform = 'translateY(0)')}
                >
                    +10
                </button>
                <button
                    onClick={() => handleButtonClick(() => onBetAmountChange(betAmount + 100), 'increment100')}
                    style={{
                        ...baseButtonStyle,
                        ...(clickedButton === 'increment100' ? clickedButtonStyle : {}),
                    }}
                    onMouseOver={(e) => (e.target.style.transform = 'translateY(-3px)')}
                    onMouseOut={(e) => (e.target.style.transform = 'translateY(0)')}
                >
                    +100
                </button>
                <button
                    onClick={() => handleButtonClick(() => onBetAmountChange(betAmount + 1000), 'increment1000')}
                    style={{
                        ...baseButtonStyle,
                        ...(clickedButton === 'increment1000' ? clickedButtonStyle : {}),
                    }}
                    onMouseOver={(e) => (e.target.style.transform = 'translateY(-3px)')}
                    onMouseOut={(e) => (e.target.style.transform = 'translateY(0)')}
                >
                    +1000
                </button>
                <button
                    onClick={() => handleButtonClick(() => onBetAmountChange(Math.floor(betAmount / 2)), 'halve')}
                    style={{
                        ...baseButtonStyle,
                        ...(clickedButton === 'halve' ? clickedButtonStyle : {}),
                    }}
                    onMouseOver={(e) => (e.target.style.transform = 'translateY(-3px)')}
                    onMouseOut={(e) => (e.target.style.transform = 'translateY(0)')}
                >
                    1/2
                </button>
                <button
                    onClick={() => handleButtonClick(() => onBetAmountChange(betAmount * 2), 'double')}
                    style={{
                        ...baseButtonStyle,
                        ...(clickedButton === 'double' ? clickedButtonStyle : {}),
                    }}
                    onMouseOver={(e) => (e.target.style.transform = 'translateY(-3px)')}
                    onMouseOut={(e) => (e.target.style.transform = 'translateY(0)')}
                >
                    x2
                </button>
                <button
                    onClick={async () => {
                        const { coins, error } = await getCoins();
                        if (error) {
                            console.error("Erreur:", error);
                        } else {
                            onBetAmountChange(coins); // Utilise la valeur récupérée
                        }
                    }}
                    style={{
                        ...baseButtonStyle,
                        ...(clickedButton === 'MAX' ? clickedButtonStyle : {}),
                    }}
                    onMouseOver={(e) => (e.target.style.transform = 'translateY(-3px)')}
                    onMouseOut={(e) => (e.target.style.transform = 'translateY(0)')}
                >
                    MAX
                </button>
            </div>
        </div>
    );
};

export default BetAmount;
