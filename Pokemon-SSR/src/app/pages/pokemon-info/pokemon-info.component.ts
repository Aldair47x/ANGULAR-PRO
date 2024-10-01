import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { PokemonInfo } from '../../pokemons/interfaces/pokemon-info.interface';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-pokemon-info',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './pokemon-info.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonInfoComponent implements OnInit {
  public pokemon = signal<PokemonInfo | null>(null);
  public pokemonService = inject(PokemonsService);
  public readonly pokemonImage = computed(
    () =>
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.pokemon()!.id}.png`
  );
  private route = inject(ActivatedRoute);
  private title = inject(Title);
  private meta = inject(Meta);
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      return;
    }
    // Load pokemon
    this.pokemonService.loadPokemon(id).pipe(
      tap(({name}) => {
        this.title.setTitle(`${name} - Pokemon Info`);
        this.meta.updateTag({name: 'description', content: `Pokemon ${name} info page`});
        this.meta.updateTag({name: 'keywords', content: `pokemon, ${name}, info`});
        this.meta.updateTag({name: 'author', content: 'Pokemon API'});
      })
    )
    .subscribe(this.pokemon.set);

  }
}
