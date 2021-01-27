import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

import customTabBar from './components/customTabBar/customTabBar.vue';

Vue.component('customTabBar', customTabBar)
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
