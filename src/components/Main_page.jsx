import { GiPopcorn } from "react-icons/gi";
import { useState } from "react";
import agent from "./AI_agent"

import "../styles/main.css"

export default function Main_page() {
    const [formSubmitted,setFormSubmitted] = useState(false)
    const [noPeople, setNoPeople] = useState(1)
    const [preferences, setPreferences] = useState([{}])
    const [answers,setAnswers] = useState({
        "1st": "",
        "2nd": "",
        "3rd": ""
    })
    const [movieData, setMovieData] = useState({
        movie_title: "",
        movie_description: ""
    })

    function handleChange(e) {
        const { name, value } = e.target;
        setAnswers(prev => ({ ...prev, [name]: value })); // <-- paranteze pătrate!
    }

    function handleSubmit(e) {
        e.preventDefault()
        setFormSubmitted(true)
        // aiPrompt(answers["1st"], answers["2nd"], answers["3rd"])
    }

    async function aiPrompt(noPeople,preferences) {
        console.log("Beggining prompting!")

        for (const i= 1; i < noPeople; i++){

        }

        const response = await agent(prompt)
        
        setMovieData({
            movie_title: response.movie_title,
            movie_description: response.movie_description
        })
    }

    const body = (
        <section className="main_page">
            <div className="title">
                <GiPopcorn />
                <h1>PopChoice</h1>
            </div>

            {!formSubmitted && 
            <form onSubmit={handleSubmit}>
                <div>
                    <textarea placeholder="How many people?"></textarea>
                </div>
                <div>
                    <textarea placeholder="How much time do you have?"></textarea>
                </div>
                <div>
                    <input type="submit" value="NEXT" />
                </div>
            </form>}

            {
                formSubmitted && <Questionair />
            }

            {/* {formSubmitted && 
            <div>
                <h1 id="movie_title" className="movie_title">{movieData.movie_title}</h1>
                <h2 id="movie_description" className="movie_description">{movieData.movie_description}</h2>
            </div>} */}

        </section>
    )

    return body
}