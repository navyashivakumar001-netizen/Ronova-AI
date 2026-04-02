import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const API_URL = "https://openrouter.ai/api/v1/chat/completions";

app.post("/analyze", async (req, res) => {
  const { input } = req.body;

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
You are RepoGuard AI — an advanced GitHub repository safety analyzer.

Respond STRICTLY in this structured format:

🔍 Repository Analysis

📁 Project Summary:
Explain clearly what the repository does.

📦 Repository Metadata:
- Popularity (stars/community)
- Maintenance status
- Organization trust

🧠 Intent Detection:
Explain purpose (tool, scraper, automation, etc.)

⚠️ Risk Analysis:
- List real risks (security, misuse, dependencies)

🕵️ Hidden Behavior:
- Possible hidden actions (network calls, file changes)

⚙️ Execution Simulation:
→ Step-by-step what happens if executed

📦 Dependency Risk:
- External libraries and risks

⚖️ Legal/Ethical Risk:
- Misuse or policy violations

🔒 Security Score:
Give score out of 10

🚨 Trust Level:
🟢 Safe / 🟡 Suspicious / 🔴 Dangerous

💡 Recommendation:
Clear advice

📊 Confidence:
Percentage

💭 Regret Score:
Score from 1–10
`,
          },
          { role: "user", content: input },
        ],
      }),
    });

    const data = await response.json();

    res.json({
      result: data.choices?.[0]?.message?.content || "No response",
    });

  } catch (err) {
    res.json({
      result: "Error: " + err.message,
    });
  }
});

app.listen(3000, () => {
  console.log("🚀 Backend running on http://localhost:3000");
});