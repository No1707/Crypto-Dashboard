<template>
    <div class="flex flex-col items-center mb-2 mx-auto max-w-8xl md:p-8">
        
        <!-- filtre -->
        <Filter @rowsNumber="rowsNumber" @rowsOrder="rowsOrder" @searchToken="searchToken"/>

        <table class="shadow-lg w-full">
            <thead class="bg-slate-100 dark:bg-slate-700">
                <tr class="border-b border-slate-200">
                    <th class="py-5 px-2 md:rounded-tl-lg">#</th>
                    <th class="py-5 px-2 text-left w-2/12 sm:w-1/5 md:w-auto">Nom</th>
                    <th class="py-5 px-2">Prix actuel</th>
                    <th class="py-5 px-2">Changement prix 24h</th>
                    <th class="hidden md:table-cell py-5 px-2 md:rounded-tr-lg lg:rounded-none">Cap. de marché</th>
                    <th class="hidden lg:table-cell py-5 px-2 lg:rounded-tr-lg xl:rounded-none">Changement cap. marché 24h</th>
                    <th class="hidden xl:table-cell py-5 px-2 rounded-tr-lg">Tokens en ciruclation</th>
                </tr>
            </thead>

            <tbody v-if="this.allTokens">
                <TokenRow v-for="(token, index) in filteredTokens.slice(0, rowsNbr)" :key="token.id" :token="token" :index="index" :chosenCurrency="chosenCurrency" />
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
            setInterval(() => {this.fetching(this.chosenCurrency)}, 5000)
        },
        data() {
            return{
                filteredTokens: [],
                allTokens: [],
                rowsNbr: 100,
                order: "",
                search: ""
            }
        },
        methods: {
            async fetching(cur){
                const res = await fetch(
                    'https://api.coingecko.com/api/v3/coins/markets?vs_currency='+cur+'&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=24h'
                )
                if(res.ok){
                    // console.log(res)
                } else  if(!res.ok){
                    alert("l'API Coingecko ne fonctionne pas.")
                }
                const data = await res.json()
                this.allTokens = data
                this.filteredTokens = data
                this.searchToken(this.search)
            },
            rowsNumber(rows){
                this.rowsNbr = rows
            },
            rowsOrder(order){
                this.order = order
                switch (order) {
                    case "Market cap. ascending order":
                        this.filteredTokens.sort((a, b) => {
                            return a.market_cap - b.market_cap;
                        })
                    break
                    case "Market cap. descending order":
                        this.filteredTokens.sort((a, b) => {
                            return a.market_cap - b.market_cap;
                        }).reverse()
                    break
                    case "Price ascending order":
                        this.filteredTokens.sort((a, b) => {
                            return a.current_price - b.current_price;
                        })
                    break
                    case "Price descending order":
                        this.filteredTokens.sort((a, b) => {
                            return a.current_price - b.current_price;
                        }).reverse()
                    break
                }
            },
            searchToken(val) {
                this.search = val
                this.filteredTokens = this.allTokens.filter( token => 
                    token.name.toLowerCase().includes(this.search.toLowerCase()) ||
                    token.symbol.toLowerCase().includes(this.search.toLowerCase())
                )
                this.rowsOrder(this.order)
            }
        },
        watch: {
            '$store.state.currency'(cur) {
                this.fetching(cur)
            }
        },
        computed: {
            chosenCurrency() {
                return this.$store.state.currency.toLowerCase()
            }
        }
    }
</script>