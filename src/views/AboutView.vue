<template>
  <CoverBanner/>
  <SideBar/>
  <div class="about" id="master">

    <h1 id="page-title">About</h1>
    <img src="img/gold_divider_bar.png" style="width: 350px; margin-top: 290px; margin-left: 150px; transform: rotate(180deg)">
    <div id="upper" ref="upper">
      <h1 class="title" id="upper-title"> Slop-free software, without hacks </h1>
      <p class="text" id="upper-text1">
        If there's one thing that bugs me, it's sloppy <br>
        programming. That's why my code is future <br>
        -proof, modular, and adaptable.
      </p>
      <p class="text" id="upper-text2">
        Working with me, we'll spend less time <br>
        rewriting clunky code and more time <br>
        pushing awesome features.
      </p>
      <img class="img" src="img/about_page_upper_outline.png">

    </div>
    <div id="middle" ref="middle" class="text-blob"  :class="{ 'scrolled-over': isMiddleScrolledOver }">
      <h1 class="title" id="middle-title"> Something I <br> don't know? Not for long </h1>
      <p class="text" id="middle-text1"> Computer science is one of the fastest changing industries, which is <br>
        why it requires a neuroplastic brain to excel. I'm constantly learning and <br> improving not just as a student, but as an engineer,
        and this is something <br> I plan to never change.</p>
      <p class="text" id="middle-text2"> My rigorous coursework at William & Mary and industry experience have <br>
        exposed me to numerous projects, languages, frameworks, libraries, and modules - <br>
        all of which I leverage effectively to
        create something that works for you. </p>
      <img class="img" src="img/about_page_middle_outline.png">
    </div>
    <div id="lower" ref="lower" class="text-blob" :class="{ 'scrolled-over': isLowerScrolledOver }">
      <h1 class="title" id="lower-title"> You could <br> not pay me <br> to do this... </h1>
      <p class="text" id="lower-text1"> No, really, I love what I do so <br> much that I would do it for free if <br> I could (I can't). </p>
      <p class="text" id="lower-text2"> I strive to see tasks through the eyes of my collaborators and their users, <br>
        because I have a profound passion for discovering solutions that work for <br> people. </p>
      <h1 class="text" id="lower-text3"> Let your problem be the next one I solve. </h1>
      <img class="img" src="img/about_page_lower_outline.png">
    </div>
  </div>
</template>

<script>
import CoverBanner from '@/components/CoverBanner.vue'
import SideBar from '@/components/SideBar.vue'

export default {
  name: 'AboutView',
  components: {
    CoverBanner,
    SideBar
  },
  data () {
    return {
      isMiddleScrolledOver: false,
      isLowerScrolledOver: false
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
    lightMode () {
      const master = document.getElementById('master')

      master.style.backgroundColor = 'var(--light-color)'

      const title = document.getElementById('page-title')

      title.style.color = 'var(--dark-color)'

      const upper = document.getElementById('upper')
      const middle = document.getElementById('middle')
      const lower = document.getElementById('lower')

      upper.style.color = 'var(--dark-color)'
      middle.style.color = 'var(--dark-color)'
      lower.style.color = 'var(--dark-color)'
    },
    darkMode () {
      const master = document.getElementById('master')

      master.style.backgroundColor = 'var(--dark-color)'

      const title = document.getElementById('page-title')

      title.style.color = 'var(--light-color)'

      const upper = document.getElementById('upper')
      const middle = document.getElementById('middle')
      const lower = document.getElementById('lower')

      upper.style.color = 'var(--light-color)'
      middle.style.color = 'var(--light-color)'
      lower.style.color = 'var(--light-color)'
    },
    handleScroll () {
      const middle = this.$refs.middle
      const lower = this.$refs.lower
      const middleRect = middle.getBoundingClientRect()
      const lowerRect = lower.getBoundingClientRect()
      if (middleRect.top < (window.innerHeight - 500)) {
        this.isMiddleScrolledOver = true
      }
      if (lowerRect.top < (window.innerHeight - 500)) {
        this.isLowerScrolledOver = true
      }
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
    window.scrollTo(0, 0)
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.handleScroll) // To handle resize events as well
  },
  beforeUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleScroll)
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      window.scrollTo(0, 0)
    })
  }
}

</script>

<style lang="scss" scoped>
.about{
  height: 185%;
  width: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  transition: 0.5s ease;
}

#page-title{
  position: absolute;
  font-weight: 200;
  font-size: 150px;
  margin-left: 180px;
  margin-top: 80px;

}

.img{
  height: 750px;
}

.title{
  position: absolute;
  line-height: 70px;
  font-size: 55px
}

#upper-title{
  margin-top: 160px;
  margin-left: 100px
}

#middle-title{
  text-align: right;
  margin-top: 50px;
  margin-left: 480px
}

#lower-title{
  text-align: left;
  margin-top: 60px;
  margin-left: 235px
}

.text{
  font-family: "Outfit", sans-serif;
  line-height: 40px;
  position: absolute;
  font-size: 25px
}

#upper-text1{
  text-align: left;
  margin-top: 260px;
  margin-left: 100px
}

#upper-text2{
  text-align: left;
  margin-top: 430px;
  margin-left: 100px
}

#middle-text1{
  text-align: right;
  margin-left: 290px;
  margin-top: 230px
}

#middle-text2{
  text-align: right;
  margin-left: 170px;
  margin-top: 450px
}

#lower-text1{
  text-align: left;
  margin-top: 300px;
  margin-left: 240px
}

#lower-text2{
  text-align: left;
  margin-top: 450px;
  margin-left: 240px
}

#lower-text3{
  font-family: 'Niramit', sans-serif;
  font-size: 40px;
  color: var(--gold-color);
  margin-top: 600px;
  margin-left: 300px
}

#upper{
  position: absolute;
  margin-top: 200px;
  margin-left: 100px
}

#middle{
  position: absolute;
  margin-top: 550px;
  margin-left: 500px;
}

#lower{
  position: absolute;
  margin-top: 935px;
  margin-left: -70px;
  padding-bottom: 15px
}

.text-blob{
  opacity: 0%;
  transition: transform 1s, opacity 2s ease-out
}

.text-blob.scrolled-over{
  transform: translateY(-50px);
  opacity: 100%
}

</style>
