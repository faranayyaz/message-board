import { Channel } from "../models/channel.js";

const channels = [];

export default {
  initialize: () => {
    // Populate with fixed set of empty channels
    channels.push(new Channel(1, "General"));
    channels.push(new Channel(2, "Random"));
    channels.push(new Channel(3, "Meeting"));
  },
  getAll: () => channels,
  getById: (id) => channels.find((c) => c.id === id),
};
