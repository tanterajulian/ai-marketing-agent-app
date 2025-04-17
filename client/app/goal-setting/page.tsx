'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GoalSettingPage() {
  const [goal, setGoal] = useState("Grow followers");
  const [business, setBusiness] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://julian-nup.app.n8n.cloud/webhook/generate-strategy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal, business }),
      });

      const rawText = await res.text();
      console.log("📦 RAW response from n8n:", rawText);

      let strategy = "No strategy received";

      try {
        const data = JSON.parse(rawText);
        console.log("🧪 Parsed JSON:", data);

        // Pick the correct format depending on your n8n response
        strategy = 
          data.strategy ||
          data.message ||
          data?.choices?.[0]?.message?.content ||
          "No strategy received";

      } catch (err) {
        console.warn("⚠️ Not JSON — treating as plain text.");
        strategy = rawText;
      }

      console.log("🧠 Final strategy:", strategy);
      localStorage.setItem("strategy", strategy);
      router.push("/dashboard");

    } catch (err) {
      console.error("❌ Error:", err);
      alert("Something went wrong. Check the console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Set Your Marketing Goal</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label>
          What’s your main goal?
          <select
            className="w-full p-2 border rounded mt-1"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          >
            <option>Grow followers</option>
            <option>Get more engagement</option>
            <option>Increase sales</option>
            <option>Increase traffic</option>
          </select>
        </label>
        <label>
          Describe your business:
          <textarea
            className="w-full p-2 border rounded mt-1"
            rows={3}
            placeholder="e.g. I sell handmade mugs on Instagram"
            value={business}
            onChange={(e) => setBusiness(e.target.value)}
          />
        </label>
        <button
          type="submit"
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Strategy"}
        </button>
      </form>
    </div>
  );
}
