<template>
<!-- both layout states are classes on the banner; every child sizes itself
     off them in CSS, so nothing here is positioned imperatively -->
<div id="cover-banner" :class="{ condensed: isCondensed, mobile: isMobile }">
    <div id="home-button-container">
        <button @click="navigateHome" id="home-button">
            <img src="/website_icon.png" id="home-button-image"/>
        </button>
    </div>
    <NavigationBar class="navigation-bar"/>
    <div id="appearance-button-container">
        <button @click="toggleDarkMode" id="appearance-button" aria-label="Toggle theme">
            <component :is="isDarkMode ? 'MoonIcon' : 'SunIcon'" id="appearance-button-image"/>
        </button>
    </div>
</div>
</template>

<script>
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import NavigationBar from './NavigationBar.vue'
import SunIcon from '@/assets/icons/sun.svg?component'
import MoonIcon from '@/assets/icons/moon.svg?component'

export default defineComponent({
  name: 'UpperToolbar',
  data () {
    return {
      isCondensed: false,
      aspectRatioThreshold: 1,
      // asymmetric thresholds: a single cutoff flickers when a scroll lands
      // right on it, and condensing shifts the bar enough to nudge it back
      condenseAt: 120,
      expandAt: 80
    }
  },
  methods: {
    toggleDarkMode () {
      this.$store.dispatch('toggleDarkMode')
    },
    getAspectRatio () {
      return (window.innerWidth / window.innerHeight)
    },
    handleResize () {
      this.getAspectRatio() < this.aspectRatioThreshold ? this.$store.dispatch('mobileOn') : this.$store.dispatch('mobileOff')
    },
    handleScroll () {
      // the narrow layout has no room to condense into — it stays expanded
      // at every scroll depth
      if (this.isMobile) {
        this.isCondensed = false
        return
      }
      const y = window.scrollY
      if (!this.isCondensed && y > this.condenseAt) {
        this.isCondensed = true
      } else if (this.isCondensed && y < this.expandAt) {
        this.isCondensed = false
      }
    },
    navigateHome () {
      this.route.path === '/' ? location.reload() : this.$router.push('/')
    }
  },
  components: {
    NavigationBar,
    SunIcon,
    MoonIcon
  },
  computed: {
    isDarkMode () {
      return this.$store.getters.isDarkModeOn
    },
    isMobile () {
      return this.$store.getters.isMobileOn
    }
  },
  watch: {
    // crossing the mobile boundary while scrolled down has to re-decide the
    // condensed state — the layout it applies to just changed underneath it
    isMobile () {
      this.handleScroll()
    }
  },
  created () {
    this.handleResize()   // settles isMobile first, so the scroll check sees it
    this.handleScroll()   // don't assume we start at the top; reloads restore scroll
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll, { passive: true })
    window.addEventListener('resize', this.handleResize)
  },
  unmounted () {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleResize)
  },
  setup () {
    const route = useRoute()

    return {
      route
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
/* the toolbar inverts against the page on purpose — light bar over the
   dark theme, dark bar over the light one */
#cover-banner{
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  /* left/right rather than 100vw: vw counts the scrollbar gutter, so a 100vw
     banner hangs off the right edge and centres its contents half a gutter
     right of where the page's own centre is */
  left: 0;
  right: 0;
  z-index: 10;
  height: 11vh;
  /* the condensed geometry, in one place: the pill's width, how far the two
     icons sit from the banner's edges, and how far everything drops. the
     condensed inset is derived from the pill rather than typed out, so the
     icons stay tucked the same distance inside its ends if it ever resizes */
  --pill-width: 65%;
  --icon-inset: 5%;
  --condense-drop: 20px;
}
#cover-banner.condensed{
  --icon-inset: calc((100% - var(--pill-width)) / 2 + 6%);
}
/* the scrim + blur live on a pseudo-element rather than on the banner
   itself: an element carrying backdrop-filter becomes a backdrop root for
   its descendants, which would leave the nav pill's own blur inert until
   the banner's filter hit exactly `none` — and then snap it on. as
   siblings, neither layer roots the other and both stay live throughout */
#cover-banner::before,
#cover-banner .navigation-bar::before{
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background-color: var(--bar-scrim);
  backdrop-filter: blur(12px) saturate(140%);
}
/* the two layers crossfade on a short race the incoming one wins: it lands
   in --dur-fast while the outgoing one clears in --dur-med, so the overlap
   is never half-lit (an even crossfade dips to a weak blur mid-way and lets
   the page show through) and neither layer outstays the --dur-slow geometry */
#cover-banner::before{
  opacity: 1;
  transition: opacity var(--dur-fast) var(--ease-out);
}
/* a transparent full-width strip that still blurred would smear the page
   scrolling under it, so condensing hands the backing to the pill */
#cover-banner.condensed::before{
  opacity: 0;
  transition: opacity var(--dur-med) var(--ease-out);
}

/* both icons are positioned against the banner instead of laid out beside
   the nav. in flow their x was (banner - every margin - the pill's width) / 2,
   so the pill widening on one curve while the margins closed on another made
   that sum spike over 100% mid-transition: the flex line overflowed and threw
   both icons past the screen edges before they settled. out of flow, each
   icon's position is a function of its own transition and nothing else, so
   the pill can grow on whatever curve it likes without shoving them */
#home-button-container,
#appearance-button-container{
  position: absolute;
  top: 50%;
  z-index: 2;
  /* the drop rides on transform, not margin, so it can't feed back into
     anyone's layout; the hover scale stays on the button underneath */
  transform: translateY(-50%);
  transition: left var(--dur-slow) var(--ease-out),
              right var(--dur-slow) var(--ease-out),
              transform var(--dur-slow) var(--ease-out);
}
#cover-banner.condensed #home-button-container,
#cover-banner.condensed #appearance-button-container{
  transform: translateY(calc(-50% + var(--condense-drop)));
}
#home-button-container{
  left: var(--icon-inset);
}
#home-button{
  background-color: transparent;
  height: 9vh;
  width: 9vh;
  padding: 0;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  overflow: hidden;
  transition: transform var(--dur-fast) var(--ease-out);
}
#home-button:active {
  transform: scale(0.92);
}
#home-button:hover {
  transform: scale(1.06);
}
#cover-banner.mobile #home-button{
  height: 7vh;
  width: 7vh;
}
#home-button-image{
  width: 100%;
  display: block;
}

/* the banner owns both of the pill's widths — the collapsed one used to live
   in NavigationBar.vue, which split one animation across two files and left
   these rules out-specifying an id to win it back. the nav styles its own
   insides; where it sits and how wide it gets is the banner's call */
#cover-banner .navigation-bar{
  width: 0;
  margin-top: 0;
  box-shadow: none;
  transition: width var(--dur-slow) var(--ease-out),
              margin var(--dur-slow) var(--ease-out),
              box-shadow var(--dur-slow) ease;
}
/* condensing hands the nav the backing the banner just gave up */
#cover-banner.condensed .navigation-bar{
  width: var(--pill-width);
  /* doubled: align-items centres the margin box, so half of a top margin is
     what actually shows up as a drop */
  margin-top: calc(2 * var(--condense-drop));
  box-shadow: var(--shadow-lg);
}
/* the pill's backing tracks its width, so it grows out of the banner's */
#cover-banner .navigation-bar::before{
  border-radius: inherit;
  opacity: 0;
  transition: opacity var(--dur-med) var(--ease-out);
}
#cover-banner.condensed .navigation-bar::before{
  opacity: 1;
  transition: opacity var(--dur-fast) var(--ease-out);
}

#appearance-button-container{
  right: var(--icon-inset);
}
#appearance-button{
  background-color: transparent;
  width: 5.5vh;
  height: 5.5vh;
  padding: 0;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  overflow: hidden;
  transition: transform var(--dur-fast) var(--ease-out);
}
#appearance-button:active {
  transform: scale(0.92);
}
#appearance-button:hover {
  transform: scale(1.08);
}
#cover-banner.mobile #appearance-button{
  width: 5vh;
  height: 5vh;
}
/* --bar-text, not --text: the bar is the inverted neutral, so the toggle has
   to read against the bar rather than against the page */
#appearance-button-image {
  width: 100%;
  height: 100%;
  display: block;
  color: var(--bar-text);
  transition: color var(--dur-slow) ease;
}
</style>
