// File: /src/app/api/openai-tts/route.js

export async function POST(req) {
  const { prompt, voice } = await req.json();

  // API key OpenAI dari env
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "OpenAI API key missing" }, { status: 500 });
  }

  // Panggil API OpenAI TTS
  const openaiRes = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "tts-1",   // atau tts-1-hd kalau ada akses
      input: prompt,
      voice: voice,     // e.g. 'alloy', 'echo', 'fable', 'nova', dst
    })
  });

  if (!openaiRes.ok) {
    const msg = await openaiRes.text();
    return Response.json({ error: msg }, { status: openaiRes.status });
  }

  // Dapatkan hasil audio (mp3/mpeg buffer)
  const audioBuffer = await openaiRes.arrayBuffer();

  // Kembalikan ke frontend
  return new Response(audioBuffer, {
    status: 200,
    headers: {
      "Content-Type": "audio/mpeg",
      "Content-Disposition": 'attachment; filename="tts.mp3"'
    }
  });
}
