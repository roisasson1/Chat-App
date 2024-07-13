import express from "express";

import { signup, login, logout } from "../controllers/auth.controller.js";


// in this file we make the requests to pages and prepare the routes
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;