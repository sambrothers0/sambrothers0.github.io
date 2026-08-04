<template>
  <UpperToolbar/>
  <SideBar/>
  <div class="contact" id="master">
    <div class='title'>
      <h1 class="title-heading">Contact</h1>
      <span class="rule title-rule" aria-hidden="true"></span>
    </div>
    <img class="paper-airplane-img"
      :src="isDarkMode ? '/img/paper_airplane_light.png' : '/img/paper_airplane_dark.png'" alt="">
    <div class="link-wrapper">
      <div class="email-container" id="email">
        <button class="email-button" @click="handleClickEmail" @mouseenter="handleMouseEnterEmail" @mouseleave="handleMouseLeaveEmail">
          <img class="email-img" src="/img/mail_icon_light.png">
        </button>
      </div>
      <div class="resume-container" id="resume">
        <div class="resume-button" @click="handleClickResume" @mouseenter="handleMouseEnterResume" @mouseleave="handleMouseLeaveResume">
          <img class="resume-img" src="/img/resume_icon_light.png">
          <p class="curriculum-text">C</p>
          <p class="vitae-text">V</p>
        </div>
      </div>
      <div class="github-container" id="github">
        <div class="github-button" @click="handleClickGitHub" @mouseenter="handleMouseEnterGitHub" @mouseleave="handleMouseLeaveGitHub">
          <img class="github-img" src="/img/github_icon_light.png">
          <p class="git-text">G</p>
          <p class="hub-text">H</p>
        </div>
      </div>
      <div class="linkedin-container" id="linkedin">
        <div class="linkedin-button" @click="handleClickLinkedIn" @mouseenter="handleMouseEnterLinkedIn" @mouseleave="handleMouseLeaveLinkedIn">
          <img class="linkedin-img" src="/img/linkedin_icon_light.png">
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
      email: 'samueljbrothers@gmail.com',
      phone: '+1 (919) 407-9965',
      resume: '/resume',
      resumeUrl: 'https://drive.google.com/file/d/1szUZxqeNLPvSKFsGfrmvasyu4-8L13hO/view?usp=drive_link',
      github: 'https://github.com/sambrothers0',
      linkedin: 'https://www.linkedin.com/in/samjbrothers/'
    }
  },
  methods: {
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
        email.style.color = 'var(--on-accent)'
        email.style.fontSize = '22px'
        email.style.fontFamily = 'Outfit, sans-serif'
        email.style.fontWeight = '500'

        var phone = document.createElement('p')
        phone.textContent = this.phone
        phone.style.color = 'var(--on-accent)'
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

      // built outside the template, so scoped styles don't reach it — size it inline
      var img = document.createElement('img')
      img.src = '/img/mail_icon_light.png'
      img.style.height = '70px'
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
      window.open(this.resumeUrl, '_blank')
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
  mounted () {
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
  background-color: var(--bg);
  color: var(--text);
  transition: background-color var(--dur-slow) ease, color var(--dur-slow) ease;
}

.title{
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 20vh;
  /* nudged down without pushing the link pills, which are centered against it */
  position: relative;
  top: 6vh;
  margin-top: 0vh;
  margin-left: 40%;
}

.title-heading{
  font-size: clamp(3rem, 8vw, 7rem);
  font-weight: 200;
  line-height: 1;
  letter-spacing: -0.02em;
  margin: 0;
}

.title-rule{
  width: 30vw;
  margin-left: 10vw;
  margin-top: 0.25em;
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

/* one shared look for all four link pills */
.email-button,
.resume-button,
.github-button,
.linkedin-button{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100px;
  padding: 0;
  color: var(--on-accent);
  background-color: var(--accent-fill);
  border: 2px solid transparent;
  border-radius: var(--radius-pill);
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  transition: width var(--dur-slow) var(--ease-out),
              box-shadow var(--dur-med) var(--ease-out),
              background-color var(--dur-med) var(--ease-out),
              border-color var(--dur-med) var(--ease-out);
}

.email-button:hover,
.resume-button:hover,
.github-button:hover,
.linkedin-button:hover{
  background-color: var(--accent-fill-hover);
  box-shadow: var(--shadow-lg);
  border-color: var(--accent-strong);
}

/* the letter pairs that expand into full words on hover */
.curriculum-text,
.vitae-text,
.git-text,
.hub-text,
.linked-text,
.in-text{
  margin: 0;
  font-size: clamp(1.5rem, 2.6vw, 2.35rem);
  font-weight: 500;
  letter-spacing: -0.01em;
  white-space: nowrap;
  overflow: hidden;
}

.email-container{
  display: flex;
  justify-content: right;
  height: 100px;
  width: 300px;
}

/* the email pill stacks its address over its phone number, so it lays out vertically */
.email-button{
  flex-direction: column;
}

.email-button:hover{
  width: 100%;
}

.email-img{
  height: 70px;
  transition: opacity var(--dur-med) ease;
}

.resume-container{
  display: flex;
  justify-content: right;
  height: 100px;
  width: 385px;
}

.resume-button:hover{
  width: 100%
}

.curriculum-text{
  text-align: left;
  width: 27%;
  transition: width var(--dur-slow) var(--ease-out);
}

.vitae-text{
  text-align: left;
  width: 35%;
  transition: width var(--dur-slow) var(--ease-out),
              margin-left var(--dur-slow) var(--ease-out);
}

.resume-img{
  width: 0px;
  margin-right: 10px;
  transition: width var(--dur-slow) var(--ease-out);
}

.resume-button:hover .curriculum-text{
  width: 52%;
}

.resume-button:hover .vitae-text{
  width: 22%;
  margin-left: -14px;
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

.github-button:hover{
  width: 100%
}

.git-text{
  text-align: left;
  width: 30%;
  transition: width var(--dur-slow) var(--ease-out);
}

.hub-text{
  text-align: left;
  width: 35%;
  transition: width var(--dur-slow) var(--ease-out);
}

.github-img{
  width: 0px;
  margin-right: 10px;
  transition: width var(--dur-slow) var(--ease-out);
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

.linkedin-button:hover{
  width: 100%
}

.linked-text{
  text-align: left;
  width: 25%;
  transition: width var(--dur-slow) var(--ease-out);
}

.in-text{
  text-align: left;
  width: 22%;
  transition: width var(--dur-slow) var(--ease-out);
}

.linkedin-img{
  width: 0px;
  margin-right: 10px;
  transition: width var(--dur-slow) var(--ease-out);
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
