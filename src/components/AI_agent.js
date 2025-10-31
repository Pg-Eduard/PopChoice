import OpenAI from "openai"
import data from "./content.js"


if(!import.meta.env.VITE_OPENAI_API_KEY) throw new Error("OpenAI API Key is missing or invalid,");

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
})

export default openai
// console.log(data)