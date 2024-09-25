import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  const body = await req.json(); // Parse the body
  const { styleDescription } = body;

  // console.log("Request body:", body);
  // console.log("Prompt:", prompt);

  if (!styleDescription) {
    return NextResponse.json(
      { error: "Style description is required" },
      { status: 400 }
    );
  }

  const response = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: styleDescription,
  });
  const vector = response.data[0].embedding;

  console.log("Response: ", response);
  return NextResponse.json({ vector }, { status: 200 });
}
