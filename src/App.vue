<template>
    <router-view/>
</template>

<script>
export default {
  name: 'App',
  computed: {
    isDarkMode () {
      return this.$store.getters.isDarkModeOn
    }
  },
  watch: {
    // The whole palette lives in main.css; the store only decides which
    // theme block applies. Components never set colors imperatively.
    isDarkMode: {
      immediate: true,
      handler (dark) {
        document.documentElement.dataset.theme = dark ? 'dark' : 'light'
      }
    }
  }
}
</script>

<style lang="scss">

body, html{
  margin: 0;
  padding: 0;
  background-color: var(--bg);
  color: var(--text);
  transition: background-color var(--dur-slow) ease, color var(--dur-slow) ease;
}

#app {
  font-family: 'Niramit', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  animation: fadeInAnimation ease 2s;
  animation-fill-mode: forwards;
}

/* tighter tracking on display type keeps large headings from looking loose */
h1, h2, h3 {
  letter-spacing: -0.015em;
  text-wrap: balance;
}

p {
  text-wrap: pretty;
}

@keyframes fadeInAnimation {
  0% {
      opacity: 0;
  }
  100% {
      opacity: 1;
  }
}

</style>
