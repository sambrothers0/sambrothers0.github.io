<template>
  <CoverBanner/>
  <SideBar/>
  <div class="home">
    <UpperSection/>
    <MiddleSection/>
    <LowerSection/>
  </div>
</template>

<script>
import CoverBanner from '@/components/CoverBanner.vue' // @ is an alias to /src
import SideBar from '@/components/SideBar.vue'
import UpperSection from '@/components/UpperSection.vue'
import MiddleSection from '@/components/MiddleSection.vue'
import LowerSection from '@/components/LowerSection.vue'

export default {
  name: 'HomeView',
  components: {
    CoverBanner,
    SideBar,
    UpperSection,
    MiddleSection,
    LowerSection
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      window.scrollTo(0, 0)
    })
  }
}
</script>
