//import
const { Octokit } = require("@octokit/rest");
const fs = require("fs");
const path = require("path");
const env = require("./env.json");

const { org, personalAccessToken } = env;

const basePath = path.join(__dirname, "..", "issues");
(async () => {
  //authenticate
  const octokit = new Octokit({
    auth: personalAccessToken,
  });

  //list all repo's https://octokit.github.io/rest.js/v18#repos-list-for-org
  const { data: repos } = await octokit.rest.repos.listForOrg({
    org,
    per_page: 100,
  });

  const reposWithIssues = await Promise.all(
    repos.map(async (repo) => {
      //for every repo https://octokit.github.io/rest.js/v18#issues-list-for-repo
      const { data: issues } = await octokit.rest.issues.listForRepo({
        owner: org,
        repo: repo.name,
        per_page: 100,
        state: "open",
      });

      return {
        name: repo.name,
        issues: issues
          .filter((i) => !i.pull_request)
          .map((issue) => ({
            title: issue.title,
            body: issue.body,
          })),
      };
    })
  );

  reposWithIssues.map((repoWithIssues) => {
    if (repoWithIssues.issues.length > 0) {
      const dirPath = path.join(basePath, repoWithIssues.name);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(path.join(basePath, repoWithIssues.name), {
          recursive: true,
        });
      }

      repoWithIssues.issues.forEach((issue) => {
        if (issue.body && issue.body.length > 0) {
          fs.writeFileSync(
            path.join(
              basePath,
              repoWithIssues.name,
              `${issue.title.replaceAll("/", ",")}.md`
            ),
            issue.body
            // () => console.log("Created issue ", issue.title)
          );
        }
      });
      console.log(
        `Created ${repoWithIssues.issues.length} issues for ${repoWithIssues.name}`
      );
    }
  });

  // for every issue number https://octokit.github.io/rest.js/v18#issues-list-comments
  // octokit.rest.issues.listComments({
  //   owner,
  //   repo,
  //   issue_number,
  // });
})();
