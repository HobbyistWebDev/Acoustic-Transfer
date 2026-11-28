import * as constants from "./constants"
import * as mathUtils from "./mathUtils"

const encoder = new TextEncoder()

export default function encodeText(text: string)
{
    const bytes = encoder.encode(text)
    const samples = new Float32Array(constants.SAMPLE_RATE * constants.SYMBOL_WINDOW * (bytes.length + constants.BARKER.length))
    const samplesPerSymbol = constants.SAMPLE_RATE * constants.SYMBOL_WINDOW

    for (let i = 0; i < samples.length; i++) {
        const symbolInd = Math.floor(i / samplesPerSymbol)
        const byteInd = symbolInd - constants.BARKER.length
        const t = (i + 1) / constants.SAMPLE_RATE
        if (symbolInd < constants.BARKER.length)
        {
            samples[i] = mathUtils.sineWave(t, constants.BARKER_FREQ) * constants.BARKER[symbolInd]
            continue
        }

        const byte = bytes[byteInd]
        for (let pos = 0; pos < 8; pos++) {
            if ((byte & 1 << pos) !== 0)
            {
                samples[i] += mathUtils.sineWave(t, constants.FREQS[pos], 1/8)
            }
        }
    }

    return samples
}