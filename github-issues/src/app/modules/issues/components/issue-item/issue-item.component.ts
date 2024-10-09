import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { GitHubIssues } from '../../interfaces/github-issue.interface';
import { RouterLink } from '@angular/router';
import { IssueService } from '../../services/issue.service';

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
  issueService = inject(IssueService);

  get isOpen() {
    return this.issue().state === 'open';
  }

  prefetchIssue() {
    // this.issueService.prefetchIssue(this.issue().number.toString());
    this.issueService.setIssueData(this.issue());
  }
}
