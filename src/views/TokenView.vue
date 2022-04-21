<template>
  <div class="w-full pb-5 px-5 flex flex-col justify-between bg-slate-200" v-if="data">
    <div class="mx-4  my-8 flex">
      <!-- Go back button -->
      <button @click="$router.go(-1)" class="self-start text-xl">&lt; Back</button>

      <!-- Logo -->
      <img class="mx-10" :src="data.image.small" alt="Token logo">
      
      <!-- Name -->
      <h1 class="font-bold text-5xl uppercase"> {{ token }} </h1>
    </div>

    <div class="flex justify-between px-14">
      <div class="bg-white p-4 rounded shadow-lg w-full m-6">
        <div class="flex flex-col min-w-full">
          <h3 class="text-slate-400 uppercase font-bold text-sm ">price</h3>
          <p class="font-bold text-xl text-slate-700">${{ data.market_data.current_price.usd }}</p>
        </div>
      </div>
      <div class="bg-white p-4 rounded shadow-lg w-full m-6">
        <div class="flex flex-col">
          <h3 class="text-slate-400 uppercase font-bold text-sm ">market cap.</h3>
          <p class="font-bold text-xl text-slate-700">${{ data.market_data.market_cap.usd.toLocaleString() }}</p>
        </div>
      </div>
      <div class="bg-white p-4 rounded shadow-lg w-full m-6">
        <div class="flex flex-col">
          <h3 class="text-slate-400 uppercase font-bold text-sm ">circulating supply</h3>
          <p class="font-bold text-xl text-slate-700">{{ data.market_data.circulating_supply.toLocaleString() }} tokens</p>
        </div>
      </div>
      <div class="bg-white p-4 rounded shadow-lg w-full m-6">
        <div class="flex flex-col">
          <h3 class="text-slate-400 uppercase font-bold text-sm ">fully diluted valuation</h3>
          <p class="font-bold text-xl text-slate-700">${{ data.market_data.fully_diluted_valuation.usd.toLocaleString() }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

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
          'https://api.coingecko.com/api/v3/coins/'+this.token+'?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false'
        )
        const data = await res.json()
        this.data = data
      }
    }
  }
</script>