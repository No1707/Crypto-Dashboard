<template>
    <div class="py-4">

        <!-- Market cap. order filter-->
        <div class="inline-block w-50">
            <div class="relative " @click="toggleOrder()">
                <div class="text-center label cursor-pointer rounded-lg bg-slate-100 px-4 py-2 shadow-lg">
                        <span>{{ orderValue }} ⌄</span>
                </div>
                <div class="w-full absolute bg-slate-300 rounded-b-lg" :class="{ hidden : !visibleOrderFilter, visibleOrderFilter }">
                    <ul>
                        <li
                            class="px-4 py-2 text-center cursor-pointer hover:bg-slate-400"
                            v-for="order in rowsOrder"
                            :class="{ current : order === orderValue }"
                            @click="selectOrder(order); $emit('rowsOrder', order)"
                            :key="order"
                        >
                            {{ order }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Rows number filter-->
        <div class="inline-block w-20">
            <div class="relative " @click="toggleRows()">
                <div class="text-center label cursor-pointer rounded-lg bg-slate-100 px-4 py-2 shadow-lg">
                        <span>{{ rowsValue }} ⌄</span>
                </div>
                <div class="w-full absolute bg-slate-300 rounded-b-lg" :class="{ hidden : !visibleRowsFilter, visibleRowsFilter }">
                    <ul>
                        <li
                            class="px-4 py-2 text-center cursor-pointer hover:bg-slate-400"
                            v-for="rows in rowsNbr"
                            :class="{ current : rows === rowsValue }"
                            @click="selectRows(rows); $emit('rowsNumber', rows)"
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

<style scoped>
    .hidden{
        visibility: hidden;
    }
    .current{
        pointer-events: none;
        background-color: rgb(148 163 184 / var(--tw-bg-opacity));
    }
    .current:hover{
        background-color: rgb(148 163 184 / var(--tw-bg-opacity));
    }
</style>

<script>
    export default {
        name: "filter-bar",
        data(){
            return {
                rowsNbr: [5, 10, 20, 50, 100],
                rowsValue: 100,
                visibleRowsFilter: false,
                rowsOrder: ["Market cap. ascending order", "Market cap. descending order", "Price ascending order", "Price descending order"],
                orderValue: "Market cap. descending order",
                visibleOrderFilter: false
            }
        },
        methods: {
            toggleRows() {
                this.visibleRowsFilter = !this.visibleRowsFilter
            },
            selectRows(rows){
                this.rowsValue = rows
            },
            toggleOrder() {
                this.visibleOrderFilter = !this.visibleOrderFilter
            },
            selectOrder(order){
                this.orderValue = order
            },
		}
    }
</script>