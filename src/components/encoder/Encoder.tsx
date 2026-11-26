import VStack from "../vstack/VStack";

export default function Encoder()
{
    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>)
    {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        console.log(data.get("signalText"))
    }

    return <VStack>
        <h2>Encoder</h2>
        <hr style={{width: "100%"}}/>
        <form onSubmit={handleSubmit} style={{display: "contents"}}>
            <h3>Input</h3>
            <textarea name="signalText" required/>
            <button type="submit">Submit</button>
        </form>
    </VStack>
}