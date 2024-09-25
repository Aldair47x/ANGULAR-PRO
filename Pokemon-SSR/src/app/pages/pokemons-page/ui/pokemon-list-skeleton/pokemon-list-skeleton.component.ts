import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-pokemon-list-skeleton',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './pokemon-list-skeleton.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonListSkeletonComponent { }
