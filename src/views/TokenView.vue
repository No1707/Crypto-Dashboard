<template>
  <div>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center items-center h-64">
      <svg class="animate-spin h-10 w-10 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
      </svg>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="flex flex-col items-center justify-center h-64 gap-4">
      <p class="text-lg text-red-500">Impossible de charger ce token.</p>
      <button @click="$router.back()" class="underline">&lt; Retour</button>
    </div>

    <!-- Content -->
    <div v-else-if="data">
      <Details :tokenData="data" />
      <Chart :token="tokenSymbol" />
      <div class="p-6 flex flex-col justify-center items-center">
        <div class="max-w-5xl px-4 sm:px-12 tokenDescription" v-if="data.description?.en">
          <h3 class="my-4 font-bold text-2xl leading-loose underlined">
            <span class="capitalize">{{ token }}</span> description :
          </h3>
          <p v-html="data.description.en"></p>
        </div>
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
  components: { Chart, Details },
  data() {
    return {
      token: '',
      tokenSymbol: '',
      data: null,
      loading: false,
      error: false,
    }
  },
  beforeMount() {
    const route = useRoute()
    this.token = route.params.id
    this.fetchingToken()
  },
  methods: {
    async fetchingToken() {
      this.loading = true
      this.error = false
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/${this.token}?localization=true&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false`,
          { headers: { 'x-cg-demo-api-key': process.env.VUE_APP_COINGECKO_API_KEY } }
        )
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        this.data = data
        this.tokenSymbol = data.symbol.toUpperCase()
      } catch {
        this.error = true
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style>
  .tokenDescription a {
    font-weight: bold;
    text-decoration: underline;
  }
</style>
