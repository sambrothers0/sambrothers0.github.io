<template>
  <UpperToolbar/>
  <SideBar/>
  <div class="section" id="upper-section">
    <img src='img/dark_cover_image.png' class="upper-img"/>
    <h1 class="header">Software Developer</h1>
  </div>
  <div class="section" id="middle-section">
    <HorizontalDivider/>
    <div v-for="(text, index) in textItems" :key="index"
      class="text-section">
      <p>{{ text }}</p>
      <HorizontalDivider/>
    </div>
  </div>
  <div class="section" id="lower-section">
    <button @click="navigateAbout" class="panel" id="about-panel">
      <h1>About</h1>
      <img class="info-icon lower-img">
    </button>
    <button @click="navigateCreations" class="panel" id="creations-panel">
      <h1>Creations</h1>
      <img class="code-icon lower-img">
    </button>
    <button @click="navigateContact" class="panel" id="contact-panel">
      <h1>Contact</h1>
      <img class="elipsis-bubble-icon lower-img">
    </button>
  </div>

</template>

<script>
import UpperToolbar from '@/components/UpperToolbar.vue'
import SideBar from '@/components/SideBar.vue'
import HorizontalDivider from '@/components/HorizontalDivider.vue'

export default {
  name: 'HomeView',
  data () {
    return {
      textItems: ["I'm Sam Brothers, a software developer and computer science student at William & Mary",
        'My skills range from front-end design to data structures and algorithms. My passion is uncovering elegant solutions to problems and creating beautiful, functional things like this website',
        "Currently I'm pursuing my Masters in Business Analytics, and I love ultimate frisbee, good food, and travel"]
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
      var upperSection = document.getElementById('upper-section')
      var middleSection = document.getElementById('middle-section')
      var image = document.querySelector('.upper-img')
      
      upperSection.style.backgroundColor = 'var(--dark-color)'
      upperSection.style.color = 'var(--light-color)'
      middleSection.style.backgroundColor = 'var(--dark-color)'
      middleSection.style.color = 'var(--light-color)'
      image.src = 'img/dark_cover_image.png'
      
      var lowerSection = document.getElementById('lower-section')
      var panels = document.getElementsByClassName('panel')
      
      lowerSection.style.backgroundColor = 'var(--dark-color)'
      lowerSection.style.color = 'var(--light-color)'

      for (let i = 0; i < panels.length; i++) {
        panels[i].style.color = 'var(--light-color)'
      }

      document.querySelector('.info-icon').src = 'img/info_icon_light.png'
      document.querySelector('.code-icon').src = 'img/code_icon_light.png'
      document.querySelector('.elipsis-bubble-icon').src = 'img/elipsis_bubble_icon_light.png'
    },
    lightMode () {
      var upperSection = document.getElementById('upper-section')
      var middleSection = document.getElementById('middle-section')
      var image = document.querySelector('.upper-img')

      upperSection.style.backgroundColor = 'var(--light-color)'
      upperSection.style.color = 'var(--dark-color)'
      middleSection.style.backgroundColor = 'var(--light-color)'
      middleSection.style.color = 'var(--dark-color)'
      image.src = 'img/light_cover_image.png'
      
      var lowerSection = document.getElementById('lower-section')
      lowerSection.style.backgroundColor = 'var(--light-color)'
      lowerSection.style.color = 'var(--dark-color)'

      var panels = document.getElementsByClassName('panel')

      for (let i = 0; i < panels.length; i++) {
        panels[i].style.color = 'var(--dark-color)'
      }
      document.querySelector('.info-icon').src = 'img/info_icon_dark.png'
      document.querySelector('.code-icon').src = 'img/code_icon_dark.png'
      document.querySelector('.elipsis-bubble-icon').src = 'img/elipsis_bubble_icon_dark.png'
    },
    navigateAbout() {
      this.$router.push('/about')
    },
    navigateCreations() {
      this.$router.push('/creations')
    },
    navigateContact() {
      this.$router.push('/contact')
    }
  },
  components: {
    UpperToolbar,
    SideBar,
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#upper-section{
  padding-top: 15vh;
  width: 99vw;
  transition: all 0.5s ease;
}
.upper-img{
  width: 80%;
}
.header{
  margin: 0px;
  padding-top: 70px;
  padding-bottom: 50px;
  font-size: 8vw;
  line-height: 12vw
}
#middle-section {
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
.lower-img{
  height: 50px;
  position: absolute;
  transition: all 0.3s ease;
  opacity: 0;
  margin-bottom: -150px;

}

#lower-section{
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
