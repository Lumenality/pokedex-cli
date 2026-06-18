import type { State } from "./state.js";

export async function commandMap(state:State): Promise<void> {

    const data = await state.api.fetchLocations(state.nextLocationsURL ?? undefined)
    const results = data.results;
    if (results) {
        state.nextLocationsURL = data.next;
        state.prevLocationsURL = data.previous;
    }
    for (let entry of results){
        console.log(entry.name);
    }
};

export async function commandMapB(state:State): Promise<void> {
    // Exit early if on first page
    if (state.prevLocationsURL === null) {
        console.log("you're on the first page");
        return;
    }

    const data = await state.api.fetchLocations(state.prevLocationsURL ?? undefined);
    if (data === null) {
        console.log("ERR: Data was somehow not assigned")
        return;
    }
    const results = data.results;
    if (results) {
        state.nextLocationsURL = data.next;
        state.prevLocationsURL = data.previous;
    }
    for (let entry of results){
        console.log(entry.name);
    }
}