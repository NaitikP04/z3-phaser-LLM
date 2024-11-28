import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

// Initialize OpenAI API
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Function to query the LLM
export async function queryLLM(prompt) {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o", 
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: prompt },
            ],
            max_tokens: 3000,
            temperature: 0,
        });
        return response.choices[0].message.content.trim();
    } catch (error) {
        console.error("Error querying OpenAI API:", error);
        return null;
    }
}
