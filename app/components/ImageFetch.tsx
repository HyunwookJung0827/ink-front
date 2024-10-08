'use client';
import React, { useState, useEffect } from "react";
import * as fal from "@fal-ai/serverless-client";
import Image from "next/image";

fal.config({
  credentials:
    "695bf377-158d-482c-b70a-996dc1b9d7fb:0ebaf7e633044a9d7c3fa2b635db2577",
});

const ImageFetch = () => {
  const [imageUrl, setImageUrl] = useState<string | null>('https://fal.media/files/koala/Zwrtkavt89jyGj596I1qb_929fb6937e314b489c979c30d8ce1906.png');
  const [loading, setLoading] = useState<boolean>(false);

//   useEffect(() => {
//     const fetchImage = async () => {
//       try {
//         const result: { images?: { url: string }[] } = await fal.subscribe("fal-ai/aura-flow", {
//           input: {
//             prompt:
//               "Close-up portrait of a majestic iguana with vibrant blue-green scales, piercing amber eyes, and orange spiky crest. Intricate textures and details visible on scaly skin. Wrapped in dark hood, giving regal appearance. Dramatic lighting against black background. Hyper-realistic, high-resolution image showcasing the reptile's expressive features and coloration.",
//           },
//           logs: true,
//           onQueueUpdate: (update) => {
//             if (update.status === "IN_PROGRESS") {
//               update.logs.map((log) => log.message).forEach(console.log);
//             }
//           },
//         });
//         console.log("Result from fal.subscribe:", result);

//         // Assuming the result contains the image URL
//         if (result && result.images && result.images.length > 0) {
//           setImageUrl(result.images[0].url);
//         }
//       } catch (error) {
//         console.error("Error fetching image:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchImage();
//   }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {loading ? (
        <p className="text-lg font-semibold text-blue-500 animate-pulse">Loading...</p>
      ) : imageUrl ? (
        <div className="relative w-80 h-80 md:w-96 md:h-96 border-4 border-gray-300 rounded-lg shadow-lg overflow-hidden">
          <Image src={imageUrl} alt="Generated by fal" layout="fill" objectFit="cover" />
        </div>
      ) : (
        <p className="text-lg font-semibold text-red-500">Failed to fetch image.</p>
      )}
    </div>
  );
};

export default ImageFetch;
