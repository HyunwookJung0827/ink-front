'use client';
import { Standard } from "@typebot.io/nextjs";
import { useEffect, useState } from "react";

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="">
      <main className="">
        <div>
          
          {isClient && (
            <Standard
            typebot="tattoo-artist-matcher-v6n94mr"
            style={{ width: "undefined", height: "100vh" }}
          />
          )}
        </div>
      </main>
    </div>
  );
}