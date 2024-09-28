import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
} from '@angular/core';
import { Pokemon } from '../../interfaces/pokemon.interface';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonCardComponent {
  pokemon = input.required<Pokemon>();
  public readonly pokemonImage = computed(
    () =>
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.pokemon().id}.png`
  );

  logEffect = effect(() => {
    console.log('Pokemon card rendered', this.pokemon());
  });
}
