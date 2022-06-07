<template>
  <div v-if="data">

    <div class="w-full pb-5 px-5 flex flex-col justify-between bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-white">

      <div class="mx-4  my-8 flex items-center">
        <!-- Go back button -->
        <button @click="$router.back()" class="self-start text-base md:text-xl">&lt; Back</button>

        <!-- Logo -->
        <img class="object-cover ml-6 mr-4 md:ml-12 md:mr-6" :src="data.image.small" alt="Token logo">
        
        <!-- Name -->
        <h1 class="font-bold text-3xl md:text-5xl uppercase"> {{ token }} </h1>
      </div>

      <!-- Datas -->
      <div class="flex flex-wrap justify-center xl:flex-nowrap xl:justify-between px-8 md:px-14">

        <!-- current price -->
        <div class="bg-white dark:bg-slate-800 p-4 rounded shadow-lg w-full text-center md:text-left md:w-2/5 xl:w-full  m-6">
          <div class="flex flex-col min-w-full">
            <h2 class="text-slate-400 uppercase font-bold text-xs md:text-sm ">price</h2>
            <p class="font-bold text-base md:text-xl">{{currencySign}} {{ data.market_data.current_price[chosenCurrency].toLocaleString() }}</p>
          </div>
        </div>

        <!-- market_cap -->
        <div class="bg-white dark:bg-slate-800 p-4 rounded shadow-lg w-full text-center md:text-left md:w-2/5 xl:w-full  m-6">
          <div class="flex flex-col">
            <h2 class="text-slate-400 uppercase font-bold text-xs md:text-sm ">market cap.</h2>
            <p class="font-bold text-base md:text-xl">{{currencySign}} {{ data.market_data.market_cap[chosenCurrency].toLocaleString() }}</p>
          </div>
        </div>
        
        <!-- circulating supply -->
        <div class="bg-white dark:bg-slate-800 p-4 rounded shadow-lg w-full text-center md:text-left md:w-2/5 xl:w-full  m-6">
          <div class="flex flex-col">
            <h2 class="text-slate-400 uppercase font-bold text-xs md:text-sm ">circulating supply</h2>
            <p class="font-bold text-base md:text-xl">{{ data.market_data.circulating_supply.toLocaleString() }} tokens</p>
          </div>
        </div>

        <div class="bg-white dark:bg-slate-800 p-4 rounded shadow-lg w-full text-center md:text-left md:w-2/5 xl:w-full  m-6">
          <!-- diluted valuation -->
          <div class="flex flex-col" v-if="data.market_data.fully_diluted_valuation[chosenCurrency] !== undefined">
            <h2 class="text-slate-400 uppercase font-bold text-xs md:text-sm ">fully diluted valuation</h2>
            <p class="font-bold text-base md:text-xl">{{currencySign}} {{ data.market_data.fully_diluted_valuation[chosenCurrency].toLocaleString() }}</p>
          </div>
          <!-- total volume -->
          <div class="flex flex-col" v-else>
            <h2 class="text-slate-400 uppercase font-bold text-xs md:text-sm ">total volume</h2>
            <p class="font-bold text-base md:text-xl">{{currencySign}}   {{ data.market_data.total_volume[chosenCurrency].toLocaleString() }}</p>
          </div>
        </div>
      </div>

    </div>

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
import Chart from '../components/Chart.vue'

  export default {
    name: 'token-view',
    components: {
      Chart
    },
    data(){
      return {
        token: '',
        chosenCurrency: this.$store.state.currency.toLowerCase(),
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
        // console.log(data)
      }
    },
    computed: {
      currencySign() {
        const currency = this.chosenCurrency
        if(currency === 'usd') return '$'
        if(currency === 'eur') return '€'
        if(currency === 'jpy') return '¥'
        if(currency === 'gbp') return '£'
        if(currency === 'chf') return 'CHF'
        if(currency === 'cad') return 'CA$'
        if(currency === 'nzd') return 'NZ$'
        return '$'
      }
    },
    watch: {
      '$store.state.currency'(cur) {
        this.chosenCurrency = cur.toLowerCase()
      }
    }
  }
</script>

<style>
  .tokenDescription a{
    font-weight: bold;
    text-decoration: underline;
  }
</style>