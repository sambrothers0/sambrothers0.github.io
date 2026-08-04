<!--
  Hardcoded panel. Thrillsburg isn't a sambrothers0 repo, so scripts/gh-scraper.cjs
  will never pick it up and the nightly scheduler workflow will never overwrite it.
  Same approach as Hearth.vue.

  This file is only the copy and the logo; the card itself is CreationPanel, so
  Thrillsburg looks identical to every other project on the page.
-->
<template>
  <CreationPanel
    title="Thrillsburg"
    date="In progress"
    tint="evergreen"
    url="http://thrillsburg.com"
    image="/img/thrillsburg_panel/logo.png"
    :flipped="flipped"
    :short-text="shortText"
    :long-text="longText"/>
</template>

<script>
import { defineComponent } from 'vue'
import CreationPanel from '@/panels/CreationPanel.vue'

export default defineComponent({
  name: 'Thrillsburg',
  components: { CreationPanel },
  props: {
    flipped: { type: Boolean, default: false }
  },
  data () {
    return {
      shortText: 'Thrillsburg allows Williamsburg visitors and locals to discover events that are relevant to them ... ',
      longText: 'Thrillsburg allows Williamsburg visitors and locals to discover events that are relevant to them. ' +
      'Using Vue.js, with the Quasar wrapper for versatile user compatability, I implemented a functional web frontend ' +
      'which dynamically pulls information from our database of recent events using a custom API. Working with our web designer, ' +
      'I delivered a solution which positions Thrillsburg as a modern, presentable, and user-friendly web app. '
    }
  }
})
</script>
