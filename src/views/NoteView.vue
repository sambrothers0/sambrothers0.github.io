<!--
  A single musing, at /notes/:slug.

  The body arrives as HTML that was rendered from markdown at build time (see
  the notes-markdown plugin in vite.config.js), so there is no parser in the
  bundle and nothing to fetch — the page paints with the rest of the app. The
  router guarantees the slug exists before this component is created.
-->
<template>
  <UpperToolbar/>
  <div class="note-page" id="master">
    <article class="note-column">
      <router-link class="back-link" to="/notes">
        <span class="back-glyph" aria-hidden="true">←</span> Notes
      </router-link>

      <div class="note-meta">
        <span v-for="pill in note.pills" class="note-pill" :key="pill.key"
          :data-category="pill.key">
          {{ pill.label }}
        </span>
        <time class="note-date"> {{ formattedDate }} </time>
        <span v-if="note.readMinutes" class="note-read"> {{ note.readMinutes }} min read </span>
      </div>

      <h1 class="note-title"> {{ note.title }} </h1>
      <span class="rule" aria-hidden="true"></span>

      <!-- built from the note's own markdown at build time, never from
           anything a visitor can supply -->
      <div class="prose" v-html="note.html"></div>

      <footer class="note-foot">
        <router-link class="back-link" to="/notes">
          <span class="back-glyph" aria-hidden="true">←</span> Back to notes
        </router-link>
      </footer>
    </article>
  </div>
</template>

<script>
import UpperToolbar from '@/components/UpperToolbar.vue'
import { noteBySlug, formatDate } from '@/content/notes'

export default {
  name: 'NoteView',
  components: {
    UpperToolbar
  },
  computed: {
    note () {
      return noteBySlug(this.$route.params.slug)
    },
    formattedDate () {
      return formatDate(this.note.date)
    }
  },
  /* The router's own title comes from the route meta, which cannot know which
     note this is; set the real one once the component knows. */
  created () {
    document.title = `${this.note.title} | Sam Brothers | Software Developer`
  }
}
</script>

<style scoped lang="scss">
.note-page{
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  padding-bottom: 90px;
  background-color: var(--bg);
  color: var(--text);
  transition: background-color var(--dur-slow) ease, color var(--dur-slow) ease;
}

/* One column, measured for reading rather than for the list's scanning. */
.note-column{
  width: min(72ch, 86vw);
  margin-top: 18vh;
  text-align: left;
}

.back-link{
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'Outfit', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--accent);
  text-decoration: none;
}

.back-glyph{
  transition: transform var(--dur-med) var(--ease-out);
}

.back-link:hover .back-glyph{
  transform: translateX(-3px);
}

.note-meta{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 14px;
  margin-top: 3vh;
  font-family: 'Outfit', sans-serif;
  font-size: 0.88rem;
  color: var(--text-muted);
}

/* The same pills the row in the list wore, in the same hues, so arriving here
   from a narrowed list is visibly the same note. */
.note-pill[data-category='musings']{ --category: var(--cat-musings); }
.note-pill[data-category='art']{ --category: var(--cat-art); }
.note-pill[data-category='software']{ --category: var(--cat-software); }

.note-pill{
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--category);
  padding: 3px 10px;
  border: 1px solid color-mix(in srgb, var(--category) 45%, transparent);
  border-radius: var(--radius-pill);
  background-color: color-mix(in srgb, var(--category) 12%, transparent);
}

.note-date,
.note-read{
  letter-spacing: 0.04em;
  font-variant-numeric: tabular-nums;
}

.note-title{
  font-size: clamp(2.2rem, 5.5vw, 3.8rem);
  font-weight: 200;
  line-height: 1.05;
  letter-spacing: -0.02em;
  margin: 0.4em 0 0;
}

.note-column .rule{
  width: min(320px, 50%);
  margin: 1.2em 0 0;
}

/* The rendered markdown. Scoped styles do not reach v-html children, so every
   rule here is :deep(); the body is the only thing inside .prose, so the
   selectors can stay this plain. */
.prose{
  margin-top: 4vh;
  font-family: 'Outfit', sans-serif;
  font-weight: 300;
  font-size: clamp(1.02rem, 1.35vw, 1.18rem);
  line-height: 1.75;
}

.prose :deep(p){
  margin: 0 0 1.4em;
}

.prose :deep(h2){
  font-size: clamp(1.4rem, 2.4vw, 1.9rem);
  font-weight: 400;
  line-height: 1.2;
  margin: 2.2em 0 0.7em;
  color: var(--text-strong);
}

.prose :deep(h3){
  font-size: clamp(1.15rem, 1.8vw, 1.4rem);
  font-weight: 500;
  margin: 1.8em 0 0.6em;
  color: var(--text-strong);
}

.prose :deep(strong){
  font-weight: 600;
  color: var(--text-strong);
}

.prose :deep(a){
  color: var(--accent);
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-thickness: 1px;
}

.prose :deep(a:hover){
  color: var(--accent-strong);
}

.prose :deep(ul),
.prose :deep(ol){
  padding-left: 1.3em;
  margin: 0 0 1.4em;
}

.prose :deep(li){
  margin: 0.4em 0;
}

.prose :deep(li)::marker{
  color: var(--accent);
}

/* the page's one steel element */
.prose :deep(blockquote){
  margin: 1.6em 0;
  padding: 0.2em 0 0.2em 1.2em;
  border-left: 3px solid var(--highlight);
  color: var(--text-muted);
  font-style: italic;
}

.prose :deep(code){
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.88em;
  padding: 0.15em 0.4em;
  background-color: var(--accent-softer);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
}

.prose :deep(pre){
  overflow-x: auto;
  padding: 18px 20px;
  margin: 0 0 1.6em;
  background-color: var(--bg-raised);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
}

.prose :deep(pre code){
  padding: 0;
  border: 0;
  background: none;
}

.prose :deep(img){
  border-radius: var(--radius-md);
}

.prose :deep(hr){
  height: 1px;
  border: 0;
  margin: 2.4em 0;
  background-color: var(--border);
}

.note-foot{
  margin-top: 6vh;
  padding-top: 3vh;
  border-top: 1px solid var(--border);
}

@media (max-width: 700px){
  .note-column{
    margin-top: 15vh;
  }
}
</style>
