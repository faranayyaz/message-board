import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";
import apiService from "../services/apiService";
import { connectSocket } from "../services/socketService";

const MessageBoardContext = createContext();

export const useMessageBoard = () => useContext(MessageBoardContext);

export const MessageBoardProvider = ({ children }) => {
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [chat, setChat] = useState({});
  const [error, setError] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(connectSocket());
  }, [selectedChannel]);

  const fetchChannels = useCallback(async () => {
    try {
      const response = await apiService.get("/api/channels");
      setChannels(response.data);
    } catch (error) {
      setError(error);
      console.error("Error fetching channels", error);
    }
  }, []);

  const fetchMessages = async (channelId) => {
    try {
      const response = await apiService.get(`/api/messages/${channelId}`);
      setChat(response.data);
    } catch (error) {
      setError(error);
      console.error("Error fetching messages", error);
    }
  };

  const postMessage = async (channelId, message) => {
    try {
      await apiService.post(`/api/${channelId}`, { message });
    } catch (error) {
      setError(error);
      console.error("Error posting message", error);
    }
  };

  const value = {
    channels,
    selectedChannel,
    chat,
    error,
    socket,
    fetchChannels,
    fetchMessages,
    setChat,
    setSelectedChannel,
    postMessage,
    setSocket,
  };

  return (
    <MessageBoardContext.Provider value={value}>
      {children}
    </MessageBoardContext.Provider>
  );
};
