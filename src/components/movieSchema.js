import { z } from "zod"

const MovieSchema = z.object({
    movie_title: z.string().min(1, "Title is required"),
    movie_description: z.string().min(1, "Description is required"),
    reasoning: z.string().describe("Why did you recommend this?")
})

export default MovieSchema