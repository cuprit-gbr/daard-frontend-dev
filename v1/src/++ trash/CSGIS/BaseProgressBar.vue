<!--

	Was macht diese Componente?
	Wofür ist die Compoente da?

	Welche $props gibt es?

	Beispiel Code:
		<BaseProgressBar></BaseProgressBar>

	2021-07-05	init

-->

<template>
	<div class="BaseProgressBar contentModule" name="BaseProgressBar" :class="elmClasses">
		<div class="BaseProgressBar__inner contentModule__inner">
			<div class="BaseProgressBar__track">
				<div class="BaseProgressBar__value" :style="valueStyles"></div>
			</div>
		</div>
	</div>
</template>

<script>
	// @ is an alias to /src
	//import DevInfos from '@/components/DevInfos.vue'
	import EventBus from './../../event-bus.js'

	export default {
		name: 'BaseProgressBar',
		components: {},
		mixins: [],
		props: {
			//imageObject: [Object, Boolean],
			//text: [String],
			value: {
				type     : [Number, Boolean],
				default  : 10,
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
			valueStyles(){
				let styles = {}

				styles.width = parseFloat( this.value ) + '%'

				return styles
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

	.BaseProgressBar { // vars
		--height : 1em;
		--borderRadius : 0.5em;
		--trackBackgroundColor : fade( black, 25 );
		--valueBackgroundColor : fade( black, 50 );
		--valueTransition : all 0.25s ease;
	}
	.BaseProgressBar { // debug
		[showBorders2] & {}
	}
	.BaseProgressBar { // layout
		&__track {
			height: var(--height);
		}
		&__value {
			height: var(--height);
		}
	}
	.BaseProgressBar { // styling
		overflow: hidden;
		border-radius: var(--borderRadius);

		&__track {
			background-color: var(--trackBackgroundColor);
		}
		&__value {
			transition: var(--valueTransition);
			background-color: var(--valueBackgroundColor);
		}
	}

	@media @mq[xs] {}
	@media @mq[sm] {}
	@media @mq[md] {}
	@media @mq[dt] {}
	@media @mq[lg] {}
	@media @mq[xl] {}
</style>
