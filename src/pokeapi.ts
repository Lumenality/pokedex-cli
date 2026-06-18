import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  #cache: Cache;

  constructor() {
    this.#cache = new Cache(1000 * 60 * 5); // e.g. 5 minutes (1000 ms per second 60 seconds per minute, 5 minutes cache)
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL ?? `${PokeAPI.baseURL}/location-area/`;

    const cached = this.#cache.get<ShallowLocations>(url);
    if (cached) {
      return cached;
    }

    const dataPromise = fetch(url);
    const response = await dataPromise;
    const data = await response.json();
    this.#cache.add(url, data);

    return data;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

    const cached = this.#cache.get<Location>(url);
    if (cached) {
      return cached;
    }

    const response = await fetch(url);
    const data: Location = await response.json();
    this.#cache.add(url, data);
    return data;
  }
  
  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
    const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;

    const cached = this.#cache.get<Pokemon>(url);
    if (cached) {
      return cached;
    }

    const response = await fetch(url);
    const data: Pokemon = await response.json();
    this.#cache.add(url, data);
    return data;
  }
}

export type ShallowLocations = {
  count: number;
  next: string;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
};

export type Location = {
  location: {
    name: string;
    url: string;
  }
  pokemon_encounters: {
    pokemon: {
        name:string;
        url:string;
    }
  }[]
};

export type Pokemon = {
    id:number;
    name:string;
    base_experience:number;
    height:number;
    is_default:boolean;
    order:number;
    weight:number;
}
