const User = require("../model/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcrypt");

module.exports.Signup = async(req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const existingUser  = await User.findOne({ email });
        if(existingUser ) {
            return res.json({ message: "User already exists!" });
        }

        const user = await User.create({ email, username, password });
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax"
        });

        // Don't directly send the user because of security reasons, It may contain senesitive datas!
        res.status(201).json({
            message: "User signed in successfully",
            success: true,
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
                createdAt: user.createdAt
            }
        });
        next();
    } catch(err) {
        console.error(err);
        res.status(400).json({ message: err.message || "Signup failed", success: false });
    }
}

module.exports.Login = async(req, res, next) => {
    try {
        const { email, password } = req.body;
        if( !email || !password ) {
            return res.json({ message: "All fields are required!" });
        }

        const user = await User.findOne({ email }).select("+password");
        if(!user) {
            return res.json({ 
                message: "Incorrect password or email!",
                success: false
            });
        }

        const auth = await bcrypt.compare(password, user.password);
        if(!auth) {
            return res.json({ message: "Incorrect password or email", success: false });
        }

        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax"
        }); 

        res.status(201).json({ message: "User loged in successfully!", success: true });
        next();
    } catch(error) {
        console.error(error);
        res.status(400).json({ message: error.message || "Login failed", success: false });
    }
};