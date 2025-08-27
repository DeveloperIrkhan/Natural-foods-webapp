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
    const prompt = `please provide benefits of "${productName}"? 
    Its description is: ${description} but give me a short answer,
     please include something best for my company KHALIS FOODS,
     we are providing pure foods across all over pakistan, 
     and we want to make sure our customers are satisfied.`;
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



// this is google gemni api implementaion
// import { NextRequest, NextResponse } from "next/server";
// import { GoogleGenerativeAI } from "@google/generative-ai"; 
// export async function POST(req: Request) {
//   try {
//     const { productName, description } = await req.json();
//     const apiKey = process.env.GEMINI_API_KEY;
//     if (!apiKey) {
//       return NextResponse.json(
//         { success: false, message: "API key is not configured." },
//         { status: 500 }
//       );
//     }
//     const prompt = `What are the benefits of using a product called "${productName}"? Its description is: ${description} but give me a short answer, please include something best for my company, we are providing Khalis Foods all over pakistan, and we want to make sure our customers are satisfied.`;
//     const genAI = new GoogleGenerativeAI(apiKey);
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
//     const result = await model.generateContent(prompt);
//     console.log("result", result)
//     const text = result.response.text();
//     console.log("text", text)

//     return NextResponse.json(
//       { success: true, response: text },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("API Error:", error);
//     return NextResponse.json(
//       { success: false, message: "Something went wrong", error },
//       { status: 500 }
//     );
//   }
// }
