<!--

	Was macht diese Componente?
	Wofür ist die Compoente da?

	Beispiel Code:

		<MhRouterView :isContentReady="true">
			<div> My View Content</div>
		</MhRouterView>

	Props:
		Boolean  isContentReady  true < will fadein/show the view content, false will hide it

	2021-02-04	init

-->

<template>
	<div class="MhRouterView" :class="elmClasses">
		<slot></slot>
	</div>
</template>

<script>
	// @ is an alias to /src
	import EventBus from '@/helper/EventBus.js'
	//import DevInfos from '@/components/DevInfos.vue'

	export default {
		name: 'MhRouterView',
		components: {},
		mixins: [],
		props: {
			isContentReady : {
				type: [Boolean],
				default: true,
			},
		},
		data() {
			return {
				scrollPosition : {
					listen         : true,
					doRestore      : false,
					wasPopstateNav : false,
				},
			}
		},
		watch: {
			isContentReady: {
				immediate: true,
				handler( to, from, doLog = false ) {
					if( doLog ){
						console.groupCollapsed( this.$options.name, '• watch isContentReady', from, to)
						console.groupEnd()
					}

					this.$nextTick(() => {
						// 1	restore scroll position
						if( to ) this.scrollRestorationHandler('viewContentIsReady')
						// 2	emit that i am ready
						EventBus.$emit('MhRouterView--viewContentIsReady', to)
					})
				},
			},
		},
		computed: {
			app(){
				return this.$root.$children[0]
			},
			elmClasses(){
				let classes = []
				let doLog = false

				if( doLog ){
					console.groupCollapsed( this.$options.name, '• elmClasses', this.isContentReady)
					console.groupEnd()
				}

				if( this.isContentReady ){
					// das hat mit $nextTick nicht geklappt,
					// warum war das gleich nochmal drin?
					//this.$nextTick(() => {})

					classes.push('MhRouterView--showContent')
				}

				return classes
			},
		},
		methods: {
			scrollRestorationHandler( eventName, doLog = false ){
				const currentComponent = this.$options.name
				const urlPath          = this.$route.path
				const scrollY          = sessionStorage.getItem( 'scrollY--' + urlPath ) ? parseInt( sessionStorage.getItem( 'scrollY--' + urlPath ) ) : 0

				// bind onScrollEvent
				// reset scroll position to 0,0 < erstmal wieder deaktiviert, wird vermutlich gar nicht benötigt
				if( eventName == 'viewComponentIsCreated' ){
					if( doLog ){
						console.group(this.$options.name + ' • scrollRestorationHandler("created")')
						console.groupEnd()
					}
					//window.addEventListener('popstate', this.onPopstateEvent )
					window.addEventListener('scroll', this.onScrollEvent )
					this.scrollPosition.listen = false
					//window.scrollTo(0, 0) // warum wird hier zuerst mal auf 0,0 gesetzt?
				}
				// check if it was popstate nav
				// sets doRestore boolean
				if( eventName == 'viewComponentIsMounted' ){
					const wasPopstateNav = sessionStorage.getItem('wasPopstateNav')
					const wasReloadNavigation = sessionStorage.getItem('wasReloadNavigation')

					if( wasPopstateNav || wasReloadNavigation ){
						this.scrollPosition.doRestore = true
						this.scrollPosition.wasPopstateNav = true
					}else{
						this.scrollPosition.doRestore = false
						this.scrollPosition.wasPopstateNav = false
					}
					sessionStorage.removeItem('wasPopstateNav')
					sessionStorage.removeItem('wasReloadNavigation')

					//this.scrollPosition.doRestore = true

					if( doLog ){
						//console.group(this.$options.name + ' • scrollRestorationHandler("mounted") • wasPopstateNav:', wasPopstateNav)
						console.group(this.$options.name + ' • scrollRestorationHandler("mounted")')
						console.groupEnd()
					}
				}
				// restore scroll position
				// triggered by watcher for "isContentReady"
				if( eventName == 'viewContentIsReady' ){
					if( doLog ){
						console.group(this.$options.name + ' • scrollRestorationHandler("viewContentIsReady") • scrollY:', scrollY)
						console.groupEnd()
					}

					if( this.scrollPosition.doRestore ){
						window.scrollTo(0, scrollY)
						// wofür war das $nextTick nochmal wichtig?
						this.$nextTick(()=>{})
						// short delay für die boolean wird gebracht,
						// weil ansonsten der scrollTo aufruf mit gecaptured wird
						setTimeout( ()=>{
							this.scrollPosition.listen = true
						}, 50)
					}else{
						window.scrollTo(0, 0)
						// wofür war das $nextTick nochmal wichtig?
						this.$nextTick(()=>{})
						// short delay für die boolean wird gebracht,
						// weil ansonsten der scrollTo aufruf mit gecaptured wird
						setTimeout( ()=>{
							this.scrollPosition.listen = true
						}, 50)
					}

					setTimeout( ()=>{
						const scrollY = window.pageYOffset
						if( doLog ) console.log(currentComponent + ': delayed ready() • window.pageYOffset:', scrollY )
					}, 1000)
				}
				// unbind onScrollEvent
				if( eventName == 'viewComponentIsDestroyed' ){
					window.removeEventListener('scroll', this.onScrollEvent )

					/*
					// needs short delay before removing onPopstateEvent
					// it wont trigger the event without this delay
					setTimeout( ()=>{
						window.removeEventListener('popstate', this.onPopstateEvent )
					}, 50)
					*/
				}
			},
			onScrollEvent( e, doLog = false ){
				const doCaptureScroll  = true // to quick disable this feature on dev
				const scrollY          = window.pageYOffset
				const urlPath          = this.$route.path

				if( this.scrollPosition.listen && doCaptureScroll ){

					if( doLog ){
						console.groupCollapsed(this.$options.name + ' • onScrollEvent()', scrollY )
						console.log('urlPath:', urlPath)
						console.groupEnd()
					}

					sessionStorage.setItem('scrollY--' + urlPath, scrollY)
				}
			},
		},
		beforeCreate( doLog = false ){
			if( doLog ){
				console.groupCollapsed('MhRouterView • beforeCreate')
				console.groupEnd()
			}
		},
		created( doLog = false ){
			this.scrollRestorationHandler('viewComponentIsCreated')

			if( doLog ){
				console.groupCollapsed('MhRouterView • created')
				console.groupEnd()
			}
		},
		beforeMount( doLog = false ){
			if( doLog ){
				console.groupCollapsed('MhRouterView • beforeMount')
				console.groupEnd()
			}
		},
		mounted( doLog = false ){
			this.scrollRestorationHandler('viewComponentIsMounted')

			if( doLog ){
				console.groupCollapsed('MhRouterView • mounted')
				console.groupEnd()
				console.log('')
			}
		},
		beforeDestroy( doLog = false ){
			if( doLog ){
				console.groupCollapsed('MhRouterView • beforeDestroy')
				console.groupEnd()
			}
		},
		destroyed( doLog = false ){
			this.scrollRestorationHandler('viewComponentIsDestroyed')

			if( doLog ){
				console.groupCollapsed('MhRouterView • destroyed')
				console.groupEnd()
			}
		},
	}
</script>

<style lang="less">
	// all styling is in MhRouterViewWrapper.vue
</style>
