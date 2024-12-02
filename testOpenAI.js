import OpenAI from "openai";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

async function testOpenAI() {
    const apiKey = process.env.OPENAI_API_KEY;

    // Validate if API key exists
    if (!apiKey) {
        console.error("❌ API Key not found! Make sure your .env file contains the OPENAI_API_KEY variable.");
        console.error("   Example: OPENAI_API_KEY=sk-<your-api-key>");
        return;
    }

    console.log("✅ API Key loaded successfully.");

    // Initialize OpenAI API
    const openai = new OpenAI({
        apiKey,
    });

    // Test prompt
    const prompt = "Hello, OpenAI! Can you confirm you're working?";

    try {
        console.log("⏳ Sending test request to OpenAI...");
        const response = await openai.chat.completions.create({
            model: "o1-preview", // Use an available model
            messages: [
                { role: "user", content: prompt },
            ],
            max_tokens: 50,
            temperature: 0.5,
        });

        console.log("✅ OpenAI API responded successfully.");
        console.log("Response content:", response.choices[0].message.content.trim());
    } catch (error) {
        console.error("❌ Error communicating with OpenAI API:");
        if (error.response) {
            console.error("Status Code:", error.response.status);
            console.error("Response Data:", error.response.data);
        } else {
            console.error("Error Message:", error.message);
        }
    }
}

testOpenAI();