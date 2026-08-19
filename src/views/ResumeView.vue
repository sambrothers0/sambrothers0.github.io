<template>
  <div class="resume-wrapper">
    <!-- Drive's /preview endpoint is the embeddable form of the /view share link -->
    <iframe
      src="https://drive.google.com/file/d/12IsJh-QRL67jswwiUNYH9NP-zZNbUcLD/preview"
      class="i-frame"
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
