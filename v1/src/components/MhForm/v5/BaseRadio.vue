<!--

	Die Componente dient als Wrapper für input[type=checkbox]-Elemente.

	Props:
		value	String 	Wird als value der Checkbox verwendet

	Markup:
		<BaseRadio
			v-model="myModel"
			:name="'myGroup23'"
			:checkedValue="'B'"
			@change="(e)=>{}"
			@input="(value)=>{}"
		></BaseRadio>

	Todo:
		Change props:
			v-model
			value
			see: https://vuejs.org/v2/guide/components-custom-events.html#Customizing-Component-v-model

	Changelog
		2021-08-10	improvement: refactor
		2021-08-09	improvement: added css vars
		2020-07-27	init

-->

<template>
	<div class="BaseRadio FormField FormField--BaseRadio" :class="elmClasses">
		<div class="BaseRadio__inner FormField__inner">
			<div class="BaseRadio__bg FormField__bg"></div>
			<input class="BaseRadio__inputRadio FormField__inputRadio"
				ref="input"
				type="radio"
				:name="name"
				:required="required"
				:disabled="disabled"
				XXXvalue="checkedValue"
				v-model="model"
				@input="emit"
			/>
			<div class="BaseRadio__fakeRadio FormField__fakeRadio"
			     XXXclass="{
					 'BaseRadio__fakeRadio--isSelected' : model,
					 'FormField__fakeRadio--isSelected' : model,
				 }">
				<svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
					<circle cx="7.5" cy="7.5" r="6.5" fill="currentColor" />
					<circle cx="7.5" cy="7.5" r="5.5" fill="currentColor" />
					<!--
					-->
				</svg>
			</div>
			<div class="BaseRadio__border FormField__border"></div>
		</div>
		<!--
		<div class="BaseRadio__label" v-if="label"><span v-html="label"></span></div>
		-->
		<template v-if="debug">
			<pre name="model">{{model}}</pre>
			<pre name="value">{{value}}</pre>
			<pre name="checkedValue">{{checkedValue}}</pre>
		</template>
	</div>
</template>

<script>
	// @ is an alias to /src
	//import DevInfos from '@/components/DevInfos.vue'
	//import { EventBus } from '@/event-bus.js'

	export default {
		name: 'BaseRadio',
		components: {},
		mixins: [],
		props: {
			name: {
				type: [String],
				default: '',
			},
			value: {
				type: [String, Boolean],
				default: true,
			},
			checkedValue: {
				type: [String, Boolean],
				default: '',
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
					const checkedValue = this.checkedValue
					const model = to === checkedValue

					/*
					console.log('watch value')
					console.log('to:', to)
					console.log('inputElm:', inputElm)
					console.log('model:', model)
					*/

					this.model = model
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
			const value        = this.value
			const checkedValue = this.checkedValue
			const model        = checkedValue === value
			const inputElm     = this.$refs.input
			const isChecked    = inputElm.checked

			/*
			console.log('')
			console.log('this:', this)
			console.log('value:', value)
			console.log('checkedValue:', checkedValue)
			console.log('model:', model)
			console.log('inputElm:', inputElm)
			console.log('isChecked:', isChecked)
			*/

			inputElm.checked = model
			this.model = model
		},
	}
</script>

<style lang="less">
	//.FormField__inputRadio { opacity: 1 !important; }

	.BaseRadio { // css vars
		--height : 2em;
		--width  : 2em;
		--padding: 0.4em;
	}

	.BaseRadio {	// layout
		display: inline-block;
		flex-shrink: 0;

		&__inner {
			display: flex;
			padding: var(--padding);
		}
		&__fakeRadio {
			position: relative;
			pointer-events: none;
			flex-grow: 1;
		}
	}
	.BaseRadio { // styling
		&__inputRadio + &__fakeRadio circle {
			transition: var(--transition);

			&:first-child {
				stroke: currentColor;
				stroke-width: 1.25px;
			}
			&:last-child {
				r: 5.25px;
				fill: white;
			}
		}
		&__inputRadio:checked + &__fakeRadio circle {
			&:first-child {}
			&:last-child {
				r: 2px;
			}
		}
	}

	.BaseRadio { // hover
	}
	.BaseRadio { // focus
	}
	.BaseRadio { // disabled
	}

	/*
	.BaseRadio {	// css vars
		--height                : 2em;
		--paddingLeft           : 0.25em;
		--paddingRight          : 0.25em;
		--labelPadding          : 0.25em;
		--border                : 1px solid red;
		--hoverBorder           : 1px solid blue;
		--focusBorder           : 1px solid green;
		--activeBackgroundColor : fade(black, 50);
		--activeForegroundColor : fade(black, 75);
	}
	.BaseRadio {
		//outline: 1px solid fade( red, 50);

		display: inline-flex;
		align-items: flex-start;
		cursor: pointer;

		&__inner {
			//background-color: fade( red, 15 );

			position: relative;
			height: var(--height);
			display: flex;
			align-items: center;
			padding-left: var(--paddingLeft);
			padding-right: var(--paddingRight);
		}
		&__input {
			position: absolute;
			top: 0; left: 0;
			right: 0; bottom: 0;
			height: 100%; width: 100%; // needed correct dimensions for validation tooltip placement
			opacity: 0;
		}
		&__checkbox {
			//.checkboxMixin();
		}
		&__label {
			min-height: var(--height);
			padding: var(--labelPadding);

			display: inline-block;
			display: flex;
			align-items: center;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
	*/
</style>
