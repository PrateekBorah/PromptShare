import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        // match: [
        //     /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"
        // ]
    },
    email:
    {
        type: String,
        unique: [true, "Email is already in use"],
        required: [true, "Email is required"]
    },
    // password: { type: String, required: [true, "Password is required"] },
    image: {
        type: String
    }
})

const User = models.user || model("user", userSchema);

module.exports = User;