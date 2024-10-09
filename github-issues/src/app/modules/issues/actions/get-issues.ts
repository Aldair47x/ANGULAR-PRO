import { environment } from "../../../../environments/environment.development";
import { sleep } from "../../../helpers/sleep";
import { GitHubIssues, State } from "../interfaces/github-issue.interface";

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.githubToken;

export const getIssues = async (state: State = State.All, selectedLabels: Array<string>): Promise<GitHubIssues[]> => {
  await sleep(2000);
  const params = new URLSearchParams();
  params.append('state', state);

  if(selectedLabels.length > 0) {
    params.append('labels', selectedLabels.join(','));
  }
  try {
    const resp = await fetch(`${BASE_URL}/issues?${params}`, {
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
