<template>
    <div class="thrillsburg" @click="handleClick">
        <div class="thrillsburg-left">
            <h1 style="font-size: 40px; margin-top: 3vh"> {{ title }} </h1>
            <div class="line-two-wrapper">
                <img class="external-link" @click="handleNavigate"
                style="height: 50%;
                cursor: pointer;
                margin-right: 1vw">
                <h3> {{ date }} </h3>
            </div>
            <p class='thrillsburg-subtext' style="font-size: 3vh; line-height: 4.5vh; font-family: 'Outfit', sans-serif"> {{ shortText }} </p>
        </div>
        <div class="thrillsburg-right">
            <img class="thrillsburg-top-image" :src=imageOneSrc 
            style="width: 30vw; 
            border-radius: 15px; 
            margin-top: 15px; 
            margin-right: 15px;
            margin-left: 15px;">

            <img class="thrillsburg-bottom-image" :src=imageTwoSrc
            style="width: 25vw;
            border-radius: 15px;
            margin-top: 10px;
            margin-left: 15px;
            display: none;">
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Thrillsburg',
  data () {
    return {
      title: 'Thrillsburg',
      date: 'In progress',
      shortText: 'Thrillsburg allows Williamsburg visitors and locals to discover events that are relevant to them ... ',
      longText: 'Thrillsburg allows Williamsburg visitors and locals to discover events that are relevant to them. ' +
      'Using Vue.js, with the Quasar wrapper for versatile user compatability, I implemented a functional web frontend ' +
      'which dynamically pulls information from our database of recent events using a custom API. Working with our web designer, ' +
      'I delivered a solution which positions Thrillsburg as a modern, presentable, and user-friendly web app. ',
      imageOneSrc: 'img/thrillsburg_panel/logo.png',
      imageTwoSrc: 'img/thrillsburg_panel/events_page.jpg',
      url: '',
      expanded: false
    }
  },
  methods: {
    checkAppearance() {
      this.$store.getters.isMobileOn ? this.mobileOn() : this.mobileOff()
    },
    handleClick () {
      this.expanded ? this.condense() : this.expand()
    },
    handleNavigate () {
      
    },
    expand () {
      document.querySelector('.thrillsburg-subtext').textContent = this.longText
      document.querySelector('.thrillsburg-bottom-image').style.display = 'flex'
      this.expanded = true
    },
    condense () {
      document.querySelector('.thrillsburg-subtext').textContent = this.shortText
      document.querySelector('.thrillsburg-bottom-image').style.display = 'none'
      this.expanded = false
    },
    mobileOn () {
      document.querySelector('.thrillsburg-bottom-image').style.display  = 'none'
      document.querySelector('.thrillsburg-top-image').style.display = 'none'
      document.querySelector('.thrillsburg-left').style.width = '90%'
      document.querySelector('.thrillsburg-right').style.width = '0%'
    },
    mobileOff () {
      document.querySelector('.thrillsburg-top-image').style.display = 'flex'
      document.querySelector('.thrillsburg-left').style.width = '45%'
      document.querySelector('.thrillsburg-left').style.marginLeft = '0vw'
      document.querySelector('.thrillsburg-right').style.width = '45%'
    }
  },
  computed: {
    isMobile () {
      return this.$store.getters.isMobileOn
    }
  },
  watch: {
    isMobile (newVal) {
      newVal ? this.mobileOn() : this.mobileOff()
    }
  },
  mounted () {
    this.checkAppearance()
  }
})
</script>

<style scoped lang="scss">
.thrillsburg{
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-radius: 35px;
  transition: transform 0.2s, box-shadow 0.2s, height 0.2s;
  margin-bottom: 50px;
  background-color: #10584033;
}
.thrillsburg:hover{
  transform: scale(1.03);
  box-shadow: 0px 0px 20px 8px rgba(0, 0, 0, 0.1);
}

.line-two-wrapper{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 5vh;
  width: 100%;
  margin-top: -2vh;
  margin-bottom: -2vh
}

.thrillsburg-left{
  height: 100%;
  width: 45%;
  flex-direction: column;
  text-align: left;
  margin-left: 2vw;
}

.thrillburg-right{
  height: 100%;
  width: 45%;
}
</style>
