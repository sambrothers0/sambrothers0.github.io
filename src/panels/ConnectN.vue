<template>
    <div class="connectn" @click="handleClick">
        <div class="connectn-left">
            <h1 style="font-size: 40px; margin-top: 3vh"> {{ title }} </h1>
            <div class="line-two-wrapper">
                <img class="external-link" @click="handleNavigate"
                style="height: 50%;
                cursor: pointer;
                margin-right: 1vw">
                <h3> {{ date }} </h3>
            </div>
            <p class='connectn-subtext' style="font-size: 3vh; line-height: 4.5vh; font-family: 'Outfit', sans-serif"> {{ shortText }} </p>
        </div>
        <div class="connectn-right">
            <img class='connectn-image' :src=imageOneSrc
            style="height: 27vh;
            border-radius: 15px;
            margin-top: 1vh;
            margin-left: 1vw;
            transition: all 0.2s ease">
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ConnectN',
  data () {
    return {
      title: 'Connect N GUI',
      date: 'Apr 2024',
      shortText: 'Connect N is a GUI game I made using the Java Swing API ...',
      longText: 'Connect N is a GUI game I made using the Java Swing API. ' +
      'It functions similarly to Connect 4, but with variable board sizes, and was comprehensively planned using UML diagrams before starting. ' +
      'During development, I followed the Model-View-Controller artitecture in order to build a complete, functional, and bug-free desktop app ' +
      'with a leaderboard, settings, info screen and other features. This project demonstrated the complexity of even a ' +
      'simple desktop app, and the organizaitonal skills necessary to execute it. ',
      imageOneSrc: 'img/connectn/connectn_board.png',
      url: 'https://github.com/sambrothers0/ConnectNGUI',
      expanded: false
    }
  },
  methods: {
    handleClick () {
      this.expanded ? this.condense() : this.expand()
    },
    handleNavigate () {
      window.open(this.url, '_blank')
      this.handleClick()
    },
    expand () {
      document.querySelector('.connectn-subtext').textContent = this.longText
      this.expanded = true
    },
    condense () {
      document.querySelector('.connectn-subtext').textContent = this.shortText
      this.expanded = false
    },
    mobileOn () {
      this.expand()
    },
    mobileOff () {
      this.condense()
    },
    mobileOn () {
      this.expand()

      document.querySelector('.connectn-left').style.width = '90%'
      document.querySelector('.connectn-right').style.width = '0%'
      document.querySelector('.connectn-image').style.display  = 'none'
    },
    mobileOff () {
      this.condense()
      
      document.querySelector('.connectn-left').style.width = '60%'
      document.querySelector('.connectn-right').style.width = '40%'
      document.querySelector('.connectn-image').style.display = 'flex'
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
})
</script>

<style scoped lang="scss">
.connectn{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-radius: 35px;
    transition: transform 0.2s, box-shadow 0.2s, height 0.2s;
    margin-bottom: 50px;
    background-color: #dd307433;
}
.connectn:hover{
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

.connectn-left{
  height: 100%;
  width: 60%;
  flex-direction: column;
  text-align: left;
  margin-left: 30px
  }

.connectn-right{
  height: 100%;
  width: 40%;
  margin-right: 30px;
  margin-left: 2vw;
  margin-bottom: 10px;
}
</style>
