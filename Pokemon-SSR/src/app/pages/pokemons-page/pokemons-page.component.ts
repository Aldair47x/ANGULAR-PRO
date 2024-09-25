import { CommonModule } from '@angular/common';
import { ApplicationRef, ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { PokemonListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";
import { PokemonListSkeletonComponent } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton.component";
import { PokemonsService } from '../../pokemons/services/pokemons.service';

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
    this.pokemonService.loadPage(page).subscribe((pokemons) => {
      console.log('Pokemons:', pokemons);
    });

  }

}
