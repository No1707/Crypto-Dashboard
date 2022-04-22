<template>
    <div class="flex flex-col items-center mb-10 mx-auto w-4/5">
        
        <Filter @rowsNumber="rowsNumber" @rowsOrder="rowsOrder" @searchToken="searchToken"/>

        <table class="shadow-lg w-full">
            <thead class="bg-slate-100 dark:bg-slate-700">
                <tr>
                    <th class="py-5 px-2 rounded-tl-lg">Nom</th>
                    <th class="py-5 px-2">Prix actuel</th>
                    <th class="py-5 px-2">Changement prix 24h</th>
                    <th class="py-5 px-2">Cap. de marché</th>
                    <th class="py-5 px-2">Changement cap. marché 24h</th>
                    <th class="py-5 px-2 rounded-tr-lg">Tokens en ciruclation</th>
                </tr>
            </thead>
            <tbody v-if="this.allTokens">
                <Token v-for="token in filteredTokens.slice(0, rowsNbr)" :key="token.id" :token="token"></Token>
            </tbody>
        </table>

    </div>
</template>

<script>
import Token from './Token.vue'
import Filter from './Filter.vue'

    export default {
        name: "Token-list",
        components: {
            Token,
            Filter
        },
        mounted() {
            this.fetching()
            // setInterval(this.fetching, 5000)
        },
        data() {
            return{
                filteredTokens: [],
                allTokens: [],
                rowsNbr: 100,
                order: ""
            }
        },
        methods: {
            async fetching(){
                const res = await fetch(
                    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=24h'
                )
                if(res.ok){
                    // console.log(res)
                } else  if(!res.ok){
                    alert("l'API Coingecko ne fonctionne pas.")
                }
                const data = await res.json()
                this.allTokens = data
                this.filteredTokens = data
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
                    break;
                    case "Market cap. descending order":
                        this.filteredTokens.sort((a, b) => {
                            return a.market_cap - b.market_cap;
                        }).reverse()
                    break;
                    case "Price ascending order":
                        this.filteredTokens.sort((a, b) => {
                            return a.current_price - b.current_price;
                        })
                    break;
                    case "Price descending order":
                        this.filteredTokens.sort((a, b) => {
                            return a.current_price - b.current_price;
                        }).reverse()
                    break;
                }
            },
            searchToken(val) {
                this.filteredTokens = this.allTokens.filter( token => 
                    token.name.toLowerCase().includes(val.toLowerCase()) ||
                    token.symbol.toLowerCase().includes(val.toLowerCase())
                )
                this.rowsOrder(this.order)
            }
        }
    }
</script>