import type { State } from "./state.js";

export function cleanInput(input: string): string[] {
    // Trim leading and trailing spaces
    let trimText = input.trim();
    // Split the input into an array of words, using spaces as the delimiter
    let result = trimText.split(/[;,]\s*|\s+/) || []

    return result;
};

export async function startREPL(state:State) {
    const commands = state.commands;
    const rl = state.readline;
    rl.prompt();
    rl.on("line", async (answer) => {
        let cleanAnswer = cleanInput(answer)[0].trim();
        if (!cleanAnswer) {
            rl.prompt()
            return;
        } 
        if (!commands[cleanAnswer]) {
            console.log('Unknown command');
            rl.prompt()
            return;
        }
        try {
            await commands[cleanAnswer].callback(state);
        } catch (e) {
            console.log(e);
        }
        rl.prompt();   

    });

};
