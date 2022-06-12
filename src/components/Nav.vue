<template>
    <nav class="top-[-1px] transition-shadow sticky w-full flex justify-center items-center bg-white p-2 md:p-4 dark:bg-slate-800 z-20">

      <!-- Currency chooser -->
      <div class="inline-block mx-6 w-18 sm:w-20">
        <div class="relative" @click="this.$store.commit('toggleFilters', 'currency')">
            <div class="text-center label cursor-pointer rounded-lg bg-slate-100 dark:bg-slate-500 p-2">
              <span>{{ currencyValue }} ˅</span>
            </div>
            <div class="w-full absolute bg-slate-100 dark:bg-slate-500 rounded-b-lg rounded-t-lg mt-2" :class="{ hidden : !this.$store.state.visibleCurrencyFilter }">
              <ul>
                <li
                  class="py-2 text-center cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600 first:rounded-t-lg last:rounded-b-lg"
                  v-for="currency in currencies"
                  :class="{ current : currency === currencyValue }"
                  @click="this.$store.commit('changeCurrency', currency)"
                  :key="currency"
                >
                  {{ currency }}
                </li>
              </ul>
            </div>
          </div>
      </div>

      <!-- Toggle dark mode -->
      <div class="mx-6 flex items-center">
        <div>
          <div
            class="w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 duration-300 cursor-pointer"
            :class="{ 'bg-slate-600': darkMode }"
            @click="darkModeToggle"
          >
            <div
              class="bg-white w-4 h-4 rounded-full shadow-md transform duration-300"
              :class="{ 'translate-x-6': darkMode }"
            >
            </div>
          </div>
        </div>
        <img class="mx-4 w-6" :src="darkMode ? sunSRC : moonSRC" alt="dark mode icon">
      </div>

    </nav>
</template>

<script>
    export default {
        name: 'nav-menu',
        data() {
            return {
                currencies: ["USD", "EUR", "JPY", "GBP", "CHF", "CAD", "NZD"],
                moonSRC: require(`../assets/moon.svg`),
                sunSRC: require(`../assets/sun.svg`)
            }
        },
        mounted() {
            this.getDarkMode()
        },
        methods: {
            getDarkMode() {
                let darkStorage = localStorage.getItem('dark')
                if(darkStorage === 'true'){
                    darkStorage = true
                } else if(darkStorage === 'false'){
                    darkStorage = false
                }
                if(darkStorage !== null){
                    this.$store.commit('toggleDark', darkStorage)
                    const body = document.querySelector("body")
                    this.$store.state.darkMode ? body.classList.add("dark") : body.classList.remove("dark")
                } else {
                    localStorage.setItem('dark', false)
                }
            },
            darkModeToggle() {
                const isDark = !this.$store.state.darkMode
                this.$store.commit('toggleDark', isDark)
                localStorage.setItem('dark', isDark)
                const body = document.querySelector("body")
                isDark ? body.classList.add("dark") : body.classList.remove("dark")
            }
        },
        computed: {
            currencyValue () {
                return this.$store.state.currency
            },
            darkMode () {
                return this.$store.state.darkMode
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