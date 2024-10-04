import { environment } from "../../../../environments/environment.development";
import { sleep } from "../../../helpers/sleep";
import { GitHubIssues } from "../interfaces/github-issue.interface";

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.githubToken;

export const getIssueById = async (issueId: string): Promise<GitHubIssues> => {
  await sleep(2000);
  try {
    const resp = await fetch(`${BASE_URL}/issues/${issueId}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      }
    });
    if(!resp.ok) {
      throw "Error in getIssue: " + resp.statusText;
    }
    const issue: GitHubIssues = await resp.json();
    console.log('issue', issue);
    return issue;
  } catch (error) {
    throw "Error in getIssue: " + error
  }
}
