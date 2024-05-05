import channels from "../../data/channel.js";

const channelController = (io) => {
  return {
    getAllChannels: (req, res) => {
      try {
        const allChannels = channels.getAll();
        res.json(allChannels);
      } catch (error) {
        console.error("Error in getAllChannels:", error);
        res.status(500).json({ error: "An error occurred" });
      }
    },

    getChannelMessages: (req, res) => {
      try {
        const channel = channels.getById(parseInt(req.params.channelId));

        if (!channel) {
          return res.status(404).send("Channel not found");
        }

        res.json({ channelId: channel.id, messages: channel.messages });
      } catch (error) {
        console.error("Error in getChannelMessages:", error);
        res.status(500).send("Internal Server Error");
      }
    },

    postMessageToChannel: (req, res) => {
      try {
        const channel = channels.getById(parseInt(req.params.channelId));

        if (!channel) {
          return res.status(404).send("Channel not found");
        }

        const newMessage = {
          id: channel.messages.length + 1,
          text: req.body.message,
          timestamp: new Date(),
        };

        channel.addMessage(newMessage);

        // Emit the new message to all clients listening on this channel
        io.to(req.params.channelId).emit("newMessage", newMessage);

        res.status(201).json(newMessage);
      } catch (error) {
        console.error("Error in postMessageToChannel:", error);
        res.status(500).send("Internal Server Error");
      }
    },
  };
};

export default channelController;
