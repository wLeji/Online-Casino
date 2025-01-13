import React from 'react';
import RouletteButton from '/roulette.png';
import { useNavigate } from 'react-router-dom';

const GamesHeader = () => {
    const navigate = useNavigate();

    const handleClickRoulette = () => {
        navigate('/roulette');
    };

    return (
        <div>
            <button
                onClick={handleClickRoulette}
                style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                }}
            >
                <img
                    src={RouletteButton}
                    alt="Button Roulette"
                    width="70"
                    height="70"
                    style={{
                        transition: 'transform 0.3s', // Transition pour un effet fluide
                    }}
                    className="rotate-on-hover"
                />
            </button>

            <style>
                {`
                    .rotate-on-hover:hover {
                        transform: rotate(360deg);
                    }
                `}
            </style>
        </div>
    );
};

export default GamesHeader;
