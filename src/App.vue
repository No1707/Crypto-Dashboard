<template>

  <div class="dark:bg-slate-800 dark:text-white min-h-screen text-xs md:text-base">

    <nav class="navBar transition-shadow sticky w-full flex justify-center items-center bg-white p-4 dark:bg-slate-800 z-20">

      <!-- Currency chooser -->
      <div class="inline-block mx-6 w-18 sm:w-20">
        <div class="relative" @click="toggleCurrency()">
            <div class="text-center label cursor-pointer rounded-lg bg-slate-100 dark:bg-slate-500 p-2">
              <span>{{ currencyValue }} ˅</span>
            </div>
            <div class="w-full absolute bg-slate-100 dark:bg-slate-500 rounded-b-lg rounded-t-lg mt-2" :class="{ hidden : !visibleCurrencyFilter, visibleCurrencyFilter }">
              <ul>
                <li
                  class="px-4 py-2 text-center cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600 first:rounded-t-lg last:rounded-b-lg"
                  v-for="currency in currencies"
                  :class="{ current : currency === currencyValue }"
                  @click="selectCurrency(currency)"
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

    <router-view />
    <footer class="py-4 text-center border-t border-white mt-10">
        © 2022 Nolan BOISEL
    </footer>
  </div>
  


</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        currencies: ["USD", "EUR", "JPY", "GBP", "CHF", "CAD", "NZD"],
        visibleCurrencyFilter: false,
        darkMode: null,
        moonSRC: require(`./assets/moon.svg`),
        sunSRC: require(`./assets/sun.svg`)
      }
    },
    mounted() {
      this.getDarkMode()
    },
    methods: {
      toggleCurrency() {
        this.visibleCurrencyFilter = !this.visibleCurrencyFilter
      },
      selectCurrency(cur) {
        this.$store.commit('changeCurrency', cur)
      },
      getDarkMode() {
        let darkStorage = localStorage.getItem('dark')
        if(darkStorage === 'true'){
          darkStorage = true
        } else if(darkStorage === 'false'){
          darkStorage = false
        }
        if(darkStorage !== null){
          this.darkMode = darkStorage
          this.darkMode ? document.querySelector("body").classList.add("dark") : document.querySelector("body").classList.remove("dark")
        } else {
          localStorage.setItem('dark', false)
          this.darkMode = false
        }
      },
      darkModeToggle() {
        this.darkMode = !this.darkMode
        localStorage.setItem('dark', this.darkMode)
        const body = document.querySelector("body")
        this.darkMode ? body.classList.add("dark") : body.classList.remove("dark")
      }
    },
    computed: {
      currencyValue () {
        return this.$store.state.currency
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700;800&display=swap');

  body{
    font-family: 'Open Sans', sans-serif;
  }
</style>

<style scoped>
  .navBar{
    top: -1px;
  }
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
