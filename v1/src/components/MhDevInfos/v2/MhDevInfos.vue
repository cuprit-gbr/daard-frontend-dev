<!--

	Diese Componente blendet Dev Infos am unterem Bildschirmrand ein.
	Es können verschiedene [showBorders] aktiviert werden.
	Der Name der aktuellen Route wird angezeigt.


	Welche $props gibt es?
		showOnHosts		String | Array
		doLog		    Boolean
		show		    Boolean

	Beispiel Code:
		<MhDevInfos></MhDevInfos>

		<MhDevInfos
			:doLog="true"
			:showOnHosts="[
				'localhost',
				'digiguide.local',
				'digiguide-staging.opelvillen.de'
			]"
			:show="_.get( userInfos, 'display_name' ) ? true : undefined"
		></MhDevInfos>

	2021-11-12	improvement: add boolean prop 'show' to force show/hide
							 this works independend from 'showOnHosts'
	2021-11-12	improvement: add elm that shows the current css bp
	2021-10-08	improvement: remove dependencies from vue-lodash
	2021-10-08	improvement: show $route.name and $mq only if available
	2021-10-08	improvement: added throttle to window resize callback
	2021-07-26	improvement: bindings und localStorage werden nur ausgeführt, wenn die doShow=true
	2021-07-25	improvement: renamed classes from devInfos to MhDevInfos
	2021-07-25	improvement: increased number of checkboxes to 8
	2020-07-25	improvement: removed useless scoped attribute at <style>
	2020-02-24	improvement: added pointer-events none to non clickable areas
	2019-06-16	renamed component from DevInfos to MhDevInfos
	2019-06-16	added showOnHosts prop

-->

<template>
	<div class="MhDevInfos" v-if="doShow">
		<div class="MhDevInfos__row" :class="{'MhDevInfos__row--isHidden' : !store.barIsVisible}">
			<div class="MhDevInfos__col MhDevInfos__col--left">
				<span v-if="routeName" v-html="routeName + ' • '"></span>
				{{windowInnerWidth}}px
				<span class="MhDevInfos__mq" v-if="mq" v-html="' • ' + mq"></span>
			</div>
			<div class="MhDevInfos__col MhDevInfos__col--right">
				<input
					class="MhDevInfos__checkbox"
					type="checkbox"
					v-model="store.showBorders[index]"
					v-for="(checkbox, index) in store.showBorders"
					:key="index"
				/>
			</div>
		</div>
		<div class="MhDevInfos__toggleRowBtn" @click="store.barIsVisible = !store.barIsVisible" :class="{'MhDevInfos__toggleRowBtn--isActive' : !store.barIsVisible}">
			<div>
				<span></span>
				<span></span>
			</div>
		</div>
	</div>
</template>

<script>
	import { get, isArray, includes, throttle } from 'lodash'

	export default {
		name: 'MhDevInfos',
		components: {},
		props: {
			showOnHosts: {
				type     : [Array, String],
				default  : undefined,
				required : false,
			},
			show: {
				type     : [Boolean, String],
				default  : '',
				required : false,
			},
			doLog: {
				type     : [Boolean],
				default  : false,
				required : false,
			},
		},
		data() {
			return {
				windowInnerWidth : window.innerWidth,
				bodyElm : null,
				store : {	// this object is watched and saved to localStorage on change
					barIsVisible: false,
					showBorders: [
						false,
						false,
						false,
						false,
						false,
						false,
						false,
						false,
					],
				},
				isInit : false,
			}
		},
		watch: {
			'store.showBorders' ( to, from ){
				this.setBorderAttributes()
			},
			store: {
				handler: function( to, from ) {
					const parsed = JSON.stringify( this.store )
					localStorage.setItem( 'MhDevInfos', parsed )
				},
				deep: true,
			},
			doShow: {
				handler: function( to, from ) {
					if( to && !this.isInit ) this.init()
				},
				immediate: true,
				deep: true,
			},
		},
		computed: {
			doShow(){
				const validHosts  = this.showOnHosts
				const currentHost = this.hostname
				const doLog       = this.doLog
				let doShow        = false

				// show MhDevInfos if currentHost is in given hosts
				if( isArray( validHosts ) ){
					if( includes( validHosts, currentHost ) ) doShow = true
				}
				// show MhDevInfos if currentHost is given host
				else if( this._.isString( validHosts ) ){
					if( validHosts == currentHost ) doShow = true
				}
				// show by default, no host as prop given
				else if( !validHosts ) {
					doShow = true
				}

				if( this.show === true ) doShow = true
				if( this.show === false ) doShow = false

				if( doLog ) {
					console.groupCollapsed( this.$options.name, '• doShow' )
					console.log( 'show:', this.show )
					console.log( 'validHosts:', validHosts )
					console.log( 'currentHost:', currentHost )
					console.log( 'doShow:', doShow )
					console.groupEnd()
				}

				return doShow
			},
			hostname() {
				return window.location.hostname
			},
			routeName(){
				return get( this.$route, 'name' )
			},
			mq(){
				return this.$mq
			},
		},
		methods: {
			onResize(){ // setWindowInnerWidth
				this.windowInnerWidth = window.innerWidth
			},
			setBorderAttributes(){
				for (let i = 0; i < this.store.showBorders.length; i++) {
					let value = this.store.showBorders[i]
					let index = i+1
					if(value){
						this.bodyElm.setAttribute('showBorders' + index, '')
					}else{
						this.bodyElm.removeAttribute('showBorders' + index)
					}
				}
			},
			toggleDevInfosBar(){},
			bindKeydowns(){ // bind: keydown events, toggle checkboxes via keyboard, etc
				let prevKeycode = null
				let prevShowBorders = null

				//console.log('bindKeydowns')

				document.addEventListener("keydown", (e) => {
					var keyCode          = e.keyCode;
					var activeElmTagName = document.activeElement.tagName.toLowerCase()
					var validKeyCodes    = [49, 50, 51, 52, 53, 54, 55, 56, 57] // 49 means 1, 50 means 2 ...
					var checkboxIndex	 = keyCode - 49

					//console.log(keyCode)

					// not if input or textarea is focused
					if(activeElmTagName == 'input' || activeElmTagName == 'textarea') return

					// w: toggle borders
					if(keyCode == 87){
						if(prevKeycode == 87){
							//console.log('w + w')
							this.store.showBorders = prevShowBorders
							prevShowBorders = this.store.showBorders
							keyCode = false
						}else{
							//console.log('w')
							prevShowBorders = this.store.showBorders
							this.store.showBorders = new Array(this.store.showBorders.length).fill(false)
						}

						e.preventDefault() // needed for ff to prevent triggering site search
					}

					// h: toggle MhDevInfos Bar
					if(keyCode == 72){
						this.store.barIsVisible = !this.store.barIsVisible
						e.preventDefault() // needed for ff to prevent triggering site search
					}

					// esc: uncheck all checkboxes
					if(keyCode == 27){
						this.store.showBorders = new Array( this.store.showBorders.length ).fill( false )
					}

					// 1-5: toggle checkbox by index
					if(validKeyCodes.indexOf(keyCode) > -1){
						var clone = this.store.showBorders.slice(0); // use clone to force reactivity
						clone[checkboxIndex] = !clone[checkboxIndex]
						this.store.showBorders = clone
						e.preventDefault() // needed for ff to prevent triggering site search
					}

					prevKeycode = keyCode

				}, 	false)
			},
			init(){
				// get store data from localStorage if there is any
				if( localStorage.getItem('MhDevInfos') ) {
					try {
						// compare length before restore to
						// be variable with the number of checkboxes in
						// further development
						const jsonStore = JSON.parse( localStorage.getItem( 'MhDevInfos' ) );
						this.store = jsonStore.showBorders.length === this.store.showBorders.length ? jsonStore : this.store
					} catch(e) {
						localStorage.removeItem( 'MhDevInfos' );
					}
				}

				this.bodyElm = document.getElementsByTagName("body")[0];
				this.bindKeydowns()
				this.setBorderAttributes()
				this.isInit = true

				window.addEventListener('resize', throttle( this.onResize, 250 ) )
			},
		},
		created(){},
		mounted(){},
		destroyed(){
   			window.removeEventListener('resize', this.onResize)
 		},
	}
</script>

<style lang="less">
	@import (reference) "@/less/vars.less";

	.MhDevInfos {
		//outline: 1px solid red;

		position: fixed;
		left: 0; right: 0; bottom: 0em;
		display: flex;
		justify-content: space-between;
		z-index: 1000;
		font-size: 13px;
		line-height: 13px;
		pointer-events: none;
		color: black;

		&__row {
			transition: all 0.5s ease;
			position: relative;
			display: flex;
			justify-content: space-between;
			flex-grow: 1;
		}
		&__row--isHidden {
			transform: translateX(110%);
		}
		&__col {
			padding: 0.25em 0.35em;
			flex-grow: 0;
			background-color: yellow;
			pointer-events: auto;
		}

		&__toggleRowBtn {
			@width: 1.43em;

			position: relative;
			display: flex;
			flex-grow: 0;
			align-items: stretch;
			background-color: darken(yellow, 10);
			background-color: yellow;
			width: @width;
			pointer-events: auto;
			cursor: pointer;

			div {
				//background-color: black;
				flex-grow: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				//justify-content: space-between;
				border: 0.2em solid transparent;
				//border-top-width: 0.35em;
				//border-bottom-width: 0.35em;
			}

			span {
				transition: all 0.2s ease;
				display: block;
				background-color: black;
				height: 1px;
				width: 100%;
				margin: 0;
			}
			span:nth-child(1) {
				transform: rotate(45deg) translateY(50%);
			}
			span:nth-child(2) {
				transform: rotate(-45deg) translateY(-50%);
			}
		}
		&__toggleRowBtn--isActive {
			span:nth-child(1),
			span:nth-child(2),
			span:nth-child(3) {
				margin: 1px 0;
				transform: none;
			}
		}

		&__checkbox {
			& + & {
				margin-left: 0.25em;
			}
		}

		&__mq::after {
			padding-left: 0.25em;
		}
	}

	@media @mq[dt] { .MhDevInfos__mq::after { content: "• dt"; } }
	@media @mq[lg] { .MhDevInfos__mq::after { content: "• lg"; } }
	@media @mq[xl] { .MhDevInfos__mq::after { content: "• xl"; } }
	@media @mq[md] { .MhDevInfos__mq::after { content: "• md"; } }
	@media @mq[sm] { .MhDevInfos__mq::after { content: "• sm"; } }
	@media @mq[xs] { .MhDevInfos__mq::after { content: "• xs"; } }
</style>
