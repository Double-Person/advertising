import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

import customTabBar from './components/customTabBar/customTabBar.vue';
import commonBtn from './components/commonBtn/commonBtn.vue';

Vue.component('customTabBar', customTabBar);
Vue.component('commonBtn', commonBtn);
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
