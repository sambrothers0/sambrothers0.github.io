<template>
  <UpperToolbar/>
  <div class="about" id="master">
    <section class="hero">
      <!-- The photo used to be a CSS background, which gives no load event to
           hang a placeholder off. As an <img> it behaves like the project
           thumbnails: the shimmer holds the viewport, the photo cross-fades in
           on top when it decodes. object-fit/position mirror the old
           background-size: cover / background-position: center exactly. -->
      <div class="image-skeleton hero-skeleton" :class="{ 'hero-skeleton--gone': heroLoaded }"
        aria-hidden="true"></div>
      <picture v-if="!heroFailed">
        <source srcset="/img/wren_building.webp" type="image/webp">
        <img ref="hero" class="hero-image"
          :class="{ 'hero-image--ready': heroLoaded, 'hero-image--hidden': grainActive }"
          src="/img/wren_building.png" alt="" aria-hidden="true"
          loading="eager" fetchpriority="high" decoding="async"
          @load="heroLoaded = true" @error="onHeroError">
      </picture>
      <!-- Animated film grain: the photo redrawn through a WebGL shader that
           re-randomises the grain every frame. While it runs, the <img> is
           hidden underneath; without WebGL, or with reduced motion, the plain
           <img> shows instead. See utils/filmGrain.js. -->
      <canvas ref="grain" class="hero-grain" :class="{ 'hero-grain--ready': grainActive }"
        aria-hidden="true"></canvas>
      <div id='title'>
        <h1 class="hero-heading">Who is Sam Brothers?</h1>
        <span class="rule rule--reverse hero-rule" aria-hidden="true"></span>
      </div>
    </section>
    <section class="content"> 
      <article> 
        <h2 class="header">Quality</h2> 
        <p>
          If there's one thing that bugs me, it's bugs.
          That's why my code is future-proof,
          modular, and adaptable. 
          Working with me, we'll spend less time
          redoing old work and more time
          shipping awesome features.
        </p> 
      </article> 
      <article> 
        <h2 class="header">Progress</h2> 
        <p>
          Software development is one of the fastest changing industries, which is
          why it requires a neuroplastic brain to excel. I'm constantly learning and
          improving as an engineer, and this is something that won't change.
          My professional experience has
          exposed me to numerous projects, languages, frameworks, libraries, and tools -
          all of which I leverage to
          create something that actually works for the user.
        </p> 
      </article> 
      <article> 
        <h2 class="header">Intention</h2> 
        <p>
          I love what I do so much that I would do it for free if I could.
          I strive to see tasks through the eyes of my collaborators and their users, 
          because I have a profound passion for discovering solutions that help people.
        </p> 
      </article> 
      <div class="slogan"> Let your problem be the next one I solve </div> 
    </section>
  </div>
</template>

<script>
import UpperToolbar from '@/components/UpperToolbar.vue'
import { createFilmGrain } from '@/utils/filmGrain.js'

export default {
  name: 'AboutView',
  components: {
    UpperToolbar
  },
  data () {
    return {
      isMiddleVisible: false,
      isLowerVisible: false,
      heroLoaded: false,
      heroFailed: false,
      grainActive: false
    }
  },
  watch: {
    heroLoaded (loaded) {
      if (loaded) this.startGrain()
    }
  },
  methods: {
    /* A photo that never arrives should leave the plain page background, not a
       broken-image glyph and not a shimmer that runs forever. */
    onHeroError () {
      this.heroFailed = true
      this.heroLoaded = true
    },
    startGrain () {
      const image = this.$refs.hero
      const canvas = this.$refs.grain
      if (this.grain || this.heroFailed || !image || !canvas) return
      if (!image.complete || !image.naturalWidth) return
      if (this.reducedMotion?.matches) return

      this.grain = createFilmGrain({
        canvas,
        image,
        intensity: 0.5, // Read Your Color's purple hero: intensity 50, shadow 0, speed 100
        shadow: 0,
        onContextLost: () => this.stopGrain()
      })
      this.grainActive = !!this.grain
    },
    stopGrain () {
      this.grain?.destroy()
      this.grain = null
      this.grainActive = false
    },
    onReducedMotionChange (event) {
      event.matches ? this.stopGrain() : this.startGrain()
    }
  },
  mounted () {
    /* Animated grain is motion; honour the OS setting, live. */
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    this.reducedMotion.addEventListener('change', this.onReducedMotionChange)

    /* A cached photo can finish before Vue binds @load, so the event never
       fires and the shimmer sticks. Catch that case on mount. */
    const hero = this.$refs.hero
    if (hero?.complete && hero.naturalWidth > 0) this.heroLoaded = true
  },
  beforeUnmount () {
    this.reducedMotion?.removeEventListener('change', this.onReducedMotionChange)
    this.stopGrain()
  }
}

</script>

<style lang="scss" scoped>
.about {
  width: 100%;
  height: 100%;
  font-family: 'Outfit', sans-serif;
  background-color: var(--bg);
  color: var(--text);
  transition: background-color var(--dur-slow) ease, color var(--dur-slow) ease;
}

.hero {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 2em;
  position: relative;
  overflow: hidden;
}

.hero-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  opacity: 0;
  transition: opacity var(--dur-med) var(--ease-out);
}

.hero-image--ready {
  opacity: 1;
}

/* the grain canvas draws the photo itself, so the <img> beneath steps aside */
.hero-image--hidden {
  visibility: hidden;
}

.hero-grain {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  pointer-events: none;
  opacity: 0;
  transition: opacity var(--dur-med) var(--ease-out);
}

.hero-grain--ready {
  opacity: 1;
}

/* Unlike a card thumbnail, this shimmer covers the whole viewport, so popping
   it out the instant the photo loads would flash the page background behind the
   fade-in. It stays put and fades out under the photo instead. */
.hero-skeleton {
  transition: opacity var(--dur-med) var(--ease-out);
}

.hero-skeleton--gone {
  opacity: 0;
}

#title {
  font-size: 3em;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.55);
  z-index: 2;
}

/* the hero sits on a photo, so it stays light in both themes */
.hero-heading {
  font-size: clamp(2rem, 6vw, 5rem);
  font-weight: 400;
  line-height: 1.1;
  margin: 0;
  color: var(--light-color);
}

/* the hero sits on a photo in both themes, so its rule is pinned to the
   light rung of indigo rather than following --accent */
.hero-rule {
  width: 30vw;
  margin: 0.25em auto 0;
  background:
    linear-gradient(var(--indigo-300), var(--indigo-300)) 0 0 / 4px 100% no-repeat,
    linear-gradient(var(--indigo-300), var(--indigo-300)) 9px 0 / 4px 100% no-repeat,
    linear-gradient(to right, var(--indigo-300), var(--indigo-400)) 18px 0 / calc(100% - 18px) 100% no-repeat;
}

.content {
  padding: 4em 2em;
  max-width: 1100px;
  margin: 0 auto;
  color: var(--text);

  article {
    margin: 1.75em 0;
    padding: 1.75em 2em;
    text-align: left;
    border-radius: var(--radius-lg);
    border: 2px solid var(--accent);
    transition: transform var(--dur-med) var(--ease-out),
                box-shadow var(--dur-med) var(--ease-out),
                background-color var(--dur-med) var(--ease-out);

    /* section headings are accent, not highlight — the slogan below is
       this page's single steel moment */
    h2 {
    font-size: 1.6em;
    font-family: 'Niramit', sans-serif;
    font-weight: 600;
    margin: 0 0 0.5em;
    line-height: 1.2;
    color: var(--accent-strong);
    }
    p {
    font-size: 1.25em;
    line-height: 1.65;
    font-weight: 300;
    max-width: 68ch;
    margin: 0;
    }
  }
  .slogan {
    text-align: center;
    font-size: clamp(1.75rem, 5vw, 3.25rem);
    line-height: 1.15;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--highlight);
    font-family: 'Niramit', sans-serif;
    margin-top: 1.5em;
  }
}

</style>
