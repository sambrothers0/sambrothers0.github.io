<template>
    <div id="nav-bar">
        <!-- the tabs sit in their own row rather than directly in the pill:
             the pill's width is animated, so it can't be measured, and the
             condensed banner is sized around this row's natural width -->
        <div id="nav-tabs" ref="tabs">
            <button v-for="link in links" class="nav-button" :key="link.path"
                :class="{ active: activePath === link.path }"
                @click="navigate(link.path)">
                {{ link.label }}
            </button>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { LINKS, TAB_LINKS, activeLinkPath } from '@/content/navigation'

export default defineComponent({
  name: 'NaviagationBar',
  emits: ['measure'],
  methods: {
    navigate (path) {
      this.$router.push(path)
    }
  },
  computed: {
    isMobile () {
      return this.$store.getters.isMobileOn
    },
    /* the narrow layout hands Contact and Notes to the banner's hamburger, so
       the row drops them rather than shrinking around them */
    links () {
      return this.isMobile ? TAB_LINKS : LINKS
    },
    activePath () {
      return activeLinkPath(this.route.path)
    }
  },
  /* The banner wraps its condensed pill around these tabs, and only the tabs
     know how wide they end up: their padding is in vw, their type in vh, and
     the row grows again when Niramit finishes loading. An observer catches
     all three; a resize listener would miss the font. */
  mounted () {
    this.tabObserver = new ResizeObserver(() => {
      this.$emit('measure', this.$refs.tabs.getBoundingClientRect().width)
    })
    this.tabObserver.observe(this.$refs.tabs)
  },
  unmounted () {
    this.tabObserver.disconnect()
  },
  setup () {
    const route = useRoute()

    return {
      route
    }
  }
})
</script>

<style scoped lang="scss">
#nav-bar {
  border-radius: var(--radius-pill);
  /* the banner paints the pill's scrim + blur onto a ::before layer; the
     stacking context keeps that layer behind the buttons without letting it
     escape underneath the banner's own backing */
  position: relative;
  z-index: 0;
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
}
/* height, not auto: the buttons size off it, and the banner must never
   stretch or squeeze this row — it's the measurement the pill is built from.
   the banner hands down where the row sits within that pill; a transform
   rather than a margin, so sliding it can't disturb the width just measured */
#nav-tabs {
  display: flex;
  align-items: center;
  height: 100%;
  flex: none;
  transform: translateX(var(--tabs-offset, 0px));
  transition: transform var(--dur-slow) var(--ease-out);
}
.nav-button {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid transparent;
  color: var(--bar-text);
  height: 50%;
  margin: 0.4vw;
  padding: 0 1.4vw;
  white-space: nowrap;
  background-color: transparent;
  cursor: pointer;
  border-radius: var(--radius-pill);
  transition: background-color var(--dur-med) ease,
              border-color var(--dur-med) ease;
  font-size: clamp(0.8rem, 2vh, 1.05rem);
  font-weight: 600;
  letter-spacing: 0.02em;
  font-family: 'Niramit', sans-serif;
}
/* the bar is inverted against the page, so its accent rung is too.
   the border ring belongs to the active tab alone — hover never
   touches it, so pointing at a tab can't be mistaken for being on it */
.nav-button.active {
  border-color: var(--bar-accent);
}
.nav-button:hover {
  background-color: var(--bar-accent-soft);
}
/* Three tabs, two icons, and a phone's width. The labels never wrap or
   scroll — they step down instead, so the row still fits between the theme
   toggle and the hamburger. */
@media (max-width: 760px) {
  .nav-button {
    margin: 0.2vw;
    padding: 0 1.6vw;
    font-size: clamp(0.68rem, 1.6vh, 0.85rem);
  }
}
</style>
