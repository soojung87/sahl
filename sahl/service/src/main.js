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

new Vue({
    vuetify,
    router,
    store,
    beforeCreate() {
        this.$store.commit("initialiseStore");
    },
    render: h => h(App)
}).$mount('#app')