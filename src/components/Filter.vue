<template>
    <div class="px-4 py-2 md:p-4 flex flex-wrap sm:flex-nowrap items-center w-full sticky top-[45px] md:top-[70px] bg-white dark:bg-slate-800 transition-shadow z-10">

        <input class="md:w-1/4 bg-slate-200 dark:bg-slate-700 rounded-1 border-0 p-2 mr-6 rounded-lg" type="text" placeholder="Search a token" v-model="textSearch" @keyup="$emit('searchToken', textSearch)">

        <!-- Market cap. order filter -->
        <div class="inline-block my-2 mr-3 sm:my-4 sm:mr-6 w-52 sm:w-64 z-10">
            <div class="relative" @click="this.$store.commit('toggleFilters', 'order')">
                <div class="text-center label cursor-pointer rounded-lg bg-slate-100 dark:bg-slate-500 p-2">
                        <span>{{ orderValue }} ˅</span>
                </div>
                <div class="w-full absolute bg-slate-100 dark:bg-slate-500 rounded-b-lg rounded-t-lg mt-2" :class="{ hidden : !this.$store.state.visibleOrderFilter }">
                    <ul>
                        <li
                            class="p-2 text-center cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600 first:rounded-t-lg last:rounded-b-lg"
                            v-for="order in rowsOrder"
                            :class="{ current : order === orderValue }"
                            @click="orderValue=order; $emit('rowsOrder', order)"
                            :key="order"
                        >
                            {{ order }}
                        </li>
                     </ul>
                </div>
            </div>
        </div>

        <!-- Rows number filter -->
        <div class="inline-block w-14 sm:w-20 mr-3 sm:mr-6">
            <div class="relative " @click="this.$store.commit('toggleFilters', 'rows')">
                <div class="text-center label cursor-pointer rounded-lg bg-slate-100 dark:bg-slate-500 p-2">
                        <span>{{ rowsValue }} ˅</span>
                </div>
                <div class="w-full absolute bg-slate-100 dark:bg-slate-500 rounded-b-lg rounded-t-lg mt-2" :class="{ hidden : !this.$store.state.visibleRowsFilter }">
                    <ul>
                        <li
                            class="p-2 text-center cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600 first:rounded-t-lg last:rounded-b-lg"
                            v-for="rows in rowsNbr"
                            :class="{ current : rows === rowsValue }"
                            @click="rowsValue=rows; $emit('rowsNumber', rows)"
                            :key="rows"
                        >
                            {{ rows }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "filter-bar",
        data(){
            return {
                textSearch: "",

                rowsNbr: [10, 20, 50, 100, 250],
                rowsValue: 100,

                rowsOrder: ["Market cap. ascending order", "Market cap. descending order", "Price ascending order", "Price descending order"],
                orderValue: "Market cap. descending order"
            }
        }
    }
</script>

<style scoped>
    .hidden{
        visibility: hidden;
    }
    .current{
        pointer-events: none;
        background-color: rgb(226 232 240 / var(--tw-bg-opacity));
    }
    .current:hover{
        background-color: rgb(226 232 240 / var(--tw-bg-opacity));
    }
    body.dark .current{
        pointer-events: none;
        background-color: rgb(71 85 105 / var(--tw-bg-opacity));
    }
    body.dark .current:hover{
        background-color: rgb(71 85 105 / var(--tw-bg-opacity));
    }
</style>

