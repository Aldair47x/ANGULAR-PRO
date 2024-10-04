import { environment } from "../../../../environments/environment.development";
import { sleep } from "../../../helpers/sleep";
import { GitHubLabel } from "../interfaces/github-labels.interface";

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.githubToken;

export const getLabels = async (): Promise<GitHubLabel[]> => {
  await sleep(2000);
  try {
    const resp = await fetch(`${BASE_URL}/labels`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      }
    });
    if(!resp.ok) {
      throw "Error in getLabels: " + resp.statusText;
    }
    const labels: GitHubLabel[] = await resp.json();
    return labels;
  } catch (error) {
    throw "Error in getLabels: " + error;
  }
}
