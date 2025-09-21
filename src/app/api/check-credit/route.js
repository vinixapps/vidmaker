// File: /src/app/api/check-credit/route.js

// NOTE: Contoh simple. Real-nya harus diambil dari database user!

// Untuk demo: mapping hardcoded, ganti ke DB kalau sudah pakai auth
const dummyCredits = {
  "user-demo@example.com": 3,
  "user-budi@mail.com": 0,
  "user-siti@mail.com": 6,
};

export async function POST(req) {
  // Frontend mengirimkan { email: ... } atau { userId: ... }
  const { email } = await req.json();

  // Cek credit user dari dummy data (ganti ke DB di real)
  const credit = dummyCredits[email] ?? 0;

  // Balikin data
  return Response.json({ credit }, { status: 200 });
}
