<!--

	MhRouterViewWrapper
	======
	Wrapper for <router-view></router-view> handles:
	✅ fade transitions on view change (for sync and async content)
	✅ show loading spinner if needed
	✅ restores scroll positions at browsers back/forward button navigation
	✅ restores scroll position after reload
	✅ restore scroll position only on popstate nav. and not just a clicked link.
	❌ set <meta title="" />
	❌ scroll to hash

	2021-06-24	bugfix: wasPopstateNav destroyed wasReloadNavigation
	2021-06-23	improvement: restore scroll position only on popstate nav. and not just a clicked link.
	2021-02-04	init

-->

<template>
	<div class="MhRouterViewWrapper">
		<!--
			<transition
			  v-on:before-enter="onTransitionEvent(beforeEnter)"
			  v-on:enter="onTransitionEvent(enter)"
			  v-on:after-enter="onTransitionEvent(afterEnter)"
			  v-on:enter-cancelled="enterCancelled"

			  v-on:before-leave="onTransitionEvent(beforeLeave)"
			  v-on:leave="onTransitionEvent(leave)"
			  v-on:after-leave="onTransitionEvent(afterLeave)"
			  v-on:leave-cancelled="leaveCancelled"
			>
		-->

		<transition
			name="fade"
			mode="out-in"
			:duration="{ leave: 150, enter: 150  }"

			v-on:before-enter="onTransitionEvent($event, 'beforeEnter')"
			v-on:enter="onTransitionEvent($event, 'enter')"
			v-on:after-enter="onTransitionEvent($event, 'afterEnter')"

			v-on:before-leave="onTransitionEvent($event, 'beforeLeave')"
			v-on:leave="onTransitionEvent($event, 'leave')"
			v-on:after-leave="onTransitionEvent($event, 'afterLeave')"

			appear>
			<router-view
				class="MhRouterViewWrapper__body"
				:key="$route.name"
			/>
		</transition>

		<!--
		-->

		<div class="MhRouterViewWrapper__debug">
			spinner.isVisible: {{spinner.isVisible}} <br/>
			viewContent.isVisible: {{viewContent.isVisible}} <br/>
		</div>

		<MhSpinner class="MhRouterViewWrapper__spinner" :class="{ 'MhRouterViewWrapper__spinner--isVisible' : spinner.isVisible }"></MhSpinner>
	</div>
</template>

<script>
	// @ is an alias to /src
	import EventBus from '@/helper/EventBus.js'
	import MhSpinner from '@/components/MhSpinner/MhSpinner.vue'

	export default {
		name: 'MhRouterViewWrapper',
		components: {
			MhSpinner
		},
		data() {
			return {
				viewContent : {
					isVisible : undefined,
					//reloadScrollY : undefined,
				},
				spinner : {
					isVisible : undefined
				},
			}
		},
		watch: {},
		computed: {
			bodyClasses(){
				let classes = []

				//if( this.isVisible.body ) classes.push('MhRouterViewWrapper__body--isVisible')

				return classes
			},
			spinnerClasses(){
				let classes = []

				//if( this.isVisible.spinner ) classes.push('MhRouterViewWrapper__spinner--isVisible')

				return classes
			},
			wasReloadNavigation(){
				// Um einen Reload von einem normalen Aufruf zu unterscheiden,
				// wird die performance API verwendet.
				// Siehe https://stackoverflow.com/a/53307588/7899788
				const pageAccessedByReload = (
					(window.performance.navigation && window.performance.navigation.type === 1) ||
					 window.performance
						.getEntriesByType('navigation')
						.map((nav) => nav.type)
						.includes('reload')
				);



				return pageAccessedByReload
			},
		},
		methods: {
			/*
			viewEventHandler( payload, doLog = false ){
				const currentComponent = this.$options.name
				const fromComponent = payload.fromComponent
				const eventName = payload.eventName

				if( doLog ){
					console.groupCollapsed('%c' + currentComponent + ': $on("ViewEvent")', 'background-color: yellow', '•', fromComponent, eventName)
					console.log('fromComponent:', fromComponent)
					console.log('    eventName:', eventName)
					console.groupEnd()
				}

				if( ['beforeDestroy', 'beforeMount'].includes( eventName ) ){
					//this.isVisible.body    = false
					//this.isVisible.spinner = true
				}
				if( ['ready'].includes( eventName ) ){
					//this.isVisible.body    = true
					//this.isVisible.spinner = false
				}
			},
			*/

			onTransitionEvent( elm, name, doLog = false ){
				if( doLog ){
					console.groupCollapsed('%c' + 'MhRouterViewWrapper • onTransitionEvent', 'background-color: yellow', name)
					console.groupEnd()
				}
			},
			/*
			// Beim Reload einer Seite soll die scroll position wieder
			// hergestellt werden. Um einen Reload von einem normalen
			// Aufruf zu unterscheiden wird die performance.navigation
			// API verwendet. Siehe: https://stackoverflow.com/a/36444134/7899788
			restoreScrollPositionOnReload(){
				const hasNavigationTimingAPISupport = window.performance ? true : false
				const urlPath = window.location.pathname
				const scrollY = sessionStorage.getItem( 'scrollY--' + urlPath ) ? parseInt( sessionStorage.getItem( 'scrollY--' + urlPath ) ) : 0

				if( hasNavigationTimingAPISupport ){
					if( performance.navigation.type == performance.navigation.TYPE_RELOAD ){
						console.log("This page is reloaded.")
						console.log("urlPath:", urlPath)
						console.log("Saved scrollY:", scrollY )

						this.viewContent.reloadScrollY = scrollY
					}else{
						console.log("This page is not reloaded")
					}
				}
			},
			*/
			// Beim Initialisieren der App sollen alle eventuell gespeicherten
			// scroll positions im sessionStorage entfernt werden,  damit nicht beim
			// neuen Navigieren eine zuvor gesetzte scroll position restored wird.
			// scroll positions sind für den jeweiligen load der SPA gültig.
			// eine ausnahme bildet die zuerst aufgerufene url einer session,
			// diese wird nicht entfernt, da bei einem reload der seite die
			// scroll position sehr wohl wieder hergestellt werden soll.
			removeSavedScrollPositionsInSessionStorage(){
				const sessionStorageKeys = Object.keys(sessionStorage)
				const currentPathKey     = this.wasReloadNavigation ? 'scrollY--' + window.location.pathname : ''
				const scrollPositionKeys = this._.filter( this._.clone(sessionStorageKeys), (k)=>{ return this._.startsWith(k, 'scrollY--') && k !== currentPathKey } )
				//console.log( sessionStorageKeys )
				//console.log( scrollPositionKeys )
				//console.log('currentPathKey:', currentPathKey)

				scrollPositionKeys.forEach((k)=>{
					sessionStorage.removeItem( k )
				})
			},
			handlePopstateEvent( e, doLog = true ){
				// groupCollapsed group
				if( doLog ){
					console.groupCollapsed( this.$options.name, '• handlePopstateEvent()' )
					console.log("location: " + document.location + ", state: " + JSON.stringify(e.state))
					console.groupEnd()
				}

				sessionStorage.setItem('wasPopstateNav', 1)
			},
		},
		beforeCreate(){
			// Handle scrollRestoration manual, prevents browser from doing it
			if('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
		},
		created(){},
		beforeMount(){},
		mounted(){
			EventBus.$on('MhRouterView--viewContentIsReady', (state, doLog = false )=>{

				if( doLog ){
					console.groupCollapsed( this.$options.name, '• $on MhRouterView--viewContentIsReady', state)
					console.groupEnd()
				}

				this.viewContent.isVisible = state
				this.spinner.isVisible     = !state

				/*
				if( this.viewContent.reloadScrollY && state ){
					window.scrollTo(0, this.viewContent.reloadScrollY)
				}
				*/

				//console.groupEnd()
			})

			//this.restoreScrollPositionOnReload()
			this.removeSavedScrollPositionsInSessionStorage()

			if( this.wasReloadNavigation ) sessionStorage.setItem('wasReloadNavigation', 1)

			window.addEventListener('popstate', this.handlePopstateEvent)
		},
		beforeDestroy(){},
		destroyed(){
			window.removeEventListener('popstate', this.handlePopstateEvent)
		},
	}
</script>

<style lang="less">
	@import (reference) "../../../less/vars.less";
	@import (reference) "../../../less/mixins.less";
	@import (reference) "../../../less/atoms.less";

	@MhRouterView : {
		contentTransitionDuration : 150ms;
		contentTransitionDelay    :   0ms; // wofür war das gleich nochmal gut?
		spinnerTransitionDuration : 350ms;
	}

	.MhRouterView { // transition between views
		transition-duration: @MhRouterView[contentTransitionDuration];
		transition-property: opacity;
		transition-timing-function: ease;
		opacity: 0;

		&.fade-enter-active,
		&.fade-leave-active {
			//transition-duration: @MhRouterView__transitionDuration;
			transition-duration: @MhRouterView[contentTransitionDuration];
			transition-property: opacity;
			transition-timing-function: ease;
		}
		&.fade-enter-active {
			transition-delay: @MhRouterView[contentTransitionDelay] !important;
		}
		&.fade-enter,
		&.fade-leave-active {
			opacity: 0;
			transition-delay: @MhRouterView[contentTransitionDelay] !important;
		}

		&--showContent {
			transition-delay: 50ms; // wofür war das gleich da?
			opacity: 1;
		}
	}
	.MhRouterViewWrapper__debug { // debug elm
		display: none !important;

		position: fixed;
		bottom: 2em; left: 2em;
		padding: 0.5em;

		background-color: fade(green, 75);
	}
	.MhRouterViewWrapper__spinner { // spinner position and appearance
		position: fixed;
		top: 50vh; left: 50vw;
		height: 2em; width: 2em;
		transform: translateX(-50%) translateY(-50%) scale(1.2);
		pointer-events: none;

		transition: all @MhRouterView[spinnerTransitionDuration] ease-out;

		stroke-width: 5px;
		color: var(--color-primary-shadow);
		circle { stroke-opacity: 0.5; }
		opacity: 0;

		&--isVisible {
			//background-color: fade(green, 50);

			// die einblendung des spinners wird etwas verzögert,
			// damit für fetches, die bereits im cache sind der
			// spinner nicht unnötig für den bruchteil einer sekunde
			// angezeigt wird.
			transition-delay: 100ms;
			opacity: 0.75;
		}

		@media @mq[md] {
			stroke-width: 3px;
		}
	}

	@media @mq[xs] {}
	@media @mq[sm] {}
	@media @mq[md] {}
	@media @mq[dt] {}
	@media @mq[lg] {}
	@media @mq[xl] {}
</style>
