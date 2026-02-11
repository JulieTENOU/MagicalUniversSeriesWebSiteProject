import { io } from "socket.io-client";

// Sans URL -> même origine
export const socket = io({
  path: "/socket.io/",
  //   transports: ["websocket"],
  withCredentials: true,
});
