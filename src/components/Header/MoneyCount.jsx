import React, { useState, useEffect } from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';

import getCoins from "../../helper/getCoins";

const MoneyCount = () => {
    const [coins, setCoins] = useState(null);
    

    // Calcul de la largeur en fonction du nombre de chiffres
    const dynamicWidth = Math.max(30, 20 + String(coins).length * 10); // Largeur minimale de 30px, ajustée selon la longueur

    useEffect(() => {
      const fetchCoins = async () => {
        const { coins, error } = await getCoins();
        if (error) {
            console.error(error);
            return;
        }
        setCoins(coins);
      };

      fetchCoins();

      const interval = setInterval(() => {
        fetchCoins();
      }, 5000);
    }, []);

    return (
        <div
            id="money-widget"
            style={{
                border: '1px solid white',
                borderRadius: '5px',
                width: `${dynamicWidth}px`,
                height: '30px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '5px',
                paddingLeft: '12px',
                paddingRight: '12px',
                paddingTop: '5px',
                paddingBottom: '5px',
                color: 'white',
                textAlign: 'center',
            }}
        >

          {coins !== null ? (
              <p>{coins}</p>
          ) : (
              <CircularProgress size="20px" color="black" />
          )}
          <LocalAtmIcon />
        
        </div>
    );
};

export default MoneyCount;
