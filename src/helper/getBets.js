import supabase from "./supabaseClient";

const getBets = async () => {
  try {
    // Récupérer toutes les entrées dans la table "bets"
    const { data, error } = await supabase
      .from("bets")
      .select("id, username, color, value");

    if (error) {
      console.error("Erreur en récupérant les paris :", error.message);
      return { error: error.message };
    }

    return { bets: data };
  } catch (err) {
    console.error("Erreur inattendue :", err);
    return { error: "Erreur inattendue." };
  }
};

export default getBets;