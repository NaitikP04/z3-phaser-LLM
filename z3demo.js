import { init } from "z3-solver";
import OpenAI from "openai";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

async function generatePromptResponse(prompt) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        console.error("❌ API Key not found! Ensure your .env file contains the OPENAI_API_KEY variable.");
        return null;
    }

    // Initialize OpenAI API client
    const openai = new OpenAI({ apiKey });

    try {
        const response = await openai.chat.completions.create({
            model: "o1-preview", // Use the reasoning model `o1-preview`
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            max_completion_tokens: 5000, // Limit total tokens, including reasoning tokens
        });

        return response.choices[0].message.content.trim();
    } catch (error) {
        console.error("❌ Error connecting to OpenAI API:", error.message);

        if (error.response) {
            console.error("HTTP Status Code:", error.response.status);
            console.error("Response Data:", JSON.stringify(error.response.data, null, 2));
        }

        return null;
    }
}

(async function main() {
    // Initialize Z3 Solver
    const { Context } = await init();
    const context = new Context();
    const solver = new context.Solver();

    // Define the problem prompt
    const ruleDescription = `
        Generate SMT-LIB constraints for placing a wheelbarrow inside a fence boundary.
        Ensure the constraints:
        - Keep the wheelbarrow entirely inside the fence.
        - Do not allow it to overlap the fence itself.
    `;
    console.log("Rule Description:", ruleDescription);

    // Get SMT-LIB constraints from OpenAI
    const smtlibString = await generatePromptResponse(ruleDescription);

    if (!smtlibString) {
        console.error("❌ Failed to generate SMT-LIB constraints.");
        return;
    }

    console.log("Generated SMT-LIB string:", smtlibString);

    try {
        // Load the SMT-LIB string into the Z3 Solver
        solver.from_string(smtlibString);

        // Check satisfiability
        const status = await solver.check();
        console.log("Solver status:", status);

        if (status === "sat") {
            const model = solver.model();
            console.log("✅ Constraints satisfied!");
            console.log("Generated Coordinates:");
            console.log({
                x: model.eval(context.Int.const("gen_x")).toString(),
                y: model.eval(context.Int.const("gen_y")).toString(),
            });
        } else {
            console.error("❌ Constraints unsatisfiable. No solution found.");
        }
    } catch (error) {
        console.error("❌ Error processing SMT-LIB string with Z3 Solver:", error.message);
        console.error("Failed SMT-LIB string:", smtlibString);
    }
})();