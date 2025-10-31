import { GiPopcorn } from "react-icons/gi";
import { useState } from "react";
import agent from "./AI_agent"

import "../styles/main.css"

export default function Main_page() {
    const [formSubmitted,setFormSubmitted] = useState(false)

    const body = (
        <section className="main_page">
            <div className="title">
                <GiPopcorn />
                <h1>PopChoice</h1>
            </div>

            {!formSubmitted && 
            <form>
                <div>
                    <label for="1st">What's your favourite movie and why?</label>
                    <textarea type="text" name="1st" id="1st" />
                </div>

                <div>
                    <label for="2nd">Are you in the mood for something new or a classic?</label>
                    <textarea type="text" name="2nd" id="2nd" />
                </div>

                <div>
                    <label for="3rd">Do you wanna have fun or do you want something serious?</label>
                    <textarea type="text" name="3rd" id="3rd" />
                </div>

                <div>
                    <input type="submit" value="Let's GO!" />
                </div>
            </form>}

            {formSubmitted && 
            <div>
                <h1 className="movie_title"></h1>
                <h2 className="movie_description"></h2>
            </div>}

        </section>
    )

    return body
}