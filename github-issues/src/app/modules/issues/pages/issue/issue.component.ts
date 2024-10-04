import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, tap } from 'rxjs';
import { IssueService } from '../../services/issue.service';
import { IssueCommentComponent } from '../../components/issue-comment/issue-comment.component';

@Component({
  selector: 'app-issue',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IssueCommentComponent
  ],
  templateUrl: './issue.component.html'
})
export class IssueComponent {
  route = inject(ActivatedRoute);
  issueService = inject(IssueService);

  issueNumber = toSignal<string>(this.route.params.pipe(
    map((params) => params['id'] ?? ''),
    tap( (id) => this.issueService.setIssueId(id))
  ));

  isssueQuery = this.issueService.issuesQuery;
  issueCommentsQuery = this.issueService.issueCommentsQuery;
}
