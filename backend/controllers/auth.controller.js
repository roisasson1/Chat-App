// in this file we save the consts of the pages we want to have
// inside the consts we send requests and their body
// for example, in sign-up we will have the JSON format with all the details of sign up

import User from '../models/user.model.js';
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
    try {
        const {fullName, username, password, confirmPassword, gender} = req.body;

        if (password !== confirmPassword)
        {
            return res.status(400).json({error: "Password don't match"})
        }

        const user = await User.findOne({username}); // check if exists in db
        if (user)
        {
            return res.status(400).json({error: "Username already exists"})
        }

        // HASH PASSWORD HERE
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // profile picture
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = await User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic:girlProfilePic
        })

        await newUser.save(); // save user to db
        res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic
            }
        )

    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}

export const login = (req, res) => {
    res.send("Login");
    console.log("loginUser");
}

export const logout = (req, res) => {
    res.send("Logout");
    console.log("logoutUser");
}