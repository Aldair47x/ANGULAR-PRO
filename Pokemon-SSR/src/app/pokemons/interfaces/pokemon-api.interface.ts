export interface PokeAPIResponse {
  count: number;
  next: string;
  previous: string;
  results: PokemonAPI[];
}

export interface PokemonAPI {
  name: string;
  url: string;
}

