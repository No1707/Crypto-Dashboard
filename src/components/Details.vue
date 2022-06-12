<template>
    <div class="w-full pb-5 px-5 flex flex-col justify-between bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-white">

      <div class="mx-4  my-8 flex items-center">
        <!-- Go back button -->
        <button @click="$router.back()" class="self-start text-base md:text-xl">&lt; Back</button>

        <!-- Logo -->
        <img class="object-cover ml-6 mr-4 md:ml-12 md:mr-6" :src="tokenData.image.small" alt="Token logo">
        
        <!-- Name -->
        <h1 class="font-bold text-3xl md:text-4xl uppercase"> {{ tokenData.id }} ({{tokenData.symbol}}) </h1>
      </div>

      <!-- Datas -->
      <div class="flex flex-wrap justify-center xl:flex-nowrap xl:justify-between px-8 md:px-14">

        <!-- current price -->
        <div class="bg-white dark:bg-slate-800 p-4 rounded shadow-lg w-full text-center md:text-left md:w-2/5 xl:w-full  m-6">
          <div class="flex flex-col min-w-full">
            <h2 class="text-slate-400 uppercase font-bold text-xs md:text-sm ">price</h2>
            <p class="font-bold text-base md:text-xl">{{currencySign}} {{ tokenData.market_data.current_price[chosenCurrency].toLocaleString() }}</p>
          </div>
        </div>

        <!-- market_cap -->
        <div class="bg-white dark:bg-slate-800 p-4 rounded shadow-lg w-full text-center md:text-left md:w-2/5 xl:w-full  m-6">
          <div class="flex flex-col">
            <h2 class="text-slate-400 uppercase font-bold text-xs md:text-sm ">market cap.</h2>
            <p class="font-bold text-base md:text-xl">{{currencySign}} {{ tokenData.market_data.market_cap[chosenCurrency].toLocaleString() }}</p>
          </div>
        </div>
        
        <!-- circulating supply -->
        <div class="bg-white dark:bg-slate-800 p-4 rounded shadow-lg w-full text-center md:text-left md:w-2/5 xl:w-full  m-6">
          <div class="flex flex-col">
            <h2 class="text-slate-400 uppercase font-bold text-xs md:text-sm ">circulating supply</h2>
            <p class="font-bold text-base md:text-xl">{{ tokenData.market_data.circulating_supply.toLocaleString() }} tokens</p>
          </div>
        </div>

        <div class="bg-white dark:bg-slate-800 p-4 rounded shadow-lg w-full text-center md:text-left md:w-2/5 xl:w-full  m-6">
          <!-- diluted valuation -->
          <div class="flex flex-col" v-if="tokenData.market_data.fully_diluted_valuation[chosenCurrency] !== undefined">
            <h2 class="text-slate-400 uppercase font-bold text-xs md:text-sm ">fully diluted valuation</h2>
            <p class="font-bold text-base md:text-xl">{{currencySign}} {{ tokenData.market_data.fully_diluted_valuation[chosenCurrency].toLocaleString() }}</p>
          </div>
          <!-- total volume -->
          <div class="flex flex-col" v-else>
            <h2 class="text-slate-400 uppercase font-bold text-xs md:text-sm ">total volume</h2>
            <p class="font-bold text-base md:text-xl">{{currencySign}} {{ tokenData.market_data.total_volume[chosenCurrency].toLocaleString() }}</p>
          </div>
        </div>
      </div>

    </div>
</template>

<script>
    export default {
        name: 'token-details',
        props: {
            tokenData: {
                required: true,
                type: Object
            }
        },
        computed: {
            currencySign() {
                switch(this.chosenCurrency){
                case 'usd': return '$'
                case 'eur': return '€'
                case 'jpy': return '¥'
                case 'gbp': return '£'
                case 'chf': return 'CHF'
                case 'cad': return 'CA$'
                case 'nzd': return 'NZ$'
                }
                return ''
            },
            chosenCurrency() {
                return this.$store.state.currency.toLowerCase()
            }
        }
    }
</script>