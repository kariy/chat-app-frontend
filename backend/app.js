const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

const chat = io.of("/chat");

chat.on("connection", (socket) => {
    console.log("someone is connected");

    socket.on("join room", (room, user) => {
        console.log("socket", socket.id, "joined room", room);

        socket.join(room);
        socket.to(room).emit("user join room", user);
    });

    socket.on("leave room", (room, user) => {
        console.log("socket", socket.id, "left room", room);

        socket.leave(room);
        socket.to(room).emit("user leave room", user);
    });

    socket.on("message", (data) => {
        chat.to(data.roomId).emit("message", data);
    });

    socket.on("is typing", (room, user) => {
        // console.log(user, "is typing");
        socket.to(room).emit("typing", user);
    });

    socket.on("not typing", (data) => {
        const { room, user } = data;

        // console.log(user, "not typing");
        socket.to(room).emit("not typing", user);
    });
});

httpServer.listen(8000);
