import express from "express";

const router = express.Router();

const channelRoutes = (channelController) => {
  router.get("/channels", channelController.getAllChannels);
  router.get("/messages/:channelId", channelController.getChannelMessages);
  router.post("/:channelId", channelController.postMessageToChannel);
  return router;
};

export default channelRoutes;
