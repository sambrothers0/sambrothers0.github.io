<!-- IMAGE ON RIGHT -->
<template>
    <div class="template-a" @click="handleClick">
        <div class="template-a-left">
            <h1 style="font-size: 40px; margin-top: 3vh"> {{ title }} </h1>
            <div class="line-two-wrapper">
                <img class="external-link" @click="handleNavigate"
                style="height: 50%;
                cursor: pointer;
                margin-right: 1vw">
                <h3> {{ date }} </h3>
            </div>
            <p class='template-a-info' style="font-size: 3vh; line-height: 4.5vh; font-family: 'Outfit', sans-serif"> {{ shortText }} </p>
        </div>
        <div class="template-a-right">
            <img class='template-a-image' :src=imageOneSrc
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
  name: 'TemplateA',
  data () {
    return {
      title: '',
      date: '',
      info: '',
      thumbnail: '',
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
      window.open(this.url, '_blank')
      this.handleClick()
    },
    expand () {
      document.querySelector('.template-a-info').textContent = this.longText
      this.expanded = true
    },
    condense () {
      document.querySelector('.template-a-info').textContent = this.shortText
      this.expanded = false
    },
    mobileOn () {
      document.querySelector('.template-a-left').style.width = '90%'
      document.querySelector('.template-a-right').style.width = '0%'
      document.querySelector('.template-a-image').style.display  = 'none'
    },
    mobileOff () {
      document.querySelector('.template-a-left').style.width = '60%'
      document.querySelector('.template-a-right').style.width = '40%'
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
    background-color: #dd307433;
}
.template-a:hover{
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

.template-a-left{
  height: 100%;
  width: 60%;
  flex-direction: column;
  text-align: left;
  margin-left: 30px
  }

.template-a-right{
  height: 100%;
  width: 40%;
  margin-right: 30px;
  margin-left: 2vw;
  margin-bottom: 10px;
}
</style>
