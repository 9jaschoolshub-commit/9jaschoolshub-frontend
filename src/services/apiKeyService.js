// services/apiKeyService.js
import axios from "axios";

export const getApiKeyFromServer = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/getApiKey`);
    const apiKey = res.data.apiKey;
    
    // we're storing this apikey in a global state using zustand
    // logic will be written here

  } catch (error) {
    console.error("Failed to get API key:", error);
    throw new Error("Unable to retrieve API key");
  }
};
