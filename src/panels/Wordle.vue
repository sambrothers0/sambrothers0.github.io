<template>
    <div class="wordle" @click="handleClick">
        <div class="wordle-left">
          <img class='wordle-image' :src=imageOneSrc
          style="height: 27vh;
          border-radius: 15px;
          margin-top: 3vh;
          transition: all 0.2s ease">
        </div>
        <div class="wordle-right">
          <h1 style="font-size: 40px; margin-top: 3vh"> {{ title }} </h1>
          <div class="line-two-wrapper">
            <img class="external-link" @click="handleNavigate"
            style="height: 50%;
            cursor: pointer;
            margin-right: 1vw">
            <h3> {{ date }} </h3>
          </div>
          <p class='wordle-subtext' style="font-size: 3vh; line-height: 4.5vh; font-family: 'Outfit', sans-serif"> {{ shortText }} </p>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Wordle',
  data () {
    return {
      title: 'Wordle',
      date: 'Mar 2024',
      shortText: 'I performed bug fixes and unit testing for an existing Wordle code base in Java Swing ...',
      longText: 'I performed bug fixes and unit testing for an existing Wordle code base in Java Swing. ' +
      "Using Gilbert LeBlanc's GitHub repository, I tested the extisting code using the JUnit Test module for Java, " +
      'to understand how testing works, and why test-driven design is important. ' +
      'This project introduced me to basic GUI desktop applications using a common API, and furthered my ability to ' +
      "parse and comprehend someone else's code, an essential skill for team-based programming. ",
      imageOneSrc: 'img/wordle_panel/wordle_board.png',
      url: 'https://github.com/sambrothers0/Wordle',
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
      document.querySelector('.wordle-subtext').textContent = this.longText
      this.expanded = true
    },
    condense () {
      document.querySelector('.wordle-subtext').textContent = this.shortText
      this.expanded = false
    },
    mobileOn () {
      this.expand()

      document.querySelector('.wordle-left').style.width  = '0%'
      document.querySelector('.wordle-right').style.width  = '85%'
      document.querySelector('.wordle-image').style.display  = 'none'
    },
    mobileOff () {
      this.condense()
      document.querySelector('.wordle-left').style.width  = '40%'
      document.querySelector('.wordle-right').style.width  = '60%'
      document.querySelector('.wordle-image').style.display = 'flex'
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
.wordle{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-radius: 35px;
    transition: transform 0.2s, box-shadow 0.2s, height 0.2s;
    margin-bottom: 50px;
    background-color: #ebb80e33;
}
.wordle:hover{
    transform: scale(1.03);
    box-shadow: 0px 0px 20px 8px rgba(0, 0, 0, 0.1);
}

.line-two-wrapper{
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 5vh;
  width: 100%;
  margin-top: -2vh;
  margin-bottom: -2vh
}

.wordle-right{
    height: 100%;
    width: 60%;
    flex-direction: column;
    text-align: right;
    margin-right: 30px;
}

.wordle-left{
    height: 100%;
    width: 40%;
    margin-left: 20px;
}
</style>
