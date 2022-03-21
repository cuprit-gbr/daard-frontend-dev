<!--

	Diese Componente kümmert sich darum, dass interne Links aus
	HTML-Richtext zum Router delegiert werden.
	Am besten in App.vue integrieren.

	Taken from https://dennisreimann.de/articles/delegating-html-links-to-vue-router.html
	and improved

	Just add to App.vue
		<MhDelegateLinks></MhDelegateLinks>

	-----------------
	TODO: den fall behandeln, wenn in envConfig eine leerer hostnamen dabei ist, z.B.
	{
		name     : 'live',
		hostname : '',
		restHost : ''
	},
	Damit werden auch exteren links als interne erkannt
	-----------------

	2021-10-31	v5
	2021-10-31	bugfix: removed is404 from clickHandler
	2021-10-31	improvement: rename is404() to isFetchAll() < but do i need this method anymore? i think not ...
	2021-10-31	improvement: some code format fixes

	2021-10-06	bugfix: links mit download attribute werden nun ignoriert
	2021-10-02	bugfix: links mit hash #405 waren preventDefault, jetzt werden sie durchgelassen
	2021-10-02	improvement: added prop doLog

	2021-09-26	bugfix: console.group was missing
	2021-08-30	bugfix: download-links wurden nicht behandelt. jetzt werden alle links zu "wp-content/uploads" durchgereicht.
	2021-08-07	bugfix: if else else abfrage hat falsch geendet wenn <a target></a> mit attr target aber ohne füllung
	2021-06-17	improvement: removed sill logging
	2021-06-17	improvement: isDownloadURL prüft jetzt ob die url ein string ist
	2021-06-17	improvement: exclude routerLink via class-string contains "routerLink"
	2021-06-16	bufix: doLog im clickHandler hat in bestimmten Fällen das groupEnd() weggelassen
	2021-06-13	improvement: bei den hosts in env.js wird jetzt nur noch der anfang des strings verglichen, damit kann z.B. getestet werden ob die adresse mit 192 beginnt. hilfreich für's lokale testen

	2021-05-31	improvement: changed logging
	2020-12-04	refactor: works now with config/env.js
	2019-06-06	init

-->

<template>
	<div class="MhDelegateLinks"></div>
</template>

<script>
	// @ is an alias to /src
	import EventBus from '@/helper/EventBus.js'
	import envConfig from '@/config/env.js'

	export default {
		name: 'MhDelegateLinks',
		components: {},
		mixins: [],
		props: {
			doLog: {
				type     : [Boolean],
				default  : false,
				required : false,
			},
		},
		data(){
			return {
				internalHosts : [], // extracted from envConfig on mount
			}
		},
		watch: {},
		computed: {
			XXinternalHosts(){
				return this.getInternalHosts()
			},
			currentHost(){
				return window.location.hostname
			},
		},
		methods: {
			/*
			getInternalHosts(){	// extracted from envConfig
				let internalHosts = []

				const internalHost2s = this._.map( envConfig, 'hostname' )

				console.log('internalHost2s:', internalHost2s)

				this._.forEach( envConfig, (env) => {
					internalHosts.push( env.hostname )
				})

				return internalHosts
			},
			*/
			isURL( str ){
				try {
					new URL( str );
				}
				catch (_){
					return false;
				}

				return true;
		    },
			isFetchAll( url ){ // resolve route. will it lead to NotFoundView?
				let resolved = this.$router.resolve( url )

				return resolved.route.path === '*' ? true : false

				/*
				if( resolved.route.name === 'NotFoundView' ){
					return true
				}
				else{
					return false
				}
				*/
			},
			isDownloadURL( url ){ // checks if path starts with /wp-content/
				let is = false

				// just exclude every link that goes to wp-content dir
				is = this._.isString( url ) ? url.indexOf("/wp-content/") != -1 : false

				return is
			},
			clickHandler( event, doLog = false ){
				// makes doLog available via prop
				if( this.doLog ) doLog = true

				// ensure we use the link, in case the click has been received by a subelement
				let { target } = event
				while (target && target.tagName !== 'A') target = target.parentNode

				const href           = target && target.href ? target.href : false
				const hash           = this.isURL( href ) ? new URL( href ).hash : ''
				const hrefHost       = this.isURL( href ) ? new URL( href ).hostname : false
				const routeTo        = this.isURL( href ) ? new URL( href ).pathname + new URL( href ).search + hash : false
				//const is404          = this.is404( routeTo )
				const isFetchAll     = this.isFetchAll( routeTo )
				const isDownloadURL  = this.isDownloadURL( href )
				const isDownloadLink = target && target.hasAttribute('download')
				const isRouterLink   = target && target.getAttribute('class') && target.getAttribute('class').indexOf('routerLink') !== -1
				let   theReturn      = undefined

				//const isInternal    = this._.includes( this.internalHosts, hrefHost )
				let isInternal = false
				this._.forEach( this.internalHosts, (validHost)=>{
					if( this._.startsWith( hrefHost, validHost ) ){
						//console.log('1', validHost, hrefHost)
						isInternal = true
					}else{
						//console.log('2', validHost, hrefHost)
					}
				})

				if( doLog ){
					console.groupCollapsed( this.$options.name, '• clickHandler()')
					console.log('           target:', target)
					console.log('     isRouterLink:', isRouterLink)
					console.log('             href:', href)
					console.log('             hash:', hash)
					console.log('    internalHosts:', this.internalHosts)
					console.log('         hrefHost:', hrefHost)
					console.log('       isInternal:', isInternal)
					console.log('       isFetchAll:', isFetchAll)
					console.log('          routeTo:', routeTo)
					console.log('    isDownloadURL:', isDownloadURL)
					console.log('   isDownloadLink:', isDownloadLink)
				}

				// exclude links without href and router-links
				if( !href || isRouterLink ){
					if( doLog ) console.groupEnd()
					return
				}
				// exclude download urls and links
				if( isDownloadURL || isDownloadLink ){
					if( doLog ) console.groupEnd()
					return
				}

				// handle only internal links that have a valid route
				//if( target && isInternal && !is404 ){
				if( target && isInternal ){

					// some sanity checks taken from vue-router:
					// https://github.com/vuejs/vue-router/blob/dev/src/components/link.js#L106
					const { altKey, ctrlKey, metaKey, shiftKey, button, defaultPrevented } = event

					// don't handle with control keys
					if( metaKey || altKey || ctrlKey || shiftKey ){
						if( doLog ) console.log('1')
						theReturn = false
					}
					// don't handle when preventDefault called
					/*
					else if( defaultPrevented ){
						if( doLog ) console.log('2')
						theReturn = false
					}
					*/
					// don't handle right clicks
					else if( button !== undefined && button !== 0 ){
						if( doLog ) console.log('3')
						theReturn = false
					}
					// don't handle if `target="_blank"`
					else if( target && target.getAttribute('target') === '_blank' ){
						const targetAttr = target.getAttribute('target')
						const doIt = ( /\b_blank\b/i.test( targetAttr ) )

						if( doLog ) console.log('4', targetAttr, doIt)

						theReturn = doIt
					}
					// dont handle links with hash
					else if( hash ){
						if( doLog ) console.log('5 is link with hash > return it', hash)
						theReturn = true
					}
					else{
						if( doLog ) console.log('6')
						if( doLog ) console.log('window.location.pathname:', window.location.pathname)
						if( doLog ) console.log('routeTo:', routeTo)

						theReturn = false
					}
					// don't handle same page links/anchors
					//const url = new URL( target.href )
					//const to  = routeTo //url.pathname
					if( !theReturn ){
						if( doLog ) console.log('7')
						if( doLog ) console.log('	           >>>', routeTo)
						if( doLog ) console.log( this.$route )

						//this.$router.replace('/')
						if( window.location.pathname !== routeTo ) this.$router.push( routeTo )

						event.preventDefault()
						//event.stopPropagation()
					}
					else{
						if( doLog ) console.log('8')
					}
				}
				else{
					if( doLog ) console.log('	           >>> no route to push')
				}

				if( doLog ) console.groupEnd()
			},
		},
		created(){
			window.addEventListener('click', this.clickHandler)
		},
		mounted(){
			this.internalHosts = this._.map( envConfig, 'hostname' )
		},
		beforeDestroy(){
			window.removeEventListener('click', this.clickHandler)
		},
	}
</script>

<style lang="less">
	.MhDelegateLinks {}
</style>
