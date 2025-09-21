// File: /src/app/api/generate-video/route.js

export async function POST(req) {
  // Parse body
  const { prompt, voice, duration, orientation, userId } = await req.json();

  // --- CEK CREDIT USER ---
  // Simulasi cek credit user dari database (pakai email, userId, dsb)
  // TODO: Ganti dengan DB atau session asli
  let currentCredit = 1; // Hardcoded, ganti sesuai sistem kamu

  // Hitung credit yang dibutuhkan
  const usedCredit = Math.ceil(duration / 15); // 1 credit per 15 sec

  if (currentCredit < usedCredit) {
    return Response.json({ error: "Not enough credit" }, { status: 403 });
  }

  // --- PANGGIL OPENAI TTS / DALL-E dsb ---
  // TODO: Replace with real OpenAI API calls
  // Contoh untuk TTS (audio)
  /*
  const apiKey = process.env.OPENAI_API_KEY;
  const openaiResp = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "tts-1",
      input: prompt,
      voice: voice,
      // ...
    })
  });
  if (!openaiResp.ok) {
    return Response.json({ error: "OpenAI error" }, { status: 500 });
  }
  const audioBuffer = await openaiResp.arrayBuffer();
  // Proses file jadi video (butuh ffmpeg/backend logic)
  */

  // --- KURANGI CREDIT USER DI DB ---
  // TODO: Update DB user (kurangi credit sesuai usedCredit)
  // (belum implementasi, hanya demo)

  // --- KIRIM FILE HASIL KE FRONTEND (audio/video) ---
  // Demo: balikin file text sebagai ganti mp4/mp3
  const resultText = `Your video generated!\nPrompt: ${prompt}\nVoice: ${voice}\nDuration: ${duration}\nOrientation: ${orientation}`;
  const buffer = Buffer.from(resultText, "utf-8");
  return new Response(buffer, {
    status: 200,
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="your_video.txt"`
    }
  });
}
