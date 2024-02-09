<!--

	Was macht diese Componente?
	Wofür ist die Compoente da?

	Welche $props gibt es?

	Beispiel Code:
		<KnTabsRow
			:items = "[
				{ label : 'Disease', },
				{ label : 'Inventory', },
				{ label : 'Site', isEnabled : false, },
			]"
		></KnTabsRow>

    2021-07-05	init

-->

<template>
	<div class="KnTabsRow contentModule hSpace hSpace--formRow" name="KnTabsRow" :class="elmClasses" v-if="_.size( theItems )">
		<nav class="KnTabsRow__inner contentModule__inner">
			<a	class="KnTabsRow__item"
				v-for="(item, index) in theItems"
				:key="index"
				:tabindex="!item.isDisabled ? 0 : ''"
				:disabled="item.isDisabled"
				:class="getItemClasses( item )"
				v-html="item.label"
				@click="onClickItem( $event, item )"
			></a>
		</nav>
		<!--
		<ul></ul>
		<pre name="activeItemIndex">{{activeItemIndex}}</pre>
		<pre name="theItems">{{theItems}}</pre>
		<pre name="items">{{items}}</pre>
		-->
	</div>
</template>

<script>
	// @ is an alias to /src
	//import DevInfos from '@/components/DevInfos.vue'
	import EventBus from '@/helper/EventBus.js'

	export default {
		name: 'KnTabsRow',
		components: {},
		mixins: [],
		props: {
			//imageObject: [Object, Boolean],
			//text: [String],
			activeClass : {
				type : [String, Boolean],
				default : '',
				required : false,
			},
			inactiveClass : {
				type : [String, Boolean],
				default : '',
				required : false,
			},
			enabledClass : {
				type : [String, Boolean],
				default : '',
				required : false,
			},
			disabledClass : {
				type : [String, Boolean],
				default : '',
				required : false,
			},
			activeItemIndex : {
				type : [String, Number],
				default : 0,
				required : false,
			},
			items : {
				type : [Array, Boolean],
				default  : ()=>{
					return []
				},
				required : false,
			},
		},
		data(){
			return {
				theActiveItemIndex : undefined,
			}
		},
		watch: {
			activeItemIndex: {
				handler: function( to, from ) {
					this.theActiveItemIndex = parseInt( to )
				},
				immediate : true,
				deep: true,
			},
		},
		computed: {
			app(){
				return this.$root.$children[0]
			},
			elmClasses(){
				let classes = []

				//classes.push( this.$options.name + '--isAnimating')

				return classes
			},
			theItems(){
				const theItems = []

				this._.forEach( this.items, (item, index)=>{
					const thItem = {
						index      : index,
						label      : item.label,
						isEnabled  : this._.isBoolean( item.isEnabled ) ? item.isEnabled : true,
						isDisabled : this._.isBoolean( item.isEnabled ) ? !item.isEnabled : false,
					}
					theItems.push( thItem )
				})

				return theItems
			},
		},
		methods: {
			myFunction( doLog = true ){
				// groupCollapsed group
				if( doLog ){
					console.groupCollapsed( this.$options.name, '• onClickCloseBtn()' )
					//console.log('key:', value)
					console.groupEnd()
				}

				alert('onClickCloseBtn')
			},
			onClickItem( e, item, doLog = false ){
				// groupCollapsed group
				if( doLog ){
					console.groupCollapsed( this.$options.name, '• onClickItem()' )
					console.log('e:', e)
					console.log('item:', item)
					console.groupEnd()
				}

				this.theActiveItemIndex = item.index
				this.$emit('tabChange', item.index)
			},
			getItemClasses( item ){
				const classes = []
				const classBase = this.$options.name + '__item'

				if( item.index === this.theActiveItemIndex ) classes.push( classBase + '--isActive' )
				if( item.index === this.theActiveItemIndex ) classes.push( this.activeClass )
				if( item.index !== this.theActiveItemIndex ) classes.push( classBase + '--isInactive' )
				if( item.index !== this.theActiveItemIndex ) classes.push( this.inactiveClass )

				if( item.isEnabled ) classes.push( classBase + '--isEnabled' )
				if( item.isEnabled ) classes.push( this.enabledClass )

				if( item.isDisabled ) classes.push( classBase + '--isDisabled' )
				if( item.isDisabled ) classes.push( this.disabledClass )

				//console.log('item:', item)

				return classes
			},
		},
		created(){},
		mounted(){},
		destroyed(){},
	}
</script>

<style lang="less">
	@import (reference) "@/less/vars.less";
	@import (reference) "@/less/mixins.less";
	@import (reference) "@/less/atoms.less";

	.KnTabsRow { // debug
		[showBorders2] & {}
	}
	.KnTabsRow { // layout
		&__inner { position: relative; display: flex; }
		&__item:not(:first-child) { margin-left: 1em; }

		// fade out for overflow scrolling
		&__inner::before {
			position: absolute;
			top: 0; right: 0; bottom: 0;
			width: 2em;
			content: "";
			//background-color: fade( red, 50 );
			//background: linear-gradient(90deg, rgba(0,0,0,0) 15%, white 100%);
		}
	}
	.KnTabsRow { // styling
		//background-color: @swatches[whiteBg];
		//border-top: 3px solid @swatches[primary];
		border-bottom: 1px solid @swatches[primary50];
		//margin-bottom: -1px;

		&__inner {
			padding-top: 10px;

			overflow: auto;
			//overscroll-behavior: auto contain;
			-ms-overflow-style: none;
  			scrollbar-width: none; /* Firefox */
			&::-webkit-scrollbar {
				display: none;
				width: 0px;
    			background: transparent; /* make scrollbar transparent */
			}
		}
		&__item {
			transition: all 0.1s ease;
			padding-bottom: 0.25em;
			border-bottom: 3px solid transparent;
			white-space: nowrap;
			user-select: none;

			background-color: transparent;
			//border: none;
		}
		&__item--isActive {
			border-bottom-color: currentColor;
		}

		&__item--isEnabled {}
		&__item--isDisabled { pointer-events: none; }
	}

	@media @mq[xs] {}
	@media @mq[sm] {}
	@media @mq[md] {}
	@media @mq[dt] {}
	@media @mq[lg] {}
	@media @mq[xl] {}
</style>
