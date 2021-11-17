<!--

	Was macht diese Componente?
	Wofür ist die Compoente da?

	Welche $props gibt es?

	Beispiel Code:
		<KnTextRow></KnTextRow>

	2021-07-05	init

-->

<template>
	<div class="KnTextRow contentModule hSpace hSpace--formRow" name="KnTextRow" :class="elmClasses">
		<div class="KnTextRow__inner contentModule__inner">
			<div class="KnTextRow__text">
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
	import EventBus from '@/helper/EventBus.js'

	export default {
		name: 'KnTextRow',
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
	@import (reference) "@/less/vars.less";
	@import (reference) "@/less/mixins.less";
	@import (reference) "@/less/atoms.less";

	.KnTextRow { // debug
		[showBorders2] & {}
	}
	.KnTextRow { // layout
	}
	.KnTextRow { // styling
		//border-top: 1px solid;
		//border-bottom: 1px solid;
		background-color: @swatches[whiteBg];
		//border-bottom: 1px solid @swatches[primary15];
		//margin-bottom: -1px;

		&__inner {
			padding-top: 1rem;
			padding-bottom: 3em;
		}
		&__text {
			max-width: 40em;
		}
	}

	@media @mq[xs] {}
	@media @mq[sm] {}
	@media @mq[md] {}
	@media @mq[dt] {}
	@media @mq[lg] {}
	@media @mq[xl] {}
</style>
