import * as gitclaw from "gitclaw";

async function runAgent() {
  const agent = await gitclaw.createAgent("./");

  const result = await agent.run("What happens if I click a suspicious link?");

  console.log("=== OUTPUT ===");
  console.log(result);
}

runAgent();