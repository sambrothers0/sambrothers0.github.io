// gh-scraper.js
// Usage: node gh-scraper.js
// This script fetches repo info, pw-info.txt, and thumbnails from GitHub for a hardcoded user.
// The GitHub token should be provided via the GITHUB_TOKEN environment variable for security.
// In GitHub Actions, this is done automatically by the GitHub Actions secret workflow.

const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const username = 'sambrothers0';
const githubToken = process.env.GITHUB_TOKEN;

const titles = [];
const shortInfos = [];
const longInfos = [];
const dates = [];
const urls = [];
const thumbnails = [];

async function fetchData(repo) {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${username}/${repo.name}/contents/pw-info.txt`,
      {
        headers: {
          Authorization: githubToken ? `token ${githubToken}` : undefined
        }
      }
    );
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    // GitHub returns txt content as base64 encoded
    const content = Buffer.from(data.content, 'base64').toString('utf-8');
    const lines = content.split('\n');

    titles.push(lines[0].trim());

    let cutoff = 80;
    let info = lines[1].trim();
    if (info.length > cutoff) {
      let lastSpaceIndex = info.lastIndexOf(' ', cutoff);
      let breakPoint = lastSpaceIndex > 0 ? lastSpaceIndex : cutoff;
      let shortInfo = info.substring(0, breakPoint) + ' ...';
      shortInfos.push(shortInfo);
    } else {
      shortInfos.push(info);
    }
    longInfos.push(info);

    dates.push(lines[2].trim());
  } catch (error) {
    console.error(`Failed to fetch pw-info.txt for ${repo.name}:`, error);
  }
  return true;
}

async function fetchThumbnail(repo) {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${username}/${repo.name}/contents/thumbnail.png`,
      {
        headers: {
          Authorization: githubToken ? `token ${githubToken}` : undefined
        }
      }
    );
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    thumbnails.push(`data:image/png;base64,${data.content.replace(/\n/g, '')}`);
  } catch (error) {
    console.error(`Failed to fetch thumbnail for ${repo.name}:`, error);
  }
  return true;
}

async function fetchGithubRepos() {
  try {
    let page = 1;
    let perPage = 100;
    let allRepos = [];
    let hasMore = true;
    while (hasMore) {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}`,
        {
          headers: {
            Authorization: githubToken ? `token ${githubToken}` : undefined
          }
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const repos = await response.json();
      allRepos = allRepos.concat(repos);
      hasMore = repos.length === perPage;
      page++;
    }

    for (let i = 0; i < allRepos.length; i++) {
      // if repo is missing info or thumbnail, dont add the url
      // repo should be completely emitted from final json
      if (await fetchData(allRepos[i]) && await fetchThumbnail(allRepos[i])) {
        urls.push(allRepos[i].html_url);
      }
    }

    // Sort all repo data reverse chronologically by dates
    const repoData = titles.map((title, idx) => ({
      title,
      shortInfo: shortInfos[idx],
      longInfo: longInfos[idx],
      date: dates[idx],
      url: urls[idx],
      thumbnail: thumbnails[idx]
    }));
    repoData.sort((a, b) => {
      // Try to parse as Date, fallback to string compare
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (!isNaN(dateA) && !isNaN(dateB)) {
        return dateB - dateA;
      }
      return b.date.localeCompare(a.date);
    });
    // Unpack sorted data back into arrays
    const sortedTitles = repoData.map(r => r.title);
    const sortedShortInfos = repoData.map(r => r.shortInfo);
    const sortedLongInfos = repoData.map(r => r.longInfo);
    const sortedDates = repoData.map(r => r.date);
    const sortedUrls = repoData.map(r => r.url);
    const sortedThumbnails = repoData.map(r => r.thumbnail);

    console.log('Fetched data: ', { sortedTitles, sortedShortInfos, sortedLongInfos, sortedDates, sortedUrls, sortedThumbnails });

    const outputPath = path.join(__dirname, '../public/data/gh-data.json');
    const outputData = {
      titles: sortedTitles,
      shortInfos: sortedShortInfos,
      longInfos: sortedLongInfos,
      dates: sortedDates,
      urls: sortedUrls,
      thumbnails: sortedThumbnails
    };
    fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2), 'utf-8');
    console.log(`Data written to ${outputPath}`);
  } catch (error) {
    console.error('Failed to fetch repos:', error);
  }
}

fetchGithubRepos();
