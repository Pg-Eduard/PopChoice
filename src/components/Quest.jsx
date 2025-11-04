export default function Quest({ finish, submit, change, personId }) {
    return (
        <form onSubmit={submit}>
            <h2>Person {personId}</h2>

            <div>
                <label>What's your favourite movie and why?</label>
                <textarea onChange={(e) => change(e, personId)} name="favourite_movie" />
            </div>

            <div>
                <label>Are you in the mood for something new or classic?</label>
                <select onChange={(e) => change(e, personId)} name="preference">
                    <option value="">Select</option>
                    <option value="New">New</option>
                    <option value="Classic">Classic</option>
                </select>
            </div>

            <div>
                <label>What are you in the mood for?</label>
                <select onChange={(e) => change(e, personId)} name="mood">
                    <option value="">Select</option>
                    <option value="Fun">Fun</option>
                    <option value="Serious">Serious</option>
                    <option value="Inspiring">Inspiring</option>
                    <option value="Scary">Scary</option>
                </select>
            </div>

            <div>
                <label>Which famous film person would you love to be stranded on an island with and why?</label>
                <textarea onChange={(e) => change(e, personId)} name="island_question" />
            </div>

            <div>
                <input type="submit" value={finish ? "GET MOVIE" : "NEXT"} />
            </div>
        </form>
    );
}
