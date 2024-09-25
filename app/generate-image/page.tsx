"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";

const GenerateImagePage: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>("");
  
  // console.log("prompt", prompt);
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (prompt) {
      try {
        setLoading(true);
        const response = await fetch("/api/generate-image", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt }),
        });
        console.log("response", response);
        const body = await response.json();
        setImageUrl(body.imageUrl);
      } catch (error) {
        console.error("Error generating image:", error);
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
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            cols={50}
            placeholder="Enter your prompt... (e.g., Neo traditional tattoo style, new school tattoos, Japanese tattoo style)"
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="ml-2 p-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Generate Image
          </button>
        </form>
      </div>
      {loading ? (
        <p className="text-lg font-semibold text-blue-500 animate-pulse">
          Loading...
        </p>
      ) : imageUrl ? (
        <div className="relative w-80 h-80 md:w-96 md:h-96 border-4 border-gray-300 rounded-lg shadow-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt="Generated by OpenAI"
            layout="fill"
            objectFit="cover"
          />
        </div>
      ) : (
        <p className="text-lg font-semibold text-red-200">
          No image generated yet.
        </p>
      )}
    </div>
  );
};

export default GenerateImagePage;
