# Deploying and rolling back the portfolio

The site is deployed by GitHub Actions (`.github/workflows/deploy.yml`), not straight from the branch.

- **Deploy:** push to `main`. The workflow checks the site, publishes it, and tags the deployed commit `site-YYYYMMDD-HHMMSS`.
- **Roll back in one click:** GitHub → *Actions* → *Deploy site* → *Run workflow*, and enter an earlier `site-…` tag (or any commit SHA). The live site switches to that version within a minute; `main` is not changed.
- **Make the rollback permanent:** revert the bad commit on `main` (`git revert <sha> && git push`); the push deploys again.
- **Rollback from the command line:** `gh workflow run deploy.yml -R AAnkitpatel/aankitpatel.github.io -f ref=<tag-or-sha>`
- **List deployable versions:** `git tag -l 'site-*'`. The version before the Open Source section is `site-2026-10-19-before-open-source`.
