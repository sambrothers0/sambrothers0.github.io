<template>
  <UpperToolbar/>
  <SideBar/>
  <div class="creations" id="master">
    <h1 class="title"> Creations </h1>
    <div class="frame-wrapper">
      <img class="frame" src="img/gold_frame.png">
    </div>
    <div class="panels-wrapper">
      <Thrillsburg/>
      <RT/>
      <PersonalWebsite/>
      <ConnectN/>
      <Wordle/>
      <BST/>
      <DSQ/>
    </div>
  </div>
</template>

<script>
import UpperToolbar from '@/components/UpperToolbar.vue'
import SideBar from '@/components/SideBar.vue'
import Thrillsburg from '@/panels/Thrillsburg.vue'
import RT from '@/panels/RT.vue'
import PersonalWebsite from '@/panels/PersonalWebsite.vue'
import ConnectN from '@/panels/ConnectN.vue'
import Wordle from '@/panels/Wordle.vue'
import BST from '@/panels/BST.vue'
import DSQ from '@/panels/DSQ.vue'

export default {
  name: 'CreationsView',
  components: {
    UpperToolbar,
    SideBar,
    Thrillsburg,
    RT,
    PersonalWebsite,
    ConnectN,
    Wordle,
    BST,
    DSQ
  },
  methods: {
    checkAppearance () {
      this.isDarkMode ? this.darkMode() : this.lightMode()
    },
    lightMode () {
      document.getElementById('master').style.backgroundColor = 'var(--light-color)'
      document.getElementById('master').style.color = 'var(--dark-color)'
      const links = document.querySelectorAll('.external-link')
      for (let i = 0; i < links.length; i++) {
        links[i].src = 'img/external_link_icon_dark.png'
      }
    },
    darkMode () {
      document.getElementById('master').style.backgroundColor = 'var(--dark-color)'
      document.getElementById('master').style.color = 'var(--light-color)'
      const links = document.querySelectorAll('.external-link')
      for (let i = 0; i < links.length; i++) {
        links[i].src = 'img/external_link_icon_light.png'
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
.creations{
  line-height: 5vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  transition: background-color 0.5s ease, color 0.5s ease;
}

.title{
  margin-top: 20vh;
  font-size: 9vw;
  font-weight: 100;
}

.frame-wrapper{
  height: 3vh;
  width: 70vw;
}
.frame{
  width: 100%;
}

.panels-wrapper{
  width: 65vw;
  margin-bottom: 80px;
}
</style>
