<template>
  <div class="w-full pb-5 px-5 flex flex-col justify-between bg-orange-400">
    <div>
      <button class="self-start">&lt; Back</button>
      <h1> {{ token }} </h1>
    </div>
    <div class="flex justify-between px-14">
      <div class="bg-white p-4 rounded shadow-lg w-full m-6">
        <div class="flex flex-col min-w-full">
          <h3 class="text-slate-400 uppercase font-bold text-xs ">price</h3>
          <p class="font-semibold text-xl text-slate-700">{{ data.market_data.current_price.usd }}</p>
        </div>
      </div>
      <div class="bg-white p-4 rounded shadow-lg w-full m-6">
        <div class="flex flex-col">
          <h3 class="text-slate-400 uppercase font-bold text-xs ">market cap.</h3>
          <p class="font-semibold text-xl text-slate-700">{{ data.market_data.current_price.usd }}</p>
        </div>
      </div>
      <div class="bg-white p-4 rounded shadow-lg w-full m-6">
        <div class="flex flex-col">
          <h3 class="text-slate-400 uppercase font-bold text-xs ">circulating supply</h3>
          <p class="font-semibold text-xl text-slate-700">{{ data.market_data.current_price.usd }}</p>
        </div>
      </div>
      <div class="bg-white p-4 rounded shadow-lg w-full m-6">
        <div class="flex flex-col">
          <h3 class="text-slate-400 uppercase font-bold text-xs ">fully diluted valuation</h3>
          <p class="font-semibold text-xl text-slate-700">{{ data.market_data.current_price.usd }}</p>
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
      this.fetchToken()
    },
    methods: {
      async fetchingToken(){
        const res = await fetch(
          'https://api.coingecko.com/api/v3/coins/'+this.token+'?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false'
        )
        const data = await res.json()
        return data
      },
      async fetchToken(){
        this.data = await this.fetchingToken()
      }
    }
  }
</script>