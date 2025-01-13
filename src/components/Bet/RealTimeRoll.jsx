import { useEffect, useState } from 'react';
import supabase from '../../helper/supabaseClient';

const RealTimeRollComponent = () => {
  const [lastRoll, setLastRoll] = useState(null); // Stocke le dernier roll

  useEffect(() => {
    // Configurer un canal Realtime pour écouter les inserts dans rolls_history
    const channel = supabase
      .channel('public:rolls_history') // Nom du canal
      .on(
        'postgres_changes', // Type d'événement
        { event: 'INSERT', schema: 'public', table: 'rolls_history' }, // Cible
        (payload) => {
          console.log('Nouveau roll reçu :', payload.new);
          setLastRoll(payload.new); // Met à jour l'état avec le nouveau roll
        }
      )
      .subscribe();

    // Nettoyer l'abonnement lors du démontage
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Styles en ligne
  const styles = {
    container: {
      maxWidth: '400px',
      margin: '20px auto',
      padding: '15px',
      border: '2px solid #007bff',
      borderRadius: '10px',
      backgroundColor: '#f8f9fa',
      fontFamily: 'Arial, sans-serif',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      animation: 'fadeIn 0.3s ease-in-out',
    },
    strong: {
      color: '#007bff',
    },
    fadeInKeyframes: `
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `,
  };

  // Ajouter l'animation CSS au DOM
  useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = styles.fadeInKeyframes;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Résultat en temps réel</h2>
      {lastRoll ? (
        <div style={styles.container}>
          <p>
            <strong style={styles.strong}>Couleur :</strong> {lastRoll.chosen_color}
          </p>
          <p>
            <strong style={styles.strong}>Bets traités :</strong> {lastRoll.bets_processed}
          </p>
          <p>
            <strong style={styles.strong}>Heure :</strong> {new Date(lastRoll.roll_time).toLocaleTimeString()}
          </p>
        </div>
      ) : (
        <p style={{ textAlign: 'center', color: '#666' }}>En attente d'un nouveau roll...</p>
      )}
    </div>
  );
};

export default RealTimeRollComponent;
