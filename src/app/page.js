'use client';
import React, { useState } from "react";
import Select from "./clientselect";

const maxChars = 1000;

// Voice options (order as requested)
const voiceOptions = [
  // English (US)
  { value: "en_us_male_1", label: "English (US) - Male 1" },
  { value: "en_us_male_2", label: "English (US) - Male 2" },
  { value: "en_us_male_3", label: "English (US) - Male 3" },
  { value: "en_us_female_1", label: "English (US) - Female 1" },
  { value: "en_us_female_2", label: "English (US) - Female 2" },
  { value: "en_us_female_3", label: "English (US) - Female 3" },
  // English (UK)
  { value: "en_uk_male_1", label: "English (UK) - Male 1" },
  { value: "en_uk_male_2", label: "English (UK) - Male 2" },
  { value: "en_uk_male_3", label: "English (UK) - Male 3" },
  { value: "en_uk_female_1", label: "English (UK) - Female 1" },
  { value: "en_uk_female_2", label: "English (UK) - Female 2" },
  { value: "en_uk_female_3", label: "English (UK) - Female 3" },
  // Chinese
  { value: "zh_male_1", label: "Chinese - Male 1" },
  { value: "zh_male_2", label: "Chinese - Male 2" },
  { value: "zh_male_3", label: "Chinese - Male 3" },
  { value: "zh_female_1", label: "Chinese - Female 1" },
  { value: "zh_female_2", label: "Chinese - Female 2" },
  { value: "zh_female_3", label: "Chinese - Female 3" },
  // French
  { value: "fr_male_1", label: "French - Male 1" },
  { value: "fr_male_2", label: "French - Male 2" },
  { value: "fr_male_3", label: "French - Male 3" },
  { value: "fr_female_1", label: "French - Female 1" },
  { value: "fr_female_2", label: "French - Female 2" },
  { value: "fr_female_3", label: "French - Female 3" },
  // Indian
  { value: "in_male_1", label: "Indian - Male 1" },
  { value: "in_male_2", label: "Indian - Male 2" },
  { value: "in_male_3", label: "Indian - Male 3" },
  { value: "in_female_1", label: "Indian - Female 1" },
  { value: "in_female_2", label: "Indian - Female 2" },
  { value: "in_female_3", label: "Indian - Female 3" },
  // Indonesian
  { value: "id_male_1", label: "Indonesian - Male 1" },
  { value: "id_male_2", label: "Indonesian - Male 2" },
  { value: "id_male_3", label: "Indonesian - Male 3" },
  { value: "id_female_1", label: "Indonesian - Female 1" },
  { value: "id_female_2", label: "Indonesian - Female 2" },
  { value: "id_female_3", label: "Indonesian - Female 3" },
  // Japanese
  { value: "ja_male_1", label: "Japanese - Male 1" },
  { value: "ja_male_2", label: "Japanese - Male 2" },
  { value: "ja_male_3", label: "Japanese - Male 3" },
  { value: "ja_female_1", label: "Japanese - Female 1" },
  { value: "ja_female_2", label: "Japanese - Female 2" },
  { value: "ja_female_3", label: "Japanese - Female 3" },
  // Malay
  { value: "ms_male_1", label: "Malay - Male 1" },
  { value: "ms_male_2", label: "Malay - Male 2" },
  { value: "ms_male_3", label: "Malay - Male 3" },
  { value: "ms_female_1", label: "Malay - Female 1" },
  { value: "ms_female_2", label: "Malay - Female 2" },
  { value: "ms_female_3", label: "Malay - Female 3" },
  // Russian
  { value: "ru_male_1", label: "Russian - Male 1" },
  { value: "ru_male_2", label: "Russian - Male 2" },
  { value: "ru_male_3", label: "Russian - Male 3" },
  { value: "ru_female_1", label: "Russian - Female 1" },
  { value: "ru_female_2", label: "Russian - Female 2" },
  { value: "ru_female_3", label: "Russian - Female 3" },
  // Spanish
  { value: "es_male_1", label: "Spanish - Male 1" },
  { value: "es_male_2", label: "Spanish - Male 2" },
  { value: "es_male_3", label: "Spanish - Male 3" },
  { value: "es_female_1", label: "Spanish - Female 1" },
  { value: "es_female_2", label: "Spanish - Female 2" },
  { value: "es_female_3", label: "Spanish - Female 3" },
  // Thai
  { value: "th_male_1", label: "Thai - Male 1" },
  { value: "th_male_2", label: "Thai - Male 2" },
  { value: "th_male_3", label: "Thai - Male 3" },
  { value: "th_female_1", label: "Thai - Female 1" },
  { value: "th_female_2", label: "Thai - Female 2" },
  { value: "th_female_3", label: "Thai - Female 3" },
  // Vietnamese
  { value: "vi_male_1", label: "Vietnamese - Male 1" },
  { value: "vi_male_2", label: "Vietnamese - Male 2" },
  { value: "vi_male_3", label: "Vietnamese - Male 3" },
  { value: "vi_female_1", label: "Vietnamese - Female 1" },
  { value: "vi_female_2", label: "Vietnamese - Female 2" },
  { value: "vi_female_3", label: "Vietnamese - Female 3" },
];

const durationOptions = [
  { value: 15, label: '15 seconds', usedCredit: 1, slides: 2 },
  { value: 30, label: '30 seconds', usedCredit: 2, slides: 4 },
  { value: 45, label: '45 seconds', usedCredit: 3, slides: 6 },
  { value: 60, label: '60 seconds', usedCredit: 4, slides: 8 },
  { value: 75, label: '75 seconds', usedCredit: 5, slides: 10 },
  { value: 90, label: '90 seconds', usedCredit: 6, slides: 12 },
  { value: 105, label: '105 seconds', usedCredit: 7, slides: 14 },
  { value: 120, label: '120 seconds', usedCredit: 8, slides: 16 },
];
const orientationOptions = [
  { value: 'portrait', label: 'Vertical 9:16' },
  { value: 'landscape', label: 'Horizontal 16:9' },
];

export default function Home() {
  const [credit, setCredit] = useState(1); // Set initial user credit (demo: 1)
  const [used, setUsed] = useState(0);
  const [prompt, setPrompt] = useState("");
  const [voice, setVoice] = useState(voiceOptions[0]);
  const [duration, setDuration] = useState(durationOptions[0]);
  const [orientation, setOrientation] = useState(orientationOptions[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showBuy, setShowBuy] = useState(false);

  // PLACE your OpenAI API call inside here (tts & image)
  async function handleGenerateAPI(data) {
  // Call your API route (backend)
  const response = await fetch("/api/generate-video", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt: data.prompt,
      voice: data.voice.value,
      duration: data.duration.value,
      orientation: data.orientation.value,
      // userId: ... // (optional, kalau sudah ada sistem login/user)
    }),
  });

  if (!response.ok) {
    alert("Not enough credit or API error!");
    return;
  }
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const element = document.createElement("a");
  element.href = url;
  element.download = "your_video.txt"; // ganti ke .mp4 kalau sudah output video
  document.body.appendChild(element);
  element.click();
  setTimeout(() => document.body.removeChild(element), 1200);
}


  const handleGenerate = async (e) => {
    e.preventDefault();
    const neededCredit = duration.usedCredit;
    if (credit < neededCredit) {
      setShowBuy(true);
      return;
    }
    setIsSubmitting(true); setProgress(0); setShowBuy(false);

    for (let p = 1; p <= 100; p += Math.floor(Math.random() * 12 + 1)) {
      await new Promise((res) => setTimeout(res, 70));
      setProgress((old) => Math.min(p, 100));
    }
    setProgress(100);

    await handleGenerateAPI({
      prompt,
      voice,
      duration,
      orientation
    });

    setIsSubmitting(false);
    setCredit((prev) => prev - neededCredit);
    setUsed((prev) => prev + neededCredit);
  };

  const handlePreview = (e) => {
    e.preventDefault();
    alert("Voice preview not implemented in demo.");
  };

  const handleBuy = (e) => {
    e.preventDefault();
    window.location.href = "/payment"; // Set to your payment/checkout page
  };

  // Count words
  const wordCount = prompt.trim().length === 0 ? 0 : prompt.trim().split(/\s+/).length;

  return (
    <main style={{
      minHeight: "100vh", background: "#18181b", display: "flex", alignItems: "center",
      justifyContent: "center", color: "#fff", flexDirection: "column", padding: "1px 24px 1px 24px"
    }}>
      <div style={{ width: "100%", maxWidth: 520, textAlign: "center", margin: "0" }}>
        <h1 style={{
          fontSize: "2.3rem", fontWeight: 900, marginBottom: 18, marginTop: 1,
          letterSpacing: "-2px", lineHeight: 1.07, textTransform: "uppercase"
        }}>
          FREE TEXT TO VIDEO GENERATOR
        </h1>
        <p style={{ fontSize: "1.15rem", color: "#cbd5e1", marginBottom: 38 }}>
          Instantly generate AI-powered short videos from your ideas,<br />
          with custom voice and video settings.
        </p>
        {/* AVAILABLE CREDIT */}
        <div style={{
          width: "100%", display: "flex", justifyContent: "flex-end",
          alignItems: "center", marginBottom: -30
        }}>
          <span style={{
            fontWeight: 700, fontSize: 17, color: "#33e6a7", background: "#132716",
            padding: "2px 18px", borderRadius: 16, boxShadow: "0 1px 6px #0002"
          }}>
            Available Credit: <span style={{ color: "#33e6a7", fontWeight: 900 }}>{credit}</span>
          </span>
        </div>

        {/* FORM */}
        <form
          style={{
            background: "#232336",
            padding: 32,
            borderRadius: 16,
            boxShadow: "0 2px 32px #0002",
            display: "flex",
            flexDirection: "column",
            gap: 22,
            marginTop: 14
          }}
          onSubmit={handleGenerate}
        >
          <label style={{ fontWeight: 600, textAlign: "left", color: "#fff" }}>
            Your Video Prompt
            <textarea
              style={{
                width: "100%", marginTop: 8, borderRadius: 8, border: "none",
                padding: 12, fontSize: 16, background: "#181824", color: "#fff", minHeight: 72, resize: "vertical"
              }}
              placeholder="Describe your story, idea, or script here..."
              maxLength={maxChars}
              value={prompt}
              required
              onChange={e => setPrompt(e.target.value)}
            />
            {/* Word/char count - LEFT */}
            <div style={{
              color: prompt.length > maxChars * 0.95 ? "#f87171" : "#cbd5e1",
              fontSize: 13, marginTop: 4, textAlign: "left", fontFamily: "monospace"
            }}>
              {wordCount} words / {prompt.length}/{maxChars} chars
            </div>
          </label>
          {/* Language & Voice */}
          <div>
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6
            }}>
              <label
                style={{
                  fontWeight: 700, color: "#fff", fontSize: "1.06rem",
                  display: "block", textAlign: "left", letterSpacing: "-0.3px"
                }}>
                Language & Voice
              </label>
              <a
                href="#"
                onClick={handlePreview}
                style={{
                  fontSize: "0.97em",
                  color: "#3b82f6",
                  textDecoration: "underline",
                  cursor: "pointer",
                  fontWeight: 600
                }}
              >
                Preview
              </a>
            </div>
            <Select
              options={voiceOptions}
              value={voice}
              onChange={setVoice}
              placeholder="Select language & voice..."
              isSearchable
              styles={{
                control: (base) => ({
                  ...base, background: "#181824", borderColor: "#4f46e5", color: "#fff", fontSize: "1.01rem"
                }),
                menu: (base) => ({
                  ...base, background: "#181824", color: "#fff", zIndex: 9999
                }),
                singleValue: (base) => ({
                  ...base, color: "#fff"
                }),
                option: (base, { isFocused }) => ({
                  ...base, background: isFocused ? "#4f46e5" : "#181824", color: "#fff", cursor: "pointer"
                })
              }}
            />
          </div>
          {/* Duration & Orientation */}
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontWeight: 500, color: "#fff", marginBottom: 6, display: "block", textAlign: "left" }}>
                Duration
              </label>
              <Select
                options={durationOptions}
                value={duration}
                onChange={setDuration}
                placeholder="Select duration..."
                styles={{
                  control: (base) => ({
                    ...base, background: "#181824", borderColor: "#4f46e5", color: "#fff"
                  }),
                  menu: (base) => ({
                    ...base, background: "#181824", color: "#fff", zIndex: 9999
                  }),
                  singleValue: (base) => ({
                    ...base, color: "#fff"
                  }),
                  option: (base, { isFocused }) => ({
                    ...base, background: isFocused ? "#4f46e5" : "#181824", color: "#fff", cursor: "pointer"
                  })
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontWeight: 500, color: "#fff", marginBottom: 6, display: "block", textAlign: "left" }}>
                Orientation
              </label>
              <Select
                options={orientationOptions}
                value={orientation}
                onChange={setOrientation}
                placeholder="Select orientation..."
                styles={{
                  control: (base) => ({
                    ...base, background: "#181824", borderColor: "#4f46e5", color: "#fff"
                  }),
                  menu: (base) => ({
                    ...base, background: "#181824", color: "#fff", zIndex: 9999
                  }),
                  singleValue: (base) => ({
                    ...base, color: "#fff"
                  }),
                  option: (base, { isFocused }) => ({
                    ...base, background: isFocused ? "#4f46e5" : "#181824", color: "#fff", cursor: "pointer"
                  })
                }}
              />
            </div>
          </div>
          {/* Remaining Credit */}
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "flex-end",
            fontFamily: "monospace", fontSize: 16, marginBottom: -18, marginTop: 8
          }}>
            <div>
              <span style={{ color: "#33e6a7" }}>Available: {credit}</span>
            </div>
            <div>
              <span style={{ color: "#f87171" }}>Used: {duration.usedCredit}</span>
            </div>
            <div style={{ width: "100%", borderBottom: "1px solid #fff3", margin: "4px 0 2px 0" }}></div>
            <div>
              <span style={{ color: "#fff" }}>
                Remaining credit: {credit - duration.usedCredit}
              </span>
            </div>
          </div>
          {/* Notif: credit not enough */}
          {showBuy && (
            <div style={{
              color: "#ff3333", background: "#3b1e21", borderRadius: 6,
              padding: "8px 14px", margin: "10px 0 0 0", fontWeight: 600, fontSize: 16
            }}>
              You don't have enough credit.{" "}
              <a href="#" onClick={handleBuy} style={{ color: "#00ff82", textDecoration: "underline" }}>
                Click here to buy
              </a>
            </div>
          )}
          {/* Progress bar */}
          {isSubmitting && (
            <div style={{ margin: "14px 0" }}>
              <div style={{
                height: 12, borderRadius: 8, background: "#222", width: "100%",
                boxShadow: "0 1px 4px #0004", marginBottom: 6, overflow: "hidden"
              }}>
                <div style={{
                  width: `${progress}%`, height: "100%", background: "#4f46e5",
                  borderRadius: 8, transition: "width 0.3s"
                }} />
              </div>
              <span style={{ color: "#fff", fontWeight: 500, fontSize: 15 }}>
                Processing... {progress}%
              </span>
            </div>
          )}
          <button
            type="submit"
            disabled={isSubmitting || !prompt.trim()}
            style={{
              background: "#2563eb", color: "#fff", padding: "12px 0", border: "none",
              borderRadius: 8, fontWeight: 700, fontSize: 18, marginTop: 12,
              cursor: isSubmitting ? "wait" : "pointer", opacity: isSubmitting ? 0.6 : 1
            }}
          >
            {isSubmitting ? "Generating..." : "Generate Video"}
          </button>
        </form>
      </div>
    </main>
  );
}

