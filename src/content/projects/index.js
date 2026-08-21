// The project panels' content, authored by hand as one module per project in
// ./data/. Everything is bundled at build time, so the Projects page has no
// data to fetch before it can render.
//
// To add a project: drop a new file in ./data/ following the shape in any
// existing one, and put its thumbnail in public/img/projects/. Nothing else.
//
// The entries sit in their own subdirectory rather than beside this file, so
// the glob below cannot pick up the loader, the skills vocabulary, or anything
// else this collection grows.
// Date formatting is shared with the other content collections; re-exported
// here so panels can keep importing it alongside the projects themselves.
export { formatDate } from '@/utils/dates'

const modules = import.meta.glob('./data/*.js', { eager: true })

export const projects = Object.entries(modules)
  .map(([path, module]) => ({
    slug: path.match(/([^/]+)\.js$/)[1],
    ...module.default
  }))
  .filter(project => !project.hidden)
  .sort((a, b) => b.date.localeCompare(a.date))
