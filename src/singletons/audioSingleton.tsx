let ctx: null | AudioContext = null

export default function getAudioContext()
{
    if (!ctx)
    {
        ctx = new window.AudioContext()
    }
    if (ctx.state === "suspended")
    {
        ctx.resume()
    }
    return ctx
}