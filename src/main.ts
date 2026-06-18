// repl.js actually refers to repl.ts
import { startREPL } from "./repl.js";
import { initState } from "./state.js";

async function main() {
  const dexState = initState();
  await startREPL(dexState);
}

main();