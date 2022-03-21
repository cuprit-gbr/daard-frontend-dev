<!--

	Was macht diese Componente?
	Wofür ist die Compoente da?

	Welche $props gibt es?

	Beispiel Code:
		<KnFieldRestSelectfield></KnFieldRestSelectfield>

	2019-06-08	init

	?search_age=subadults|adults>&fields=id,name,<adults|subadults>
	?search_age=subadults

-->

<template>
	<div class="KnFieldRestSelectfield contentModule" name="KnFieldRestSelectfield" :class="elmClasses">
		<div class="KnFieldRestSelectfield__inner contentModule__inner">
			KnFieldRestSelectfield

			<BaseSelect
				:value="''"
				:label="'Choose ...'"
				:options="field._options"
				@change="onChange"
				@input="onInput"
			></BaseSelect>

			<pre name="field._value">{{field._value}}</pre>
			<pre name="field._options">{{field._options}}</pre>
		</div>
	</div>
</template>

<script>
	// @ is an alias to /src
	//import DevInfos from '@/components/DevInfos.vue'
	import EventBus from '@/helper/EventBus.js'
	import RestHandler from '@/components/RestHandler/RestHandler.js'

	import BaseSelect from '@/components/MhForm/v4/BaseSelect.vue'

	export default {
		name: 'KnFieldRestSelectfield',
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
			return {
				options : undefined,
			}
		},
		watch: {
			'$store.getters.fields.subadults': {
				handler: function( to, from ) {
					this.fetchDiseases()
				},
				immediate : true,
				deep: true,
			},
			'$store.getters.fields.adults': {
				handler: function( to, from ) {
					this.fetchDiseases()
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
			fetchDiseases( doLog = false ){
				let fetchParams = {
					fields : 'id,name,adults,subadults'
				}

				// erzeuge age-filter anhand der zuvor vom user gewählten values
				let searchAges = []
				if( this.$store.getters.fields.subadults._value ) searchAges.push('subadults')
				if( this.$store.getters.fields.adults._value ) searchAges.push('adults')
				if( searchAges.length ) fetchParams.search_age = searchAges.join(',')

				// groupCollapsed group
				if( doLog ){
					console.groupCollapsed( this.$options.name, '• fetchDiseases()' )
					console.log('fetchParams:', fetchParams)
					console.groupEnd()
				}

				this.restHandler__fetch({
					action : 'GET',
					route : this.$store.getters.restBase + this.field.url,
					params : fetchParams,
					callback : (response) => {
						const results = response.data

						const options = []

						this._.forEach( results, (result)=>{
							options.push( result.name )
						})

						this.$store.commit({
							type  : 'changeField',
							key   : '_options',
							value : options,
							field : this.field,
						})
					},
				})
			},
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

	.KnFieldRestSelectfield { // debug
		[showBorders2] & {}
	}
	.KnFieldRestSelectfield { // layout
	}
	.KnFieldRestSelectfield { // styling
	}

	@media @mq[xs] {}
	@media @mq[sm] {}
	@media @mq[md] {}
	@media @mq[dt] {}
	@media @mq[lg] {}
	@media @mq[xl] {}
</style>
