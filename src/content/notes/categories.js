// The vocabulary the Notes page labels and sorts itself with, in the same
// spirit as skills.js: constants rather than free-form strings, so a typo
// cannot quietly create a second, near-identical category.
//
// There is one word for this axis and it is "category". The chips at the top
// of the page are categories, the pills on a row are categories, and a note
// declares the categories it belongs to. Nothing here is a "filter" —
// filtering is what the page does with a category, not a second kind of thing
// to keep in step with it.
//
// A note may carry more than one: a musing about a game is a musing and art
// both, and saying so puts it under either chip and gives it a pill for each.
// Categories do not decide what clicking a row does; that follows from how the
// note was written (see `format` in ./index.js), because that is what actually
// says whether there is a page's worth of it to read.

export const CATEGORIES = Object.freeze({
  MUSINGS: 'musings',
  ART: 'art',
  SOFTWARE: 'software'
})

/* Chip order on the page, the label each chip carries, and the singular form
   the row pill wears. The chip labels a group and the pill labels one note,
   which is the only reason there are two strings here rather than one. */
export const CATEGORY_LIST = Object.freeze([
  { key: CATEGORIES.SOFTWARE, label: 'Software', pill: 'Software' },
  { key: CATEGORIES.MUSINGS, label: 'Musings', pill: 'Musing' },
  { key: CATEGORIES.ART, label: 'Art I Enjoy', pill: 'Art' }
])

/* What the Notes page starts on when its URL says nothing: software alone,
   with the other chips off. Clearing the chips is still a different state
   from this one — it widens the list to everything. */
export const DEFAULT_CATEGORIES = Object.freeze([CATEGORIES.SOFTWARE])

/* { musings: 'Musing', … } — what a pill of that category reads. Also the
   list of categories that exist at all: a note claiming anything else is
   dropped to it in ./index.js. */
export const CATEGORY_PILL = Object.freeze(
  Object.fromEntries(CATEGORY_LIST.map(category => [category.key, category.pill]))
)
