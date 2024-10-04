import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { GitHubIssues } from '../../interfaces/github-issue.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-issue-item',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './issue-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssueItemComponent {
  issue = input.required<GitHubIssues>();

  get isOpen() {
    return this.issue().state === 'open';
  }
}
