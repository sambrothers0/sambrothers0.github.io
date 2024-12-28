<template>
    <div class="dsq" @click="handleClick">
        <div class="dsq-left">
          <img class="dsq-top-image" :src=imageOneSrc style="width: 100%; border-radius: 15px; margin-top: 4vh">
          <img class="dsq-bottom-image" :src=imageTwoSrc
          style="width: 100%; border-radius: 15px; margin-top: 10vh; display: none">
        </div>
        <div class="dsq-right">
            <h1 style="font-size: 40px; margin-top: 3vh"> {{ title }} </h1>
            <div class="line-two-wrapper">
                <img class="external-link" @click="handleNavigate"
                style="height: 50%;
                cursor: pointer;
                margin-right: 1vw">
                <h3> {{ date }} </h3>
            </div>
            <p class='dsq-subtext' style="font-size: 3vh; line-height: 4.5vh; font-family: 'Outfit', sans-serif"> {{ shortText }} </p>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DSQ',
  data () {
    return {
      title: 'Deque',
      date: 'Nov 2022',
      shortText: 'I implemented a deque from scratch with both the functionality of a stack and queue ...',
      longText: 'I implemented a deque from scratch with both the funcitonality of a stack and queue. ' +
      'Thorough understanding of these data structures are fundamental to any programmer, ' +
      'so I coded a deque, which acts as a double ended stack and can be pushed or popped from either end. ' +
      'Using Python, I made two different programs with identical functionality, but different structures: one array-based, ' +
      'and one with a custom linked list I made from scratch. Upon completion, ' +
      'I learned about the benefits and drawbacks of each implementation.',
      imageOneSrc: 'img/DSQ/deque.png',
      imageTwoSrc: 'img/DSQ/stack.png',
      url: 'https://github.com/sambrothers0/Stack_Queue_Deque',
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
      window.open(this.url, '_blank')
      this.handleClick()
    },
    expand () {
      document.querySelector('.dsq-subtext').textContent = this.longText
      document.querySelector('.dsq-bottom-image').style.display = 'flex'
      this.expanded = true
    },
    condense () {
      document.querySelector('.dsq-subtext').textContent = this.shortText
      document.querySelector('.dsq-bottom-image').style.display = 'none'
      this.expanded = false
    },
    mobileOn () {
      document.querySelector('.dsq-top-image').style.display  = 'none'
      document.querySelector('.dsq-bottom-image').style.display  = 'none'
      document.querySelector('.dsq-left').style.width = '0%'
      document.querySelector('.dsq-right').style.width = '90%'
    },
    mobileOff () {
      document.querySelector('.dsq-top-image').style.display = 'flex'
      document.querySelector('.dsq-bottom-image').style.display = 'none'
      document.querySelector('.dsq-left').style.width= '45%'
      document.querySelector('.dsq-right').style.width= '45%'

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
.dsq{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 35px;
  transition: transform 0.2s, box-shadow 0.2s, height 0.2s;
  margin-bottom: 50px;
  background-color: #d94b2d33;
}
.dsq:hover{
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

.dsq-right{
  height: 100%;
  width: 45%;
  flex-direction: column;
  text-align: right;
  margin-right: 30px
}
  
.dsq-left{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 45%;
  margin: 2vh
}
</style>
