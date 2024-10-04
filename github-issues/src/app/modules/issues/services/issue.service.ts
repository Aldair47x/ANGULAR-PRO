import { Injectable, signal } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { getIssueById } from '../actions/get-issue-by-id';
import { getIssueCommentsByNumber } from '../actions/get-issue-comments';


@Injectable({
  providedIn: 'root'
})
export class IssueService {
  private issueId = signal<string|null>(null);

  issuesQuery = injectQuery(() => ({
    queryKey: ['issue', this.issueId()],
    queryFn: () => getIssueById(this.issueId()!),
    enabled: () => !!this.issueId()
  }));

  issueCommentsQuery = injectQuery(() => ({
    queryKey: ['issue', this.issueId(), 'comments'],
    queryFn: () => getIssueCommentsByNumber(this.issueId()!),
    enabled: this.issueId() !== null,
  }));

  setIssueId(issueId: string) {
    this.issueId.set(issueId);
  }

}
