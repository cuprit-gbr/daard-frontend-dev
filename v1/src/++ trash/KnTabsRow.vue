<!--

	Was macht diese Componente?
	Wofür ist die Compoente da?

	Welche $props gibt es?

	Beispiel Code:
		<KnTabsRow></KnTabsRow>

    2021-07-05	init

-->

<template>
	<div class="KnTabsRow contentModule hSpace hSpace--formRow" name="KnTabsRow" :class="elmClasses">
		<div class="KnTabsRow__inner contentModule__inner">
            <mark>KnTabsRow</mark>
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
		name: 'KnTabsRow',
		components: {},
		mixins: [],
		props: {
			//imageObject: [Object, Boolean],
			//text: [String],
			/*
			title: {
				type     : [String, Boolean],
				default  : 'The title',
				required : false,
			},
            isCloseable: {
				type     : [String, Boolean],
				default  : false,
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

	.KnTabsRow { // debug
		[showBorders2] & {}
	}
	.KnTabsRow { // layout
		&__inner {
			display: flex;
			justify-content: space-between;
		}
	}
	.KnTabsRow { // styling
		border-top: 3px solid @swatches[primary];
		border-bottom: 1px solid @swatches[primary];
		background-color: @swatches[whiteBg];
		margin-bottom: -1px;

		&__inner {
			padding-top: 15px;
			padding-bottom: 75px;
		}
	}

	@media @mq[xs] {}
	@media @mq[sm] {}
	@media @mq[md] {}
	@media @mq[dt] {}
	@media @mq[lg] {}
	@media @mq[xl] {}
</style>
