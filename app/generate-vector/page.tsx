"use client";

import { FormEvent, useState } from "react";

const GenerateVectorPage: React.FC = () => {
  const [vector, setVector] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [styleDescription, setStyleDescription] = useState<string>("");
//   const summary = "The user prefers fine-line blackwork and intricate botanical designs, with a focus on delicate details and precise linework. They appreciate a blend of realism and abstract elements, inspired by nature and minimalist aesthetics. Custom pieces that reflect personal stories are highly valued.";

  // console.log("styleDescription", styleDescription);
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (styleDescription) {
      try {
        setLoading(true);
        const response = await fetch("/api/generate-vector", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ styleDescription }),
        });
        console.log("response", response);
        const body = await response.json();
        setVector(body.vector);
      } catch (error) {
        console.error("Error generating vector:", error);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="mb-4">
        <form onSubmit={handleSubmit}>
          <textarea
            value={styleDescription}
            onChange={(e) => setStyleDescription(e.target.value)}
            rows={4}
            cols={50}
            placeholder="Enter your styleDescription... "
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="ml-2 p-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Generate Vector
          </button>
        </form>
      </div>
      {loading ? (
        <p className="text-lg font-semibold text-blue-500 animate-pulse">
          Loading...
        </p>
      ) : vector ? (
        <div className="relative w-80 h-80 md:w-96 md:h-96 border-4 border-gray-300 rounded-lg shadow-lg overflow-hidden">
            <p className="text-lg font-semibold text-blue-500">{vector}</p>
        </div>
      ) : (
        <p className="text-lg font-semibold text-red-200">
          No vector generated yet.
        </p>
      )}
    </div>
  );
};

export default GenerateVectorPage;
