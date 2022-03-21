<!--

	Was macht diese Componente?
	Wofür ist die Compoente da?

	Welche $props gibt es?

	Beispiel Code:
		<KnHeaderRow></KnHeaderRow>

    2021-07-05	init

-->

<template>
	<div class="KnHeaderRow contentModule hSpace hSpace--formRow" name="KnHeaderRow" :class="elmClasses">
		<div class="KnHeaderRow__inner contentModule__inner">
            <div>
				<h2 class="KnHeaderRow__title font font--medium font--sizeBig" v-html="title"></h2>
            	<h3 class="KnHeaderRow__subTitle font font--regular font--sizeBig" v-html="subTitle"></h3>
			</div>
			<a class="circleIcon color color--primary" v-if="isCloseable" @click="onClickCloseBtn" role="button">
				<MhIcon type="cross"></MhIcon>
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
	import EventBus from '@/helper/EventBus.js'
	import MhIcon from '@/components/MhIcon/v2/MhIcon.vue'

	export default {
		name: 'KnHeaderRow',
		components: {
			MhIcon
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
			subTitle: {
				type     : [String, Boolean],
				default  : '',
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
	@import (reference) "@/less/vars.less";
	@import (reference) "@/less/mixins.less";
	@import (reference) "@/less/atoms.less";

	.KnHeaderRow { // debug
		[showBorders2] & {}
	}
	.KnHeaderRow { // layout
		&__inner {
			display: flex;
			justify-content: space-between;
		}
	}
	.KnHeaderRow { // styling
		border-top: 3px solid;
		//border-bottom: 1px solid;
		background-color: @swatches[whiteBg];
		//margin-bottom: -1px;

		&__inner {
			padding-top: 15px;
			padding-bottom: 40px;
		}
		&__title {
			//color: @swatches[primary];
		}
		&__subTitle {
			//color: @swatches[primary];
		}
	}

	@media @mq[xs] {}
	@media @mq[sm] {}
	@media @mq[md] {}
	@media @mq[dt] {}
	@media @mq[lg] {}
	@media @mq[xl] {}
</style>
