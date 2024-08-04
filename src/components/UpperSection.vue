<template>
    <div class="upper-section" id="upper-section">
        <img src='img/dark_cover_image.png' id="image"/>
        <h1 id="header">Software Developer</h1>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UpperSection',
  methods: {
    checkAppearance () {
      if (this.isDarkMode) {
        this.darkMode()
      } else {
        this.lightMode()
      }
    },
    darkMode () {
      var upperSection = document.getElementById('upper-section')
      var image = document.getElementById('image')

      upperSection.style.backgroundColor = 'var(--dark-color)'
      upperSection.style.color = 'var(--light-color)'
      image.src = 'img/dark_cover_image.png'
    },
    lightMode () {
      var upperSection = document.getElementById('upper-section')
      var image = document.getElementById('image')

      upperSection.style.backgroundColor = 'var(--light-color)'
      upperSection.style.color = 'var(--dark-color)'
      image.src = 'img/light_cover_image.png'
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
.upper-section{
  padding-top: 15vh;
  width: 99vw;
  transition: all 0.5s ease;
}
img{
  width: 80%;
}
h1{
  margin: 0px;
  padding-top: 70px;
  padding-bottom: 50px;
  font-size: 8vw;
  line-height: 12vw
}
</style>
