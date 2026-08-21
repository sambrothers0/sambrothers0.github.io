/* The tabs, in order. One list rather than a button and a path per tab: adding
   a page used to mean editing the markup, the handlers, and the `known` list
   in activePath, and forgetting the last of those left the new tab unable to
   look active. It lives here rather than in NavigationBar.vue because the
   banner's overflow menu splits the same list — both need to agree on it. */
export const LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Contact', path: '/contact' },
  { label: 'Notes', path: '/notes' }
]

/* Narrow screens can't hold five tabs beside two icons, so the last two move
   out of the row and into the hamburger's panel. */
const OVERFLOW_PATHS = ['/contact', '/notes']

export const TAB_LINKS = LINKS.filter(link => !OVERFLOW_PATHS.includes(link.path))
export const OVERFLOW_LINKS = LINKS.filter(link => OVERFLOW_PATHS.includes(link.path))

/* A note's own page is still the Notes tab, so a tab claims its subpaths too.
   Home is the fallback rather than a prefix match — every path starts with
   '/'. */
export function activeLinkPath (path) {
  const match = LINKS.find(link => link.path !== '/' &&
    (path === link.path || path.startsWith(`${link.path}/`)))
  return match ? match.path : '/'
}
