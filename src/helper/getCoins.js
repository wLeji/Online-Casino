import supabase from "./supabaseClient";

const getCoins = async () => {
  try {
    // Récupérer l'utilisateur via la nouvelle méthode getUser()
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) {
      console.error("Erreur récupération utilisateur :", userError.message);
      return { error: userError.message };
    }

    const user = userData?.user;
    if (!user) {
      return { error: "Utilisateur non authentifié." };
    }

    // Récupère la ligne correspondant à l'utilisateur dans "profiles"
    const { data, error } = await supabase
      .from("profiles")
      .select("coins")
      .eq("user_id", user.id)
      .single();

    if (error) {
      console.error("Erreur en récupérant le profil :", error.message);
      return { error: error.message };
    }

    return { coins: data.coins };
  } catch (err) {
    console.error("Erreur inattendue :", err);
    return { error: "Erreur inattendue." };
  }
};

export default getCoins;
