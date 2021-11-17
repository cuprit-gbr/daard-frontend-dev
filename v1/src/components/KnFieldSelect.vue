<!--

	Was macht diese Componente?
	Wofür ist die Compoente da?

	Welche $props gibt es?

	Beispiel Code:
		<KnFieldSelect></KnFieldSelect>

	2019-06-08	init

-->

<template>
	<div class="KnFieldSelect contentModule" name="KnFieldSelect" :class="elmClasses">
		<div class="KnFieldSelect__inner contentModule__inner">
			KnFieldSelect

			<BaseSelect
				:value="''"
				:label="'Choose ...'"
				:options="field._options"
				@change="onChange"
				@input="onInput"
			></BaseSelect>
		</div>
	</div>
</template>

<script>
	// @ is an alias to /src
	//import DevInfos from '@/components/DevInfos.vue'
	import EventBus from '@/helper/EventBus.js'
	import RestHandler from '@/components/RestHandler/RestHandler.js'

	import BaseSelect from '/Users/Mario/Dropbox/htdocs/2020-09-17__MhForm/vue-cli-dev/src/components/MhForm/v4/BaseSelect.vue'

	export default {
		name: 'KnFieldSelect',
		components: {
			BaseSelect,
		},
		mixins: [
			RestHandler,
		],
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
			onInput( e ){
				console.log( this.$options.name, '• onInput()', e )

				this.$store.commit({
					type  : 'changeField',
					key   : '_value',
					value : e,
					field : this.field,
				})
				/*
				*/
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

	.KnFieldSelect { // debug
		[showBorders2] & {}
	}
	.KnFieldSelect { // layout
	}
	.KnFieldSelect { // styling
	}

	@media @mq[xs] {}
	@media @mq[sm] {}
	@media @mq[md] {}
	@media @mq[dt] {}
	@media @mq[lg] {}
	@media @mq[xl] {}
</style>
