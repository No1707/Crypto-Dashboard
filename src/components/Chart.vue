<template>
    <div class="px-4 md:px-14 mx-auto xl:max-w-7xl mt-8 h-72 lg:h-[32rem] lg:min-h-[32rem] chart-container" id="tradingview_149c6">
        <div class="tradingview-widget-container h-full">
            <div id="tradingview_cddc6"></div>
            <div class="tradingview-widget-copyright text-xl text-black dark:text-white ">{{chartSymbol}} by TradingView</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'token-chart',
        props: {
            token: {
                required: true,
                type: String
            }
        },
        mounted() {
            const container = document.querySelector('.chart-container')
            const Script = document.createElement("script")
            Script.setAttribute("src", "https://s3.tradingview.com/tv.js")
            container.appendChild(Script)
            let checkInterval = setInterval(() => {
                if(TradingView){ // eslint-disable-line
                    clearInterval(checkInterval)
                    this.loadChart()
                }
            }, 500)
        },
        methods: {
            loadChart() {
                const symbol = this.chartSymbol
                const mode = this.changeMode
                new TradingView.widget({ // eslint-disable-line
                    "symbol": symbol,
                    "autosize": true,
                    "interval": "D",
                    "timezone": "Etc/UTC",
                    "theme": mode,
                    "style": "3",
                    "locale": "en",
                    "toolbar_bg": "#f1f3f6",
                    "enable_publishing": false,
                    "hide_top_toolbar": false,
                    "save_image": false,
                    "container_id": "tradingview_149c6"
                })
            }
        },
        computed: {
            chartSymbol() {
                const symb = this.token+this.$store.state.currency
                return symb
            },
            changeMode() {
                return this.$store.state.darkMode ? 'dark' : 'light'
            }
        },
        watch: {
            '$store.state.currency'(){
                this.loadChart()
            },
            '$store.state.darkMode'(){
                this.loadChart()
            }
        }
    }
</script>

<style scoped></style>