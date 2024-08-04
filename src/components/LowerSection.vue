<template>
    <div class="lower-section" id="lower-section">
        <button @click="navigateAbout" class="panel" id="about-panel">
          <h1>About</h1>
          <img class="info-icon">
        </button>
        <button @click="navigateCreations" class="panel" id="creations-panel">
          <h1>Creations</h1>
          <img class="code-icon">
        </button>
        <button @click="navigateContact" class="panel" id="contact-panel">
          <h1>Contact</h1>
          <img class="elipsis-bubble-icon">
        </button>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LowerSection',
  methods: {
    checkAppearance () {
      if (this.isDarkMode) {
        this.darkMode()
      } else {
        this.lightMode()
      }
    },
    darkMode () {
      var lowerSection = document.getElementById('lower-section')
      var panels = document.getElementsByClassName('panel')

      lowerSection.style.backgroundColor = 'var(--dark-color)'

      for (let i = 0; i < panels.length; i++) {
        panels[i].style.color = 'var(--light-color)'
      }

      document.querySelector('.info-icon').src = 'img/info_icon_light.png'
      document.querySelector('.code-icon').src = 'img/code_icon_light.png'
      document.querySelector('.elipsis-bubble-icon').src = 'img/elipsis_bubble_icon_light.png'
    },
    lightMode () {
      var lowerSection = document.getElementById('lower-section')
      var panels = document.getElementsByClassName('panel')

      lowerSection.style.backgroundColor = 'var(--light-color)'

      for (let i = 0; i < panels.length; i++) {
        panels[i].style.color = 'var(--dark-color)'
      }
      document.querySelector('.info-icon').src = 'img/info_icon_dark.png'
      document.querySelector('.code-icon').src = 'img/code_icon_dark.png'
      document.querySelector('.elipsis-bubble-icon').src = 'img/elipsis_bubble_icon_dark.png'
    },
    navigateAbout () {
      this.$router.push('/about')
    },
    navigateCreations () {
      this.$router.push('/creations')
    },
    navigateContact () {
      this.$router.push('/contact')
    }
  },
  computed: {
    isDarkMode () {
      return this.$store.getters.isDarkModeOn
    }
  },
  watch: {
    isDarkMode (newVal) {
      newVal ? this.darkMode() : this.lightMode()
    }
  },
  mounted () {
    this.checkAppearance()
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
img{
  height: 50px;
  position: absolute;
  transition: all 0.3s ease;
  opacity: 0;
  margin-bottom: -150px;

}

.lower-section{
  display: flex;
  justify-content: center;
  height: 50vh;
  width: 99vw;
  padding-top: 10vh;
  background-color: var(--dark-color);
  transition: background-color 0.5s ease;
}
.panel{
  display: flex;
  width: 28%;
  height: 40vh;
  border: 5px solid var(--gold-color);
  margin: 2vw;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  cursor: pointer;
  border-radius: 5vh;
  transition: all 0.3s ease;
  color: var(--light-color);
  font-size: 1.2vh;
  font-family: 'Niramit', sans-serif;
}
.panel:hover{
  transform: translateY(-5px);
  box-shadow: 0px 0px 20px 8px rgba(0, 0, 0, 0.1);
  font-size: 1.8vh
}
.panel:hover img{
  transform: translateY(-15px);
  opacity: 1;
}
</style>
