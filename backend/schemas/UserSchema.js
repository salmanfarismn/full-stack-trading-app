const { Schema } = require("mongoose");
const bcrypt = require("bcrypt"); 

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Email address is required!"],
        unique: true
    },
    username: {
        type: String,
        required: [true, "Username is required!"],
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
        minlength: [8, "Password must have 8 characters or more"],
        select: false
    },
}, {timestamps: true});

userSchema.pre('save', async function() {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 12);
});

module.exports = { userSchema };