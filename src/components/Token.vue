<template>
    <tr class="text-center border-b border-slate-200 hover:bg-zinc-200 hover:cursor-pointer">
        <router-link class="w-full" :to="{ name: 'token', params: { id: token.id } }">
            <td class="font-bold flex justify-start items-center"><img class="w-8 m-3" :src="token.image" :alt="token.id">{{ token.name }}</td>
            <td class="font-bold">${{ token.current_price }}</td>
            <td :class="[ positiveChange ? posChange : negChange ]">${{ token.price_change_24h }}, <span >{{ token.price_change_percentage_24h }}%</span></td>
            <td>${{ token.market_cap }}</td>
            <td>${{ token.market_cap_change_24h }}, <span>{{ token.market_cap_change_percentage_24h }}%</span></td>
            <td>{{ token.circulating_supply }}</td>
        </router-link>  
    </tr>
</template>

<style scoped>
    .positive{
        animation: 5s linear 0s 1 normal forwards running posPrice;
    }
    .negative{
        animation: 5s linear 0s 1 normal forwards running negPrice;
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
        mounted(){
            this.colorText()
        },
        data() {
            return {
                priceChange: this.token.price_change_24h,
                positiveChange: true,
                posChange: "positive",
                negChange: "negative",
                oldPrices: null
            }
        },
        computed: {
            commasNumber(nbr) {
                return console.log(nbr)
            }
        },
        methods: {
            colorText() {
                if(this.priceChange < 0) this.positiveChange = false
            }
        }
    }
</script>