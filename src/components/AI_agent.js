import OpenAI from "openai"
import data from "./content.js"
import schema from "./movieSchema.js"


if(!import.meta.env.VITE_OPENAI_API_KEY) throw new Error("OpenAI API Key is missing or invalid,");

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
})

const chatModel = "gpt-3.5-turbo"

export default async function ask_AI(prompt) {
    const response = await openai.chat.completions.create({
        model: chatModel,
        messages: [{
            role: "developer",
            content: `You are a helpfull movie assistants, you will make sure to take 
                    into account everything the user tells you about himself, 
                    and find one appropiate movie to recommandation to them. Also, there may be more
                    then one person's preferences states, you must take into account all of the people's
                    prefrences and recomand a movie.
                    You will ALWAYS reply ONLY in JSON format with the following structure:
                    {movie_title: z.string().min(1, "Title is required"),
                    movie_description: z.string().min(1, "Description is required")}`
        },
        {
            role: "user",
            content: prompt
        }]
    })

    const raw = response.choices[0].message.content
    console.log("RAW AI response: ", raw)

    try {
        const parsed = JSON.parse(raw)
        const validated = schema.parse(parsed)
        return validated
    } catch(error) {
        console.log("Failed to parse/validate AI Response", error)
        return {movie_title: "Error", movie_description: "Error"}
    }
}