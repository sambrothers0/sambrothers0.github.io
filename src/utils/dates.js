// Shared by every content collection, so a date on a project and a date on a
// note are written and rendered the same way.

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** '2026-07' -> 'Jul 2026'. Dates are stored ISO so they sort lexically. */
export function formatDate (date) {
  const [year, month] = String(date).split('-')
  const name = MONTHS[Number(month) - 1]
  return name ? `${name} ${year}` : date
}
