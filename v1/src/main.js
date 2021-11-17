import Vue from 'vue'
import App from './App.vue'
import router from './config/router'
import store from './config/store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLodash from 'vue-lodash'
import lodash from 'lodash'
import VShowSlide from 'v-show-slide'
import VueMq from 'vue-mq'
import EventBus from '@/helper/EventBus.js'

Vue.config.productionTip = false

// on error + warn: play beep sound and show errorBadge
// see: https://vuejs.org/v2/api/#errorHandler
// see: https://vuejs.org/v2/api/#warnHandler
const warnAndErrorHandler = (err, vm, info) => {
	// err: error trace
	// vm: component in which error occured
	// info: Vue specific error information such as lifecycle hooks, events etc.

	// TODO: Perform any custom logic or log to server
	const componentName = vm.$options.name

	// remove eventually previously added errorBadge
	const prevErrorBadge = document.body.querySelector('errorBadge')
	if (prevErrorBadge) document.body.removeChild(prevErrorBadge)
	// Show red dot as visible error indicator
	const badgeHeight = '150px'
	const errorBadgeElm = document.createElement('div')
	errorBadgeElm.classList.add("errorBadge")
	errorBadgeElm.style.cssText = `
		position: fixed;
		border-radius: 50%;
		top: calc( 50% - ( ${badgeHeight} * 0.5 ) );
		left: calc( 50% - ( ${badgeHeight} * 0.5 ) );
		width: ${badgeHeight};
		height: ${badgeHeight};
		opacity: 0.85;
		z-index: 100000;
		background: red;
	`;
	document.body.appendChild(errorBadgeElm);

	console.group('%cerrorHandler() •', 'color : red', componentName)
	console.error('err:', err)
	console.log('%cvm:', 'color : red', vm)
	console.log('%cinfo:', 'color : red', info)
	console.groupEnd()

	const a = new AudioContext() // browsers limit the number of concurrent audio contexts, so you better re-use'em

	function beep(vol, freq, duration) {
		const v = a.createOscillator()
		const u = a.createGain()
		v.connect(u)
		v.frequency.value = freq
		v.type = "square"
		u.connect(a.destination)
		u.gain.value = vol * 0.01
		v.start(a.currentTime)
		v.stop(a.currentTime + duration * 0.001)
	}

	beep(10, 320, 150)
}
Vue.config.warnHandler = warnAndErrorHandler
Vue.config.errorHandler = warnAndErrorHandler

Vue.use(VueAxios, axios)
Vue.use(VueLodash, {lodash: lodash})
Vue.use(VShowSlide)
Vue.use(VueMq, {
	breakpoints: {
		xs: 500,
		sm: 715,
		md: 1130,
		desktop: 1364,
		lg: 1365,
		xl: 1950,
	}
})

// Setup and mount root
new Vue({
	router,
	store,
	data() {
		return {}
	},
	watch: {},
	computed: {},
	methods: {},
	created() {},
	mounted() {
		// store current route in vuex
		// needs short delay to get the app running
		// before we can access the current route
		setTimeout(() => {
			// store current route on load
			this.$nextTick(() => {
				const currentRoute = this.$route
				//console.log('currentRoute:', currentRoute)
				this.$store.commit('setRoute', currentRoute)
			})
			// store current route before each route change
			this.$router.beforeEach((to, from, next) => {
				this.$store.commit('setRoute', to)
				next()
			})
		}, 50)
	},
	render: h => h(App)
}).$mount('#app')
