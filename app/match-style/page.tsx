"use client";

import { FormEvent, useState } from "react";

const MatchStylePage: React.FC = () => {
  const [styleDescription, setStyleDescription] = useState<string>("");
  const [userPreference, setUserPreference] = useState<string>("");
  const [matchScore, setMatchScore] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (styleDescription && userPreference) {
      try {
        setLoading(true);
        const response = await fetch("/api/match-style", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ styleDescription, userPreference }),
        });
        const body = await response.json();
        setMatchScore(body.matchScore);
      } catch (error) {
        console.error("Error matching style:", error);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div className="max-w-lg mx-auto p-6 font-sans">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Match Style</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Style Description:
            <textarea
              value={styleDescription}
              onChange={(e) => setStyleDescription(e.target.value)}
              required
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            User Preference:
            <textarea
              value={userPreference}
              onChange={(e) => setUserPreference(e.target.value)}
              required
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-md text-white ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          {loading ? "Matching..." : "Match Style"}
        </button>
      </form>
      {matchScore !== null && (
        <div className="mt-6 text-center text-gray-800">
          <h2 className="text-xl font-semibold">Match Score: {matchScore}</h2>
        </div>
      )}
    </div>
  );
};

export default MatchStylePage;