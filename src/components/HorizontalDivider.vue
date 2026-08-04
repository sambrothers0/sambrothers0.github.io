<template>
  <div class="horizontal-divider">
    <div
    :class="{ 'scrolled-over': isScrolledOver }"
    class="divider-body"
    ref="dividerBody">
    </div>
  </div>
</template>

<script>

export default {
  name: 'HorizontalDivider',
  data () {
    return {
      isScrolledOver: false
    }
  },
  methods: {
    handleScroll () {
      const div = this.$refs.dividerBody
      const rect = div.getBoundingClientRect()
      if (rect.top < (window.innerHeight - 150)) {
        this.isScrolledOver = true
      }
    }
  },
  mounted () {
    this.handleScroll()
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.handleScroll)
  },
  beforeUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleScroll)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.horizontal-divider{
  width: 100%;
  display: flex;
  justify-content: center;
}
.divider-body{
  width: 0%;
  height: 3px;
  border-radius: var(--radius-pill);
  transition: width 1s var(--ease-out);
  /* fades out at both ends so the rule doesn't stop abruptly */
  background: linear-gradient(
    to right,
    transparent 0%,
    var(--accent) 15%,
    var(--accent) 85%,
    transparent 100%
  );
}
.divider-body.scrolled-over{
  width: 85%;
}
</style>
