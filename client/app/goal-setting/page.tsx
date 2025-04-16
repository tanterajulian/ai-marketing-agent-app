'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GoalSettingPage() {
  const [goal, setGoal] = useState("Grow followers");
  const [business, setBusiness] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate sending to backend here
    console.log("Goal:", goal);
    console.log("Business:", business);

    // Redirect to dashboard
    router.push("/dashboard");
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
        >
          Generate Strategy
        </button>
      </form>
    </div>
  );
}
