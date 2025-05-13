<!-- <template>
    <div class="master">
        <div class="location-wrapper">
            {{ getLocation }}
        </div>
        <img class="img">
        <div class="date-wrapper">
            {{ getDate }}
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'SideBar',
  methods: {
    checkAppearance () {
      if (this.isDarkMode) {
        this.darkMode()
      } else {
        this.lightMode()
      }
    },
    lightMode () {
      document.querySelector('.img').src = 'img/side_bar_indigo.png'
      document.querySelector('.date-wrapper').style.color = 'var(--indigo-color)'
      document.querySelector('.location-wrapper').style.color = 'var(--indigo-color)'
    },
    darkMode () {
      document.querySelector('.img').src = 'img/side_bar_gold.png'
      document.querySelector('.date-wrapper').style.color = 'var(--gold-color)'
      document.querySelector('.location-wrapper').style.color = 'var(--gold-color)'
    }
  },
  computed: {
    getLocation () {
      if (this.route.path === '/') {
        return 'home'
      }
      return this.route.path.substring(1)
    },
    getDate () {
      const currentDate = new Date()
      const dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' }
      const formattedDate = currentDate.toLocaleDateString(undefined, dateOptions).replaceAll('/', '.')
      return formattedDate
    },
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
  },
  setup () {
    const route = useRoute()

    return {
      route
    }
  }
})
</script>

<style scoped lang="scss">
.master{
    z-index: 1;
    position: fixed;
    margin-top: 11.3vh;
    margin-left: 0vw;
    height: 88vh;
    width: 1vw
}

img{
    height: 100%;
    width: 1.5vw
}

.location-wrapper{
    width: 100%;
    height: 15%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.2vh;
    font-family: 'Outfit', sans-serif;
    font-weight: 300;
    color: var(--gold-color);
    transform: rotate(270deg);
    position: absolute;
    top: 7%;
    margin-left: 5px;
  }
  
  .date-wrapper{
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.2vh;
    font-family: 'Outfit', sans-serif;
    font-weight: 300;
    color: var(--gold-color);
    position: absolute;
    transform: rotate(270deg);
    bottom: 9.5%;
    margin-left: 5px;
}
</style> -->




<template>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SideBar'
})
</script>