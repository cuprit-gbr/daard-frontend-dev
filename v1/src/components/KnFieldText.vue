<!--

	Was macht diese Componente?
	Wofür ist die Compoente da?

	Welche $props gibt es?

	Beispiel Code:
		<KnFieldText></KnFieldText>

	2019-06-08	init

-->

<template>
	<div class="KnFieldText contentModule" name="KnFieldText" :class="elmClasses">
		<div class="KnFieldText__inner contentModule__inner">
			KnFieldText
			<BaseText
				:value="field._value"
				:placeholder="'Enter ..'"
				:required="false"
				:disabled="false"
				:hasClearButton="true"
				@change="onChange"
				@input="onInput"
			></BaseText>
		</div>
	</div>
</template>

<script>
	import EventBus from '@/helper/EventBus.js'
	import BaseText from '@/components/MhForm/v5/BaseText.vue'

	export default {
		name: 'KnFieldText',
		components: {
			BaseText,
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

	.KnFieldText { // debug
		[showBorders2] & {}
	}
	.KnFieldText { // layout
	}
	.KnFieldText { // styling
	}

	@media @mq[xs] {}
	@media @mq[sm] {}
	@media @mq[md] {}
	@media @mq[dt] {}
	@media @mq[lg] {}
	@media @mq[xl] {}
</style>
