<template>
    <div class="rt" @click="handleClick">
        <div class="rt-left">
            <h1 style="font-size: 40px; margin-top: 3vh"> {{ title }} </h1>
            <div class="line-two-wrapper">
                <img class="external-link" @click="handleNavigate"
                style="height: 50%;
                cursor: pointer;
                margin-right: 1vw">
                <h3> {{ date }} </h3>
            </div>
            <p class='rt-subtext' style="font-size: 3vh; line-height: 4.5vh; font-family: 'Outfit', sans-serif"> {{ shortText }} </p>
        </div>
        <div class="rt-right">
            <img class="rt-image" :src=imageOneSrc
            style="width: 25vw;
            border-radius: 15px;
            margin-top: 2vh;
            transition: height 0.2s ease, margin 0.2s ease">
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RT',
  data () {
    return {
      title: 'Ray Tracer',
      date: 'Nov 2024',
      shortText: 'This is a program for rendering basic 3D shapes using ray tracing in C++ ...',
      longText: 'This is a program for rendering basic 3D shapes using ray tracing in C++.' +
      'The program reads in a text file continaing formatted information about the color and ' +
      'position of the shapes and light source, and creates a linked list using C++ pointers. ' +
      'It then uses ray tracing to render each object in space and perform realistic lighting ' +
      'calculations based on the position of the light source.',
      imageOneSrc: 'img/RT/rt.jpg',
      url: 'https://github.com/sambrothers0/ray-tracer',
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
      document.querySelector('.rt-subtext').textContent = this.longText
      this.expanded = true
    },
    condense () {
      document.querySelector('.rt-subtext').textContent = this.shortText
      this.expanded = false
    },
    mobileOn () {
      document.querySelector('.rt-image').style.display  = 'none'
      document.querySelector('.rt-right').style.width = '0%'
    },
    mobileOff () {
      document.querySelector('.rt-image').style.display = 'flex'
      document.querySelector('.rt-right').style.width = '45%'
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
.rt{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 35px;
  transition: transform 0.2s, box-shadow 0.2s, height 0.2s;
  margin-bottom: 50px;
  background-color: #00000033;
}
.rt:hover{
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

.rt-left{
  height: 100%;
  width: auto;
  flex-direction: column;
  text-align: left;
  margin-right: 10px;
  margin-left: 30px;
}

.rt-right{
  align-items: center;
  height: 100%;
  width: 45%;
  margin-right: 10px;
  margin-bottom: 1vh;
}
</style>
