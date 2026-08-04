<template>
  <UpperToolbar/>
  <SideBar/>
  <div class="section" id="upper-section">
    <picture>
      <source srcset="/img/cover_image.webp" type="image/webp"/>
      <img src='/img/cover_image_1600.png' class="upper-img" alt="Sam Brothers" fetchpriority="high" decoding="async"/>
    </picture>
    <h1 class="name">Sam Brothers</h1>
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
      <img class="lower-img" :src="icon('info_icon')" alt="">
    </button>
    <button @click="navigateCreations" class="panel" id="creations-panel">
      <h1>Creations</h1>
      <img class="lower-img" :src="icon('code_icon')" alt="">
    </button>
    <button @click="navigateContact" class="panel" id="contact-panel">
      <h1>Contact</h1>
      <img class="lower-img" :src="icon('elipsis_bubble_icon')" alt="">
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
      textItems: ["I'm Sam, a software developer based in Chapel Hill, NC.",
        "My skills range from front-end design to data engineering and analytics.",
        "My passion is uncovering elegant solutions to problems and creating engaging and functional user experiences.",
        "Whenever I'm not coding, I'm likely pursuing my love of ultimate frisbee, good food, and travel"]
    }
  },
  methods: {
    // the icons are two-tone PNGs, so they're the one thing CSS tokens can't theme
    icon (name) {
      return `/img/${name}_${this.isDarkMode ? 'light' : 'dark'}.png`
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#upper-section{
  padding-top: 15vh;
  width: 100%;
  background-color: var(--bg);
  color: var(--text);
  transition: background-color var(--dur-slow) ease, color var(--dur-slow) ease;
}
.upper-img{
  width: 30%;
  max-width: 420px;
  filter: drop-shadow(0 10px 24px rgba(0, 0, 0, 0.35));
}
#upper-section picture{
  display: contents;
}
.name{
  margin: 50px 0 0;
  font-size: clamp(2.75rem, 8vw, 7rem);
  line-height: 1.05;
  font-weight: 600;
  letter-spacing: -0.03em;
}
/* Home's one gold element: the role line under the name. Nothing else on
   this page is gold. */
.header{
  margin: 0.35em 0 0;
  padding-bottom: 50px;
  font-size: clamp(1.25rem, 4vw, 3rem);
  line-height: 1.2;
  font-weight: 300;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--highlight);
}
#middle-section {
  background-color: var(--bg);
  color: var(--text);
  transition: background-color var(--dur-slow) ease, color var(--dur-slow) ease;
  width: 100%;
}
.text-section {
  font-family: 'Outfit', sans-serif;
  line-height: 1.6;
  width: 100%;
  font-size: clamp(1.05rem, 1.6vw, 1.5rem);
  font-weight: 300;
}
p {
  max-width: 62ch;
  margin: 0 auto;
  padding: 4rem 6vw;
}
.lower-img{
  height: 50px;
  position: absolute;
  transition: transform var(--dur-med) var(--ease-out), opacity var(--dur-med) var(--ease-out);
  opacity: 0;
  margin-bottom: -150px;

}

#lower-section{
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 10vh;
  padding-bottom: 10vh;
  background-color: var(--bg);
  color: var(--text);
  transition: background-color var(--dur-slow) ease, color var(--dur-slow) ease;
}
/* the page's primary calls to action, so they're indigo, not gold */
.panel{
  display: flex;
  width: 28%;
  height: 40vh;
  border: 2px solid var(--accent);
  margin: 2vw;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  cursor: pointer;
  border-radius: var(--radius-xl);
  transition: transform var(--dur-med) var(--ease-out),
              box-shadow var(--dur-med) var(--ease-out),
              background-color var(--dur-med) var(--ease-out),
              border-color var(--dur-med) var(--ease-out);
  color: var(--text);
  font-family: 'Niramit', sans-serif;
}
.panel h1{
  font-size: clamp(1.35rem, 2.2vw, 2.1rem);
  font-weight: 500;
  letter-spacing: 0.01em;
  margin: 0;
  transition: transform var(--dur-med) var(--ease-out);
}
/* lift + glow instead of resizing the label, which used to nudge the layout */
.panel:hover{
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
  background-color: var(--accent-soft);
  border-color: var(--accent-strong);
}
.panel:hover h1{
  transform: translateY(-10px);
}
.panel:hover img{
  transform: translateY(-15px);
  opacity: 1;
}
.panel:active{
  transform: translateY(-2px);
}
</style>
