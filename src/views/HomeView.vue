<template>
  <header class="text-center my-10 mx-2 lg:my-16 ">
      <h1 class="text-2xl lg:text-4xl">Welcome to my cryptocurrencie dashboard !</h1> <br>
      <p class="text-lg lg:text-2xl">Made with Vue.js 3, TailwindCSS and Coingecko API.</p>
  </header>
  <Preloader v-if="!preloaderOff" @documentReady="documentReady" />
  <div :class="{ displaying : !docReady }">
    <TokenList />
  </div>
</template>

<style scoped>
  .displaying{
    display: none;
  }
</style>

<script>
import TokenList from '../components/TokenList.vue'
import Preloader from '../components/Preloader.vue'

export default {
  name: 'home-view',
  components: {
    TokenList,
    Preloader
  },
  data(){
    return {
      docReady: false,
      preloaderOff: false
    }
  },
  methods: {
    documentReady(){
      this.docReady = true
      setTimeout(() => {
        this.preloaderOff = true
      }, 1000)
    }
  }
}
</script>
