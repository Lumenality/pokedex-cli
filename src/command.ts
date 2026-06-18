import type { CLICommand } from "./state.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap, commandMapB } from "./command_map.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    map: {
      name: 'map',
      description: 'Lists 20 entries in the pokemon map. Each subsequent call displays the next 20 locations.',
      callback: commandMap,
    },
    mapb: {
      name: 'map back',
      description: 'Lists the previous 20 entries in the pokemon map.',
      callback: commandMapB,
    },
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
    // can add more commands here
  };
};