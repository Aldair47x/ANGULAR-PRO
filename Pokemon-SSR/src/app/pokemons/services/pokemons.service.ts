import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Pokemon } from '../interfaces/pokemon.interface';
import { PokeAPIResponse } from '../interfaces/pokemon-api.interface';
import { PokemonInfo } from '../interfaces/pokemon-info.interface';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  private _http = inject(HttpClient);
  public loadPage(page: number): Observable<Pokemon[]> {
    if (page !== 0) {
      --page;
    }

    page = Math.max(0, page);
    return this._http.get<PokeAPIResponse>(
      `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${page * 20}`
    ).pipe(
      map((response) => response.results.map((pokemon) => ({
        name: pokemon.name,
        id: pokemon.url.split('/')[6],
      }),
      tap(() => console.log('Pokemons loaded'))
    ))
    )
  }

  public loadPokemon(id: string) {
    return this._http.get<PokemonInfo>(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }
}
