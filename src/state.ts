import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { type Interface } from "readline";
import { getCommands } from './command.js';
import { PokeAPI } from './pokeapi.js';
import { Pokemon } from './pokeapi.js';

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State,...args: string[]) => Promise<void>;
};

export type State = {
    readline: Interface;
    commands: Record<string, CLICommand>;
    api: PokeAPI;
    nextLocationsURL: string|null;
    prevLocationsURL: string|null;
    pokedex: Record<string, Pokemon>;
};

export function initState():State {
    const rl = readline.createInterface({ input, output, prompt: 'Pokedex > ' });
    const commands = getCommands();
    const api = new PokeAPI;
    const pokedex = {}
    return {
        readline:rl,
        commands:commands,
        api:api,
        nextLocationsURL:null,
        prevLocationsURL:null,
        pokedex:pokedex,
    };
}