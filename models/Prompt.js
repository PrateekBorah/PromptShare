import mongoose from "mongoose";

const promptSchema = new mongoose.Schema({
    creator : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
    prompt : {
        type : String,
        required : [true, "Prompt is required"]
    },
    tag : {
        type : String,
        required : [true, "Tag is required"]
    }
})

const Prompt = mongoose.models.prompt || mongoose.model("prompt", promptSchema);
module.exports = Prompt;