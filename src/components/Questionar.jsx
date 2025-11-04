export default function Questionair() {
    const body = (
        <form>
            <div>
                <label>What's your favourite movie and why?</label>
                <textarea />
            </div>
            <div>
                <label>Are you in the mood for something new or classic?</label>
                <input type="radio" value="New"> New </input>
                <input type="radio"> Classic </input>
            </div>
        </form>
    )

    return body
}