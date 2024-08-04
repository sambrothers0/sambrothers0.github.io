<template>
    <router-view/>
</template>

<style lang="scss">

body, html{
  margin: 0;
  padding: 0;
  background-color: #1b1b1b;
  color: #bebebe
}

#app {
  font-family: 'Niramit', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  animation: fadeInAnimation ease 2s;
  animation-fill-mode: forwards;
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
