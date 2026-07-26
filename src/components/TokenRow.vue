<template>
        <tr @click="tokenClick(token.id)" class="text-center border-b border-slate-200 dark:border-slate-700 hover:bg-zinc-100 dark:hover:bg-slate-700 hover:cursor-pointer even:bg-slate-50 dark:even:bg-slate-800/40 text-sm">
            <td class="font-bold p-2 text-slate-400 dark:text-slate-500 text-sm">{{ index+1 }}</td>
            <td class="font-bold flex justify-start items-center p-2 text-left"><img class="w-7 mx-3 rounded-full" :src="token.image" :alt="token.id">{{ token.name }}<span class="ml-2 text-xs font-normal text-slate-400 dark:text-slate-500 uppercase hidden sm:inline">{{ token.symbol }}</span></td>
            <td class="font-bold p-2 tabular-nums">{{currencySign}}{{ formatPrice(token.current_price) }}</td>
            <td class="p-2">
                <span
                    class="inline-block px-2 py-0.5 rounded-full text-xs font-semibold tabular-nums"
                    :class="[ token.price_change_24h > 0 ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400' ]"
                >{{ token.price_change_24h > 0 ? '+' : '' }}{{ token.price_change_percentage_24h?.toFixed(2) }}%</span>
            </td>
            <td class="hidden md:table-cell p-2 tabular-nums">{{currencySign}}{{ token.market_cap.toLocaleString() }}</td>
            <td class="hidden lg:table-cell p-2">
                <span
                    class="inline-block px-2 py-0.5 rounded-full text-xs font-semibold tabular-nums"
                    :class="[ token.market_cap_change_24h > 0 ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400' ]"
                >{{ token.market_cap_change_24h > 0 ? '+' : '' }}{{ token.market_cap_change_percentage_24h?.toFixed(2) }}%</span>
            </td>
            <td class="hidden xl:table-cell p-2 tabular-nums">{{ token.circulating_supply.toLocaleString() }}</td>
        </tr>
</template>

<script>
import { getCurrencySign } from '../utils/currency.js'

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
                return getCurrencySign(this.chosenCurrency)
            }
        },
        methods: {
            tokenClick(_id) {
                this.$router.push({ params: {id: _id}, name: 'token' })
            },
            formatPrice(price) {
                if(price === null || price === undefined) return '—'
                if(price < 0.01) return price.toPrecision(4)
                return price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            }
        }
    }
</script>
