<template>
  <UpperToolbar/>
  <div class="projects" id="master">
    <h1 class="title"> Projects </h1>
    <div class="frame-wrapper">
      <span class="rule" aria-hidden="true"></span>
    </div>
    <div class="panels-wrapper">
      <ProjectPanel v-for="(project, index) in projects"
        :project="project"
        :tint="tintFor(index)"
        :flipped="index % 2 === 1"
        :priority="index === 0"
        :key="project.slug"/>
    </div>
  </div>
</template>

<script>
import UpperToolbar from '@/components/UpperToolbar.vue'
import ProjectPanel from '@/components/ProjectPanel.vue'
import { projects } from '@/content/projects'

export default {
  name: 'ProjectsView',
  data() {
    return {
      projects
    }
  },
  components: {
    UpperToolbar,
    ProjectPanel
  },
  methods: {
    // rotating color tint for each project panel based on index
    tintFor (index) {
      return ['indigo', 'azure', 'steel'][index % 3]
    }
  }
}

</script>

<style lang="scss" scoped>

.projects{
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
  margin-top: 4vh;
}
.frame-wrapper .rule{
  width: 100%;
  margin-top: 0.5em;
}

/* Card chrome lives in ProjectPanel.vue — this view only lays the cards out. */
.panels-wrapper{
  width: 65vw;
  margin-bottom: 80px;
}
</style>
