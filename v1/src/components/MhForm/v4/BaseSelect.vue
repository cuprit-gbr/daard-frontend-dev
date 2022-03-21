<!--

	Die Componente dient als Wrapper für <select></select>-Elemente.

	Props:
		value		String	Wird als value des Selects verwendet
		label		String	Erste Zeile im <select> z.B. "Bitte wählen ..."
		options		Array	Werden als <option> verwendet

	Events:
		@input		String	Returns new value
		@change		Object	Returns change event

	Markup:
		<BaseSelect
			:value="'Heiko'"
			:label="'Choose ...'"
			:options="[
				'Mario',
				'Heiko',
				'Silvio'
			]"
			:hasClearButton="false"
			@input="()=>{}"
			@change="()=>{}"
		></BaseSelect>

		<BaseSelect
			:value="'Heiko'"
			:label="'Choose ...'"
			:options="[
				{ label : 'Mario',  value : 'mario', },
				{ label : 'Heiko',  value : 'heiko', },
				{ label : 'Silvio', value : 'silvio', },
			]"
			:hasClearButton="false"
			@input="()=>{}"
			@change="()=>{}"
		></BaseSelect>

	Changelog
		2022-01-31	feature: added hasClearButton prop, like BaseText
		2021-08-14	improvement: refaktor
		2021-07-15	improvement: add disabled prop and styles
		2020-09-02	refactored, added multiple
		2020-08-07	removed label
		2019-06-13	init

-->

<template>
	<div class="BaseSelect FormField FormField--BaseSelect" :class="elmClasses">
		<div class="BaseSelect__inner FormField__inner">
			<div class="BaseSelect__bg FormField__bg"></div>
			<select class="BaseSelect__select FormField__select"
				:class="{'BaseSelect__select--isUnset FormField__select--isUnset' : !model}"
				ref="selectElm"
				:disabled="disabled"
				v-model="model"
				@change="emit"
				>
				<option class="BaseSelect__option BaseSelect__option--label"
					v-if="label"
					value=""
					v-html="label"
					disabled
					>{{label}}</option>
				<option class="BaseSelect__option"
					v-for="(option, index) in internalOptions"
					:key="index"
					:value="option.value"
					v-html="option.label"
				></option>
			</select>
			<svg class="BaseSelect__clearBtn FormField__clearBtn"
					v-if="model && hasClearButton"
					@click="clickClearBtn"
					viewBox="0 0 20 20"
					aria-hidden="true"
					fill="none" xmlns="http://www.w3.org/2000/svg">
				<path 	fill-rule="evenodd"
						clip-rule="evenodd"
						d="M20 10.1421C20 15.6649 15.5228 20.1421 10 20.1421C4.47715 20.1421 0 15.6649 0 10.1421C0 4.61924 4.47715 0.14209 10 0.14209C15.5228 0.14209 20 4.61924 20 10.1421ZM5.899 14.5264C5.50848 14.1359 5.50848 13.5027 5.899 13.1122L8.62636 10.3848L5.89889 7.65738C5.50836 7.26685 5.50836 6.63369 5.89889 6.24316C6.28941 5.85264 6.92258 5.85264 7.3131 6.24316L10.0406 8.97063L12.9701 6.04114C13.3606 5.65061 13.9938 5.65061 14.3843 6.04114C14.7748 6.43166 14.7748 7.06483 14.3843 7.45535L11.4548 10.3848L14.3842 13.3142C14.7747 13.7048 14.7747 14.3379 14.3842 14.7284C13.9936 15.119 13.3605 15.119 12.97 14.7284L10.0406 11.7991L7.31322 14.5264C6.92269 14.9169 6.28953 14.9169 5.899 14.5264Z"
				/>
			</svg>
			<svg class="FormField__openIcon"
					viewBox="0 0 20 20"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
				<path d="M10 16L3.0718 7L16.9282 7L10 16Z" />
			</svg>
			<div class="BaseSelect__border FormField__border"></div>
		</div>
		<template v-if="debug">
			<br />
			<pre name="BaseSelect.model">{{model}}</pre>
			<pre name="_.isEmpty( model )">{{_.isEmpty( model )}}</pre>
			<pre name="BaseSelect.value">{{value}}</pre>
			<pre name="BaseSelect.options">{{options}}</pre>
			<pre name="BaseSelect.internalOptions">{{internalOptions}}</pre>
		</template>
	</div>
</template>

<script>
	// @ is an alias to /src
	//import DevInfos from '@/components/DevInfos.vue'
	//import { EventBus } from '@/event-bus.js'

	export default {
		name: 'BaseSelect',
		components: {},
		mixins: [],
		props: {
    		value: {
      			type: [String, Number, Array, Boolean],
      			default: '',
    		},
    		label: {
      			type: [String, Number, Boolean],
      			default: '',
    		},
    		options: {
      			type: [Array],
      			default: function(){ return [] },
    		},
			disabled: {
				type: [String, Boolean],
				default: false,
			},
			hasClearButton: {
				type: [String, Boolean],
				default: false,
			},
    		debug: {
				type: [Boolean],
      			default: false,
    		},
    	},
		data() {
			return {
				model                   : null,
				internalOptions         : [],
				doWatchInternalOptions  : true,
				doUpdateInternalOptions : true,
			}
		},
		watch: {
			value: {
				// watch prop value and set to model
				// this is needed to react on model changes from outside
				handler: function( to, from ) {
					//console.log('watcher value', from, to)

					this.model = to
					//this.updateInternalOptions()
				},
				immediate: true,
			},
			options: {
				// watch prop options and set internalOptions
				// this is needed to react on options changes from outside
				handler: function( to, from ) {
					//console.log('watcher options', from, to)

					this.setInternalOptions()
				},
				immediate: true,
			},
		},
		computed: {
			elmClasses(){
				let classes = []

				if( this.required ) classes.push( this.$options.name + '--isRequired' )
				if( this.required ) classes.push( 'FormField--isRequired' )

				if( this.disabled ) classes.push( this.$options.name + '--isDisabled' )
				if( this.disabled ) classes.push( 'FormField--isDisabled' )

				if( this.hasClearButton ) classes.push( this.$options.name + '--hasClearButton' )
				if( this.hasClearButton ) classes.push( 'FormField--hasClearButton' )

				return classes
			},
			countFilteredOptions(){
				const results = this.internalOptions.filter( item => item.isVisible === true )

				return results.length
			},
			countSelectedOptions(){
				const results = this.internalOptions.filter( item => item.selected === true )

				return results.length
			},
		},
		methods: {
			emit( event ) { // emit input (values only) and change (event)
				const returnValue = this._.isArray( this.model ) ? [...this.model] : this.model

				//console.log('BaseSelect emit:', event, returnValue);

				this.$emit('change', event)
				this.$emit('input', returnValue) // this changes parent v-model
			},
			setInternalOptions(){
				const selectedValues      = this.value
				const options             = this.options
				this.doWatchInternalOptions = false
				this.internalOptions      = []

				options.forEach((item) => {
					//console.log('item:', item)

					const newItem = {
						label : this._.get( item, 'label', item ),
						value : this._.get( item, 'value', item ),
					}
					this.internalOptions.push( newItem )
				})

				this.doWatchInternalOptions = true
			},
			XXXupdateInternalOptions(){
				const selectedValues      = this.value
				const internalOptions     = this.internalOptions

				this.doWatchInternalOptions = false

				/*
				console.group('updateInternalOptions()')
				console.log('selectedValues:', selectedValues)
				console.log('internalOptions:', internalOptions)
				console.groupEnd()
				*/

				internalOptions.forEach((item, index) => {
					//item.isVisible = this.isVisibleOption( item )
					//item.selected  = (selectedValues && this._.isArray(selectedValues)) ? selectedValues.includes( item.value ) : false
				})

				this.doWatchInternalOptions = true
			},
			clickClearBtn( event ){
				//console.log('BaseText clickClearBtn')
				this.model = ''
				this.emit( event )
				this.$refs.selectElm.focus()
			},
			clickFakeOption( e, option ){
				const oldState = option.selected
				const newState = !option.selected
				const internalOptions = this.internalOptions
				const newValue = this.multiple ? [] : ''

				option.selected = newState

				internalOptions.forEach((item) => {
					if( this.multiple && item.selected ){
						newValue.push( item.value )
					}
				})

				/*
				console.group('clickFakeOption()')
				console.log('option:', option)
				console.log('option.value:', option.value)
				console.log('oldState:', oldState)
				console.log('newState:', newState)
				console.log('newValue:', newValue)
				console.groupEnd()
				*/

				// set changed model and emit
				this.model = newValue
				this.emit( e )
			},
		},
		created() {},
		mounted() {},
	}
</script>

<style lang="less">
	.BaseSelect { // vars
		--height : 2em;
	}

	.BaseSelect { // layout
	}
	.BaseSelect { // styling
	}

	.BaseSelect { // hover
	}
	.BaseSelect { // focus
	}
	.BaseSelect { // disabled
	}

	.BaseSelect {  // debug styling
		//margin: 1em 0;
	}

</style>
