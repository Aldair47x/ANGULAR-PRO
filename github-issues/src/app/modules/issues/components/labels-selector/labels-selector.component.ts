import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { GitHubLabel } from '../../interfaces/github-labels.interface';

@Component({
  selector: 'app-labels-selector',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './labels-selector.component.html'
})
export class LabelsSelectorComponent {
  labels = input.required<GitHubLabel[]>();
}
