<template>
  <UpperToolbar/>
  <div v-if="loading" class="indicator" id="master">
    <div class="spinner"></div>
  </div>
  <div v-else class="creations" id="master">
    <h1 class="title"> Creations </h1>
    <div class="frame-wrapper">
      <span class="rule" aria-hidden="true"></span>
    </div>
    <div class="panels-wrapper">
      <!-- Hand-written panels for projects the GH scraper can't see (non-sambrothers0 repos).
           They hold slots 0 and 1 of the alternation, so the scraped list picks it up at 2. -->
      <Hearth :flipped="false"/>
      <Thrillsburg :flipped="true"/>
      <CreationPanel v-for="(title, index) in titles" :key="index"
        :title="title"
        :date="dates[index]"
        :short-text="shortInfos[index]"
        :long-text="longInfos[index]"
        :url="urls[index]"
        :image="thumbnails[index]"
        :tint="tintFor(index)"
        :flipped="index % 2 === 1"/>
    </div>
  </div>
</template>

<script>
import UpperToolbar from '@/components/UpperToolbar.vue'
import CreationPanel from '@/panels/CreationPanel.vue'
import Thrillsburg from '@/panels/Thrillsburg.vue'
import Hearth from '@/panels/Hearth.vue'

export default {
  name: 'CreationsView',
  data() {
    return {
      titles: [],
      shortInfos: [],
      longInfos: [],
      dates: [],
      urls: [],
      thumbnails: [],
      loading: true,
      error: null
    }
  },
  components: {
    UpperToolbar,
    CreationPanel,
    Thrillsburg,
    Hearth
  },
  methods: {
    /* Cards used to get random RGB backgrounds, which meant the page looked
       different on every load and belonged to no palette. They now walk a
       fixed rotation of brand tints. Evergreen and ember are spoken for by
       Thrillsburg and Hearth above, so the scraped panels cycle the other three. */
    tintFor (index) {
      return ['indigo', 'steel', 'plum'][index % 3]
    },
    async fetchData() {

      try {
        const response = await fetch('/data/gh-data.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        this.titles = data.titles;
        this.shortInfos = data.shortInfos;
        this.longInfos = data.longInfos;
        this.dates = data.dates;
        this.urls = data.urls;
        this.thumbnails = data.thumbnails;
        this.loading = false;
        this.error = null;

        console.log('Fetched data: ', { titles: this.titles, shortInfos: this.shortInfos, longInfos: this.longInfos, dates: this.dates, urls: this.urls, thumbnails: this.thumbnails });
      } catch (err) {
        this.error = err.message || 'Failed to fetch data';
        this.loading = false;
      }
    }
  },
  mounted () {
    this.fetchData();
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

.indicator {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
}

.loading-text {
  font-size: 2rem;
  margin-top: 20px;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 3px solid var(--border);
  border-radius: 50%;
  border-top-color: var(--accent);
  animation: spin 0.9s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.creations{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: var(--bg);
  color: var(--text);
  transition: background-color var(--dur-slow) ease, color var(--dur-slow) ease;
}

.title{
  margin: 20vh 0 0;
  font-size: clamp(3rem, 9vw, 8rem);
  font-weight: 200;
  line-height: 1;
  letter-spacing: -0.02em;
}

.frame-wrapper{
  display: flex;
  justify-content: center;
  height: 3vh;
  width: 70vw;
  margin-bottom: 8vh;
}
.frame-wrapper .rule{
  width: 100%;
  margin-top: 0.5em;
}

/* Card chrome lives in CreationPanel.vue — this view only lays the cards out. */
.panels-wrapper{
  width: 65vw;
  margin-bottom: 80px;
}
</style>
