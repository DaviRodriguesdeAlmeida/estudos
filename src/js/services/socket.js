import { io } from "socket.io-client";
import { API_URL } from "../app/config.js";

const socket = io(API_URL, { autoConnect: false });

export function conectarSocket() {
  if (!socket.connected) socket.connect();
  return socket;
}

export function desconectarSocket() {
  if (socket.connected) socket.disconnect();
}

export default socket;

