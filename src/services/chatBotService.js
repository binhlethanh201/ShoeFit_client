import axios from "axios";

const chatbotAxios = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
  },
});

chatbotAxios.interceptors.response.use(
  (response) => (response.data ? response.data : response),
  (error) => {
    throw error;
  },
);

const chatBotService = {
  sendMessage: (message) => {
    return chatbotAxios.post(`/chat`, { message });
  },
};

export default chatBotService;
