<!--

	Was macht diese Componente?
	Wofür ist die Compoente da?

	Welche $props gibt es?

	Beispiel Code:
		<TextRow></TextRow>

	2021-07-05	init

-->

<template>
	<div class="TextRow contentModule hSpace hSpace--formRow" name="TextRow" :class="elmClasses">
		<div class="TextRow__inner contentModule__inner">
			<div class="TextRow__text font font--sizeLarge">
				<slot></slot>
			</div>
		</div>
		<!--
        <pre name="text">{{text}}</pre>
		-->
	</div>
</template>

<script>
	// @ is an alias to /src
	//import DevInfos from '@/components/DevInfos.vue'
	import EventBus from './../../event-bus.js'

	export default {
		name: 'TextRow',
		components: {},
		mixins: [],
		props: {
			//imageObject: [Object, Boolean],
			//text: [String],
			/*
			text: {
				type     : [String, Boolean],
				default  : 'The text',
				required : false,
			},
			*/
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
		},
		methods: {
			handleScroll( doLog = true ){
				// groupCollapsed group
				if( doLog ){
					console.groupCollapsed( this.$options.name, '• handleScroll()' )
					//console.log('key:', value)
					console.groupEnd()
				}
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
	@import (reference) "../../less/vars.less";
	@import (reference) "../../less/mixins.less";
	@import (reference) "../../less/atoms.less";

	.TextRow { // debug
		[showBorders2] & {}
	}
	.TextRow { // layout
	}
	.TextRow { // styling
		border-top: 1px solid @swatches[primary];
		border-bottom: 1px solid @swatches[primary];
		background-color: @swatches[whiteBg];
		margin-bottom: -1px;

		&__inner {
			padding-top: 25px;
			padding-bottom: 25px;
		}
		&__text {
			color: @swatches[primary];
		}
	}

	@media @mq[xs] {}
	@media @mq[sm] {}
	@media @mq[md] {}
	@media @mq[dt] {}
	@media @mq[lg] {}
	@media @mq[xl] {}
</style>
