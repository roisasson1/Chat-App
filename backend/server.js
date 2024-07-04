import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

// this will allow us to parse the incoming requests with JSON payloads (from req.body)
app.use(express.json());

// if we visit /api/auth/login 
// then the function in auth.routes.js of router.get("/login") will run
app.use("/api/auth", authRoutes)

//app.get("/", (req, res) => { 
//    // root route http://localhost:5000/
//    res.send("Hello world!!")
//})

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server Running on port ${PORT}`);
});