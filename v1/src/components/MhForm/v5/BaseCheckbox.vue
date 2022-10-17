<!--

	Die Componente dient als Wrapper für input[type=checkbox]-Elemente.

	Props:
		value	String 	Wird als value der Checkbox verwendet

	Markup:
		<BaseCheckbox
			:value="true"
			:disabled="false"
			@change="(e)=>{}"
			@input="(value)=>{}"
		></BaseCheckbox>

	Changelog
		2021-09-02	improvement: better example
		2021-08-10	improvement: refactor
		2021-08-09	improvement: added css vars
		2020-07-27	init

-->

<template>
	<div class="BaseCheckbox FormField FormField--BaseCheckbox" :class="elmClasses">
		<div class="BaseCheckbox__inner FormField__inner">
			<div class="BaseCheckbox__bg FormField__bg"></div>
			<input class="BaseCheckbox__inputCheckbox FormField__inputCheckbox"
				ref="input"
				type="checkbox"
				:required="required"
				:disabled="disabled"
				v-model="model"
				@input="emit"
			/>
			<div class="BaseCheckbox__fakeCheckbox FormField__fakeCheckbox" :class="{'BaseCheckbox__fakeCheckbox--isSelected FormField__fakeCheckbox--isSelected' : model}">
				<div class="BaseCheckbox__border FormField__border"></div>
				<svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M3.5 6.5L5.5 11L12 4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
				</svg>
			</div>
			<div class="BaseCheckbox__border FormField__border"></div>
		</div>
		<!--
		<div class="BaseCheckbox__label" v-if="label"><span v-html="label"></span></div>
		-->
		<template v-if="debug">
			<pre name="model">{{model}}</pre>
			<pre name="value">{{value}}</pre>
			<pre name="checkedValue">{{checkedValue}}</pre>
			<pre name="uncheckedValue">{{uncheckedValue}}</pre>
		</template>
	</div>
</template>

<script>
	// @ is an alias to /src
	//import DevInfos from '@/components/DevInfos.vue'
	//import { EventBus } from '@/event-bus.js'

	export default {
		name: 'BaseCheckbox',
		components: {},
		mixins: [],
		props: {
			value: {
				type: [String, Boolean],
				default: true,
			},
			checkedValue: {
				type: [String, Boolean],
				default: true,
			},
			uncheckedValue: {
				type: [String, Boolean],
				default: false,
			},
			required: {
				type: [Boolean],
				default: false,
			},
			disabled: {
				type: [Boolean],
				default: false,
			},
			debug: {
				type: [Boolean],
				default: false,
			},
		},
		data() {
			return {
				model        : undefined,
			}
		},
		watch: {
			value: {
				// watch value and set checked state
				// this is needed to react on model changes from outside
				handler: function( to, from ) {
					const inputElm = this.$refs.input

					if( to === this.checkedValue ){
						inputElm.checked = true
						this.model = true
					}else{
						inputElm.checked = false
						this.model = false
					}

					const isChecked   = inputElm.checked
					const returnValue = isChecked ? this.checkedValue : this.uncheckedValue
					//this.$emit('input', returnValue)
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

				return classes
			},
		},
		methods: {
			emit( event ){
				const isChecked   = event.target.checked
				const returnValue = isChecked ? this.checkedValue : this.uncheckedValue

				/*
				console.log('event:', event)
				console.log('isChecked', isChecked)
				console.log('returnValue', returnValue)
				console.log('')
				*/

				this.$emit('change', event)
				this.$emit('input', returnValue) // this changes parent v-model
			},
		},
		created() {},
		mounted() {
			this.model = this.value === this.checkedValue
		},
	}
</script>

<style lang="less">
	.BaseCheckbox { // css vars
		--height : 2em;
		--width  : 2em;
		--padding: 0.4em;
	}

	.BaseCheckbox {	// layout
		display: inline-block;
		flex-shrink: 0;

		&__inner {
			display: flex;
			padding: var(--padding);
		}
		&__fakeCheckbox {
			position: relative;
			pointer-events: none;
			flex-grow: 1;

			svg {
				position: absolute;
				top: 1; left: 1; right: 1; bottom: 1;
				opacity: 0;
			}

			&--isSelected svg { opacity: 1; }
		}
	}
	.BaseCheckbox { // styling
		&__fakeCheckbox {
			background-color: fade( red, 15 );
			background-color: white;
			border-radius: var(--borderRadius);
			cursor: pointer;
		}
	}

	/*
	.BaseCheckbox { // draw path animation
		svg path {
			stroke-dasharray: 20;
    		stroke-dashoffset: 20;
			//transition: all 0.25s ease-in;
		}
		&__fakeCheckbox--isSelected svg path {
			//stroke-dasharray: 20;
			//stroke-dashoffset: 0;
			//transition: all 0.35s ease-out;
			animation: dash 0.5s linear normal 1;
			animation-fill-mode: forwards;
			transform-origin: center;
		}
		@keyframes dash {
			0% {
				stroke-dashoffset: 20;
			}
			50% {
				transform: scale(1);
			}
			60% {
				stroke-dashoffset: 0;
			}
			65% {
				//stroke-dashoffset: 0;
			}
			80%{
				transform: scale(1.5);
			}
			90%{
				//transform: scale(0.75);
			}
			100% {
				stroke-dashoffset: 0;
				transform: scale(1);
			}
		}
	}
	*/

	.BaseCheckbox { // hover
	}
	.BaseCheckbox { // focus
	}
	.BaseCheckbox { // disabled
	}

</style>
