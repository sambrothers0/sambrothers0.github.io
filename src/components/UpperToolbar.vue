<template>
<!-- both layout states are classes on the banner; every child sizes itself
     off them in CSS. the one number CSS can't reach is how wide the tab row
     turns out to be, so the nav measures itself and the pill is built from
     it — nothing here is positioned imperatively -->
<div id="cover-banner" :class="{ condensed: isCondensed, mobile: isMobile }"
     :style="{ '--tabs-width': `${tabsWidth}px` }">
    <!-- the narrow layout has no room for the site icon: the Home tab already
         does its job there, so the toggle takes its corner and the hamburger
         takes the toggle's -->
    <div v-if="!isMobile" id="home-button-container">
        <button @click="navigateHome" id="home-button">
            <img src="/website_icon.png" id="home-button-image"/>
        </button>
    </div>
    <NavigationBar class="navigation-bar" @measure="tabsWidth = $event"/>
    <div id="appearance-button-container">
        <button @click="toggleDarkMode" id="appearance-button" aria-label="Toggle theme">
            <component :is="isDarkMode ? 'MoonIcon' : 'SunIcon'" id="appearance-button-image"/>
        </button>
    </div>
    <div v-if="isMobile" id="menu-button-container" ref="menuButton">
        <button @click="toggleMenu" id="menu-button" aria-label="More pages"
                aria-haspopup="menu" aria-controls="menu-panel"
                :aria-expanded="isMenuOpen ? 'true' : 'false'">
            <MenuIcon id="menu-button-image"/>
        </button>
    </div>
    <!-- the tabs the row gave up, in a panel hung under the hamburger -->
    <transition name="menu">
        <div v-if="isMobile && isMenuOpen" id="menu-panel" role="menu" ref="menuPanel">
            <button v-for="link in menuLinks" class="menu-item" role="menuitem"
                :key="link.path" :class="{ active: activePath === link.path }"
                @click="navigate(link.path)">
                {{ link.label }}
            </button>
        </div>
    </transition>
</div>
</template>

<script>
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import NavigationBar from './NavigationBar.vue'
import SunIcon from '@/assets/icons/sun.svg?component'
import MoonIcon from '@/assets/icons/moon.svg?component'
import MenuIcon from '@/assets/icons/menu.svg?component'
import { OVERFLOW_LINKS, activeLinkPath } from '@/content/navigation'

export default defineComponent({
  name: 'UpperToolbar',
  data () {
    return {
      isCondensed: false,
      isMenuOpen: false,
      menuLinks: OVERFLOW_LINKS,
      // the nav reports this on mount and on every reflow of its tabs; until
      // then the pill is just wide enough for the two icons
      tabsWidth: 0,
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
    },
    toggleMenu () {
      this.isMenuOpen = !this.isMenuOpen
    },
    navigate (path) {
      this.isMenuOpen = false
      // pushing the route we're already on is a no-op, so the panel closing
      // above is the whole of what tapping the current page does
      if (this.route.path !== path) {
        this.$router.push(path)
      }
    },
    // the panel is a peer of the page, not a child of it, so nothing else
    // bubbles a close for it — the document does. the button is excluded here
    // or its own click would close what it just opened
    handlePointerDown (event) {
      if (!this.isMenuOpen) {
        return
      }
      const inside = [this.$refs.menuButton, this.$refs.menuPanel]
        .some(el => el && el.contains(event.target))
      if (!inside) {
        this.isMenuOpen = false
      }
    },
    handleKeydown (event) {
      if (event.key === 'Escape') {
        this.isMenuOpen = false
      }
    }
  },
  components: {
    NavigationBar,
    SunIcon,
    MoonIcon,
    MenuIcon
  },
  computed: {
    isDarkMode () {
      return this.$store.getters.isDarkModeOn
    },
    isMobile () {
      return this.$store.getters.isMobileOn
    },
    activePath () {
      return activeLinkPath(this.route.path)
    }
  },
  watch: {
    // crossing the mobile boundary while scrolled down has to re-decide the
    // condensed state — the layout it applies to just changed underneath it
    isMobile () {
      this.handleScroll()
      // the hamburger only exists in the narrow layout; widening out from
      // under an open panel would otherwise leave it stranded
      this.isMenuOpen = false
    },
    // navigating from anywhere else — a back button, a link in the page —
    // closes the panel too, not just the items inside it
    'route.path' () {
      this.isMenuOpen = false
    }
  },
  created () {
    this.handleResize()   // settles isMobile first, so the scroll check sees it
    this.handleScroll()   // don't assume we start at the top; reloads restore scroll
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll, { passive: true })
    window.addEventListener('resize', this.handleResize)
    document.addEventListener('pointerdown', this.handlePointerDown)
    document.addEventListener('keydown', this.handleKeydown)
  },
  unmounted () {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleResize)
    document.removeEventListener('pointerdown', this.handlePointerDown)
    document.removeEventListener('keydown', this.handleKeydown)
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
  /* the condensed geometry, in one place: how far the two icons sit from the
     banner's edges, how far everything drops, and the sizes of the icons
     themselves. every one of these feeds --pill-width below */
  --icon-inset: 5%;
  --condense-drop: 20px;
  --home-size: 9vh;
  --toggle-size: 5.5vh;
  /* the air the condensed pill keeps: --capsule-pad inside each of its ends,
     --capsule-gap between an icon and the tabs. widening the pad is free of
     the icons — it grows --pill-width by two of itself and the inset below
     takes back exactly half of that, so the pad opens the pill's ends
     outwards and nothing inside it moves */
  --capsule-pad: 2vh;
  --capsule-gap: 1.5vh;
  /* the pill is exactly its contents wide. a percentage of the window left
     most of it empty either side of five tabs; this is the row the nav
     measured plus both icons plus that air, so it tracks the type, the
     viewport, and any tab added to the nav without anyone retuning it */
  --pill-width: calc(var(--tabs-width, 0px) + var(--home-size) +
                     var(--toggle-size) +
                     2 * (var(--capsule-pad) + var(--capsule-gap)));
  /* expanded, the tabs sit dead centre of the window */
  --tabs-offset: 0px;
}
/* the inset is derived from the pill rather than typed out, so each icon
   stays --capsule-pad inside its end of it however wide it gets */
#cover-banner.condensed{
  --icon-inset: calc((100% - var(--pill-width)) / 2 + var(--capsule-pad));
  /* the home icon is the wider of the two, so a pill centred on the window
     leaves the tabs closer to it than to the toggle. the nav can't take this
     offset itself — its own box is the pill, and moving that moves the tabs
     with it — so the tabs slide half the icons' difference inside it */
  --tabs-offset: calc((var(--home-size) - var(--toggle-size)) / 2);
}
#cover-banner.mobile{
  --home-size: 7vh;
  --toggle-size: 5vh;
}
/* the corner swap: the toggle takes the vacated left edge, the hamburger the
   right. two ids and the class, so it outranks the default corner below
   whichever order the rules end up in */
#cover-banner.mobile #appearance-button-container{
  left: var(--icon-inset);
  right: auto;
}
#menu-button-container{
  right: var(--icon-inset);
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
#appearance-button-container,
#menu-button-container{
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
  height: var(--home-size);
  width: var(--home-size);
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
  width: var(--toggle-size);
  height: var(--toggle-size);
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
/* --bar-text, not --text: the bar is the inverted neutral, so the toggle has
   to read against the bar rather than against the page */
#appearance-button-image {
  width: 100%;
  height: 100%;
  display: block;
  color: var(--bar-text);
  transition: color var(--dur-slow) ease;
}

/* the hamburger is the toggle's twin — same box, same corner treatment — so
   swapping which one holds a corner doesn't shift the banner's balance */
#menu-button{
  background-color: transparent;
  width: var(--toggle-size);
  height: var(--toggle-size);
  padding: 0;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: transform var(--dur-fast) var(--ease-out);
}
#menu-button:active {
  transform: scale(0.92);
}
#menu-button:hover {
  transform: scale(1.08);
}
#menu-button-image {
  width: 100%;
  height: 100%;
  display: block;
  color: var(--bar-text);
  transition: color var(--dur-slow) ease;
}

/* hung from the banner's bottom edge and pulled back under the hamburger, so
   it opens downwards out of the button rather than from the screen edge.
   right, not left: the panel is as wide as its longest label, and anchoring
   the end that touches the button keeps it there whatever that width is */
#menu-panel{
  position: absolute;
  top: 100%;
  right: var(--icon-inset);
  z-index: 3;
  display: flex;
  flex-direction: column;
  min-width: 44vw;
  padding: 0.6vh;
  border: 1px solid var(--bar-accent-soft);
  border-radius: var(--radius-md);
  /* the same scrim the bar uses, painted directly here: the panel hangs over
     the page rather than over the bar, so it needs its own backing */
  background-color: var(--bar-scrim);
  backdrop-filter: blur(12px) saturate(140%);
  box-shadow: var(--shadow-lg);
  transform-origin: top right;
}
.menu-item{
  display: block;
  width: 100%;
  border: 2px solid transparent;
  padding: 1.4vh 1.2vh;
  text-align: left;
  color: var(--bar-text);
  background-color: transparent;
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: background-color var(--dur-med) ease,
              border-color var(--dur-med) ease;
  font-size: clamp(0.85rem, 2vh, 1.05rem);
  font-weight: 600;
  letter-spacing: 0.02em;
  font-family: 'Niramit', sans-serif;
}
/* the ring marks the page you're on, exactly as it does in the tab row */
.menu-item.active{
  border-color: var(--bar-accent);
}
.menu-item:hover{
  background-color: var(--bar-accent-soft);
}
/* it drops out of the button it belongs to, so it scales and slides from that
   corner instead of just fading in */
.menu-enter-active,
.menu-leave-active{
  transition: opacity var(--dur-fast) var(--ease-out),
              transform var(--dur-fast) var(--ease-out);
}
.menu-enter-from,
.menu-leave-to{
  opacity: 0;
  transform: translateY(-6px) scale(0.96);
}
</style>
