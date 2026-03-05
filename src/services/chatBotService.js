import axios from "axios";

const chatbotAxios = axios.create({
  baseURL: process.env.REACT_APP_API_CHATBOT_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

chatbotAxios.interceptors.response.use(
  (response) => {
    return response.data ? response.data : response;
  },
  (error) => {
    console.error("Chatbot API Error:", error.response || error.message);
    throw error;
  },
);

const chatBotService = {
  sendMessage: (message) => {
    return chatbotAxios.post(`/chat`, { message });
  },
};

export default chatBotService;
