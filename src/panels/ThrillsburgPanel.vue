<template>
    <div class="thrillsburg-panel" @click="handleClick">
        <div class="left">
            <h1 style="font-size: 40px; margin-top: 3vh"> {{ title }} </h1>
            <div class="line-two-wrapper">
                <img class="external-link" @click="handleNavigate"
                style="height: 50%;
                cursor: pointer;
                margin-right: 1vw">
                <h3> {{ date }} </h3>
            </div>
            <p class='thrillsburg-panel-subtext' style="font-size: 3vh; line-height: 4.5vh; font-family: 'Outfit', sans-serif"> {{ shortText }} </p>
        </div>
        <div class="right">
            <img :src=imageOneSrc style="width: 100%; border-radius: 15px; margin-top: 15px; margin-right: -20px">
            <img class="thrillsburg-panel-bottom-image" :src=imageTwoSrc
            style="width: 100%;
            border-radius: 15px;
            margin-top: 10px;
            margin-left: 10px;
            display: none;">
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ThrillsburgPanel',
  data () {
    return {
      title: 'Thrillsburg',
      date: 'In progress',
      shortText: 'Thrillsburg allows Williamsburg visitors and locals to discover events that are relevant to them. ',
      longText: 'Thrillsburg allows Williamsburg visitors and locals to discover events that are relevant to them. ' +
      'Using Vue.js, with the Quasar wrapper for versatile user compatability, I implemented a functional web frontend ' +
      'which dynamically pulls information from our database of recent events using a custom API. Working with our web designer, ' +
      'I delivered a solution which positions Thrillsburg as a modern, presentable, and user-friendly web app. ',
      imageOneSrc: 'img/thrillsburg_panel/logo.png',
      imageTwoSrc: 'img/thrillsburg_panel/events_page.jpg',
      url: '',
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
      document.querySelector('.thrillsburg-panel-subtext').textContent = this.longText
      document.querySelector('.thrillsburg-panel-bottom-image').style.display = 'flex'
      this.expanded = true
    },
    condense () {
      document.querySelector('.thrillsburg-panel-subtext').textContent = this.shortText
      document.querySelector('.thrillsburg-panel-bottom-image').style.display = 'none'
      this.expanded = false
    }
  }
})
</script>

<style scoped lang="scss">
.thrillsburg-panel{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-radius: 35px;
    transition: transform 0.2s, box-shadow 0.2s, height 0.2s;
    margin-bottom: 50px;
    background-color: #10584033;
}
.thrillsburg-panel:hover{
    transform: scale(1.03);
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

.left{
    height: 100%;
    width: 45%;
    flex-direction: column;
    text-align: left;
    margin-left: 30px
}

.right{
    height: 100%;
    width: 45%;
    margin-right: 30px
}
</style>
