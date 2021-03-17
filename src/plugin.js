
import VueDistrict from './components/vh_dist.vue'
import VueAddress from './components/vh_address.vue'

export default {
  install (Vue) {
    Vue.component('VueDistrict', VueDistrict)
    Vue.component('VueAddress', VueAddress)
  }
}

export { VueDistrict, VueAddress }
