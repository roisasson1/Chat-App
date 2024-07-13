import { Server } from 'socket.io';
import http from 'http';
import express from 'express';


const app = express(); // build an express server
const server = http.createServer(app); // create an http server from the express server

// on top of the express server, we create a socket.io server
const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", // origin where client-side app is running
      methods: ["GET", "POST"],
    },
  
});

// get socketId of the user who recieve the message
export const getRecieverSocketId = (recieverId) => {
    return userSocketMap[recieverId];
}

const userSocketMap = {}; // {key=userId: value=socketId}

io.on('connection', (socket) => {
    // *** connection event handler ***
    console.log('a user connected', socket.id);
    // get userId from the query parameter in socketContext
    const userId = socket.handshake.query.userId;

    if (userId != "undefined") userSocketMap[userId] = socket.id;

    // io.emit() is used to send events to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // *** disconnection event handler on server-side ***
    // socket.on() is used to listen to the events. can be used both on client and server side
    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
        delete userSocketMap[userId]; // delete the userId from the socket map

        // send the updated list of online users to all connected clients
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
})

export { app, io, server };