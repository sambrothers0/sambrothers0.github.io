<template>
  <UpperToolbar/>
  <div v-if="loading" class="indicator" id="master">
    <div class="spinner"></div>
  </div>
  <div v-else class="creations" id="master">
    <h1 class="title"> Creations </h1>
    <div class="frame-wrapper">
      <img class="frame" src="img/gold_frame.png">
    </div>
    <div class="panels-wrapper">
      <Thrillsburg/>
      <div v-for="(title, index) in titles" :key="index" @click="toggleSize(index)" class="panel">
        <div v-if="index % 2 === 0">
          <div class="template-a">
            <div class="template-a-left">
              <h1 style="font-size: 40px; margin-top: 3vh"> {{ this.titles[index] }} </h1>
              <div class="a-line-two-wrapper">
                <img class="external-link" @click="handleNavigate(index)"
                  :src="isDarkMode ? 'img/external_link_icon_light.png' : 'img/external_link_icon_dark.png'"
                  style="height: 50%;
                  cursor: pointer;
                  margin-right: 1vw">
                <h3> {{ this.dates[index] }} </h3>
              </div>
              <p class='template-a-info' 
                style="font-size: 3vh; line-height: 4.5vh; font-family: 'Outfit', sans-serif"> 
                {{ this.shortInfos[index] }} 
              </p>
            </div>
            <div class="template-a-right">
                <img class='template-a-image'
                style="height: 27vh;
                border-radius: 15px;
                margin-top: 1vh;
                margin-left: 1vw;
                transition: all 0.2s ease">
            </div>
          </div>
        </div>
        <div v-if="index % 2 === 1">
          <div class="template-b">
            <div class="template-b-left">
              <img class='template-b-image'
                style="height: 27vh;
                border-radius: 15px;
                margin-top: 3vh;
                transition: all 0.2s ease">
            </div>
            <div class="template-b-right">
              <h1 style="font-size: 40px; margin-top: 3vh"> {{ this.titles[index] }} </h1>
              <div class="b-line-two-wrapper">
                <img class="external-link" @click="handleNavigate(index)"
                :src="isDarkMode ? 'img/external_link_icon_light.png' : 'img/external_link_icon_dark.png'"
                style="height: 50%;
                cursor: pointer;
                margin-right: 1vw">
                <h3> {{ this.dates[index] }} </h3>
              </div>
              <p class='template-b-subtext' 
                style="font-size: 3vh; line-height: 4.5vh; font-family: 'Outfit', sans-serif"> 
                {{ this.shortInfos[index] }} 
              </p>
            </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UpperToolbar from '@/components/UpperToolbar.vue'
import Thrillsburg from '@/panels/Thrillsburg.vue'

export default {
  name: 'CreationsView',
  data() {
    return {
      username: 'sambrothers0',
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
    Thrillsburg
  },
  methods: {
    checkAppearance () {
      if (this.loading) {
        return
      }
      this.isDarkMode ? this.darkMode() : this.lightMode()
    },
    lightMode () {
      document.getElementById('master').style.backgroundColor = 'var(--light-color)'
      document.getElementById('master').style.color = 'var(--dark-color)'
      const links = document.querySelectorAll('.external-link')
      for (let i = 0; i < links.length; i++) {
        links[i].src = 'img/external_link_icon_dark.png'
      }
    },
    darkMode () {
      document.getElementById('master').style.backgroundColor = 'var(--dark-color)'
      document.getElementById('master').style.color = 'var(--light-color)'
      const links = document.querySelectorAll('.external-link')
      for (let i = 0; i < links.length; i++) {
        links[i].src = 'img/external_link_icon_light.png'
      }
    },
    toggleSize(index) {

    },
    async fetchData(repo) {
      try {
        const response = await fetch(`https://api.github.com/repos/${this.username}/${repo.name}/contents/pw-info.txt`);
        
        if (!response.ok) {
          return null;
        }
        
        const data = await response.json();
        // GitHub returns txt content as base64 encoded
        const content = atob(data.content);
        const lines = content.split('\n');

        this.titles.push(lines[0].trim());

        let cutoff = 80;
        let info = lines[1].trim();
        if (info.length > cutoff) {
          let shortInfo = info.substring(0, cutoff) + '...';
          this.shortInfos.push(shortInfo);
          this.longInfos.push(info);
        } else {
          this.shortInfos.push(info);
          this.longInfos.push(info);
        }

        this.dates.push(lines[2].trim());

      } catch (error) {
        console.error(`Failed to fetch README for ${repo.name}:`, error);
        
      }
    },
    async fetchThumbnail(repo) {
      try {
        const response = await fetch(`https://api.github.com/repos/${this.username}/${repo.name}/contents/thumbnail.png`);
        
        if (!response.ok) {
          return null;
        }
        
        const data = await response.json();
        // GitHub returns image content as base64 encoded
        // For direct use in img src attribute
        this.thumbnails.push(`data:image/png;base64,${data.content.replace(/\n/g, '')}`);
      } catch (error) {
        console.error(`Failed to fetch thumbnail for ${repo.name}:`, error);
      }
    },
    async fetchGithubRepos() {
      this.loading = true;
      try {
        const response = await fetch(`https://api.github.com/users/${this.username}/repos`);
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const repos = await response.json();
        
        for (let i = 0; i < repos.length; i++) {
          await this.fetchData(repos[i]);
          await this.fetchThumbnail(repos[i]);
          this.urls.push(repos[i].html_url);
        }

        console.log(this.titles);
        console.log(this.shortInfos);
        console.log(this.longInfos);
        console.log(this.dates);
        console.log(this.urls);
        console.log(this.thumbnails);

      } catch (error) {
        this.error = error.message;
        console.error('Failed to fetch repos:', error);
      } finally {
        this.loading = false;
        console.log('Fetched all repos');
      }
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
    this.checkAppearance();
    this.fetchGithubRepos();
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
  width: 50px;
  height: 50px;
  border: 5px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: var(--indigo-color);
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.creations{
  line-height: 5vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  transition: background-color 0.5s ease, color 0.5s ease;
}

.title{
  margin-top: 20vh;
  font-size: 9vw;
  font-weight: 100;
}

.frame-wrapper{
  height: 3vh;
  width: 70vw;
}
.frame{
  width: 100%;
}

.panels-wrapper{
  width: 65vw;
  margin-bottom: 80px;
}

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

.a-line-two-wrapper{
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

.template-b{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 35px;
  transition: transform 0.2s, box-shadow 0.2s, height 0.2s;
  margin-bottom: 50px;
  background-color: #ebb80e33;
}
.template-b:hover{
  transform: scale(1.03);
  box-shadow: 0px 0px 20px 8px rgba(0, 0, 0, 0.1);
}

.b-line-two-wrapper{
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 5vh;
  width: 100%;
  margin-top: -2vh;
  margin-bottom: -2vh
}

.template-b-right{
  height: 100%;
  width: 60%;
  flex-direction: column;
  text-align: right;
  margin-right: 30px;
}

.template-b-left{
  height: 100%;
  width: 40%;
  margin-left: 20px;
}
</style>
