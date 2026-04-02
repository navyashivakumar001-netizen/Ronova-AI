import readline from "readline";
import { createAgent } from "gitclaw";

async function run() {
  // 🔥 Load agent from your Git repo
  const agent = await createAgent("./");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log("🚀 RepoGuard AI (GitAgent Running)");
  console.log("Type your question (or 'exit')\n");

  function ask() {
    rl.question("👉 ", async (input) => {
      if (input.toLowerCase() === "exit") {
        rl.close();
        return;
      }

      try {
        // 🔥 This forces execution
        const result = await agent.run(input);

        console.log("\n" + result + "\n");
      } catch (err) {
        console.log("Error:", err.message);
      }

      ask();
    });
  }

  ask();
}

run();