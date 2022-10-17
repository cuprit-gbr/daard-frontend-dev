<!--

	Die Componente dient als Wrapper für <select></select>-Elemente.

	Props:
		value		String	Wird als value des Selects verwendet
		placeholder	String	Erste Zeile im <select> z.B. "Bitte wählen ..."
		options		Array	Werden als <option> verwendet

	Events:
		@input		String	Returns new value
		@change		Object	Returns change event

	Markup:
		<BaseSelect
			:value="'Heiko'"
			:placeholder="'Choose ...'"
			:options="[
				'Mario',
				'Heiko',
				'Silvio'
			]"
			:hasClearButton="false"
			@input="(value)=>{}"
			@change="(e)=>{}"
		></BaseSelect>

		<BaseSelect
			:value="'Heiko'"
			:placeholder="'Choose ...'"
			:options="[
				{ label : 'Mario',  value : 'mario' },
				{ label : 'Heiko',  value : 'heiko' },
				{ label : 'Silvio', value : 'silvio' },
			]"
			:hasClearButton="false"
			@input="(value)=>{}"
			@change="(e)=>{}"
		></BaseSelect>

	Changelog
		2022-10-13	improvement: refactor a lot to match with BaseSearchSelect coding
		2022-10-11	improvement: renamed prop 'label' to prop 'placeholder'
		2022-01-31	bugfix: if model was not in options its hidden but no placeholder was show and the clearBtn was visible
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
			<div class="BaseSelect__bg FormField__bg "></div>
			<div class="BaseSelect__selectedOptionLabel FormField__selectedOptionLabel"
				:class="{'BaseSelect__selectedOptionLabel--isUnset FormField__selectedOptionLabel--isUnset' : !_.get( selectedOption, 'label')}"
				v-html="_.get( selectedOption, 'label', this.placeholder )"
			></div>
			<select class="BaseSelect__select FormField__select"
				ref="selectElm"
				:disabled="disabled"
				v-model="model"
				@change="emit"
				>
				<option class="BaseSelect__option"
					XXXv-if="!_.get( selectedOption, 'label')"
					value=""
					v-html="this.placeholder"
					disabled
				></option>
				<option class="BaseSelect__option"
					v-for="(option, index) in internalOptions"
					:key="index"
					:value="option.value"
					v-html="option.label"
				></option>
			</select>
			<svg class="BaseSelect__clearBtn FormField__clearBtn"
					v-if="_.get( selectedOption, 'label' ) && hasClearButton"
					@click="onClickClearBtn"
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
			<pre name="value">{{value}}</pre>
			<pre name="options">{{options}}</pre>
			<pre name="model">{{model}}</pre>
			<pre name="isValid">{{isValid}}</pre>
			<pre name="selectedOption">{{selectedOption}}</pre>
			<pre name="internalOptions">{{internalOptions}}</pre>
		</template>
	</div>
</template>

<script>
	export default {
		name: 'BaseSelect',
		components: {},
		mixins: [],
		props: {
    		value: {
      			type: [String, Number, Array, Boolean],
      			default: '',
    		},
    		placeholder: {
      			type: [String, Number, Boolean],
      			default: 'Choose ...',
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
				model           : '',
				internalOptions : [],
			}
		},
		watch: {
			value: {
				// watch prop value and set to model
				// this is needed to react on model changes from outside
				handler: function( to, from ) {
					//if( this._.isEqual( to, from ) ) return
					//console.log('watcher value', from, to)

					this.model = to
					//this.model = this.isValid ? this.value : ''
				},
				immediate: true,
			},
			options: {
				// watch prop options and set internalOptions
				// this is needed to react on options changes from outside
				handler: function( to, from ) {
					//if( this._.isEqual( to, from ) ) return
					//console.log('watcher options', from, to)

					this.setInternalOptions()
					//this.model = this.value
				},
				immediate: true,
				deep: true
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

				if( this.isValid ) classes.push( this.$options.name + '--isValid ' + 'FormField--isValid' )
				else classes.push( this.$options.name + '--isInvalid ' + 'FormField--isInvalid' )

				return classes
			},
			selectedOption(){
				const option = this._.find( this.internalOptions, { value : this.model } )
				return option
			},
			isValid(){ // die value muss entweder leer sein oder in den options vorkommen
				let allOptions = this.internalOptions
				let isValid = false

				// valid if value and model are both empty
				if( this._.isEmpty( this.value ) && this._.isEmpty( this.model ) ) isValid = true

				// valid if model is in options
				this._.forEach( allOptions, (o)=>{
					if( o.value === this.model ) isValid = true
				})

				return isValid
			},
		},
		methods: {
			emit( e ){ // emit input (values only) and change (e)
				const returnValue = this.model

				this.$emit('change', e)
				this.$emit('input', returnValue) // this changes parent v-model
			},
			setInternalOptions(){
				const selectedValues      = this.value
				const options             = this.options
				this.internalOptions      = []

				options.forEach( (item)=> {
					//console.log('item:', item)

					const newItem = {
						label : this._.get( item, 'label', item ),
						value : this._.get( item, 'value', item ),
					}
					this.internalOptions.push( newItem )
				})
			},
			onClickClearBtn( e ){
				//console.log('BaseText onClickClearBtn')
				this.model = ''
				this.emit( e )
				this.$refs.selectElm.focus()
			},
		},
		created(){},
		mounted(){},
	}
</script>

<style lang="less">
	.BaseSelect { // vars
		--height : 2em;
	}

	.BaseSelect { // debug styling
	}

	.BaseSelect { // layout + styling
		&__selectedOptionLabel {
			//background-color: fade( red, 20 );
			position: absolute;
			top: 0; left: 0; right: 0; bottom: 0;
		}
		&__select {
			opacity: 0;
			cursor: pointer;
		}
	}

	.BaseSelect { // hover
	}
	.BaseSelect { // focus
	}
	.BaseSelect { // disabled
	}
</style>
