<!--
  The single card used for every project on the Projects page.

  Layout A (text left / media right) and layout B (media left / text right) are
  mirror images of one another, so they are one component with a `flipped` prop
  rather than two components: same markup, same expand/collapse state, same
  mobile handling, only the flex direction and text alignment differ.

  Media defaults to an <img> from the `image` prop; panels with something else
  to show (an inline SVG wordmark, say) pass it through the `media` slot and
  still get the identical card chrome around it.
-->
<template>
  <div class="panel" :class="[`tint-${tint}`, { 'panel--flipped': flipped, 'panel--mobile': isMobile }]"
    @click="toggle">
    <div class="panel-body">
      <h1 class="panel-title"> {{ project.title }} </h1>
      <ul v-if="project.skills?.length" class="panel-skills">
        <li v-for="skill in project.skills" class="skill-pill" :key="skill"> {{ skill }} </li>
      </ul>
      <div class="panel-meta">
        <!-- .stop so opening the link doesn't also toggle the card underneath -->
        <ExternalLinkIcon v-if="project.url" class="external-link" @click.stop="navigate"
          role="img" :aria-label="`Open ${project.title}`"/>
        <h3 class="panel-date"> {{ formattedDate }} </h3>
      </div>
      <p class="panel-info info">
        {{ expanded ? project.body : preview }}
      </p>
    </div>
    <div v-if="!isMobile" class="panel-media">
      <slot name="media">
        <!-- The card's text is bundled and paints immediately; the thumbnail is a
             separate request. Rather than hold the whole page (or the whole card)
             back for it, the media box shows a shimmer in place and the image
             cross-fades in on top when it decodes. The box is a fixed size either
             way, so nothing below it moves. -->
        <div v-if="!imageLoaded" class="image-skeleton panel-image-skeleton" aria-hidden="true"></div>
        <img v-if="!imageFailed" ref="image" class="panel-image"
          :class="{ 'panel-image--ready': imageLoaded }"
          :src="project.thumbnail" :alt="project.title + ' thumbnail'"
          :loading="priority ? 'eager' : 'lazy'"
          :fetchpriority="priority ? 'high' : 'auto'"
          decoding="async"
          @load="imageLoaded = true" @error="onImageError">
      </slot>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import ExternalLinkIcon from '@/assets/icons/external-link.svg?component'
import { formatDate } from '@/content/projects'

/* Where the collapsed blurb stops, in characters. */
const PREVIEW_LENGTH = 80

export default defineComponent({
  name: 'ProjectPanel',
  components: {
    ExternalLinkIcon
  },
  props: {
    project: {
      type: Object,
      required: true
    },
    /* slot of the shared panel tint scale in main.css */
    tint: {
      type: String,
      default: 'indigo',
      validator: v => ['indigo', 'azure', 'steel'].includes(v)
    },
    flipped: { type: Boolean, default: false },
    /* Set on the panels that start above the fold: their thumbnails load eagerly
       and at high priority, the rest wait until they are scrolled near. */
    priority: { type: Boolean, default: false }
  },
  data () {
    return {
      expanded: false,
      imageLoaded: false,
      imageFailed: false
    }
  },
  methods: {
    toggle () {
      this.expanded = !this.expanded
    },
    navigate () {
      window.open(this.project.url, '_blank')
    },
    /* A missing thumbnail should leave a plain empty box, not a broken-image
       glyph and not a shimmer that never stops. */
    onImageError () {
      this.imageFailed = true
      this.imageLoaded = true
    }
  },
  mounted () {
    /* A cached image can finish before Vue binds @load, so the event never
       fires and the shimmer sticks. Catch that case on mount. */
    const image = this.$refs.image
    if (image?.complete && image.naturalWidth > 0) this.imageLoaded = true
  },
  computed: {
    isMobile () {
      return this.$store.getters.isMobileOn
    },
    formattedDate () {
      return formatDate(this.project.date)
    },
    /* The collapsed blurb: cut on a word boundary so it doesn't end mid-word. */
    preview () {
      const body = this.project.body
      if (body.length <= PREVIEW_LENGTH) return body
      const lastSpace = body.lastIndexOf(' ', PREVIEW_LENGTH)
      return body.substring(0, lastSpace > 0 ? lastSpace : PREVIEW_LENGTH) + ' ...'
    }
  }
})
</script>

<style scoped lang="scss">
.panel{
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2vw;
  padding: 2.5vh 30px;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background-color: var(--panel-bg, transparent);
  overflow: hidden;
  cursor: pointer;
  /* lift rather than scale: scaling resamples the text and softens it */
  transition: transform var(--dur-med) var(--ease-out),
              box-shadow var(--dur-med) var(--ease-out),
              border-color var(--dur-med) var(--ease-out);
  margin-bottom: 50px;
}

.panel:hover{
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--accent);
}

/* Card tints. A fixed rotation, so the page looks the same every visit. The
   tint goes through --panel-bg rather than straight onto background-color so
   children can read the card's own colour back out of it (the image skeleton
   fades against it). */
.tint-indigo{ --panel-bg: var(--tint-indigo); }
.tint-azure{ --panel-bg: var(--tint-azure); }
.tint-steel{ --panel-bg: var(--tint-steel); }

.panel-body{
  width: 58%;
  text-align: left;
}

.panel-media{
  position: relative; /* anchors the loading skeleton over the box */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42%;
  height: 27vh;
}

/* the mirrored layout — everything else about the card is identical */
.panel--flipped{
  flex-direction: row-reverse;
}
.panel--flipped .panel-body{
  text-align: right;
}
.panel--flipped .panel-meta{
  justify-content: flex-end;
}

.panel--mobile .panel-body{
  width: 100%;
}

.panel-title{
  font-size: clamp(1.6rem, 2.6vw, 2.5rem);
  font-weight: 600;
  line-height: 1.15;
  margin: 0;
}

/* The skills this project shows off, as one wrapping row of pills. No colour
   coding yet — every pill reads the same, so the row is a label, not a legend. */
.panel-skills{
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 0.75rem 0 0;
}

.panel--flipped .panel-skills{
  justify-content: flex-end;
}

.skill-pill{
  font-family: 'Outfit', sans-serif;
  font-weight: 400;
  font-size: clamp(0.75rem, 1.1vw, 0.9rem);
  letter-spacing: 0.03em;
  /* Outlined label: border and text both ride currentColor, so the pill
     re-tints wholesale by setting `color` alone. Same colour as the card's
     description text, so the row reads as part of the copy. */
  color: var(--text);
  background-color: transparent;
  border: 1px solid currentColor;
  border-radius: var(--radius-pill);
  padding: 0.25em 0.85em;
  white-space: nowrap;
}

.panel-meta{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.25rem;
  width: 100%;
  margin-top: 0.75rem;
}

.panel-date{
  font-size: clamp(0.9rem, 1.4vw, 1.1rem);
  font-weight: 400;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin: 0;
}

.info{
  font-family: 'Outfit', sans-serif;
  font-weight: 300;
  font-size: clamp(1rem, 1.5vw, 1.3rem);
  line-height: 1.6;
}

.external-link{
  height: 1.5em;
  width: 1.5em;
  cursor: pointer;
  margin-right: 1vw;
  opacity: 0.8;
  transition: opacity var(--dur-fast) ease, transform var(--dur-fast) var(--ease-out);
}

.external-link:hover{
  opacity: 1;
  transform: translate(2px, -2px);
}

.panel-image{
  max-height: 100%;
  max-width: 100%;
  border-radius: var(--radius-md);
  object-fit: cover;
  opacity: 0;
  transition: opacity var(--dur-med) var(--ease-out);
}

.panel-image--ready{
  opacity: 1;
}

/* The shimmer itself is the shared .image-skeleton in main.css; the card only
   has to match the thumbnail's corners. */
.panel-image-skeleton{
  border-radius: var(--radius-md);
}
</style>
