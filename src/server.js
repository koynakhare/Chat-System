import http from "http";
import app from "./app.js";
import config from "./config/constant.js";
import { connectDB } from "./config/db.js";
import initSocket from "./config/socket.js";

await connectDB();
const server = http.createServer(app);

initSocket(server);
server.listen(config.PORT, () => {
  console.log(
    `🚀 Server running on port ${config.PORT} in ${config.NODE_ENV} mode`
  );
});
