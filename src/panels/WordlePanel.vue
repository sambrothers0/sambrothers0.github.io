<template>
    <div class="wordle-panel" @click="handleClick">
        <div class="left">
          <img class='wordle-panel-image' :src=imageOneSrc
          style="height: 27vh;
          border-radius: 15px;
          margin-top: 3vh;
          transition: all 0.2s ease">
        </div>
        <div class="right">
          <h1 style="font-size: 40px; margin-top: 3vh"> {{ title }} </h1>
          <div class="line-two-wrapper">
            <img class="external-link" @click="handleNavigate"
            style="height: 50%;
            cursor: pointer;
            margin-right: 1vw">
            <h3> {{ date }} </h3>
          </div>
          <p class='wordle-panel-subtext' style="font-size: 3vh; line-height: 4.5vh; font-family: 'Outfit', sans-serif"> {{ shortText }} </p>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'WordlePanel',
  data () {
    return {
      title: 'Wordle',
      date: 'Mar 2024',
      shortText: 'I performed bug fixes and unit testing for an existing Wordle code base in Java Swing.',
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
      document.querySelector('.wordle-panel-subtext').textContent = this.longText
      this.expanded = true
    },
    condense () {
      document.querySelector('.wordle-panel-subtext').textContent = this.shortText
      this.expanded = false
    }
  }
})
</script>

<style scoped lang="scss">
.wordle-panel{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-radius: 35px;
    transition: transform 0.2s, box-shadow 0.2s, height 0.2s;
    margin-bottom: 50px;
    background-color: #ebb80e33;
}
.wordle-panel:hover{
    transform: scale(1.03);
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

.right{
    height: 100%;
    width: 60%;
    flex-direction: column;
    text-align: right;
    margin-right: 30px
}

.left{
    height: 100%;
    width: 45%;
}
</style>
