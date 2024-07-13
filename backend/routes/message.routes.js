import express from "express";

import { sendMessage, getMessages } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";


const router = express.Router();

// protectRoute will protect the sendMessage function - authorization proccess
// will be used as a middleware function.
router.get("/:id", protectRoute, getMessages);
// "/send/:id" this will take the userId from the url and pass it to the controller
// with protectRoute we can use req.user._id to get the userId
router.post("/send/:id", protectRoute, sendMessage);

export default router;