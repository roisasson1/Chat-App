// in this file we save the consts of the pages we want to have
// inside the consts we send requests and their body
// for example, in sign-up we will have the JSON format with all the details of sign up

export const signup = async (req, res) => {
    try {
        const {fullName, userName, password, confirmPassword, gender} = req.body;
    } catch {

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