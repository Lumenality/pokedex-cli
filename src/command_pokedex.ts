import type { State } from "./state.js";

export async function commandPokedex(state:State):  Promise<void> {
    for (let pokemon in state.pokedex) {
        console.log(` - ${state.pokedex[pokemon].name}`)
    }
};