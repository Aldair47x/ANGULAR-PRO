import { CommonModule } from '@angular/common';
import {  ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { PokemonListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";
import { PokemonListSkeletonComponent } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton.component";
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { Pokemon } from '../../pokemons/interfaces/pokemon.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-pokemons-page',
  standalone: true,
  imports: [
    CommonModule,
    PokemonListComponent,
    PokemonListSkeletonComponent,
    RouterLink
],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonsPageComponent {
  private pokemonService = inject(PokemonsService);
  public pokemons = signal<Pokemon[]>([]);

  private route = inject(ActivatedRoute);


  private title = inject(Title);

  public currentPage = toSignal<number>(this.route.params.pipe(
    map((params) => params['page'] ?? '1'),
    map((page) => isNaN(+page) ? 1 : +page),
    map((page) => Math.max(1, page)),
  ));

  public loadOnPageChange = effect(() => {
    this.loadPokemons(this.currentPage());
  }, {
    allowSignalWrites: true
  })





  public loadPokemons( page = 0 ) {

    this.pokemonService.loadPage(page).pipe(
      tap(() => this.title.setTitle(`Pokemons - Page ${page}`))
    ).subscribe((pokemons) => {
      this.pokemons.set(pokemons);
    });

  }

}
