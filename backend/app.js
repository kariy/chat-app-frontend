const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: "*" });

const chat = io.of("/chat");

chat.on("connection", (socket) => {
    console.log("someone is connected");

    socket.on("join", (room) => {
        console.log("socket ", socket.id, " joined room ", room);
        socket.join(room);
    });

    socket.on("leave", (room) => {
        socket.leave(room);
    });

    socket.on("message", (msg, user) => {
        socket.to(room).emit("message", msg, user);
    });
});

httpServer.listen(8000);
