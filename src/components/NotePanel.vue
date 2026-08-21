<!--
  One row of the Notes list. Every row is the same shape — title with its
  category pills beside it, the body, date and action in a right-hand column.

  What a click does follows from how the note was written, not from which
  chips it answers to. A markdown note has a page's worth of body, so the row
  goes to that page; a .js note is a pointer at something that already lives
  somewhere else — an album, a game, a tool — so the row goes there, opening
  the link in a new tab. Nothing expands: a short note is short enough to be
  shown whole, so there is never anything behind a fold. Categories can be
  combined and changed from under the reader — an action that moved with them
  would be a different row on every visit.

  That is why the root element is dynamic rather than a div with a click
  handler: a page is a <router-link> and an outbound note is an <a>, so each
  gets the semantics, the cursor, and the keyboard behaviour the browser
  already has for it. The trailing glyph — onward or outward — says which.

  The pills are the row's categories and nothing else, each wearing the same
  hue as the chip that selects it. That is what makes a narrowed list legible
  without reading it: the chips you pressed and the rows you got back are the
  same colours, and scanning the unfiltered list groups it by eye for free.
  They sit after the title rather than before it, so a note under two or three
  categories still starts its title where every other row starts its own.
-->
<template>
  <component :is="rootIs" v-bind="rootProps" class="note"
    :data-category="primaryCategory" :data-format="note.format">
    <div class="note-head">
      <h3 class="note-title"> {{ note.title }} </h3>
      <span class="note-pills">
        <span v-for="pill in note.pills" class="note-pill" :key="pill.key"
          :data-category="pill.key">
          {{ pill.label }}
        </span>
      </span>
    </div>

    <p class="note-body info"> {{ note.excerpt }} </p>

    <div class="note-side">
      <time class="note-date"> {{ formattedDate }} </time>
      <!-- The action names where the row goes: a reading time for a page of
           its own, or where the link out lands — "Listen on Spotify", and the
           hostname when the note does not say it better. -->
      <span v-if="actionLabel" class="note-action">
        {{ actionLabel }}
        <span v-if="isPage" class="action-glyph" aria-hidden="true"> → </span>
        <ExternalLinkIcon v-else class="action-glyph action-glyph--icon" aria-hidden="true"/>
      </span>
    </div>
  </component>
</template>

<script>
import { defineComponent } from 'vue'
import ExternalLinkIcon from '@/assets/icons/external-link.svg?component'
import { formatDate, FORMATS } from '@/content/notes'

export default defineComponent({
  name: 'NotePanel',
  components: {
    ExternalLinkIcon
  },
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  computed: {
    /* The row itself can only warm to one hue on hover, so it takes the first
       category the note carries; the pills keep every category's own colour. */
    primaryCategory () {
      return this.note.categories[0]
    },
    /* Written as markdown, so there is a page of it to go to. Everything else
       points outward. */
    isPage () {
      return this.note.format === FORMATS.MARKDOWN
    },
    /* A short note with no url has nowhere to go, so it is a plain block: no
       cursor, no glyph, no promise the browser cannot keep. */
    isLink () {
      return !this.isPage && Boolean(this.note.url)
    },
    rootIs () {
      if (this.isPage) return 'router-link'
      return this.isLink ? 'a' : 'div'
    },
    rootProps () {
      if (this.isPage) return { to: `/notes/${this.note.slug}` }
      return this.isLink
        ? { href: this.note.url, target: '_blank', rel: 'noopener' }
        : {}
    },
    actionLabel () {
      if (this.isPage) {
        return this.note.readMinutes ? `${this.note.readMinutes} min read` : 'Read'
      }
      if (!this.isLink) return ''
      if (this.note.linkLabel) return this.note.linkLabel
      try {
        return `Open on ${new URL(this.note.url).hostname.replace(/^www\./, '')}`
      } catch {
        return 'Open'
      }
    },
    formattedDate () {
      return formatDate(this.note.date)
    }
  }
})
</script>

<style scoped lang="scss">
/* Rows sit on --bg-raised rather than on a tint: the Projects panels own the
   tinted-and-alternating look, and reusing it here would make the two pages
   read as the same page. --category is the hue of one category, set from a
   data-category below — on the row for the hover border, and again on each
   pill so a row under two categories wears both colours. */
.note{
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: start;
  gap: 8px 28px;
  width: 100%;
  padding: 22px 26px;
  text-align: left;
  color: inherit;
  font: inherit;
  text-decoration: none;
  background-color: var(--bg-raised);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  /* lift rather than scale, matching the project panels */
  transition: transform var(--dur-med) var(--ease-out),
              box-shadow var(--dur-med) var(--ease-out),
              border-color var(--dur-med) var(--ease-out);
}

/* A row with nowhere to go does not pretend otherwise. */
div.note{
  cursor: default;
}

.note:hover{
  transform: translateY(-2px);
  border-color: color-mix(in srgb, var(--category) 55%, transparent);
  box-shadow: var(--shadow-lg);
}

div.note:hover{
  transform: none;
  border-color: var(--border);
  box-shadow: var(--shadow-sm);
}

.note[data-category='musings'],
.note-pill[data-category='musings']{ --category: var(--cat-musings); }
.note[data-category='art'],
.note-pill[data-category='art']{ --category: var(--cat-art); }
.note[data-category='software'],
.note-pill[data-category='software']{ --category: var(--cat-software); }

/* Title first, pills after it. The title is not stretched to fill the row, so
   the pills sit against it wherever it ends and grow rightward as a note
   gains categories — the title never moves. */
.note-head{
  grid-column: 1;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 6px 12px;
}

/* Its own row once the head wraps, so the pills stay together rather than
   splitting across two lines around the end of a long title. */
.note-pills{
  display: inline-flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 6px;
}

.note-pill{
  font-family: 'Outfit', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  white-space: nowrap;
  color: var(--category);
  padding: 3px 10px;
  border: 1px solid color-mix(in srgb, var(--category) 45%, transparent);
  border-radius: var(--radius-pill);
  background-color: color-mix(in srgb, var(--category) 12%, transparent);
}

.note-title{
  font-family: 'Outfit', sans-serif;
  font-size: clamp(1.2rem, 2vw, 1.5rem);
  font-weight: 500;
  line-height: 1.2;
  color: var(--text-strong);
  margin: 0;
}

.info{
  font-family: 'Outfit', sans-serif;
  font-weight: 300;
}

/* A markdown row shows an excerpt of a page that continues elsewhere, so it
   is clamped to a taste of it; a short note is the whole of itself and there
   is no longer anywhere for the rest to hide, so it prints in full. */
.note-body{
  grid-column: 1;
  max-width: 74ch;
  margin: 6px 0 0;
  font-size: clamp(0.95rem, 1.2vw, 1.08rem);
  line-height: 1.6;
}

.note[data-format='markdown'] .note-body{
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Its own column, so every date on the page lines up down the right edge no
   matter how long the titles are. */
.note-side{
  grid-column: 2;
  grid-row: 1 / span 2;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  min-width: 116px;
}

.note-date{
  font-family: 'Outfit', sans-serif;
  font-size: 0.9rem;
  letter-spacing: 0.04em;
  color: var(--text-muted);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.note-action{
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-family: 'Outfit', sans-serif;
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--text-muted);
  white-space: nowrap;
  transition: color var(--dur-med) var(--ease-out);
}

.note:hover .note-action{
  color: var(--text-strong);
}

.action-glyph{
  display: inline-flex;
  transition: transform var(--dur-med) var(--ease-out);
}

.action-glyph--icon{
  width: 1.1em;
  height: 1.1em;
}

/* each glyph leans the way its row goes: onward to a page, or out of it */
.note:hover .action-glyph{ transform: translateX(3px); }
.note[data-format='short']:hover .action-glyph{ transform: translate(2px, -2px); }

/* The date column has nowhere to go on a narrow screen, so it drops under the
   body and lays itself out horizontally instead. */
@media (max-width: 700px){
  .note{
    grid-template-columns: 1fr;
    padding: 20px;
  }

  .note-side{
    grid-column: 1;
    grid-row: auto;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top: 4px;
  }

  .note[data-format='markdown'] .note-body{
    -webkit-line-clamp: 3;
  }
}
</style>
