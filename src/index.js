const config = require('../config.json');
const { Octokit } = require('@octokit/core');

const octokit = new Octokit({ auth: config.github_token });

async function moveAllRepos() {
    for (const repo of config.repositories) {
        console.log(`Moving ${config.source_owner}/${repo}...`);
        await octokit.request('POST /repos/{owner}/{repo}/transfer', {
            owner: config.source_owner,
            repo: repo,
            new_owner: config.target_owner
        });
        console.log(`Moved ${config.source_owner}/${repo}!`);
    }
}

async function archiveAllRepos() {
    for (const repo of config.repositories) {
        console.log(`Archiving ${config.target_owner}/${repo}...`);
        await octokit.request('PATCH /repos/{owner}/{repo}', {
            owner: config.target_owner,
            repo,
            archived: true
        });
        console.log(`Archived ${config.target_owner}/${repo}!`);
    }
}

async function start() {
    await moveAllRepos();
    await archiveAllRepos();
}

start();
