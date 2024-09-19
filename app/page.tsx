'use client';
import { Standard } from "@typebot.io/nextjs";
import { useEffect, useState } from "react";

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div>
          {isClient && (
            <Standard
              typebot="tattoo-artist-matcher-v6n94mr"
              style={{ width: "100%", height: "600px" }}
            />
          )}
        </div>
      </main>
    </div>
  );
}