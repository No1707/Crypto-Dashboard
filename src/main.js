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

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
const firebaseConfig = {
    apiKey: "AIzaSyCDS3QSy2zyk3TzY2CMoOeNvsU-p6OsiMs",
    authDomain: "crypto-dashboard-a7614.firebaseapp.com",
    projectId: "crypto-dashboard-a7614",
    storageBucket: "crypto-dashboard-a7614.appspot.com",
    messagingSenderId: "948895867152",
    appId: "1:948895867152:web:68b8ae8f9082150bef8595"
}
// Initialize Firebase
initializeApp(firebaseConfig);

createApp(App).use(router).use(store).mount('#app')