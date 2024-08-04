<template>
  <div class="middle-section" id="middle-section">
    <HorizontalDivider/>
    <div v-for="(text, index) in textItems" :key="index"
    class="text-section">
      <p>{{ text }}</p>
      <HorizontalDivider/>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import HorizontalDivider from './HorizontalDivider.vue'

export default defineComponent({
  name: 'MiddleSection',
  data () {
    return {
      textItems: ["I'm Sam Brothers, a software developer and computer science major at William & Mary",
        'My skills range from frontend design to data structures and algorithms and my passion is uncovering elegant solutions to problems and creating beautiful, functional things like this website',
        "Currently I'm a senior in college, and I love ultimate frisbee, good food, and hiking"]
    }
  },
  methods: {
    checkAppearance () {
      if (this.isDarkMode) {
        this.darkMode()
      } else {
        this.lightMode()
      }
    },
    darkMode () {
      var middleSection = document.getElementById('middle-section')
      middleSection.style.backgroundColor = 'var(--dark-color)'
      middleSection.style.color = 'var(--light-color)'
    },
    lightMode () {
      var middleSection = document.getElementById('middle-section')
      middleSection.style.backgroundColor = 'var(--light-color)'
      middleSection.style.color = 'var(--dark-color)'
    }
  },
  components: {
    HorizontalDivider
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
.middle-section {
  background-color: var(--dark-color);
  transition: all 0.5s ease;
  width: 99vw;
}
.text-section {
  font-family: 'Outfit', sans-serif;
  line-height: 40px;
  width: 100%;
  font-size: 25px;
}
p {
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 5%;
  padding-bottom: 5%;
}
</style>
