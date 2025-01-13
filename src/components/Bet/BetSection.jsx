import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import { blue } from '@mui/material/colors';

const BetSection = ({ title, color_but, color, bets, onPlaceBet }) => {
    return (
        <div style={{
            width: '30%',
            height: '100%',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
        }}>
            {/* Header de la section */}
            <div style={{
                width: '100%',
                height: '20%',
                borderRadius: '5px',
                position: 'relative',
                backgroundColor: '#1A1E23',
                border: '2px solid #16181D',
                boxSizing: 'border-box',
            }}>
                <p style={{
                    color: 'white',
                    textAlign: 'center',
                    padding: '5px',
                }}>
                    {bets.reduce((total, bet) => total + bet.value, 0)}
                </p>
                <div
                    style={{
                        width: '100%',
                        height: '50%',
                        borderRadius: '5px',
                        position: 'absolute',
                        bottom: 0,
                        backgroundColor: color_but,
                        boxSizing: 'border-box',
                        cursor: 'pointer',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 8px 12px rgba(0, 0, 0, 0.2)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                    }}
                    onClick={() => onPlaceBet(color)}
                >
                    <p style={{
                        color: 'white',
                        margin: 0,
                    }}>
                        Place Bet
                    </p>
                </div>
            </div>

            {/* Liste des paris */}
            <div style={{
                flex: 1,
                overflowY: 'scroll',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                padding: '10px',
                boxSizing: 'border-box',
                borderTop: '1px solid #16181D',
            }}>
                {bets
                    .sort((a, b) => b.value - a.value)
                    .map((bet) => (
                        <div
                            key={bet.id}
                            style={{
                                marginBottom: '10px',
                                padding: '5px',
                                height: '30px',
                                color: 'white',
                                alignItems: 'center',
                                display: 'flex',
                                borderRadius: '5px',
                            }}
                        >
                            <div
                                style={{
                                    marginRight: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    border: '1px solid #16181D',
                                    borderRadius: '50%',
                                    width: '30px',
                                    height: '30px',
                                    justifyContent: 'center',
                                }}>
                                <PersonIcon />
                            </div>
                            <p
                                style={{
                                    margin: 0,
                                    color: bet.value >= 100 ? 'yellow' : 'white',
                                }}
                            >
                                {bet.username.length > 15 ? `${bet.username.slice(0, 15)}...` : bet.username}
                            </p>
                            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <p style={{ margin: 0 }}>{bet.value}</p>
                                <LocalAtmIcon />
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default BetSection;
