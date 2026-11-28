import VStack from "../vstack/VStack";

export default function Decoder()
{
    return <VStack>
        <h2>Decoder</h2>
        <hr style={{width: "100%"}}/>
        <h3>Output</h3>
        <textarea readOnly style={{resize: "none"}}/>
    </VStack>
}