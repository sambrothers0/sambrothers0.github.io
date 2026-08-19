<template>
  <UpperToolbar/>
  <div class="section" id="upper-section">
    <!-- The portrait is a separate request from the bundled markup, so the
         frame reserves its square up front: the copy below never has to move
         once the photo decodes, and the shimmer fills the reserved circle in
         the meantime rather than leaving a hole. -->
    <div class="upper-img-frame">
      <div class="image-skeleton cover-skeleton"
        :class="{ 'cover-skeleton--gone': coverLoaded }" aria-hidden="true"></div>
      <picture v-if="!coverFailed">
        <source srcset="/img/cover_image.webp" type="image/webp"/>
        <img ref="cover" src='/img/cover_image_1600.png' class="upper-img"
          :class="{ 'upper-img--ready': coverLoaded }"
          alt="Sam Brothers" fetchpriority="high" decoding="async"
          @load="coverLoaded = true" @error="onCoverError"/>
      </picture>
    </div>
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
      <InfoIcon class="lower-icon"/>
    </button>
    <button @click="navigateProjects" class="panel" id="projects-panel">
      <h1>Projects</h1>
      <CodeIcon class="lower-icon"/>
    </button>
    <button @click="navigateContact" class="panel" id="contact-panel">
      <h1>Contact</h1>
      <ChatBubbleIcon class="lower-icon"/>
    </button>
  </div>

</template>

<script>
import UpperToolbar from '@/components/UpperToolbar.vue'
import HorizontalDivider from '@/components/HorizontalDivider.vue'
import InfoIcon from '@/assets/icons/info.svg?component'
import CodeIcon from '@/assets/icons/code.svg?component'
import ChatBubbleIcon from '@/assets/icons/chat-bubble.svg?component'

export default {
  name: 'HomeView',
  data () {
    return {
      coverLoaded: false,
      coverFailed: false,
      textItems: ["I'm Sam, a software developer based in Chapel Hill, NC.",
        "My skills range from front-end design to data engineering and analytics.",
        "My passion is uncovering elegant solutions to problems and creating engaging and functional user experiences.",
        "Whenever I'm not coding, I'm likely pursuing my love of ultimate frisbee, good food, and travel."]
    }
  },
  methods: {
    /* A photo that never arrives should leave the plain page background, not a
       broken-image glyph and not a shimmer that runs forever. */
    onCoverError() {
      this.coverFailed = true
      this.coverLoaded = true
    },
    navigateAbout() {
      this.$router.push('/about')
    },
    navigateProjects() {
      this.$router.push('/projects')
    },
    navigateContact() {
      this.$router.push('/contact')
    }
  },
  mounted () {
    /* A cached photo can finish before Vue binds @load, so the event never
       fires and the shimmer sticks. Catch that case on mount. */
    const cover = this.$refs.cover
    if (cover?.complete && cover.naturalWidth > 0) this.coverLoaded = true
  },
  components: {
    UpperToolbar,
    HorizontalDivider,
    InfoIcon,
    CodeIcon,
    ChatBubbleIcon
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
/* Holds the portrait's square before the portrait exists, so the shimmer and
   the photo occupy exactly the same box and nothing below them shifts. */
.upper-img-frame{
  position: relative;
  width: 30%;
  max-width: 420px;
  aspect-ratio: 1 / 1;
  margin: 0 auto;
}
.upper-img{
  display: block;
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 10px 24px rgba(0, 0, 0, 0.35));
  opacity: 0;
  transition: opacity var(--dur-med) var(--ease-out);
}
.upper-img--ready{
  opacity: 1;
}
#upper-section picture{
  display: contents;
}
/* The photo is a circular cut-out, so the shimmer standing in for it is round
   too. It fades out under the photo rather than popping, which would flash the
   page background through the cross-fade. */
.cover-skeleton{
  border-radius: 50%;
  transition: opacity var(--dur-med) var(--ease-out);
}
.cover-skeleton--gone{
  opacity: 0;
}
.name{
  margin: 50px 0 0;
  font-size: clamp(2.75rem, 8vw, 7rem);
  line-height: 1.05;
  font-weight: 600;
  letter-spacing: -0.03em;
}
/* Home's one accent element: the role line under the name. Nothing else on
   this page is accent-colored. */
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
/* inherits the panel's --text color through currentColor, so it themes itself */
.lower-icon{
  height: 50px;
  width: 50px;
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
/* the page's primary calls to action, so they're indigo, not steel */
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
.panel:hover .lower-icon{
  transform: translateY(-15px);
  opacity: 1;
}
.panel:active{
  transform: translateY(-2px);
}
</style>
