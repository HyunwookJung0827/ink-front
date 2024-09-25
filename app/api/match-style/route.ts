import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Parse the body
    const { styleDescription, userPreference } = body;

    if (!styleDescription || !userPreference) {
      return NextResponse.json({ error: "Both style description and user preference are required" }, { status: 400 });
    }

    // Call OpenAI API to get the vector representation for styleDescription
    const styleResponse = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: styleDescription,
    });

    // Call OpenAI API to get the vector representation for userPreference
    const preferenceResponse = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: userPreference,
    });

    const styleVector = styleResponse.data[0].embedding;
    const preferenceVector = preferenceResponse.data[0].embedding;

    // Calculate cosine similarity between the two vectors
    const dotProduct = styleVector.reduce((sum, val, i) => sum + val * preferenceVector[i], 0);
    const magnitudeA = Math.sqrt(styleVector.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(preferenceVector.reduce((sum, val) => sum + val * val, 0));
    const matchScore = dotProduct / (magnitudeA * magnitudeB);

    return NextResponse.json({ matchScore }, { status: 200 });
  } catch (error) {
    console.error('Error generating vectors or calculating match score:', error);
    return NextResponse.json({ error: 'Failed to generate vectors or calculate match score' }, { status: 500 });
  }
}