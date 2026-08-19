// The project panels' content, authored by hand as one module per project in
// ./projects/. Everything is bundled at build time, so the Projects page has
// no data to fetch before it can render.
//
// To add a project: drop a new file in ./projects/ following the shape in any
// existing one, and put its thumbnail in public/img/projects/. Nothing else.
//
// This loader is a sibling of the directory rather than an index.js inside it,
// so the glob below cannot pick itself up.

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** '2026-07' -> 'Jul 2026'. Dates are stored ISO so they sort lexically. */
export function formatDate (date) {
  const [year, month] = String(date).split('-')
  const name = MONTHS[Number(month) - 1]
  return name ? `${name} ${year}` : date
}

const modules = import.meta.glob('./projects/*.js', { eager: true })

export const projects = Object.entries(modules)
  .map(([path, module]) => ({
    slug: path.match(/([^/]+)\.js$/)[1],
    ...module.default
  }))
  .filter(project => !project.hidden)
  .sort((a, b) => b.date.localeCompare(a.date))
