<template>

  <div class="dark:bg-slate-800 dark:text-white min-h-screen">

    <nav class="navBar transition sticky w-full flex justify-center items-center bg-white p-4 dark:bg-slate-800">

      <!-- Currency chooser -->
      <div class="inline-block mr-6 w-28">
        <div class="relative" @click="toggleCurrency()">
            <div class="text-center label cursor-pointer rounded-lg bg-slate-100 dark:bg-slate-500 p-2">
              <span>{{ currencyValue }} ˅</span>
            </div>
            <div class="w-full absolute bg-slate-100 dark:bg-slate-500 rounded-b-lg" :class="{ hidden : !visibleCurrencyFilter, visibleCurrencyFilter }">
              <ul>
                <li
                  class="px-4 py-2 text-center cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600"
                  v-for="currency in currencies"
                  :class="{ current : currency === currencyValue }"
                  @click="selectCurrency(currency); $emit('selectCurrency', currency)"
                  :key="currency"
                >
                  {{ currency }}
                </li>
              </ul>
            </div>
          </div>
      </div>

      <!-- Toggle dark mode -->
      <div
        class="w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 duration-300 cursor-pointer"
        :class="{ 'bg-slate-600': darkMode }"
        :aria-checked="darkMode.toString()"
        @click="darkModeToggle"
      >
        <div
          class="bg-white w-4 h-4 rounded-full shadow-md transform duration-300"
          :class="{ 'translate-x-6': darkMode }"
        ></div>
      </div>

    </nav>

    <router-view />
  </div>
  


</template>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700;800&display=swap');

  body{
    font-family: 'Open Sans', sans-serif;
  }
</style>

<style scoped>
  .navBar{
    top: -1px;
    z-index: 2;
  }
  .is-pinned{
    box-shadow: 0px 15px 20px -16px rgba(0,0,0,0.75);
    -webkit-box-shadow: 0px 15px 20px -16px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 15px 20px -16px rgba(0,0,0,0.75);
  }
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
    name: 'App',
    data() {
      return {
        currencies: ["USD", "EUR", "JPY", "GBP", "CHF", "CAD", "NZD"],
        currencyValue: "USD",
        visibleCurrencyFilter: false,
        
        darkMode: false
      }
    },
    mounted() {
      this.interObserv()
    },
    methods: {
      toggleCurrency() {
        this.visibleCurrencyFilter = !this.visibleCurrencyFilter
      },
      selectCurrency(cur) {
        this.currencyValue = cur
      },
      interObserv() {
        const el = document.querySelector(".navBar")
          const observer = new IntersectionObserver( 
          ([e]) => e.target.classList.toggle("is-pinned", e.intersectionRatio < 1),
            { threshold: 1 }
          );

        observer.observe(el);
      },
      darkModeToggle() {
        this.darkMode = !this.darkMode
        const body = document.querySelector("body")
        this.darkMode ? body.classList.add("dark") : body.classList.remove("dark")
      }
    }
  }
</script>