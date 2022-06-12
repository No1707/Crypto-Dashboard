<template>
        <tr @click="tokenClick(token.id)" class="text-center border-b border-slate-200 hover:bg-zinc-200 dark:hover:bg-slate-700 hover:cursor-pointer">
            <td class="font-bold p-2">{{ index+1 }}</td>
            <td class="font-bold flex justify-start items-center p-2 text-left"><img class="w-8 m-3" :src="token.image" :alt="token.id">{{ token.name }}</td>
            <td class="font-bold p-2">{{currencySign}}{{ token.current_price }}</td>
            <td class="p-2" :class="[ this.token.price_change_24h > 0 ? 'positive' : 'negative' ]">{{ token.price_change_percentage_24h }}%</td>
            <td class="hidden md:table-cell p-2">{{currencySign}}{{ token.market_cap.toLocaleString() }}</td>
            <td class="hidden lg:table-cell p-2">{{currencySign}}{{ token.market_cap_change_24h.toLocaleString() }} <span class="font-bold">|</span> <span>{{ token.market_cap_change_percentage_24h }}%</span></td>
            <td class="hidden xl:table-cell p-2">{{ token.circulating_supply.toLocaleString() }}</td>
        </tr>
</template>

<script>
    export default {
        name: "token-info",
        props: {
            token: {
                type: Object,
                required: true
            },
            index: {
                type: Number,
                required: true
            },
            chosenCurrency: {
                type: String,
                required: true
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
            }
        },
        methods: {
            tokenClick(_id) {
                this.$router.push({ params: {id: _id}, name: 'token' })
            }
        }
    }
</script>

<style scoped>
    .positive{
        animation: 4s linear 0s 1 normal forwards running posPrice;
    }
    .negative{
        animation: 4s linear 0s 1 normal forwards running negPrice;
    }
    @keyframes posPrice{
        from {
            color: rgb(15, 201, 15)
        }
        to {
            color: black;
        }
    }
    @keyframes negPrice{
        from {
            color: red;
        }
        to {
            color: black;
        }
    }
    /* Dark mode */
    body.dark .positive{
        animation: 4s linear 0s 1 normal forwards running posPriceDark;
    }
    body.dark .negative{
        animation: 4s linear 0s 1 normal forwards running negPriceDark;
    }
    @keyframes posPriceDark{
        from {
            color: rgb(15, 201, 15)
        }
        to {
            color: white;
        }
    }
    @keyframes negPriceDark{
        from {
            color: red;
        }
        to {
            color: white;
        }
    }
</style>