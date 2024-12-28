<template>
  <UpperToolbar/>
  <SideBar/>
  <div class="about" id="master">
    <section class="hero"> 
      <div id='title'>
        <h1 style="font-size: 6vw; font-weight: 400; color: #bebebe">Who is Sam Brothers?</h1>
        <img style="width: 30vw; transform: rotate(180deg)" src="img/gold_divider_bar.png" >
      </div>
    </section>
    <section class="content"> 
      <article> 
        <h2 class="header">Slop-free software, without hacks</h2> 
        <p>
          If there's one thing that bugs me, it's sloppy
          programming. That's why my code is future-proof,
          modular, and adaptable. 
        </p>
        <p>
          Working with me, we'll spend less time
          rewriting clunky code and more time
          pushing awesome features.
        </p> 
      </article> 
      <article> 
        <h2 class="header">Something I don't know? Not for long</h2> 
        <p>
          Computer science is one of the fastest changing industries, which is
          why it requires a neuroplastic brain to excel. I'm constantly learning and
          improving not just as a student, but as an engineer, and this is something
          I plan to never change.
        </p>
        <p>
          My rigorous coursework at William & Mary and industry experience have
          exposed me to numerous projects, languages, frameworks, libraries, and modules -
          all of which I leverage effectively to
          create something that works for you.
        </p> 
      </article> 
      <article> 
        <h2 class="header">You could not pay me to do this...</h2> 
        <p>
          No, really, I love what I do so much that I would do it for free if I could (I can't).
        </p> 
        <p>
          I strive to see tasks through the eyes of my collaborators and their users, 
          because I have a profound passion for discovering solutions that work for people.
        </p> 
      </article> 
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
  methods: {
    checkAppearance () {
      this.isDarkMode ? this.darkMode() : this.lightMode()
    },
    lightMode () {
      const master = document.getElementById('master')
      master.style.backgroundColor = 'var(--light-color)'

      const title = document.getElementById('title')
      title.style.color = 'var(--dark-color)'

      const content = document.querySelector('.content')
      content.style.color = 'var(--dark-color)'
    },
    darkMode () {
      const master = document.getElementById('master')
      master.style.backgroundColor = 'var(--dark-color)'
      
      const title = document.getElementById('title')
      title.style.color = 'var(--light-color)'

      const content = document.querySelector('.content')
      content.style.color = 'var(--light-color)'
    }
  },
  computed: {
    isDarkMode () {
      return this.$store.getters.isDarkModeOn
    }
  },
  watch: {
    isDarkMode (newVal) {
      this.checkAppearance()
    }
  },
  mounted () {
    this.checkAppearance()
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
  color: var(--dark-color);
  transition: all 0.5s ease;
} 

.hero { 
  height: 100vh;
  background-image: url('/public/img/wren_building.png');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 2em;
}

.title {
  font-size: 3em;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
} 
  
.content {
  padding: 2em;
  color: var(--light-color);

  article { 
    margin: 2em 0;
    padding: 1em;
    border-radius: 25px;
    border: 3px solid var(--indigo-color);

    h2 { 
    font-size: 3.5em;
    font-family: 'Niramit', sans-serif;
    margin-bottom: 0.5em;
    line-height: 1.5em;
    } 
    p { 
    font-size: 1.5em;
    } 
  } 
  .slogan { 
    text-align: center;
    font-size: 3.5em;
    font-weight: 700;
    color: var(--gold-color);
    font-family: 'Niramit', sans-serif;
    margin-top: 1em;


  } 
}

</style>
