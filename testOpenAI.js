import { queryLLM } from "./openaiQuery.js";

async function testQuery() {
    const prompt = `
    Generate SMT-LIB constraints:
    - 40x25 grid
    - Exclude tiles 49-64
    - Include tiles 40-44 for signs
    Only SMT-LIB syntax, no explanations.
    Your response must ONLY include SMT-LIB formatted constraints. 
    Do NOT add any explanations, comments, or additional text. 
    Provide constraints in pure SMT-LIB syntax that can be directly parsed by Z3.
    `;
    const result = await queryLLM(prompt);
    console.log("LLM Response:\n", result);
}

testQuery();
