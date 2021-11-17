<!--

	Was macht diese Componente?
	Wofür ist die Compoente da?

	Welche $props gibt es?

	Beispiel Code:
		<KnFieldCheckbox></KnFieldCheckbox>

	2019-06-08	init

-->

<template>
	<div class="KnFieldCheckbox contentModule" name="KnFieldCheckbox" :class="elmClasses">
		<div class="KnFieldCheckbox__inner contentModule__inner">
			KnFieldCheckbox

			<BaseCheckbox
				name="yourGroupName"
				:value="field._value"
				@change="onChange"
				@input="onInput"
			></BaseCheckbox>

			<pre name="field._value">{{field._value}}</pre>
		</div>
	</div>
</template>

<script>
	// @ is an alias to /src
	//import DevInfos from '@/components/DevInfos.vue'
	import EventBus from '@/helper/EventBus.js'
	import BaseCheckbox from '/Users/Mario/Dropbox/htdocs/2020-09-17__MhForm/vue-cli-dev/src/components/MhForm/v4/BaseCheckbox.vue'

	export default {
		name: 'KnFieldCheckbox',
		components: {
			BaseCheckbox,
		},
		mixins: [],
		props: {
			//imageObject: [Object, Boolean],
			//text: [String],
			field: {
				type     : [Object, Boolean],
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
			handleScroll( doLog = true ){
				// groupCollapsed group
				if( doLog ){
					console.groupCollapsed( this.$options.name, '• handleScroll()' )
					//console.log('key:', value)
					console.groupEnd()
				}
			},
			onInput( e ){
				console.log( this.$options.name, '• onInput()', e )

				this.$store.commit({
					type  : 'changeField',
					key   : '_value',
					value : e,
					field : this.field,
				})
			},
			onChange( e ){
				//console.log( this.$options.name, '• onChange()', e )
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
	@import (reference) "../less/vars.less";
	@import (reference) "../less/mixins.less";
	@import (reference) "../less/atoms.less";

	.KnFieldCheckbox { // debug
		[showBorders2] & {}
	}
	.KnFieldCheckbox { // layout
	}
	.KnFieldCheckbox { // styling
	}

	@media @mq[xs] {}
	@media @mq[sm] {}
	@media @mq[md] {}
	@media @mq[dt] {}
	@media @mq[lg] {}
	@media @mq[xl] {}
</style>
