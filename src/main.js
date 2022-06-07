import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import './styles/styles.css'
import router from './router'

const store = createStore({
    state() {
        return {
            currency: "USD",
            darkMode: false
        }
    },
    mutations: {
        changeCurrency(state, cur) {
            state.currency = cur
        },
        toggleDark(state, val) {
            state.darkMode = val
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