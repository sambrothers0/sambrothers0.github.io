<template>
  <UpperToolbar/>
  <SideBar/>
  <div class="contact" id="master">
    <div class='title'>
      <h1 style="font-size: 8vw; font-weight: 100; margin-bottom: 0px;">Contact</h1>
      <img style="width: 30vw; margin-left: 10vw" src="img/gold_divider_bar.png" >
    </div>
    <img class="paper-airplane-img">
    <div class="link-wrapper">
      <div class="email-container" id="email">
        <button class="email-button" @click="handleClickEmail" @mouseenter="handleMouseEnterEmail" @mouseleave="handleMouseLeaveEmail">
          <img class="email-img" src="img/mail_icon_light.png">
        </button>
      </div>
      <div class="resume-container" id="resume">
        <div class="resume-button" @click="handleClickResume" @mouseenter="handleMouseEnterResume" @mouseleave="handleMouseLeaveResume">
          <img class="resume-img" src="img/resume_icon_light.png">
          <p class="curriculum-text">C</p>
          <p class="vitae-text">V</p>
        </div>
      </div>
      <div class="github-container" id="github">
        <div class="github-button" @click="handleClickGitHub" @mouseenter="handleMouseEnterGitHub" @mouseleave="handleMouseLeaveGitHub">
          <img class="github-img" src="img/github_icon_light.png">
          <p class="git-text">G</p>
          <p class="hub-text">H</p>
        </div>
      </div>
      <div class="linkedin-container" id="linkedin">
        <div class="linkedin-button" @click="handleClickLinkedIn" @mouseenter="handleMouseEnterLinkedIn" @mouseleave="handleMouseLeaveLinkedIn">
          <img class="linkedin-img" src="img/linkedin_icon_light.png">
          <p class="linked-text">L</p>
          <p class="in-text">I</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import UpperToolbar from '@/components/UpperToolbar.vue'
import SideBar from '@/components/SideBar.vue'

export default {
  name: 'ContactView',
  components: {
    UpperToolbar,
    SideBar
  },
  data () {
    return {
      mouseX: 0,
      mouseY: 0,
      email: 'samjbrothers@icloud.com',
      phone: '+1 (919) 407-9965',
      resume: 'img/Sam Brothers CV.pdf',
      github: 'https://github.com/sambrothers0',
      linkedin: 'https://www.linkedin.com/in/samjbrothers/'
    }
  },
  methods: {
    checkAppearance () {
      this.isDarkMode ? this.darkMode() : this.lightMode()
    },
    lightMode () {
      document.getElementById('master').style.backgroundColor = 'var(--light-color)'
      document.querySelector('.title').style.color = 'var(--dark-color)'
      document.querySelector('.paper-airplane-img').src = 'img/paper_airplane_dark.png'
    },
    darkMode () {
      document.getElementById('master').style.backgroundColor = 'var(--dark-color)'
      document.querySelector('.title').style.color = 'var(--light-color)'
      document.querySelector('.paper-airplane-img').src = 'img/paper_airplane_light.png'
    },
    updateMousePosition (event) {
      this.mouseX = event.clientX
      this.mouseY = event.clientY
    },
    handleMouseEnterEmail () {
      setTimeout(() => {
        var button = document.querySelector('.email-button')
        var rect = button.getBoundingClientRect()
        if (!(this.mouseX >= rect.left &&
        this.mouseX <= rect.right &&
        this.mouseY >= rect.top &&
        this.mouseY <= rect.bottom)) {
          this.handleMouseLeaveEmail()
          return
        }

        button.innerHTML = ''
        var email = document.createElement('p')
        email.textContent = this.email
        email.style.color = 'var(--light-color)'
        email.style.fontSize = '22px'
        email.style.fontFamily = 'Outfit, sans-serif'
        email.style.fontWeight = '500'

        var phone = document.createElement('p')
        phone.textContent = this.phone
        phone.style.color = 'var(--light-color)'
        phone.style.fontSize = '22px'
        phone.style.fontFamily = 'Outfit, sans-serif'
        phone.style.fontWeight = '500'
        phone.style.marginTop = '-20px'

        button.appendChild(email)
        button.appendChild(phone)
      }, 250)
    },
    handleMouseLeaveEmail () {
      var button = document.querySelector('.email-button')
      button.innerHTML = ''

      var img = document.createElement('img')
      img.src = 'img/mail_icon_light.png'
      img.height = '70'
      button.appendChild(img)
    },
    handleClickEmail () {
      window.location.href = 'mailto:' + this.email
    },
    handleMouseEnterResume () {
      setTimeout(() => {
        var button = document.querySelector('.resume-button')
        var rect = button.getBoundingClientRect()
        if (!(this.mouseX >= rect.left &&
        this.mouseX <= rect.right &&
        this.mouseY >= rect.top &&
        this.mouseY <= rect.bottom)) {
          this.handleMouseLeaveResume()
          return
        }
        document.querySelector('.curriculum-text').textContent = 'Curriculum'
        document.querySelector('.vitae-text').textContent = 'Vitae'
      }, 150)
    },
    handleMouseLeaveResume () {
      document.querySelector('.curriculum-text').textContent = 'C'
      document.querySelector('.vitae-text').textContent = 'V'
    },
    handleClickResume () {
      setTimeout(() => {
        window.open(this.resume, '_blank');
      }, 150)
    },
    handleMouseEnterGitHub () {
      setTimeout(() => {
        var button = document.querySelector('.github-button')
        var rect = button.getBoundingClientRect()
        if (!(this.mouseX >= rect.left &&
        this.mouseX <= rect.right &&
        this.mouseY >= rect.top &&
        this.mouseY <= rect.bottom)) {
          this.handleMouseLeaveGitHub()
          return
        }
        document.querySelector('.git-text').textContent = 'Git'
        document.querySelector('.hub-text').textContent = 'Hub'
      }, 100)
    },
    handleMouseLeaveGitHub () {
      document.querySelector('.git-text').textContent = 'G'
      document.querySelector('.hub-text').textContent = 'H'
    },
    handleClickGitHub () {
      setTimeout(() => {
        window.open(this.github, '_blank')
      }, 150)
    },
    handleMouseEnterLinkedIn () {
      setTimeout(() => {
        var button = document.querySelector('.linkedin-button')
        var rect = button.getBoundingClientRect()
        if (!(this.mouseX >= rect.left &&
        this.mouseX <= rect.right &&
        this.mouseY >= rect.top &&
        this.mouseY <= rect.bottom)) {
          this.handleMouseLeaveLinkedIn()
          return
        }
        document.querySelector('.linked-text').textContent = 'Linked'
        document.querySelector('.in-text').textContent = 'In'
      }, 100)
    },
    handleMouseLeaveLinkedIn () {
      document.querySelector('.linked-text').textContent = 'L'
      document.querySelector('.in-text').textContent = 'I'
    },
    handleClickLinkedIn () {
      setTimeout(() => {
        window.open(this.linkedin, '_blank')
      }, 150)
    }
  },
  computed: {
    isDarkMode () {
      return this.$store.getters.isDarkModeOn
    }
  },
  watch: {
    isDarkMode (newVal) {
      this.checkAppearance()
    }
  },
  mounted () {
    this.checkAppearance()
    window.scrollTo(0, 0)
    window.addEventListener('mousemove', this.updateMousePosition)
  },
  beforeUnmount () {
    window.removeEventListener('mousemove', this.updateMousePosition)
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      window.scrollTo(0, 0)
    })
  }
}

</script>

<style lang="scss" scoped>
.contact{
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: background-color 0.5s ease, color 0.5s ease;
}

.title{
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 20vh;
  margin-top: 0vh;
  margin-left: 40%;
  transition: all 0.5s ease
}

.paper-airplane-img{
  position: fixed;
  width: 50vw;
  transform: rotate(45deg);
  margin-left: 10vw;
}

.link-wrapper{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  height: 60vh;
  width: 30%;
  margin-top: 5%;
  margin-left: 55%;
  z-index: 1;
}

.email-container{
  display: flex;
  justify-content: right;
  height: 100px;
  width: 300px;
}

.email-button{
  height: 100%;
  width: 100px;
  background-color: var(--indigo-color);
  border: transparent;
  border-radius: 50px;
  cursor: pointer;
  transition: width 0.5s
}

.email-button:hover{
  width: 100%;
  transition: width 0.5s
}

.email-img{
  height: 70px;
  transition: opacity 0.3s
}

.resume-container{
  display: flex;
  justify-content: right;
  height: 100px;
  width: 385px;
}

.resume-button{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100px;
  background-color: var(--indigo-color);
  border: transparent;
  border-radius: 50px;
  cursor: pointer;
  transition: width 0.5s
}

.resume-button:hover{
  width: 100%
}

.curriculum-text{
  text-align: left;
  width: 27%;
  font-size: 40px;
  transition: width 0.5s
}

.vitae-text{
  text-align: left;
  width: 35%;
  font-size: 40px;
  transition: width 0.5s
}

.resume-img{
  width: 0px;
  margin-right: 10px;
  transition: width 0.5s
}

.resume-button:hover .curriculum-text{
  width: 52%;
}

.resume-button:hover .vitae-text{
  width: 22%;
}

.resume-button:hover .resume-img{
  width: 30px
}

.github-container{
  display: flex;
  justify-content: right;
  height: 100px;
  width: 200px;
}

.github-button{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100px;
  background-color: var(--indigo-color);
  border: transparent;
  border-radius: 50px;
  cursor: pointer;
  transition: width 0.5s
}

.github-button:hover{
  width: 100%
}

.git-text{
  text-align: left;
  width: 30%;
  font-size: 40px;
  transition: width 0.5s
}

.hub-text{
  text-align: left;
  width: 35%;
  font-size: 40px;
  transition: width 0.5s
}

.github-img{
  width: 0px;
  margin-right: 10px;
  transition: width 0.5s
}

.github-button:hover .git-text{
  width: 25%;
}

.github-button:hover .hub-text{
  width: 32%;
}

.github-button:hover .github-img{
  width: 30px;
}

.linkedin-container{
  display: flex;
  justify-content: right;
  height: 100px;
  width: 235px;
}

.linkedin-button{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100px;
  background-color: var(--indigo-color);
  border: transparent;
  border-radius: 50px;
  cursor: pointer;
  transition: width 0.5s
}

.linkedin-button:hover{
  width: 100%
}

.linked-text{
  text-align: left;
  width: 25%;
  font-size: 40px;
  transition: width 0.5s
}

.in-text{
  text-align: left;
  width: 22%;
  font-size: 40px;
  transition: width 0.5s
}

.linkedin-img{
  width: 0px;
  margin-right: 10px;
  transition: width 0.5s
}

.linkedin-button:hover .linked-text{
  width: 47%;
}

.linkedin-button:hover .in-text{
  width: 12%;
}

.linkedin-button:hover .linkedin-img{
  width: 30px
}
</style>
