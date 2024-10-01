import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
} from '@angular/core';
import { Pokemon } from '../../interfaces/pokemon.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './pokemon-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonCardComponent {
  pokemon = input.required<Pokemon>();
  public readonly pokemonImage = computed(
    () =>
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.pokemon().id}.png`
  );
}
