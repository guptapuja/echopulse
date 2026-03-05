    // Using NextResponse.json(data) fixes the "never read" warning
    export const runtime = 'edge';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { transcript } = await req.json();

    // 1. Setup API Key
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
      console.error("API Key missing in .env.local");
      return NextResponse.json({ error: "API Key missing" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
     const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    //const model = genAI.getGenerativeModel({ model: "gemini-3-flash" });
    // 2. Strict Prompt to fix the "README" vs "something else" issue
    const prompt = `
      Task: Convert this voice transcript into a JSON command.
      Transcript: "${transcript}"
      
      RULES:
      1. Use the EXACT words from the transcript for the "taskName".
      2. Priority is "high", "medium", or "low". Default is "medium".
      3. Return ONLY valid JSON. No markdown backticks.

      Response Format:
      {
        "action": "CREATE_TASK",
        "taskName": "exact words from transcript",
        "priority": "high" | "medium" | "low"
      }
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // 3. Clean and Parse JSON
    const cleanJson = responseText.replace(/```json|```/g, "").trim();
    const data = JSON.parse(cleanJson);

    // Using NextResponse.json(data) fixes the "never read" warning
    return NextResponse.json(data);

  } catch (error) {
    console.error("Gemini Error:", error);
    return NextResponse.json(
      { action: "UNKNOWN", error: "Brain freeze!" }, 
      { status: 500 }
    );
  }
}