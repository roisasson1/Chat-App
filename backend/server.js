import express from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

dotenv.config();

// this will allow us to parse the incoming requests with JSON payloads (from req.body)
app.use(express.json());
app.use(cookieParser());

// if we visit /api/auth/login 
// then the function in auth.routes.js of router.get("/login") will run
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// gives us the absolute path to the root folder (=dirname)
// access to dist folder = will be exist after we will build our app
// will be done in the server when we deploy our app
// use this express static middleware to serve static files
app.use(express.static(path.join(__dirname, "frontend/dist")));

// send the html file that we have in the frontend
// with this we can run our frontend from our server as well
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
})

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server Running on port ${PORT}`);
});