import { CommonModule } from '@angular/common';
import {  ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { PokemonListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";
import { PokemonListSkeletonComponent } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton.component";
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { Pokemon } from '../../pokemons/interfaces/pokemon.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-pokemons-page',
  standalone: true,
  imports: [
    CommonModule,
    PokemonListComponent,
    PokemonListSkeletonComponent
],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonsPageComponent implements OnInit, OnDestroy {
  private pokemonService = inject(PokemonsService);
  public pokemons = signal<Pokemon[]>([]);

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private title = inject(Title);

  public currentPage = toSignal<number>(this.route.queryParamMap.pipe(
    map((params) => params.get('page') ?? '1'),
    map((page) => isNaN(+page) ? 1 : +page),
    map((page) => Math.max(1, page)),
  ));
  // public isLoading = signal(true);
  // private appRef = inject(ApplicationRef);

  // private $appState = this.appRef.isStable.subscribe((isStable) => {
  //   console.log('App state:', isStable ? 'stable' : 'unstable');
  // });

  ngOnInit() {
    this.loadPokemons();
    // setTimeout(() => {
    //   this.isLoading.set(false);
    // }, 1500);
  }

  ngOnDestroy(): void {
    // this.$appState.unsubscribe();
  }

  public loadPokemons( page = 0 ) {
    const pageToLoad = this.currentPage()! + page;
    this.pokemonService.loadPage(pageToLoad).pipe(
      tap(() => this.router.navigate([], { queryParams: { page: pageToLoad } })),
      tap(() => this.title.setTitle(`Pokemons - Page ${this.currentPage()}`))
    ).subscribe((pokemons) => {
      this.pokemons.set(pokemons);
    });

  }

}
