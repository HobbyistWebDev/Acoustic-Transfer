import VStack from "../vstack/VStack";
import HStack from "../hstack/HStack";
import playIcon from "@/assets/player-play.svg"
import downloadIcon from "@/assets/download.svg"
import pauseIcon from "@/assets/player-pause.svg"
import { useState } from "react";
import styles from "./Encoder.module.css"
import encodeText from "@/audio/encodeText";
import { createAudioBlob, createAudioBuffer } from "@/audio/audioFactory";
import getAudioContext from "@/singletons/audioSingleton";

export default function Encoder()
{
    const [isTriggered, setTriggered] = useState(false)
    const [audioBuffer, setAudioBuffer] = useState<null | AudioBuffer>(null)
    const [WavUrl, setWavUrl] = useState("")
    const [isPlaying, setIsPlaying] = useState(false)
    const [bufferSource, setBufferSource] = useState<null | AudioBufferSourceNode>(null)

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>)
    {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        setTriggered(true)
        const inputText = data.get("signalText") as string

        const samples = encodeText(inputText)
        setAudioBuffer(createAudioBuffer(samples))
        setWavUrl(URL.createObjectURL(createAudioBlob(samples)))
    }

    function handlePlay()
    {
        if (isPlaying)
        {
            if (bufferSource) {bufferSource.stop()}
            return
        }

        setIsPlaying(true)
        const ctx = getAudioContext()
        const source = ctx.createBufferSource()
        source.buffer = audioBuffer
        source.connect(ctx.destination)
        setBufferSource(source)
        source.start()

        source.addEventListener("ended", () => {
            setBufferSource(null)
            setIsPlaying(false)
        })
    }

    function handleDownload()
    {
        const link = document.createElement("a")
        link.href = WavUrl
        link.download = "signal"
        document.body.appendChild(link)
        link.click()
        link.remove()
    }

    return <VStack>
        <h2>Encoder</h2>
        <hr style={{width: "100%"}}/>
        <form onSubmit={handleSubmit} style={{display: "contents"}}>
            <h3>Input</h3>
            <textarea className={styles.TextArea} name="signalText" required style={{resize: "vertical"}}/>
            <HStack>
                <button type="submit" className={styles.SubmitButton}>Submit</button>
                {isTriggered && <>
                    <button type="button" className={styles.ActionButton} onClick={handlePlay}><img src={isPlaying ? pauseIcon : playIcon} className={styles.Image}/></button>
                    <button type="button" className={styles.ActionButton} onClick={handleDownload}><img src={downloadIcon} className={styles.Image}/></button>
                </>}
            </HStack>
        </form>
    </VStack>
}