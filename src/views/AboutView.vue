<template>
  <UpperToolbar/>
  <SideBar/>
  <div class="about" id="master">
    <section class="hero"> 
      <div id='title'>
        <h1 class="hero-heading">Who is Sam Brothers?</h1>
        <span class="rule rule--reverse hero-rule" aria-hidden="true"></span>
      </div>
    </section>
    <section class="content"> 
      <article> 
        <h2 class="header">Quality</h2> 
        <p>
          If there's one thing that bugs me, it's sloppy
          programming. That's why my code is future-proof,
          modular, and adaptable. 
          Working with me, we'll spend less time
          rewriting clunky code and more time
          pushing awesome features.
        </p> 
      </article> 
      <article> 
        <h2 class="header">Progress</h2> 
        <p>
          Software development is one of the fastest changing industries, which is
          why it requires a neuroplastic brain to excel. I'm constantly learning and
          improving as an engineer, and this is something that won't change.
          My rigorous coursework at William & Mary and industry experience have
          exposed me to numerous projects, languages, frameworks, libraries, and modules -
          all of which I leverage effectively to
          create something that works for you.
        </p> 
      </article> 
      <article> 
        <h2 class="header">Passion</h2> 
        <p>
          I love what I do so much that I would do it for free if I could.
          I strive to see tasks through the eyes of my collaborators and their users, 
          because I have a profound passion for discovering solutions that work for people.
        </p> 
      </article> 
      <!-- remove or rework? -->
      <div class="slogan"> Let your problem be the next one I solve </div> 
    </section>
  </div>
</template>

<script>
import UpperToolbar from '@/components/UpperToolbar.vue'
import SideBar from '@/components/SideBar.vue'

export default {
  name: 'AboutView',
  components: {
    UpperToolbar,
    SideBar
  },
  data () {
    return {
      isMiddleVisible: false,
      isLowerVisible: false
    }
  },
  mounted () {
    window.scrollTo(0, 0)
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      window.scrollTo(0, 0)
    })
  }
}

</script>

<style lang="scss" scoped>
.about {
  width: 100%;
  height: 100%;
  font-family: 'Outfit', sans-serif;
  background-color: var(--bg);
  color: var(--text);
  transition: background-color var(--dur-slow) ease, color var(--dur-slow) ease;
}

.hero { 
  height: 100vh;
  background-image: url('/img/wren_building.png');
  background-image: image-set(url('/img/wren_building.webp') type('image/webp'), url('/img/wren_building.png') type('image/png'));
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 2em;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('/img/noise.png');
    background-image: image-set(url('/img/noise.webp') type('image/webp'), url('/img/noise.png') type('image/png')); // grain overlay
    opacity: 0.35; // Adjust the intensity of the grain effect
    pointer-events: none; // Make sure clicks go through to the main content
    mix-blend-mode: multiply; // Try different blend modes: multiply, overlay, screen
    z-index: 1;
    animation: noise 0.1s steps(20) infinite; // Creates subtle animation
  }

  @keyframes noise {
    0% { transform: translate(0, 0); }
    10% { transform: translate(-1%, -1%); }
    20% { transform: translate(1%, 1%); }
    30% { transform: translate(-1%, 1%); }
    40% { transform: translate(1%, -1%); }
    50% { transform: translate(-1%, 0%); }
    60% { transform: translate(1%, 0%); }
    70% { transform: translate(0%, 1%); }
    80% { transform: translate(0%, -1%); }
    90% { transform: translate(1%, -1%); }
    100% { transform: translate(0, 0); }
  }
}

#title {
  font-size: 3em;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.55);
  z-index: 2;
}

/* the hero sits on a photo, so it stays light in both themes */
.hero-heading {
  font-size: clamp(2rem, 6vw, 5rem);
  font-weight: 400;
  line-height: 1.1;
  margin: 0;
  color: var(--light-color);
}

/* the hero sits on a photo in both themes, so its rule is pinned to the
   light rung of indigo rather than following --accent */
.hero-rule {
  width: 30vw;
  margin: 0.25em auto 0;
  background:
    linear-gradient(var(--indigo-300), var(--indigo-300)) 0 0 / 4px 100% no-repeat,
    linear-gradient(var(--indigo-300), var(--indigo-300)) 9px 0 / 4px 100% no-repeat,
    linear-gradient(to right, var(--indigo-300), var(--indigo-400)) 18px 0 / calc(100% - 18px) 100% no-repeat;
}

.content {
  padding: 4em 2em;
  max-width: 1100px;
  margin: 0 auto;
  color: var(--text);

  article {
    margin: 1.75em 0;
    padding: 1.75em 2em;
    text-align: left;
    border-radius: var(--radius-lg);
    border: 2px solid var(--accent);
    transition: transform var(--dur-med) var(--ease-out),
                box-shadow var(--dur-med) var(--ease-out),
                background-color var(--dur-med) var(--ease-out);

    &:hover {
      transform: translateY(-3px);
      box-shadow: var(--shadow-md);
      background-color: var(--accent-softer);
    }

    /* section headings are accent, not highlight — the slogan below is
       this page's single gold moment */
    h2 {
    font-size: 1.6em;
    font-family: 'Niramit', sans-serif;
    font-weight: 600;
    margin: 0 0 0.5em;
    line-height: 1.2;
    color: var(--accent-strong);
    }
    p {
    font-size: 1.25em;
    line-height: 1.65;
    font-weight: 300;
    max-width: 68ch;
    margin: 0;
    }
  }
  .slogan {
    text-align: center;
    font-size: clamp(1.75rem, 5vw, 3.25rem);
    line-height: 1.15;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--highlight);
    font-family: 'Niramit', sans-serif;
    margin-top: 1.5em;
  }
}

</style>
