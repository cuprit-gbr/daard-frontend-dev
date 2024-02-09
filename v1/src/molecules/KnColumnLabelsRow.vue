<!--

	Was macht diese Componente?
	Wofür ist die Compoente da?

	Welche $props gibt es?

	Beispiel Code:
		<KnColumnLabelsRow
			class=""
			:items="[
				{ label : 'Bone', span : 2, },
				{ label : 'Investigatable material', span : 6, },
			]"
		></KnColumnLabelsRow>

    2021-07-05	init

-->

<template>
	<div class="KnColumnLabelsRow contentModule hSpace hSpace--formRow" name="KnColumnLabelsRow" :class="elmClasses">
		<div class="KnColumnLabelsRow__inner contentModule__inner">
			<a	class="KnColumnLabelsRow__item"
				v-for="(item, index) in theItems"
				:key="index"
				v-html="item.label"
				:style="{
					'grid-column' : 'span ' + item.span,
				}"
			></a>
		</div>
		<!--
        <pre name="title">{{title}}</pre>
        <pre name="isCloseable">{{isCloseable}}</pre>
		-->
	</div>
</template>

<script>
	// @ is an alias to /src
	//import DevInfos from '@/components/DevInfos.vue'
	import EventBus from '@/helper/EventBus.js'

	export default {
		name: 'KnColumnLabelsRow',
		components: {},
		mixins: [],
		props: {
			//imageObject: [Object, Boolean],
			//text: [String],
			items: {
				type : [Array, Boolean],
				default  : ()=>{
					return []
				},
				required : false,
			},
		},
		data(){
			return {}
		},
		watch: {
			someVar: {
				handler: function( to, from ) {
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
						index : index,
						label : item.label,
						span  : item.span,
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
		},
		created(){
			//window.addEventListener('scroll', this.handleScroll);
		},
		mounted(){},
		destroyed(){
   			//window.removeEventListener('scroll', this.handleScroll);
 		},
	}
</script>

<style lang="less">
	@import (reference) "@/less/vars.less";
	@import (reference) "@/less/mixins.less";
	@import (reference) "@/less/atoms.less";

	.KnColumnLabelsRow { // debug
		[showBorders2] & {

		}
		&__item {
			//outline: 1px solid blue;
		}
	}
	.KnColumnLabelsRow { // layout
		&__inner {
			.grid;
			.grid--gap;
			.grid--cols-12;
			//justify-content: space-between;
		}
	}
	.KnColumnLabelsRow { // styling
		//border-top: 3px solid @swatches[primary];
		//border-top: 1px solid;
		border-bottom: 1px solid;
		background-color: @swatches[whiteBg];
		margin-bottom: -1px;

		&__inner {
			padding-top: 30px;
			padding-bottom: 5px;
		}
	}

	@media @mq[xs] {}
	@media @mq[sm] {}
	@media @mq[md] {}
	@media @mq[dt] {}
	@media @mq[lg] {}
	@media @mq[xl] {}
</style>
