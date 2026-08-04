<template>
<div id="cover-banner">
    <div id="home-button-container">
        <button @click="navigateHome" id="home-button">
            <img src="/img/website_icon.png" id="home-button-image"/>
        </button>
    </div>
    <NavigationBar class="navigation-bar"/>
    <div id="appearance-button-container">
        <button @click="toggleDarkMode" id="appearance-button">
            <img :src="isDarkMode ? '/img/dark_button.png' : '/img/light_button.png'"
                 id="appearance-button-image" alt="Toggle theme"/>
        </button>
    </div>
</div>
</template>

<script>
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import NavigationBar from './NavigationBar.vue'

export default defineComponent({
  name: 'UpperToolbar',
  data () {
    return {
      expanded: true,
      aspectRatioThreshold: 1
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
      if (!this.isMobile) {
        document.getElementById('home-button-container').style.marginRight = '41vw'
        document.getElementById('home-button').style.height = '9vh'
        document.getElementById('home-button').style.width = '9vh'

        document.getElementById('appearance-button-container').style.marginLeft = '41vw'
        document.getElementById('appearance-button').style.height = '5.5vh'
        document.getElementById('appearance-button').style.width = '5.5vh'
      } else {
        this.expand()
        document.getElementById('home-button-container').style.marginRight = '37vw'
        document.getElementById('home-button').style.height = '7vh'
        document.getElementById('home-button').style.width = '7vh'

        document.getElementById('appearance-button-container').style.marginLeft = '37vw'
        document.getElementById('appearance-button').style.height = '5vh'
        document.getElementById('appearance-button').style.width = '5vh'
      }
    },
    handleScroll () {
      if (this.isMobile) {
        return
      }
      window.scrollY < 100 ? this.expand() : this.condense()
    },
    condense () {
      // the banner drops its fill on scroll; the nav pill keeps a scrim of its own
      document.getElementById('cover-banner').style.backgroundColor = 'transparent'

      document.getElementById('home-button-container').style.marginTop = '40px'
      document.getElementById('home-button-container').style.marginRight = '-10vw'
      document.getElementById('home-button').style.height = '9vh'
      document.getElementById('home-button').style.width = '9vh'

      document.getElementById('appearance-button-container').style.marginLeft = '-10vw'
      document.getElementById('appearance-button-container').style.marginTop = '40px'
      document.getElementById('appearance-button').style.height = '5.5vh'
      document.getElementById('appearance-button').style.width = '5.5vh'

      var navigationBar = document.querySelector('.navigation-bar')
      navigationBar.style.width = '65vw'
      navigationBar.style.boxShadow = 'var(--shadow-lg)'
      navigationBar.style.marginTop = '40px'
      navigationBar.style.backdropFilter = 'blur(12px) saturate(140%)'

      this.expanded = false
    },
    expand () {
      // clear the inline override so the banner falls back to --bar-bg
      document.getElementById('cover-banner').style.backgroundColor = ''

      document.getElementById('home-button-container').style.paddingLeft = '2vw'
      document.getElementById('home-button-container').style.marginTop = '0px'
      document.getElementById('home-button-container').style.marginRight = '41vw'

      document.getElementById('appearance-button-container').style.marginLeft = '41vw'
      document.getElementById('appearance-button-container').style.marginTop = '0px'
      document.getElementById('appearance-button-container').style.paddingRight = '2vw'

      var navigationBar = document.querySelector('.navigation-bar')
      navigationBar.style.width = '0vw'
      navigationBar.style.marginTop = '0px'
      navigationBar.style.backdropFilter = 'none'
      navigationBar.style.boxShadow = 'none'

      this.expanded = true
    },
    navigateHome () {
      this.route.path === '/' ? location.reload() : this.$router.push('/')
    }
  },
  components: {
    NavigationBar
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
    isMobile (newVal) {
      this.handleResize()
    }
  },
  mounted () {
    this.handleScroll()
    this.handleResize()
    window.addEventListener('scroll', this.handleScroll)
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
  z-index: 10;
  width: 100vw;
  height: 11vh;
  background-color: var(--bar-bg);
  transition: background-color 0.5s ease;
}

#home-button-container{
  padding-left: 2vw;
  margin-right: 41vw;
  z-index: 2;
  transition: all 0.5s ease
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
#home-button-image{
  width: 100%;
  display: block;
}

.navigation-bar{
  background-color: var(--bar-scrim);
  transition: width var(--dur-slow) var(--ease-out),
              margin var(--dur-slow) var(--ease-out),
              background-color var(--dur-slow) ease,
              box-shadow var(--dur-slow) ease;
}

#appearance-button-container{
  padding-right: 2vw;
  margin-left: 41vw;
  z-index: 2;
  transition: margin 0.5s ease
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
#appearance-button-image {
  width: 100%;
  display: block;
}
</style>
