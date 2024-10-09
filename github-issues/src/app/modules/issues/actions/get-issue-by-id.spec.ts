import { environment } from "../../../../environments/environment.development";
import { getIssueById } from "./get-issue-by-id";


const issueNumber = '123';
const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.githubToken;

const mockIssue = {
  id: 123,
  number: issueNumber,
  body: '# Hola Mundo',
};

describe('getIssueById action', () => {
  it('should fetch issue successfully', async () => {
    const requestURL = `${BASE_URL}/issues/${issueNumber}`;
    const issueResponse = new Response(JSON.stringify(mockIssue), {
      status: 200,
      statusText: 'OK',
    });

    spyOn(window, 'fetch').and.resolveTo(issueResponse);

    const issue = await getIssueById(issueNumber);

    expect(window.fetch).toHaveBeenCalledWith(requestURL, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
  });

  it('should not fetch issue successfully', async () => {
    const requestURL = `${BASE_URL}/issues/${issueNumber}`;
    const issueResponse = new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });

    spyOn(window, 'fetch').and.resolveTo(issueResponse);

    try {
      const issue = await getIssueById(issueNumber);
      expect(true).toBeFalse();
    } catch (error) {
      expect(error).toBe(`Error in getIssue: Error in getIssue: Not Found`);
    }

    // expect(window.fetch).toHaveBeenCalledWith(requestURL, {
    //   headers: {
    //     Authorization: `Bearer ${GITHUB_TOKEN}`,
    //   },
    // });
  });
});

