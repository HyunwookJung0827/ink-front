import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

async function generateImage() {
    try {
      const image = await openai.images.generate({ prompt: "A cute baby sea otter in a tattoo style" });
      console.log(image.data[0].url);
    } catch (error) {
      console.error('Error generating image:', error);
    }
  }
  
  generateImage();