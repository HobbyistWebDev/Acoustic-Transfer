export function sineWave(t: number, freq: number, amplitude=1)
{
    return amplitude * Math.sin(2 * Math.PI * freq * t)
}