'use client';

import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [strategy, setStrategy] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("strategy");
    console.log("📦 Loaded from localStorage:", stored);
    setStrategy(stored);
  }, []);

  return (
    <div className="p-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Weekly Strategy</h1>
      <div className="bg-white p-6 shadow rounded whitespace-pre-wrap">
        {strategy ?? "No strategy received"}
      </div>
    </div>
  );
}
