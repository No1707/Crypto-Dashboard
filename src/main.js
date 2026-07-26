import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import './styles/styles.css'
import router from './router'

const store = createStore({
    state() {
        return {
            currency: "USD",
            darkMode: false,
            visibleCurrencyFilter: false,
            visibleOrderFilter: false,
            visibleRowsFilter: false,
        }
    },
    mutations: {
        changeCurrency(state, cur) {
            state.currency = cur
        },
        toggleDark(state, val) {
            state.darkMode = val
        },
        toggleFilters(state, filter){
            if(filter === 'currency'){
                state.visibleCurrencyFilter = !state.visibleCurrencyFilter
                state.visibleOrderFilter = false
                state.visibleRowsFilter = false
            } else if(filter === 'order'){
                state.visibleOrderFilter = !state.visibleOrderFilter
                state.visibleCurrencyFilter = false
                state.visibleRowsFilter = false
            } else if(filter === 'rows'){
                state.visibleRowsFilter = !state.visibleRowsFilter
                state.visibleOrderFilter = false
                state.visibleCurrencyFilter = false
            }
        }
    }
})


createApp(App).use(router).use(store).mount('#app')