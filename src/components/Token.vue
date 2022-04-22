<template>
        <tr @click="tokenClick(token.id)" class="text-center border-b border-slate-200 hover:bg-zinc-200 dark:hover:bg-slate-700 hover:cursor-pointer">
            <td class="font-bold flex justify-start items-center"><img class="w-8 m-3" :src="token.image" :alt="token.id">{{ token.name }}</td>
            <td class="font-bold">${{ token.current_price }}</td>
            <td :class="[ this.token.price_change_24h > 0 ? 'positive' : 'negative' ]">${{ token.price_change_24h }} <span class="font-bold">|</span> <span >{{ token.price_change_percentage_24h }}%</span></td>
            <td>${{ token.market_cap.toLocaleString() }}</td>
            <td>${{ token.market_cap_change_24h.toLocaleString() }} <span class="font-bold">|</span> <span>{{ token.market_cap_change_percentage_24h }}%</span></td>
            <td>{{ token.circulating_supply.toLocaleString() }}</td>
        </tr>
</template>

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

<script>
    export default {
        name: "Token-info",
        props: {
            token: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                
            }
        },
        computed: {
            commasNumber(nbr) {
                return console.log(nbr)
            }
        },
        methods: {
            tokenClick(_id) {
                this.$router.push({ params: {id: _id} ,name: 'token' })
            }
        }
    }
</script>