<!--

	Was macht diese Componente?
	Wofür ist die Compoente da?

	Welche $props gibt es?

	Beispiel Code:
		<HeaderRow></HeaderRow>

    2021-07-05	init

-->

<template>
	<div class="HeaderRow contentModule hSpace hSpace--formRow" name="HeaderRow" :class="elmClasses">
		<div class="HeaderRow__inner contentModule__inner">
            <h2 class="HeaderRow__title font font--medium font--sizeBig" v-html="title"></h2>
			<a class="circleIcon color color--primary" v-if="isCloseable" @click="onClickCloseBtn" role="button">
				<BaseIcon type="cross" ></BaseIcon>
			</a>
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
	import EventBus from './../../event-bus.js'
	import BaseIcon from './BaseIcon.vue'

	export default {
		name: 'HeaderRow',
		components: {
			BaseIcon
		},
		mixins: [],
		props: {
			//imageObject: [Object, Boolean],
			//text: [String],
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
			onClickCloseBtn( doLog = true ){
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
	@import (reference) "../../less/vars.less";
	@import (reference) "../../less/mixins.less";
	@import (reference) "../../less/atoms.less";

	.HeaderRow { // debug
		[showBorders2] & {}
	}
	.HeaderRow { // layout
		&__inner {
			display: flex;
			justify-content: space-between;
		}
	}
	.HeaderRow { // styling
		border-top: 3px solid @swatches[primary];
		border-bottom: 1px solid @swatches[primary];
		background-color: @swatches[whiteBg];
		margin-bottom: -1px;

		&__inner {
			padding-top: 15px;
			padding-bottom: 75px;
		}
		&__title {
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
