import dotenv from "dotenv";

dotenv.config();

const config = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || "development",
  JWT_SECRET: process.env.JWT_SECRET,

};

if (!config.MONGO_URI) {
  throw new Error("❌ MONGO_URI is not defined in .env file");
}

export default config;
