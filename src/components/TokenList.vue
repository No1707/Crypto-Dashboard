<template>
    <div class="flex flex-col items-center mt-20 mx-auto w-4/5">
        <Filter @rowsNumber="rowsNumber" @rowsOrder="rowsOrder"/>
        <table class="shadow-lg w-full">
            <thead class="bg-slate-100">
                <tr>
                    <th class="py-5 px-2 rounded-tl-lg">Nom</th>
                    <th class="py-5 px-2">Prix actuel</th>
                    <th class="py-5 px-2">Changement prix 24h</th>
                    <th class="py-5 px-2">Cap. de marché</th>
                    <th class="py-5 px-2">Changement cap. marché 24h</th>
                    <th class="py-5 px-2 rounded-tr-lg">Tokens en ciruclation</th>
                </tr>
            </thead>
            <tbody v-if="!showLessRows">
                <Token v-for="token in allTokens" :key="token.id" :token="token"></Token>
            </tbody>
            <tbody v-else>
                <Token v-for="token in filteredTokens" :key="token.id" :token="token"></Token>
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
        beforeMount() {
            this.fetchData()
            // setInterval(this.fetchData, 60000)
        },
        data() {
            return{
                allTokens: null,
                rowsNbr: 100,
                showLessRows: false
            }
        },
        methods: {
            async fetching(){
                const res = await fetch(
                    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h'
                )
                const data = await res.json()
                if(res.ok){
                    console.log(data)
                }
                return data
            },
            async fetchData(){
                this.allTokens = await this.fetching()
            },
            rowsNumber(rows){
                this.rowsNbr = rows
                this.showLessRows = true
            },
            rowsOrder(order){
                switch (order) {
                    case "Market cap. ascending order":
                        this.allTokens.sort((a, b) => {
                            return a.market_cap - b.market_cap;
                        })
                    break;
                    case "Market cap. descending order":
                        this.allTokens.sort((a, b) => {
                            return a.market_cap - b.market_cap;
                        }).reverse()
                    break;
                    case "Price ascending order":
                        this.allTokens.sort((a, b) => {
                            return a.current_price - b.current_price;
                        })
                    break;
                    case "Price descending order":
                        this.allTokens.sort((a, b) => {
                            return a.current_price - b.current_price;
                        }).reverse()
                    break;
                }
            }
        },
        computed: {
            filteredTokens() {
                return this.allTokens.slice(0, this.rowsNbr)
            }
        }
    }
</script>