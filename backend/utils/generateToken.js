// JSON web token (JWT), pronounced "jot", is an open standard 
// for securely transmitting information between parties as a JSON object.
// the token is a short word which can be decoded to JSON file.
// in this file we encode the user id into a token and save it in the cookie

import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '15d'
    });

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // ms format
        httpOnly: true, // prevent XSS attacks cross-site scripting attack
        sameSite: "strict", //CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development"
    });
};

export default generateTokenAndSetCookie;