<!--

	Was macht diese Componente?
	Wofür ist die Compoente da?

	Welche $props gibt es?

	Beispiel Code:
		<KnFormFieldRow></KnFormFieldRow>

    2021-07-05	init

-->

<template>
	<div class="KnFormFieldRow contentModule hSpace hSpace--formRow" name="KnFormFieldRow" :class="elmClasses">
		<div class="KnFormFieldRow__inner contentModule__inner">
			<slot></slot>
		</div>
		<!--
        <mark>KnFormFieldRow</mark>
		-->
	</div>
</template>

<script>
	// @ is an alias to /src
	//import DevInfos from '@/components/DevInfos.vue'
	//import EventBus from '@/helper/EventBus.js'

	export default {
		name: 'KnFormFieldRow',
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
					console.groupCollapsed( this.$options.name, '• myFunction()' )
					//console.log('key:', value)
					console.groupEnd()
				}

				alert('myFunction')
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

	.KnFormFieldRow { // debug
		[showBorders4] & {
			&__inner > * {
				outline: 1px solid fade( red, 50 );
			}
		}
	}
	.KnFormFieldRow { // layout
		position: relative;

		&__inner {
			.grid;
			.grid--gap;
			.grid--cols-12;
		}
	}
	.KnFormFieldRow { // styling
		border-top: 1px solid @swatches[primary15];
		border-bottom: 1px solid @swatches[primary15];
		background-color: @swatches[whiteBg];
		margin-bottom: -1px;

		&__inner {
			padding-top: 12px;
			padding-bottom: 12px;
		}
	}

	@media @mq[xs] {}
	@media @mq[sm] {}
	@media @mq[md] {}
	@media @mq[dt] {}
	@media @mq[lg] {}
	@media @mq[xl] {}
</style>
