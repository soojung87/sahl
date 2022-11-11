import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import vuetify from './plugins/vuetify'
import router from './router'
import VueDraggableResizable from 'vue-draggable-resizable'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
import UUID from "vue-uuid"
import VueDragscroll from 'vue-dragscroll'

Vue.use(VueDragscroll)
Vue.use(UUID)

Vue.component('vue-draggable-resizable', VueDraggableResizable)
Vue.config.productionTip = false

require('@/assets/projectCSS.css')
export const EventBus = new Vue()

Vue.prototype.$setZoominTooltip = 0.45
Vue.prototype.$setZoominElement = 0.55
Vue.prototype.$setZoominLineSetupStart = 0.58
Vue.prototype.$setZoominLineSetupEnd = 0.61
Vue.prototype.$setZoominLineTitle = 0.50
Vue.prototype.$setNumTableList = 100
Vue.prototype.$setPositionLeft = 600
Vue.prototype.$setPositionElementX = -430
Vue.prototype.$setPositionElementY = -50



new Vue({
    vuetify,
    router,
    store,
    beforeCreate() {
        this.$store.commit("initialiseStore");
    },
    render: h => h(App)
}).$mount('#app')