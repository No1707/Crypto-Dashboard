import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import './styles/styles.css'
import router from './router'

const store = createStore({
    state() {
        return {
            currency: "USD"
        }
    },
    mutations: {
        changeCurrency(state, cur) {
            state.currency = cur
        }
    }
})

createApp(App).use(router).use(store).mount('#app')
