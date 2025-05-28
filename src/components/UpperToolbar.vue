<template>
<div id="cover-banner">
    <div id="home-button-container">
        <button @click="navigateHome" id="home-button">
            <img src="img/website_icon.png" id="home-button-image"/>
        </button>
    </div>
    <NavigationBar class="navigation-bar"/>
    <div id="appearance-button-container">
        <button @click="toggleDarkMode" id="appearance-button">
            <img src="img/dark_button.png" id="appearance-button-image"/>
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
    checkAppearance () {
      this.isDarkMode ? this.lightMode() : this.darkMode()
    },
    darkMode () {
      var coverBanner = document.getElementById('cover-banner')
      this.expanded ? coverBanner.style.backgroundColor = 'var(--dark-color)' : coverBanner.style.backgroundColor = 'transparent'

      var homeButton = document.getElementById('home-button')
      homeButton.style.border = '3px solid var(--light-color)'

      var navigationBar = document.querySelector('.navigation-bar')
      navigationBar.style.backgroundColor = '#1b1b1bcc'

      var appearanceButton = document.getElementById('appearance-button')
      appearanceButton.style.border = '3px solid var(--light-color)'

      var appearanceButtonImage = document.getElementById('appearance-button-image')
      appearanceButtonImage.src = 'img/light_button.png'
    },
    lightMode () {
      var coverBanner = document.getElementById('cover-banner')
      coverBanner.style.backgroundColor = 'var(--light-color)'
      this.expanded ? coverBanner.style.backgroundColor = 'var(--light-color)' : coverBanner.style.backgroundColor = 'transparent'

      var homeButton = document.getElementById('home-button')
      homeButton.style.border = '3px solid var(--dark-color)'

      var navigationBar = document.querySelector('.navigation-bar')
      navigationBar.style.backgroundColor = '#bebebecc'

      var appearanceButton = document.getElementById('appearance-button')
      appearanceButton.style.border = '3px solid var(--dark-color)'

      var appearanceButtonImage = document.getElementById('appearance-button-image')
      appearanceButtonImage.src = 'img/dark_button.png'
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
      navigationBar.style.boxShadow = '0px 0px 15px 10px rgba(27, 27, 27, 0.6)'
      navigationBar.style.marginTop = '40px'
      navigationBar.style.backdropFilter = 'blur(6px)'

      this.expanded = false
    },
    expand () {
      var coverBanner = document.getElementById('cover-banner')
      coverBanner.style.backgroundColor = 'var(--light-color)'
      this.isDarkMode ? coverBanner.style.backgroundColor = 'var(--light-color)' : coverBanner.style.backgroundColor = 'var(--dark-color)'

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
    isDarkMode (newVal) {
      this.checkAppearance()
    },
    isMobile (newVal) {
      this.handleResize()
    }
  },
  mounted () {
    this.checkAppearance()
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
#cover-banner{
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 10;
  width: 100vw;
  height: 11vh;
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
  border: 3px solid var(--dark-color);
  border-radius: 50%;
  cursor: pointer;
  transition: border-color 0.5s ease, transform 0.1s, background-color 0.3s;

}
#home-button:active {
  transform: scale(0.92);
}
#home-button:hover {
  background-color: #3a419877
}
#home-button-image{
  width: 100%;
}

.navigation-bar{
  transition: all 0.5s
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
  border: 3px solid var(--dark-color);
  border-radius: 50%;
  cursor: pointer;
  transition: border-color 0.5s ease, transform 0.1s, background-color 0.3s;

}
#appearance-button:active {
  transform: scale(0.92);
}
#appearance-button:hover {
  background-color: #3a419877
}
#appearance-button-image {
  width: 100%;
}
</style>
