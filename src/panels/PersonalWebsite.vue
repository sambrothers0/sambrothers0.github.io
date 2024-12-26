<template>
    <div class="personal-website" @click="handleClick">
        <div class="personal-website-left">
            <img class="personal-website-top-image" :src=imageOneSrc style="height: 25vh; border-radius: 15px;">
            <img class="personal-website-bottom-image" :src=imageTwoSrc
            style="height: 27vh; padding-top: 7vh; display: none">
        </div>
        <div class="personal-website-right">
            <h1 style="font-size: 40px; margin-top: 3vh"> {{ title }} </h1>
            <div class="line-two-wrapper">
              <img class="external-link" @click="handleNavigate"
              style="height: 50%;
              cursor: pointer;
              margin-right: 1vw">
              <h3> {{ date }} </h3>
            </div>
            <p class='personal-website-subtext' style="font-size: 3vh; line-height: 4.5vh; font-family: 'Outfit', sans-serif"> {{ shortText }} </p>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PersonalWebsite',
  data () {
    return {
      title: 'Personal Website',
      date: 'Aug 2024',
      shortText: "This website introduces me as a developer and shows off the cool things I've made ...",
      longText: "This website introduces me as a developer and shows off the cool things I've made. " +
      'Designed and implemented completely from scratch, I created my portfolio website in under 3 months, ' +
      'having never written a line of HTML in my life. ' +
      'With the design, development, and deployment skills I taught myself from this project, I am now able to ' +
      'create clean and appealing web front-ends. With full mobile compatability, this website employs Vue 3, ' +
      'using the Vue store and router for complex ' +
      'state management and single-page routing. ',
      imageOneSrc: 'img/personal_website/logo.png',
      imageTwoSrc: 'img/personal_website/cover_banner.png',
      url: 'https://github.com/sambrothers0/sambrothers0.github.io',
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
      document.querySelector('.personal-website-subtext').textContent = this.longText
      document.querySelector('.personal-website-bottom-image').style.display = 'flex'
      this.expanded = true
    },
    condense () {
      document.querySelector('.personal-website-subtext').textContent = this.shortText
      document.querySelector('.personal-website-bottom-image').style.display = 'none'
      this.expanded = false
    },
    mobileOn () {
      this.expand()
      document.querySelector('.personal-website-bottom-image').style.display  = 'none'
      document.querySelector('.personal-website-top-image').style.display  = 'none'
      document.querySelector('.personal-website-right').style.width  = '85%'
      document.querySelector('.personal-website-left').style.width  = '0%'
      
    },
    mobileOff () {
      this.condense()
      document.querySelector('.personal-website-top-image').style.display  = 'flex'
      document.querySelector('.personal-website-right').style.width  = '50%'
      document.querySelector('.personal-website-left').style.width  = '45%'
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
.personal-website{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 35px;
  transition: transform 0.2s, box-shadow 0.2s, height 0.2s;
  margin-bottom: 50px;
  background-color: #3a419833;
}
.personal-website:hover{
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

.personal-website-right{
  display: flex;
  height: 100%;
  width: 50%;
  flex-direction: column;
  text-align: right;
  align-items: flex-end;
  margin-right: 30px
}

.personal-website-left{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 45%;
  margin: 2vh
}
</style>
