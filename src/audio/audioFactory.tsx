import getAudioContext from "@/singletons/audioSingleton";
import * as constants from "./constants"

export function createAudioBuffer(samples: Float32Array)
{
    const ctx = getAudioContext()
    const buffer = ctx.createBuffer(1, samples.length, constants.SAMPLE_RATE)
    buffer.getChannelData(0).set(samples)
    return buffer
}

export function createAudioBlob(samples: Float32Array): Blob {
    const numChannels = 1
    const bitsPerSample = 16
    const byteRate = constants.SAMPLE_RATE * numChannels * (bitsPerSample / 8)
    const blockAlign = numChannels * (bitsPerSample / 8)
    const dataSize = samples.length * (bitsPerSample / 8)
    const buffer = new ArrayBuffer(44 + dataSize)
    const view = new DataView(buffer)

    const writeString = (offset: number, str: string) => {
        for (let i = 0; i < str.length; i++) {
            view.setUint8(offset + i, str.charCodeAt(i))
        }
    }

    writeString(0, "RIFF")
    view.setUint32(4, 36 + dataSize, true)
    writeString(8, "WAVE")
    writeString(12, "fmt ")
    view.setUint32(16, 16, true)
    view.setUint16(20, 1, true)
    view.setUint16(22, numChannels, true)
    view.setUint32(24, constants.SAMPLE_RATE, true)
    view.setUint32(28, byteRate, true)
    view.setUint16(32, blockAlign, true)
    view.setUint16(34, bitsPerSample, true)
    writeString(36, "data")
    view.setUint32(40, dataSize, true)

    let offset = 44
    for (let i = 0; i < samples.length; i++) {
        const clamped = Math.max(-1, Math.min(1, samples[i]))
        const int16 = clamped < 0 ? clamped * 0x8000 : clamped * 0x7fff
        view.setInt16(offset, int16, true)
        offset += 2
    }

    return new Blob([buffer], { type: "audio/wav" })
}