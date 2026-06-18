import type { State } from "./state.js";

export async function commandCatch(state:State, ...args:string[]):  Promise<void> {

    if (!args[0]) {
        console.log("Please specity a pokemon to try and catch")
    }

    console.log(`Throwing a Pokeball at ${args[0]}...`);
    const data = await state.api.fetchPokemon(args[0])
    const difficulty = Math.floor(MAX_DIFFICULTY/data.base_experience)
    const pokemonName = args[0];
    // Difficulties: Highest 1 lowest 17
    //
    // My idea is to have 100 - difficulty x5 as sort of a threshold
    // So for Sunkern (easiset) the threshold to beat for a catch becomes 15
    // and for Blissey (most difficult) it becomes 95

    const threshold = 100 - difficulty*5;
    const attempt = pokemonCatchRoll();
    console.log(`A roll of:${attempt} at threshold:${threshold} should result in a ${attempt > threshold ? "catch" : "escape"}`);
    
    if (attempt > threshold) {
        state.pokedex[pokemonName] = data;
        console.log(`${pokemonName} was caught!`)
    } else {
        console.log(`${pokemonName} escaped!`)
    }

};

function pokemonCatchRoll(max:number = 100):number {
    return Math.floor(Math.random() * max);
}

const MAX_DIFFICULTY = 635 // The base exp of Blissey