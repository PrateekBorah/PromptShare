import { connectToDB } from "@utils/database";
import Prompt from "@models/Prompt";

export const POST = async (req) => {
    const {prompt, id, tag} = await req.json();
    try {
        await connectToDB();
        const newPrompt = await Prompt.create({
            creator : id,
            prompt,
            tag
        })
        return new Response(JSON.stringify(newPrompt), {status : 201})
    } catch (error) {
        return new Response("Failed to create a new Prompt", {status : 500})
    }
}