<!--
  The Notes page: one long, left-justified list of everything that is not a
  project, chosen from by the category chips.

  One chip per category, and a note answers to every category it declares.
  Selecting several widens the list rather than narrowing it — a note shows
  when any of its categories is among the active ones. That is the useful
  direction here: the question the list answers is "show me these kinds of
  thing", and it is short enough that nothing finer than that earns its chip.
-->
<template>
  <UpperToolbar/>
  <div class="notes" id="master">
    <div class="notes-column">
      <header class="page-head">
        <h1 class="page-title"> Notes </h1>
        <span class="rule" aria-hidden="true"></span>
      </header>

      <div class="categories" role="group" aria-label="Note categories">
        <button v-for="category in categories" class="chip" :key="category.key"
          :data-category="category.key"
          :aria-pressed="String(isActive(category.key))"
          @click="toggle(category.key)">
          <span class="chip-dot" aria-hidden="true"></span>
          {{ category.label }}
          <span class="chip-count"> {{ category.count }} </span>
        </button>
        <p class="shown-count" aria-live="polite"> {{ countLabel }} </p>
      </div>

      <div class="list">
        <NotePanel v-for="note in visibleNotes" :note="note" :key="note.slug"/>
      </div>

      <p v-if="!visibleNotes.length" class="empty">
        Nothing in those categories yet.
        <button class="empty-reset" type="button" @click="clear"> Clear the categories </button>
        to see everything.
      </p>
    </div>
  </div>
</template>

<script>
import UpperToolbar from '@/components/UpperToolbar.vue'
import NotePanel from '@/components/NotePanel.vue'
import { notes, categoryCounts, defaultCategories } from '@/content/notes'

const VALID = categoryCounts.map(category => category.key)

/** '?category=musings,software' -> ['musings', 'software'], ignoring anything invented. */
function parseCategories (value) {
  return String(value || '')
    .split(',')
    .map(key => key.trim())
    .filter(key => VALID.includes(key))
}

export default {
  name: 'NotesView',
  components: {
    UpperToolbar,
    NotePanel
  },
  data () {
    return {
      notes,
      categories: categoryCounts,
      active: []
    }
  },
  computed: {
    /* Any, not all: several chips at once widen the list, and a note under
       two categories shows for either of them. */
    visibleNotes () {
      if (!this.active.length) return this.notes
      return this.notes.filter(note => note.categories.some(category => this.active.includes(category)))
    },
    countLabel () {
      if (!this.active.length) return `Showing all ${this.notes.length}`
      return `Showing ${this.visibleNotes.length} of ${this.notes.length}`
    }
  },
  methods: {
    isActive (key) {
      return this.active.includes(key)
    },
    toggle (key) {
      this.applyCategories(this.isActive(key)
        ? this.active.filter(active => active !== key)
        : [...this.active, key])
    },
    clear () {
      this.applyCategories([])
    },
    /* The selection lives in the URL so a narrowed view can be linked to and
       so the back button walks through it. Only the query changes, so
       `replace` rather than `push` — choosing categories is not a new page.
       An empty selection still writes an empty `category=`, because a URL
       with no `category` at all is the one that opens on the defaults. */
    applyCategories (next) {
      this.active = next
      this.$router.replace({ query: { category: next.join(',') } })
    }
  },
  /* No `?category=` at all means the page has not been told what to show, so
     it opens on the default chips. An empty one — what clearing the chips
     leaves behind — is a choice, and stays the whole list. */
  created () {
    this.active = this.$route.query.category === undefined
      ? [...defaultCategories]
      : parseCategories(this.$route.query.category)
  },
  watch: {
    /* Covers the back button and a pasted link; the toggle path has already
       set `active` to the same thing by the time this fires. */
    '$route.query.category' (value) {
      this.active = parseCategories(value)
    }
  }
}
</script>

<style scoped lang="scss">
.notes{
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  padding-bottom: 80px;
  background-color: var(--bg);
  color: var(--text);
  transition: background-color var(--dur-slow) ease, color var(--dur-slow) ease;
}

/* Centred column, left-justified contents — the list is meant to be scanned
   down one edge, not read symmetrically. */
.notes-column{
  width: min(1100px, 86vw);
  text-align: left;
}

.page-head{
  margin: 20vh 0 0;
  max-width: 60ch;
}

.page-title{
  font-size: clamp(3rem, 9vw, 8rem);
  font-weight: 200;
  line-height: 1;
  letter-spacing: -0.02em;
  margin: 0;
}

.page-head .rule{
  width: min(460px, 60%);
  margin: 1em 0 1.4em;
}

.page-sub{
  font-family: 'Outfit', sans-serif;
  font-weight: 300;
  font-size: clamp(1rem, 1.5vw, 1.25rem);
  line-height: 1.6;
  color: var(--text-muted);
  margin: 0;
}

/* In the flow, between the title and the list: the bar scrolls away with the
   rest of the page rather than following the reader down it.

   Three chips fit on one row at any width worth designing for, and the count
   on each is doing the work a heading would. */
.categories{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 10px;
  margin: 6vh 0 1.5vh;
  padding: 14px 0;
}

.chip{
  /* One step of the chip's hue toward the page's text colour: lighter on the
     dark theme, darker on the light one — the same direction
     --accent-fill-hover moves in each, without a rung per category. */
  --category-hover: color-mix(in srgb, var(--category) 84%, var(--text));
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 16px;
  font-family: 'Outfit', sans-serif;
  font-size: 0.92rem;
  font-weight: 500;
  color: var(--text);
  background-color: transparent;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-pill);
  cursor: pointer;
  transition: background-color var(--dur-fast) ease,
              border-color var(--dur-fast) ease,
              color var(--dur-fast) ease;
}

/* A chip previews its own hue on hover rather than the shared accent, so the
   colour under the cursor is the colour of the rows the chip is about. */
.chip:hover{
  color: var(--category);
  border-color: var(--category);
}

/* Comes after :hover deliberately: a pressed chip keeps its fill under the
   cursor, because the fill is the state and hover is not.

   The fill is the chip's own hue — the same one the dot has been wearing all
   along — rather than the shared accent, so selecting a chip promotes the
   colour it was already showing instead of swapping in a different one. */
.chip[aria-pressed='true']{
  color: var(--cat-on);
  background-color: var(--category);
  border-color: var(--category);
}

.chip[aria-pressed='true']:hover{
  background-color: var(--category-hover);
  border-color: var(--category-hover);
}

/* --category is the hue this chip stands for: the dot always wears it, the
   chip borrows it on hover, and every row that answers to the chip wears a
   pill in it. Set below, from the chip's data-category. */
.chip-dot{
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--category);
}

.chip[data-category='musings']{ --category: var(--cat-musings); }
.chip[data-category='art']{ --category: var(--cat-art); }
.chip[data-category='software']{ --category: var(--cat-software); }

.chip[aria-pressed='true'] .chip-dot{
  background-color: var(--cat-on);
}

.chip-count{
  font-size: 0.8rem;
  color: var(--text-muted);
  font-variant-numeric: tabular-nums;
}

.chip[aria-pressed='true'] .chip-count{
  color: color-mix(in srgb, var(--cat-on) 72%, transparent);
}

.shown-count{
  margin: 0 0 0 auto;
  font-family: 'Outfit', sans-serif;
  font-size: 0.88rem;
  color: var(--text-muted);
  font-variant-numeric: tabular-nums;
}

.list{
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.empty{
  padding: 56px 26px;
  font-family: 'Outfit', sans-serif;
  font-weight: 300;
  text-align: center;
  color: var(--text-muted);
  border: 1px dashed var(--border-strong);
  border-radius: var(--radius-md);
}

.empty-reset{
  padding: 0;
  font-family: inherit;
  font-weight: 600;
  color: var(--accent);
  background: none;
  border: 0;
  cursor: pointer;
  text-underline-offset: 3px;
}

.empty-reset:hover{
  text-decoration: underline;
}

@media (max-width: 700px){
  .page-head{
    margin-top: 16vh;
  }

  .shown-count{
    margin-left: 0;
    width: 100%;
  }
}
</style>
