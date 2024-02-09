<!--

	Die Componente dient als transparent Wrapper für alle Input Elemente

	Props:
		value	String 	Wird als value des Inputs verwendet

	Markup:
		<BaseTextarea
			:value="'Mein Standardwert'"
			:placeholder="'Enter ..'"
			:spellcheck="false"
			:required="false"
			:disabled="false"
			:resizeable="'vertical'"
			:debounce="false"
			:debounceDelay="250"
			@change="(e)=>{}"
			@input="(value)=>{}"
		></BaseTextarea>

	Changelog
		2022-10-17	improvement: added spellcheck prop, default false
		2021-09-02	improvement: added debounce and debounceDelay props
		2021-08-10	improvement: refactor
		2021-08-09	improvement: added css vars
		2020-07-27	init

-->

<template>
	<div class="BaseTextarea FormField FormField--textarea" :class="elmClasses">
		<div class="BaseTextarea__inner FormField__inner">
			<div class="BaseText__bg FormField__bg"></div>
			<textarea
				ref="input"
				type="text"
				class="BaseTextarea__textarea FormField__textarea"
				:placeholder="placeholder"
				:spellcheck="spellcheck"
				:required="required"
				:disabled="disabled"
				v-model="model"
			  	@input="emit"
			/>
			<div class="BaseText__border FormField__border"></div>
		</div>
		<template v-if="debug">
			<br />
			<pre name="BaseTextarea.value">{{value}}</pre>
			<pre name="BaseTextarea.model">{{model}}</pre>
		</template>
	</div>
</template>

<script>
	// @ is an alias to /src
	//import DevInfos from '@/components/DevInfos.vue'
	//import { EventBus } from '@/event-bus.js'

	export default {
		name: 'BaseTextarea',
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
			resizeable: {
				type: [String, Boolean],
				default: 'vertical',
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

				if( this.resizeable && !this.disabled ) classes.push( this.$options.name + '--resizeable-' + this.resizeable )
				else classes.push( this.$options.name + '--resizeable-none' )

				if( this.resizeable && !this.disabled ) classes.push( 'FormField--resizeable-' + this.resizeable )
				else classes.push( 'FormField--resizeable-none' )

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
				//console.log('BaseTextarea clickClearBtn')
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
	.BaseTextarea { // css vars
		--height : 5em;
	}

	.BaseTextarea { // hover
	}
	.BaseTextarea { // focus
	}
	.BaseTextarea { // disabled
	}
</style>
