import { environment } from "../../../../environments/environment.development";
import { sleep } from "../../../helpers/sleep";
import { GitHubIssues } from "../interfaces/github-issue.interface";

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.githubToken;

export const getIssues = async (): Promise<GitHubIssues[]> => {
  await sleep(2000);
  try {
    const resp = await fetch(`${BASE_URL}/issues`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      }
    });
    if(!resp.ok) {
      throw "Error in getIssues: " + resp.statusText;
    }
    const issues: GitHubIssues[] = await resp.json();
    return issues;
  } catch (error) {
    throw "Error in getIssues: " + error
  }
}
