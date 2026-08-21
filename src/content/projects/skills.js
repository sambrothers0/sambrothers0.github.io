// The vocabulary of skills a project panel can advertise, drawn from the skills
// section of my resume so the two never drift apart.
//
// Projects import these constants rather than writing the strings inline: a
// typo in a free-form string would quietly create a second, near-identical pill,
// and renaming a skill here renames it everywhere it appears at once.
//
// To add a skill: add it to the resume first, then add a constant below.

export const SKILLS = Object.freeze({
  // Web
  REACT: 'React',
  TYPESCRIPT: 'TypeScript',
  TAILWIND: 'Tailwind',
  JAVASCRIPT: 'JavaScript',
  VUE: 'Vue.js',
  HTML: 'HTML',
  CSS: 'CSS',

  // Languages and platforms
  CPP: 'C++',
  JAVA: 'Java',
  PYTHON: 'Python',
  AWS: 'AWS',

  // Practices and tooling
  GIT: 'Git',
  CI_CD: 'CI/CD',
  AUTOMATED_TESTING: 'Automated Testing',
  AGILE_DEVELOPMENT: 'Agile Development',
  WEB_SCRAPING: 'Web Scraping'
})
