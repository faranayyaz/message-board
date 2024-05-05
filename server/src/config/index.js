import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT || 8080,
  corsOptions: {
    origin: process.env.FRONTEND_ORIGIN || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
};

export default config;
