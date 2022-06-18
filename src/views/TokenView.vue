<template>
  <div v-if="data">

    <Details :tokenData="data" />

    <!-- Chart -->
    <Chart :token="tokenSymbol" />

    <!-- Desc -->
    <div class="p-6 flex flex-col justify-center items-center">

      <div class="max-w-5xl px-4 sm:px-12 tokenDescription" v-if="data.description.en">
        <h3 class="my-4 font-bold text-2xl leading-loose underlined"><span class="capitalize">{{token}}</span> description :</h3>
        <p v-html="data.description.en"></p>
      </div>


    </div>
      

  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import Details from '../components/Details.vue'
import Chart from '../components/Chart.vue'

  export default {
    name: 'token-view',
    components: {
      Chart,
      Details
    },
    data(){
      return {
        token: '',
        tokenSymbol: '',
        data: null
      }
    },
    beforeMount(){
      const route = useRoute()
      this.token = route.params.id
      this.fetchingToken()
    },
    methods: {
      async fetchingToken(){
        const res = await fetch(
          'https://api.coingecko.com/api/v3/coins/'+this.token+'?localization=true&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false'
        )
        const data = await res.json()
        this.data = data
        this.tokenSymbol = data.symbol.toUpperCase()
      }
    }
  }
</script>

<style>
  /** links in desc */
  .tokenDescription a {
    font-weight: bold;
    text-decoration: underline;
  }
</style>