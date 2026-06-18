import type { State } from "./state.js";

export async function commandInspect(state:State, ...args:string[]):  Promise<void> {
    const pokemonName = args[0];
    if (state.pokedex[pokemonName]) {
        console.log(`name: ${state.pokedex[pokemonName].name}
Height: ${state.pokedex[pokemonName].height}
Weight: ${state.pokedex[pokemonName].weight}
Stats: n/a
Types: n/a`)
    } else {
        console.log("you have not caught that pokemon");
    }
};