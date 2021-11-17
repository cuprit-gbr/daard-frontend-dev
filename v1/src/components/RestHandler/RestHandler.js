/*

	RestHandler mixin extends a component with some useful methods to perform axios requests

	Usage example in component (RestHandler needs to be included as mixin):

	this.restHandler__fetch({
		action : 'GET',
		route : '/wp-json/wp/v1/pages',
		params : {
			postId : 341,
		},

		callback : (response) => {

		}),
	})

	❌ Braucht Refactor. Funktionierte ursprünglich mit appConfig.js
		um restBase() festzulegen. Das ist allerdings jetzt raus
		bzw. durch config/env.js ersetzt

	2021-06-22	bugfix: changed code in restHandler__serializeParams, it didnt work before
	2021-06-02	improvement: change code in restHandler__serializeParams to pass eslint
	2020-02-14	improvement: store response only if caching is activated
	2019-12-08	improvement: now only GET-request will be cached
	2019-11-08	refactor/improvements:
				- cleaner code in restHandler__fetch()
				- switches from axios.get() to axios( { config } ) to get post, put, delete working

	2019-09-27	improvement: add var "restHandler__useCaching" to toggle caching
	2019-06-14	bugfix: currentEnvironment in restBase() wurde mehrmals gesetzt
	2019-06-02	rename: restHandler__debugLog to debugLog
	2019-06-02	improvement: EventBus
	2019-05-21	improvement: removed trailing ? from url if there are no params
	2018-11-08	feature: just compare if the hostname from appConfig.js has indexOf, helps to work with local ip ranges like 192.168.
	2018-10-10	init

*/
//import appConfig from '@/../appConfig.js'
import state from "./state";
import EventBus from '@/helper/EventBus.js'

export default {
	name: 'RestHandler',
	watch: {},
	data() {
		return {
			debugLog: false,
			/*
			restHandler__useCaching : false,
			*/
			restHandler__useCaching: true,
		}
	},
	computed: {
		restBase() {	// returns baseUrl, e.g. "https://ies.local:8080"
			/*
			const currentHostname = location.hostname
			const environments = appConfig.environments
			const debugLog = false //this.debugLog
			let currentEnvironment = null
			let restBase = null


			if( debugLog ) console.log('')
			if( debugLog ) console.group('RestHandler.js')
			if( debugLog ) console.log('currentHostname: ' + currentHostname)

			this._.forEach(environments, function(value, key){
				if( debugLog ) console.log('	value.hostname: ' + value.hostname + ' > ' + currentHostname.indexOf( value.hostname ))

				// 2019-06-14  currentEnvironment wird nur gesetzt wenn zuvor noch nicht
				if( currentHostname.indexOf( value.hostname ) > -1 && !currentEnvironment ){
					currentEnvironment = key
				}
			})

			if( currentEnvironment ){
				restBase = environments[currentEnvironment].restBase.replace(/\/$/, "")

				if( debugLog ) console.log('	currentEnvironment: ' + currentEnvironment)
				if( debugLog ) console.log('	restBase: ' + restBase)
			}

			if( debugLog ) console.groupEnd('RestHandler.js')

			return restBase
			*/

			return ''
		},
	},
	methods: {
		restHandler__serializeParams(obj, prefix) {
			/*
			var str = [],
				p;
			for (p in obj) {
				//if (obj.hasOwnProperty(p)) {
				if( Object.prototype.hasOwnProperty.call(obj, "bar") ){
					var k = prefix ? prefix + "[" + p + "]" : p,
						v = obj[p];
					str.push((v !== null && typeof v === "object") ?
						this.restHandler__serializeParams(v, k) :
						encodeURIComponent(k) + "=" + encodeURIComponent(v));
				}
			}
			return str.join("&");
			*/

			// taken from https://stackoverflow.com/a/6566471/7899788
			var str = "";
			for (var key in obj) {
				if (str != "") {
					str += "&";
				}
				str += key + "=" + encodeURIComponent(obj[ key ]);
			}
			return str
		},
		restHandler__fetch(args) {
			const requestUrl = this._.trimEnd(this.restBase + args.route)
			const requestUrlWithParams = this._.trimEnd(requestUrl + '?' + this.restHandler__serializeParams(args.params), '?')
			const requestInCache = this._.find(this.$store.state.restHandler.responses, {requestUrlWithParams});

			// logs for debug
			if (this.debugLog) {
				console.log('')
				console.group('RestHandler restHandler__fetch()')
				console.log('args.action          : ', args.action)
				console.log('args.route           : ', args.route)
				//console.log('	args.params    : ' + this.restHandler__serializeParams(args.params))
				console.log('args.params          : ', args.params)
				console.log('args.data            : ', args.data)
				console.log('restBase             : ', this.restBase)
				console.log('requestUrl           : ', requestUrl)
				console.log('requestUrlWithParams : ', requestUrlWithParams)
				console.log('requestInCache       : ', this._.isObject(requestInCache))
				console.groupEnd()
			}

			// there is a cached request, return this
			if (requestInCache && this.restHandler__useCaching) {
				args.callback(requestInCache.response)
			}
			// no cached request yet:
			// 1. perform the request
			// 2. cache resonse for GET-requests
			else {
				this.axios({
					method: args.action.toLowerCase(),
					url: requestUrl,
					//url: requestUrl + '?' + this.restHandler__serializeParams( args.params ),
					//params: this.restHandler__serializeParams( args.params ),
					//params: args.params ? this.restHandler__serializeParams( args.params ) : null,
					params: args.params ? args.params : null,
					data: args.data ? args.data : null,
					headers: args.headers ? args.headers : null,
					//crossdomain: true,
				})
					.then(response => {
						// cache response but only if it was a GET request
						if (args.action.toLowerCase() == 'get' && this.restHandler__useCaching) {
							this.$store.commit("addResponse", {
								requestUrlWithParams,
								response,
							})
						}

						args.callback(response)
					})
			}
		},
		restHandler__fetchAllPaginatedPosts(args) {	// walks the pagination

			const self = this
			const debugLog = this.debugLog
			const perPage = args.params.perPage || 50

			let params = args.params
			params[ 'paged' ] = 1
			params[ 'perPage' ] = perPage
			let paginationLinks
			let stillToFetch
			let pages = {}
			let posts = []

			if (debugLog) console.log('%cRestHandler restHandler__fetchAll()', 'font-weight: bold; margin-top: 1em;')

			// 1. get pagination links
			this.restHandler__fetch({
				action: args.action,
				route: args.route,
				params: params,
				callback: (response) => {
					paginationLinks = response.data.info.paginationLinks
					stillToFetch = paginationLinks.length

					fetchAllPages()

				}
			})

			// 2. walk all paginationLinks and get posts
			function fetchAllPages() {

				self._.forEach(paginationLinks, (paginationLink, i) => {

					self.restHandler__fetch({
						action: args.action,
						route: args.route,
						params: {
							postType: args.params.postType,
							perPage: perPage,
							paged: i + 1,
						},
						callback: (response) => {
							stillToFetch = stillToFetch - 1
							pages[ response.data.info.currentPage ] = response.data.result

							if (debugLog) console.log('	fetched from   : ' + response.data.request.url + ' > posts: ' + response.data.result.length + ', open: ' + stillToFetch)

							if (!stillToFetch) {
								afterFetchAllPages()
							}
						}
					})
				})

			}

			// 3. merge all pages to posts-array
			function afterFetchAllPages() {

				self._.forEach(paginationLinks, (paginationLink, i) => {
					const pagePosts = pages[ i + 1 ]

					self._.forEach(pagePosts, (pagePost, i) => {
						posts.push(pagePost)
					})

				})

				if (debugLog) console.log('	finished, all posts fetched, return posts (' + posts.length + ')')

				args.callback(posts)

			}

		},
	},
	beforeCreate() {},
	created() {
		// register vuex module
		// only once
		const alreadyRegistered = this.$store.state.restHandler ? true : false

		if (!alreadyRegistered) {
			this.$store.registerModule("restHandler", state)
		}
	},
	mounted() {},
}
