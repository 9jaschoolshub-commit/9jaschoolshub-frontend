// import useStore from "../hooks/useStore";
// import axios from "axios";

export const getApiKeyFromServer = async () => {
  try {
    // const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/getApiKey`);
    // const apiKey = res.data.apiKey;
    // set apikey to zustand (useStore)
  } catch (error) {
    console.error("Failed to get API key:", error);
    throw new Error("Unable to retrieve API key");
  }
};
