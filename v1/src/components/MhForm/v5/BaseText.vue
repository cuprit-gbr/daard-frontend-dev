<!--

	Die Componente dient als Wrapper für <input>-Elemente.

	Props:
		value	String 	Wird als value des Inputs verwendet

	Markup:
		<BaseText
			:value="'Mein Standardwert'"
			:placeholder="'Enter ..'"
			:spellcheck="false"
			:required="false"
			:disabled="false"
			:hasClearButton="false"
			:debounce="false"
			:debounceDelay="250"
			@change="(e)=>{}"
			@input="(value)=>{}"
		></BaseText>

	Changelog
		2022-10-17	improvement: added spellcheck prop, default false
		2021-09-02	improvement: added debounce and debounceDelay props
		2021-08-10	improvement: refactor
		2021-08-09	improvement: added css vars
		2020-07-27	init

-->

<template>
	<div class="BaseText FormField FormField--BaseText" :class="elmClasses">
		<div class="BaseText__inner FormField__inner">
			<div class="BaseText__bg FormField__bg"></div>
			<input class="BaseText__input FormField__input"
				ref="input"
				type="text"
				:placeholder="placeholder"
				:spellcheck="spellcheck"
				:required="required"
				:disabled="disabled"
				v-model="model"
			  	@input="emit"
			/>
			<svg class="BaseText__clearBtn FormField__clearBtn"
					v-if="!_.isEmpty( model ) && hasClearButton"
					@click="clickClearBtn"
					viewBox="0 0 20 20"
					aria-hidden="true"
					fill="none" xmlns="http://www.w3.org/2000/svg">
				<path 	fill-rule="evenodd"
						clip-rule="evenodd"
						d="M20 10.1421C20 15.6649 15.5228 20.1421 10 20.1421C4.47715 20.1421 0 15.6649 0 10.1421C0 4.61924 4.47715 0.14209 10 0.14209C15.5228 0.14209 20 4.61924 20 10.1421ZM5.899 14.5264C5.50848 14.1359 5.50848 13.5027 5.899 13.1122L8.62636 10.3848L5.89889 7.65738C5.50836 7.26685 5.50836 6.63369 5.89889 6.24316C6.28941 5.85264 6.92258 5.85264 7.3131 6.24316L10.0406 8.97063L12.9701 6.04114C13.3606 5.65061 13.9938 5.65061 14.3843 6.04114C14.7748 6.43166 14.7748 7.06483 14.3843 7.45535L11.4548 10.3848L14.3842 13.3142C14.7747 13.7048 14.7747 14.3379 14.3842 14.7284C13.9936 15.119 13.3605 15.119 12.97 14.7284L10.0406 11.7991L7.31322 14.5264C6.92269 14.9169 6.28953 14.9169 5.899 14.5264Z"
				/>
			</svg>
			<div class="BaseText__border FormField__border"></div>
		</div>
		<template v-if="debug">
			<pre name="BaseText.value">{{value}}</pre>
			<pre name="BaseText.model">{{model}}</pre>
		</template>
	</div>
</template>

<script>
	// @ is an alias to /src
	//import DevInfos from '@/components/DevInfos.vue'
	//import { EventBus } from '@/event-bus.js'
	import _ from 'lodash'

	export default {
		name: 'BaseText',
		components: {},
		mixins: [],
		props: {
			value: {
				type: [String, Number, Boolean],
				default: '',
			},
			placeholder: {
				type: [String, Number, Boolean],
				default: '',
			},
			spellcheck: {
				type: [String, Boolean],
				default: false,
			},
			required: {
				type: [String, Boolean],
				default: false,
			},
			disabled: {
				type: [String, Boolean],
				default: false,
			},
			hasClearButton: {
				type: [String, Boolean],
				default: false,
			},
			debounce: {
				type: [Boolean],
				default: false,
			},
			debounceDelay: {
				type: [Number],
				default: 250,
			},
			debug: {
				type: [Boolean],
				default: false,
			},
		},
		data() {
			return {
				model      : null,
				debounceFn : null,
			}
		},
		watch: {
			value: {
				// watch value and set model
				// this is needed to react on model changes from outside
				handler: function( to, from ) {
					if( this.model != to ) this.model = to
				},
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
		},
		methods: {
			emit( event ) {
				if( !this.debounce ){
					//console.log('emit without debounce')

					this.$emit('input', this.model)
					this.$emit('change', event)
				}
				else{
					clearTimeout( this.debounceFn )

					this.debounceFn = setTimeout((event) => {
						//console.log('emit with debounce, delay:', this.debounceDelay)

						this.$emit('input', this.model)
						this.$emit('change', event)
					}, this.debounceDelay)
				}
			},
			clickClearBtn( event ){
				//console.log('BaseText clickClearBtn')
				this.model = ''
				this.emit( event )
				this.$refs.input.focus()
			},
		},
		created() {},
		mounted() {
			this.model = this._.clone( this.value )
		},
	}
</script>

<style lang="less">
	.BaseText { // css vars
		--height : 2em;
	}

	.BaseText {	// layout
	}
	.BaseText { // styling
	}

	.BaseText { // hover
	}
	.BaseText { // focus
	}
	.BaseText { // disabled
	}
</style>
