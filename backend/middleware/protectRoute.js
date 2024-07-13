import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';


const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) { 
            return res.status(401).json({ error: "No token, authorization denied" });
        }

        // process.env.JWT_SECRET used to sign the jwt token
        // with this SECRET we're trying to verify or decode this token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (!decoded) {
            return res.status(401).json({ error: "Invalid token, authorization denied" });
         }

         // if we passed the two checks - return this user without the password
         const user = await User.findById(decoded.userId).select('-password');

         // if there is no user with this id - return an error message
         if (!user) {
            return res.status(404).json({ error: "User not found" });
         }

         // after finding the user - add this user to the request object
         req.user = user;
         next(); // call the next function - we passed the middleware and go to sendMessage function

    } catch (error) {
        console.log("Error in protectRoute middleware", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export default protectRoute;