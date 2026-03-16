import { defineConfig } from 'vite';

const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const isGitHubPagesBuild = Boolean(process.env.GITHUB_ACTIONS && repoName);

export default defineConfig({
  base: isGitHubPagesBuild ? `/${repoName}/` : '/',
});
