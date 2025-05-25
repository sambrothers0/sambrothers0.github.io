<template>
    <div class="template-a">
        <div class="template-a-left">
          <img class='template-a-image' :src=imageOneSrc
          style="height: 27vh;
          border-radius: 15px;
          margin-top: 3vh;
          transition: all 0.2s ease">
        </div>
        <div class="template-a-right">
          <h1 style="font-size: 40px; margin-top: 3vh"> {{ title }} </h1>
          <div class="line-two-wrapper">
            <img class="external-link" @click="handleNavigate"
            style="height: 50%;
            cursor: pointer;
            margin-right: 1vw">
            <h3> {{ date }} </h3>
          </div>
          <p class='template-a-subtext' style="font-size: 3vh; line-height: 4.5vh; font-family: 'Outfit', sans-serif"> {{ shortText }} </p>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'template-a',
  data () {
    return {
      title: '',
      date: '',
      info: '',
      url: '',
      thumbnail: '',
      expanded: false
    }
  },
  methods: {
    checkAppearance() {
      this.$store.getters.isMobileOn ? this.mobileOn() : this.mobileOff()
    },
    handleNavigate () {
      window.open(this.url, '_blank')
      this.handleClick()
    },
    expand () {
      document.querySelector('.template-a-subtext').textContent = this.longText
      this.expanded = true
    },
    condense () {
      document.querySelector('.template-a-subtext').textContent = this.shortText
      this.expanded = false
    },
    mobileOn () {      
      document.querySelector('.template-a-left').style.width  = '0%'
      document.querySelector('.template-a-right').style.width  = '85%'
      document.querySelector('.template-a-image').style.display  = 'none'
    },
    mobileOff () {
      document.querySelector('.template-a-left').style.width  = '40%'
      document.querySelector('.template-a-right').style.width  = '60%'
      document.querySelector('.template-a-image').style.display = 'flex'
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
.template-a{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-radius: 35px;
    transition: transform 0.2s, box-shadow 0.2s, height 0.2s;
    margin-bottom: 50px;
    background-color: #ebb80e33;
}
.template-a:hover{
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

.template-a-right{
    height: 100%;
    width: 60%;
    flex-direction: column;
    text-align: right;
    margin-right: 30px;
}

.template-a-left{
    height: 100%;
    width: 40%;
    margin-left: 20px;
}
</style>
