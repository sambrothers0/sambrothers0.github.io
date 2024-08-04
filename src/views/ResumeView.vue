<template>
  <CoverBanner/>
  <SideBar/>
  <div id='master' style="display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-top: 10vh;
      transition: background-color 0.5s ease, color 0.5s ease
      ">
      <h1 class="title"> Curriculum Vitae </h1>
      <h3 class="subtitle">
          Updated: July 25 2024
          <img class="icon" src="img/download_icon_light.png" @click=handleDownload()>
      </h3>
      <div class="iframe-wrapper">
          <iframe src="https://docs.google.com/document/d/1PYxZH9NzgGVXDEm4l9N-spIKVLTdS6fG/preview" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>
      </div>
  </div>
</template>

<script>
import CoverBanner from '@/components/CoverBanner.vue'
import SideBar from '@/components/SideBar.vue'

export default {
name: 'ResumeView',
components: {
  CoverBanner,
  SideBar
},
methods: {
  checkAppearance () {
    if (this.isDarkMode) {
      this.darkMode()
    } else {
      this.lightMode()
    }
  },
  lightMode () {
    document.getElementById('master').style.backgroundColor = 'var(--light-color)'
    document.querySelector('.title').style.color = 'var(--dark-color)'
    document.querySelector('.subtitle').style.color = 'var(--dark-color)'
    document.querySelector('.icon').src = 'img/download_icon_dark.png'
  },
  darkMode () {
    document.getElementById('master').style.backgroundColor = 'var(--dark-color)'
    document.querySelector('.title').style.color = 'var(--light-color)'
    document.querySelector('.subtitle').style.color = 'var(--light-color)'
    document.querySelector('.icon').src = 'img/download_icon_light.png'
  },
  handleDownload () {
    const link = document.createElement('a')
    link.href = 'img/Resume.pdf'
    link.download = 'Curriculum-Vitae-Sam-B.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
},
computed: {
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
.title{
    width: 500px;
    line-height: 80px;
    font-size: 50px;
    font-weight: 300;
    color: var(--light-color);
}

.subtitle{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -20px
}

.icon {
    width: 20px;
    margin-left: 20px;
    cursor: pointer;
    transition: transform 0.1s ease
}
.icon:active {
    transform: scale(0.92)
}

.iframe-wrapper{
    width: 850px;
    height: 80vh;
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
    opacity: 0.7;
}
</style>
