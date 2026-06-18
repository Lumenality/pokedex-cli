import type { State } from "./state.js";

export async function commandExplore(state:State, ...args:string[]):  Promise<void> {
    if (!args[0]) {
        console.log("Please specity an area to explore")
    }
    console.log(`Exploring ${args[0]}...`);
    const data = await state.api.fetchLocation(args[0])
    const results = data;
    const pokemonAtLocation = results.pokemon_encounters

    if (pokemonAtLocation) {
        console.log('Found Pokemon:');
        for (let encounter of pokemonAtLocation){
            console.log(` - ${encounter.pokemon.name}`);
        }
    } else {console.log('No pokemon found.')}

};