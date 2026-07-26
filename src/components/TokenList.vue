<template>
    <div class="flex flex-col items-center mb-2 mx-auto max-w-8xl md:p-8">

        <!-- filtre -->
        <Filter @rowsNumber="rowsNumber" @rowsOrder="rowsOrder" @searchToken="searchToken" :statusText="timeSince" :isLoading="loading"/>

        <!-- erreur -->
        <div v-if="error" class="w-full my-4 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg text-center">
            Impossible de charger les données. Vérifiez votre connexion ou réessayez plus tard.
        </div>

        <!-- chargement initial -->
        <div v-if="loading && !allTokens.length" class="w-full mt-8 flex justify-center">
            <svg class="animate-spin h-10 w-10 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
            </svg>
        </div>

        <table v-else class="shadow-lg w-full">

            <!-- table head -->
            <thead class="bg-slate-100 dark:bg-slate-700">
                <tr class="border-b border-slate-200 dark:border-slate-600">
                    <th class="py-5 px-2 md:rounded-tl-lg">#</th>
                    <th class="py-5 px-2 text-left w-2/12 sm:w-1/5 md:w-auto">Nom</th>
                    <th class="py-5 px-2">Prix actuel</th>
                    <th class="py-5 px-2">Variation 24h</th>
                    <th class="hidden md:table-cell py-5 px-2 md:rounded-tr-lg lg:rounded-none">Cap. de marché</th>
                    <th class="hidden lg:table-cell py-5 px-2 lg:rounded-tr-lg xl:rounded-none">Variation cap. 24h</th>
                    <th class="hidden xl:table-cell py-5 px-2 rounded-tr-lg">Tokens en circulation</th>
                </tr>
            </thead>

            <!-- table rows -->
            <tbody v-if="this.allTokens">
                <TokenRow v-for="(token, index) in filteredTokens.slice(0, this.displayedRows)" :key="token.id" :token="token" :index="index" :chosenCurrency="chosenCurrency" />
            </tbody>

        </table>

    </div>
</template>

<script>
import TokenRow from './TokenRow.vue'
import Filter from './Filter.vue'

    export default {
        name: "Token-list",
        components: {
            TokenRow,
            Filter
        },
        mounted() {
            this.fetching(this.chosenCurrency)
            this.intervalId = setInterval(() => {this.fetching(this.chosenCurrency)}, 15000)
            this.tickId = setInterval(() => {this.now = Date.now()}, 1000)
            this.scrollHandler = () => {
                if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 50 && this.displayedRows < this.rowsNbr) {
                    this.displayedRows += 10
                }
            }
            window.addEventListener('scroll', this.scrollHandler)
        },
        beforeUnmount() {
            clearInterval(this.intervalId)
            clearInterval(this.tickId)
            window.removeEventListener('scroll', this.scrollHandler)
        },
        data() {
            return{
                displayedRows: 10,
                filteredTokens: [],
                allTokens: [],
                rowsNbr: 100,
                order: "",
                search: "",
                loading: false,
                error: false,
                lastUpdated: null,
                now: Date.now(),
                intervalId: null,
                tickId: null,
                scrollHandler: null,
            }
        },
        methods: {
            async fetching(cur){
                this.loading = true
                this.error = false
                try {
                    const res = await fetch(
                        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${cur}&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=24h`,
                        { headers: { 'x-cg-demo-api-key': process.env.VUE_APP_COINGECKO_API_KEY } }
                    )
                    if(!res.ok) throw new Error(`HTTP ${res.status}`)
                    const data = await res.json()
                    this.allTokens = data
                    this.lastUpdated = Date.now()
                    this.searchToken(this.search)
                } catch {
                    this.error = true
                } finally {
                    this.loading = false
                }
            },
            rowsNumber(rows){
                this.rowsNbr = rows
                if(this.displayedRows > rows) this.displayedRows = rows
            },
            rowsOrder(order){
                this.order = order
                const sorted = [...this.filteredTokens]
                switch (order) {
                  case "Market cap. ascending order":
                      sorted.sort((a, b) => {
                          return a.market_cap - b.market_cap;
                      })
                  break
                  case "Market cap. descending order":
                      sorted.sort((a, b) => {
                          return b.market_cap - a.market_cap;
                      })
                  break
                  case "Price ascending order":
                      sorted.sort((a, b) => {
                          return a.current_price - b.current_price;
                      })
                  break
                  case "Price descending order":
                      sorted.sort((a, b) => {
                          return b.current_price - a.current_price;
                      })
                  break
                }
                this.filteredTokens = sorted
            },
            searchToken(val) {
                this.search = val
                this.filteredTokens = this.allTokens.filter( token =>
                    token.name.toLowerCase().includes(this.search.toLowerCase()) ||
                    token.symbol.toLowerCase().includes(this.search.toLowerCase())
                )
                this.rowsOrder(this.order)
            },
        },
        watch: {
            '$store.state.currency'(cur) {
                this.fetching(cur)
            }
        },
        computed: {
            chosenCurrency() {
                return this.$store.state.currency.toLowerCase()
            },
            timeSince() {
                if(!this.lastUpdated) return ''
                const seconds = Math.floor((this.now - this.lastUpdated) / 1000)
                if(seconds < 60) return `${seconds}s`
                return `${Math.floor(seconds / 60)}min`
            }
        }
    }
</script>
