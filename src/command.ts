import type { CLICommand } from "./state.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap, commandMapB } from "./command_map.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    catch: {
      name: 'catch',
      description: 'Throw a pokeball at a given pokemon to try and catch them (difficulty scales with base XP)',
      callback: commandCatch,
    },
    explore: {
      name: 'explore',
      description: 'Lists all pokemon that can be found at a given location',
      callback: commandExplore,
    },
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
    // add more commands here
  };
};