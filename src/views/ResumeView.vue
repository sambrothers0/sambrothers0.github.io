<template>
  <div class="resume-wrapper">
    <!-- Drive's /preview endpoint is the embeddable form of the /view share link -->
    <iframe
      src="https://drive.google.com/file/d/1szUZxqeNLPvSKFsGfrmvasyu4-8L13hO/preview"
      class="i-frame"
      title="Sam Brothers — Resume"
      allow="autoplay"></iframe>
  </div>
</template>

<script>
export default {
    name: 'ResumeView'
}
</script>

<style scoped lang="scss">
.resume-wrapper {
    background-color: var(--bg);
}

.i-frame {
    display: block;
    width: 100%;
    height: 100vh;
    border: none;
    background-color: transparent;
}
</style>
