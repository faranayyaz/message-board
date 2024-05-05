import { io } from "socket.io-client";

export const connectSocket = () => {
  return io("http://localhost:8080/");
};
