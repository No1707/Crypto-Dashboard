<template>
  <!-- <Preloader v-if="!preloaderOff" @documentReady="documentReady" /> -->
  <!-- <div :class="{ displaying : !docReady }"> -->
    <DashboardHeader />
    <TokenList />
  <!-- </div> -->
</template>

<style scoped>
  .displaying{
    display: none;
  }
</style>

<script>
import DashboardHeader from '../components/DashboardHeader.vue'
import TokenList from '../components/TokenList.vue'
// import Preloader from './components/Preloader.vue'

export default {
  name: 'home-view',
  components: {
    DashboardHeader,
    TokenList,
    // Preloader
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
      }, 1500)
    }
  }
}
</script>
