<template>
    <div class="bst" @click="handleClick">
        <div class="bst-left">
            <h1 style="font-size: 40px; margin-top: 3vh"> {{ title }} </h1>
            <div class="line-two-wrapper">
                <img class="external-link" @click="handleNavigate"
                style="height: 50%;
                cursor: pointer;
                margin-right: 1vw">
                <h3> {{ date }} </h3>
            </div>
            <p class='bst-subtext' style="font-size: 3vh; line-height: 4.5vh; font-family: 'Outfit', sans-serif"> {{ shortText }} </p>
        </div>
        <div class="bst-right">
            <img class="bst-image" :src=imageOneSrc
            style="height: 27vh;
            border-radius: 15px;
            margin-top: 2vh;
            transition: height 0.2s ease, margin 0.2s ease">
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BST',
  data () {
    return {
      title: 'BST',
      date: 'Nov 2022',
      shortText: 'This is a balanced binary search tree I coded from scratch using Python ... ',
      longText: 'This is a balanced binary search tree I coded from scratch using Python. ' +
      'Using this structure, numbers can be sorted and stored in mathematically optimal time, ' +
      'since the tree automatically detects lopsidedness and rebalances itself to maintain the quickest performance. ' +
      'During the implementation, I learned about heaps and trees as a means of organizing data, ' +
      "and discovered the mechanism behind one of computer science's most important inventions. ",
      imageOneSrc: 'img/BST/BST.png',
      url: 'https://github.com/sambrothers0/Binary-Search-Tree',
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
      document.querySelector('.bst-subtext').textContent = this.longText
      this.expanded = true
    },
    condense () {
      document.querySelector('.bst-subtext').textContent = this.shortText
      this.expanded = false
    },
    mobileOn () {
      document.querySelector('.bst-image').style.display  = 'none'
      document.querySelector('.bst-right').style.width = '0%'
    },
    mobileOff () {
      document.querySelector('.bst-image').style.display = 'flex'
      document.querySelector('.bst-right').style.width = '45%'
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
.bst{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 35px;
  transition: transform 0.2s, box-shadow 0.2s, height 0.2s;
  margin-bottom: 50px;
  background-color: #2376e433;
}
.bst:hover{
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

.bst-left{
  height: 100%;
  width: auto;
  flex-direction: column;
  text-align: left;
  margin-right: 10px;
  margin-left: 30px;
}

.bst-right{
  align-items: center;
  height: 100%;
  width: 45%;
  margin-right: 10px;
  margin-bottom: 1vh;
}
</style>
