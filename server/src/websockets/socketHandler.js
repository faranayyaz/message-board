import channels from "../data/channel.js";

export default function socketHandler(socket, io) {
  socket.on("joinChannel", (channelId) => {
    socket.join(channelId);
    console.log(`Client joined channel: ${channelId}`);
  });

  socket.on("newMessage", (channelId, message) => {
    const channel = channels.getById(parseInt(channelId));
    if (channel) {
      socket.to(channelId).emit("newMessage", { channelId, ...message });
    }
  });

  socket.on("disconnect", () => {
    console.log("WebSocket connection disconnected");
  });
}
