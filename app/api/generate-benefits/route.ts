import { OpenAI } from "openai";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENAI_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": process.env.NEXT_APP_URL,
    "X-Title": "KhalisFoods"
  }
});

export async function POST(req: Request) {
  try {
    const { productName, description } = await req.json();
    const prompt = `What are the benefits of using a product called "${productName}"? Its description is: ${description} but give me a short answer, please include something best for my company, we are providing Khalis Foods all over pakistan, and we want to make sure our customers are satisfied.`;
    const completion = await openai.chat.completions.create({
      model: "openai/gpt-4o",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 300
    });
    const benefits = completion.choices[0].message.content;
    return NextResponse.json({ success: true, benefits }, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong", error },
      { status: 500 }
    );
  }
}
