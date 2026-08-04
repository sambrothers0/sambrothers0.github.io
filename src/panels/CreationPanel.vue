<!--
  The single card used for every project on the Creations page.

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
      <h1 class="panel-title"> {{ title }} </h1>
      <div class="panel-meta">
        <!-- .stop so opening the link doesn't also toggle the card underneath -->
        <img v-if="url" class="external-link" @click.stop="navigate"
          :src="isDarkMode ? '/img/external_link_icon_light.png' : '/img/external_link_icon_dark.png'"
          :alt="`Open ${title}`">
        <h3 class="panel-date"> {{ date }} </h3>
      </div>
      <p class="panel-info info">
        {{ expanded ? longText : shortText }}
      </p>
    </div>
    <div v-if="!isMobile" class="panel-media">
      <slot name="media">
        <img class="panel-image" :src="image" :alt="title">
      </slot>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CreationPanel',
  props: {
    title: { type: String, required: true },
    date: { type: String, default: '' },
    shortText: { type: String, default: '' },
    longText: { type: String, default: '' },
    url: { type: String, default: '' },
    image: { type: String, default: '' },
    /* slot of the shared panel tint scale in main.css */
    tint: {
      type: String,
      default: 'indigo',
      validator: v => ['indigo', 'steel', 'plum', 'evergreen', 'ember'].includes(v)
    },
    flipped: { type: Boolean, default: false }
  },
  data () {
    return {
      expanded: false
    }
  },
  methods: {
    toggle () {
      this.expanded = !this.expanded
    },
    navigate () {
      window.open(this.url, '_blank')
    }
  },
  computed: {
    isMobile () {
      return this.$store.getters.isMobileOn
    },
    isDarkMode () {
      return this.$store.getters.isDarkModeOn
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

/* Card tints. A fixed rotation, so the page looks the same every visit. */
.tint-indigo{ background-color: var(--tint-indigo); }
.tint-steel{ background-color: var(--tint-steel); }
.tint-plum{ background-color: var(--tint-plum); }
.tint-evergreen{ background-color: var(--tint-evergreen); }
.tint-ember{ background-color: var(--tint-ember); }

.panel-body{
  width: 58%;
  text-align: left;
}

.panel-media{
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
  box-shadow: var(--shadow-md);
  transition: transform var(--dur-med) var(--ease-out);
}

.panel:hover .panel-image{
  transform: scale(1.02);
}

/* slotted media (e.g. an inline SVG wordmark) is boxed to the same footprint */
.panel-media :deep(svg),
.panel-media :deep(img){
  max-height: 100%;
  max-width: 100%;
}
</style>
