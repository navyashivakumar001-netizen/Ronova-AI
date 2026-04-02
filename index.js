import readline from "readline";

const API_URL = "https://openrouter.ai/api/v1/chat/completions";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("🚀 TimeGuard X Agent Running...");
console.log("Type your question (or 'exit' to quit)\n");

function ask() {
  rl.question("👉 ", async (input) => {
    if (input.toLowerCase() === "exit") {
      rl.close();
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `
You are TimeGuard X, an AI that predicts consequences.

Always respond in this format:

⏳ Future Simulation Report

Scenario 1 (Safe Path):
Explain clearly.

Scenario 2 (Risk Path):
Explain clearly.

Scenario 3 (Worst Case):
Explain clearly.

⚠️ Risk Level:
LOW / MEDIUM / HIGH / CRITICAL

💡 Recommendation:
Clear advice.

📊 Confidence:
Percentage
`,
            },
            {
              role: "user",
              content: input,
            },
          ],
        }),
      });

      const data = await response.json();

      if (data.choices && data.choices.length > 0) {
        console.log("\n" + data.choices[0].message.content + "\n");
      } else {
        console.log("\n⚠️ No valid response from API\n", data);
      }

    } catch (err) {
      console.log("❌ Error:", err.message);
    }

    ask();
  });
}

ask();