import { Injectable, signal } from '@angular/core';
import { injectQuery, injectQueryClient } from '@tanstack/angular-query-experimental';
import { getIssueById } from '../actions/get-issue-by-id';
import { getIssueCommentsByNumber } from '../actions/get-issue-comments';
import { GitHubIssues } from '../interfaces/github-issue.interface';


@Injectable({
  providedIn: 'root'
})
export class IssueService {
  private issueId = signal<string|null>(null);
  private queryClient = injectQueryClient();

  issuesQuery = injectQuery(() => ({
    queryKey: ['issue', this.issueId()],
    queryFn: () => getIssueById(this.issueId()!),
    enabled: () => !!this.issueId(),
    staleTime: 1000 * 60 * 5
  }));

  issueCommentsQuery = injectQuery(() => ({
    queryKey: ['issue', this.issueId(), 'comments'],
    queryFn: () => getIssueCommentsByNumber(this.issueId()!),
    enabled: this.issueId() !== null,
  }));

  setIssueId(issueId: string) {
    this.issueId.set(issueId);
  }

  prefetchIssue(issueId: string) {
    this.queryClient.prefetchQuery({
      queryKey: ['issue', issueId],
      queryFn: () => getIssueById(issueId),
      staleTime: 1000 * 60 * 5
    });
  }

  setIssueData(issue: GitHubIssues) {
    this.queryClient.setQueryData(['issue', issue.number.toString()], issue, {
      updatedAt: Date.now() + 1000 * 60
    });
  }

}
