import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(
  req: NextRequest
) {
    const body = await req.json(); // Parse the body
    const { prompt } = body;

    // console.log("Request body:", body);
    // console.log("Prompt:", prompt);

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const image = await openai.images.generate({
        model: "dall-e-3",
        prompt: `Create an image for a tattoo using clean outlines with the following user prompt. \nDon't add any background or effect that does not fit for tattoo. \nTry to stay simple and artistic. \nPrompt: ${prompt}`,
        n: 1,
    });
  const imageUrl = image.data[0].url;
  console.log(imageUrl);
  return NextResponse.json({ imageUrl }, { status: 200 });
}
