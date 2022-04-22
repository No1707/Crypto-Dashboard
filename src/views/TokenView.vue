<template>
  <div class="w-full pb-5 px-5 flex flex-col justify-between bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-white" v-if="data">
    <div class="mx-4  my-8 flex">
      <!-- Go back button -->
      <button @click="$router.go(-1)" class="self-start text-xl">&lt; Back</button>

      <!-- Logo -->
      <img class="ml-12 mr-6" :src="data.image.small" alt="Token logo">
      
      <!-- Name -->
      <h1 class="font-bold text-5xl uppercase"> {{ token }} </h1>
    </div>

    <div class="flex justify-between px-14">
      <div class="bg-white dark:bg-slate-800 p-4 rounded shadow-lg w-full m-6">
        <div class="flex flex-col min-w-full">
          <h2 class="text-slate-400 uppercase font-bold text-sm ">price</h2>
          <p class="font-bold text-xl">${{ data.market_data.current_price.usd }}</p>
        </div>
      </div>
      <div class="bg-white dark:bg-slate-800 p-4 rounded shadow-lg w-full m-6">
        <div class="flex flex-col">
          <h2 class="text-slate-400 uppercase font-bold text-sm ">market cap.</h2>
          <p class="font-bold text-xl">${{ data.market_data.market_cap.usd.toLocaleString() }}</p>
        </div>
      </div>
      <div class="bg-white dark:bg-slate-800 p-4 rounded shadow-lg w-full m-6">
        <div class="flex flex-col">
          <h2 class="text-slate-400 uppercase font-bold text-sm ">circulating supply</h2>
          <p class="font-bold text-xl">{{ data.market_data.circulating_supply.toLocaleString() }} tokens</p>
        </div>
      </div>
      <div class="bg-white dark:bg-slate-800 p-4 rounded shadow-lg w-full m-6">
        <div class="flex flex-col" v-if="data.market_data.fully_diluted_valuation.usd !== undefined">
          <h2 class="text-slate-400 uppercase font-bold text-sm ">fully diluted valuation</h2>
          <p class="font-bold text-xl">${{ data.market_data.fully_diluted_valuation.usd.toLocaleString() }}</p>
        </div>
        <div class="flex flex-col" v-else>
          <h2 class="text-slate-400 uppercase font-bold text-sm ">total volume</h2>
          <p class="font-bold text-xl">${{ data.market_data.total_volume.usd.toLocaleString() }}</p>
        </div>
      </div>
    </div>
  </div>
  <div class="px-8 pt-4 flex flex-col justify-center items-center">
    <h3 class="font-bold text-2xl underlined"><span class="capitalize">{{token}}</span> description :</h3>
    <p class="description">Desc ?</p>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'

  export default {
    name: 'token-view',
    data(){
      return {
        token: '',
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
      }
    }
  }
</script>