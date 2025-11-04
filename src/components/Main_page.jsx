import { GiPopcorn } from "react-icons/gi";
import { useState } from "react";
import agent from "./AI_agent"
import Questionair from "./Quest.jsx"

import "../styles/main.css"

export default function Main_page() {
    const [formSubmitted,setFormSubmitted] = useState(false)
    const [currentPerson, setCurrentPerson] = useState(1)
    const [answers,setAnswers] = useState({
        noPeople: "",
        time: ""
    })
    const [movieData, setMovieData] = useState({
        movie_title: "",
        movie_description: "",
        reasoning: ""
    })

    function handleChange(e) {
        const { name, value } = e.target;
        console.log(answers)
        setAnswers(prev => ({ ...prev, [name]: value })); // <-- paranteze pătrate!
    }

    function handleSubmit(e) {
        e.preventDefault()

        const num = parseInt(answers.noPeople || 0)
        if (isNaN(num) || num <= 0 ){
            alert("Please enter a correct number of people!")
            return
        }

        const peopleData = {}
        for (let i = 1; i <= num; i++){
            peopleData[`person${i}`] = {
                favourite_movie: "",
                preference: "",
                mood: "",
                island_question: ""
            }
        }

        setAnswers(prev => ({...prev, ...peopleData}))
        setFormSubmitted(true)
        console.log(answers)
        // aiPrompt(answers["1st"], answers["2nd"], answers["3rd"])
    }

    function handlePersonChange(e, personId) {
        const { name, value } = e.target;
        const key = `person${personId}`;

        setAnswers(prev => ({
            ...prev,
            [key]: {
                ...prev[key],
                [name]: value
            }
        }));
    }

    function handleNextPerson(e) {
        e.preventDefault();
        const total = parseInt(answers.noPeople);

        if (currentPerson < total) {
            setCurrentPerson(prev => prev + 1);
        } else {
            // Dacă e ultima persoană, trimitem datele la AI
            aiPrompt(answers.noPeople,answers);
        }
    }

    async function aiPrompt(noPeople, data) {
        console.log("Beggining prompting!")

        const prompt = `We are ${noPeople} and we would like a movie. We have a total of ${data.time} of free time
                        to actually watch the movie, the total time should never execed this ammount. Here is a list
                        of our preferences ${JSON.stringify(data)}`
        console.log(prompt)
        const response = await agent(prompt)
        
        setMovieData({
            movie_title: response.movie_title,
            movie_description: response.movie_description,
            reasoning: response.reasoning
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
                    <textarea onChange={handleChange} name="noPeople" placeholder="How many people?"></textarea>
                </div>
                <div>
                    <textarea onChange={handleChange} name="time" placeholder="How much time do you have?"></textarea>
                </div>
                <div>
                    <input type="submit" value="NEXT" />
                </div>
            </form>}

            {(formSubmitted && !movieData.movie_title) && (
                <Questionair
                    personId={currentPerson}
                    change={handlePersonChange}
                    submit={handleNextPerson}
                    finish={currentPerson === parseInt(answers.noPeople)} // 👈 ultimul formular are buton "GET MOVIE"
                />
            )}

            {movieData.movie_title && (
                <div className="recommandation">
                    <h1 id="movie_title" className="movie_title">
                        {movieData.movie_title}
                    </h1>
                    <h2 id="movie_description" className="movie_description">
                        {movieData.movie_description}
                    </h2>
                    <h3>
                        {movieData.reasoning}
                    </h3>
                </div>
            )}

        </section>
    )

    return body
}