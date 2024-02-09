<!--

	Die Componente dient als Wrapper für input[type=color]-Elemente.

	Props:
		value	String 	any valid css color value

	TODO:
		add required
		add disabled
		emit after change
		emit sanitized input value if invalid

	Markup:
		<BaseColor
			:value="'rgba( 255, 123, 50, 0.5 )'"
			:disabled="false"
			@change="(e)=>{}"
			@input="(value)=>{}"
		></BaseColor>

	Changelog
		2022-06-16	init

-->

<template>
	<div class="BaseColor FormField FormField--BaseColor" :class="elmClasses">
		<div class="BaseColor__inner FormField__inner">
			<div class="BaseColor__bg FormField__bg"></div>

			<div class="BaseColor__swatchWrapper pattern--checkerboard">
				<div class="BaseColor__swatchPresentation"
					:style="{
						backgroundColor : solidColorValue
					}"
				></div>
				<div class="BaseColor__swatchPresentation"
					:style="{
						backgroundColor : model
					}"
				></div>
				<input class="BaseColor__swatchInput"
					type="color"
					ref="swatchInputElm"
					:value="hexColorValue"
					@input="onChangeColorInput"
				/>
			</div>

			<div class="BaseColor__separator FormField__border"></div>

			<!-- solidColorValue : color value as string -->
			<input class="BaseColor__input BaseColor__input--solidColorValue FormField__input"
				type="text"
				ref="solidColorValueElm"
				:value="solidColorValue"
				@keydown.enter="onChangeSolidColorValue"
				@blur="onChangeSolidColorValue"
			/>

			<div class="BaseColor__separator FormField__border"></div>

			<!-- alphaValue : alpha value as number  -->
			<input class="BaseColor__input BaseColor__input--alphaValue FormField__input"
				type="text"
				ref="alphaValueElm"
				:value="( alphaValue * 100 ) + '%'"
				v-stepper="{
					unit : '%',
					max : 100,
					min : 0,
					step : 1,
					callback : onChangeAlphaValue
				}"
				@keydown.enter="onChangeAlphaValue"
				@blur="onChangeAlphaValue"
			/>

			<div class="BaseColor__border FormField__border"></div>
		</div>
		<div class="BaseColor__debug" v-if="debug">
			<pre name="value">{{value}}</pre>
			<pre name="model">{{model}}</pre>
			<pre name="solidColorValue">{{solidColorValue}}</pre>
			<pre name="alphaValue">{{alphaValue}}</pre>
		</div>
	</div>
</template>

<script>
	import { get } from "lodash"
	//import Color from "./vendor/color/node_modules/color/index.js"
	import Color from "./vendor/color/index.js"
	//import ColorString from "./vendor/color/node_modules/color-string/index.js"
	import ColorString from "./vendor/color-string/index.js"
	import stepper from "./directives/numberStepper.directive.js"

	export default {
		name: 'BaseColor',
		components: {},
		directives: {
			stepper,
		},
		mixins: [],
		props: {
			value: {
				type: [String],
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
				default: true,
			},
		},
		data() {
			return {
				model : '',
				solidColorValue : '',
				alphaValue : '',
				defaultModel : 'rgba( 0, 0, 0, 1 )',
			}
		},
		watch: {
			value: {
				handler: function( to, from ) {
					const isValidColorString = this.isValidColorString( to )

					if( isValidColorString ){
						this.setInternalValues( to )
					}
					else{
						this.setInternalValues( this.defaultModel )
						//console.warn('emit new sanitized value')
					}
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

				return classes
			},
			hexColorValue(){
				const solidColorValue = this.solidColorValue
				const isValidColorString = this.isValidColorString( solidColorValue )
				let hexColorValue

				if( isValidColorString ){
					const color = Color( solidColorValue )
					hexColorValue = color.hex()
				}

				return hexColorValue
			},
		},
		methods: {
			onChangeColorInput( e, doLog = false ){
				const value = e.target.value
				const color = Color( value )
				const colorObject = color.object()
				const alphaValue = this.alphaValue
				const rgbaColorValue = 'rgba('+colorObject.r+','+colorObject.g+','+colorObject.b+','+alphaValue+')'

				if( doLog ){
					console.groupCollapsed(this.$options.name + ' • onChangeColorInput( e )', e)
					console.log('value:', value)
					console.log('-----')
					console.log('colorObject:', colorObject)
					console.log('alphaValue:', alphaValue)
					console.log('-----')
					console.log('rgbaColorValue:', rgbaColorValue)
					console.groupEnd()
				}

				this.setInternalValues( rgbaColorValue )
			},
			onChangeSolidColorValue( e, doLog = false ){
				const value = e.target.value
				const isValidColorString = this.isValidColorString( value )
				const colorString = isValidColorString ? value : this.defaultModel

				if( doLog ){
					console.groupCollapsed(this.$options.name + ' • onChangeSolidColorValue( e )', e)
					console.log('value:', value)
					console.log('------')
					console.log('isValidColorString:', isValidColorString)
					console.log('------')
					console.log('colorString:', colorString)
					console.groupEnd()
				}

				this.setInternalValues( colorString )
			},
			onChangeAlphaValue( e, doLog = false ){
				const value = e.target.value
				let number = isNaN( parseInt( value ) ) ? 100 : parseInt( value )
				if( number < 0 ){ number = 0 } else if( number > 100 ){ number = 100 }
				let alphaValue = number / 100

				const solidColorValue = this.solidColorValue
				const color = Color( solidColorValue )
				const colorObject = color.object()
				const colorString = 'rgba('+colorObject.r+','+colorObject.g+','+colorObject.b+','+alphaValue+')'

				if( doLog ){
					console.groupCollapsed(this.$options.name + ' • onChangeAlphaValue( e )', e)
					console.log('value:', value)
					console.log('-------')
					console.log('number:', number)
					console.log('alphaValue:', alphaValue)
					console.log('solidColorValue:', solidColorValue)
					console.log('-------')
					console.log('colorString:', colorString)
					console.groupEnd()
				}

				//e.target.value
				this.setInternalValues( colorString )
			},
			setInternalValues( colorString, doLog = false ){
				const color = Color( colorString )
				const colorObject = color.object()
				const alphaValue = get( colorObject, 'alpha', 1 )
				const solidColorValue = 'rgb('+colorObject.r+','+colorObject.g+','+colorObject.b+')'
				const rgbaColorValue = 'rgba('+colorObject.r+','+colorObject.g+','+colorObject.b+','+alphaValue+')'

				if( doLog ){
					console.groupCollapsed(this.$options.name + ' • setInternalValues( colorString )', colorString)
					console.log('colorString:', colorString)
					console.log('---------')
					console.log('colorObject:', colorObject )
					console.log('solidColorValue:', solidColorValue )
					console.log('alphaValue:', alphaValue )
					console.log('setInternalValues', rgbaColorValue )
					console.groupEnd()
				}

				this.model = rgbaColorValue
				this.solidColorValue = solidColorValue
				this.alphaValue = alphaValue

				if( this.$refs.solidColorValueElm ) this.$refs.solidColorValueElm.value = solidColorValue
				if( this.$refs.alphaValueElm ) this.$refs.alphaValueElm.value = ( alphaValue * 100 ) + '%'
				//if( this.$refs.swatchInputElm ) this.$refs.swatchInputElm.value = color.hex()
			},
			isValidColorString( anyColorString ){
				if( anyColorString ){
					console.log('value:', this.value )
					console.log('anyColorString:', anyColorString )
					const colorString = ColorString.get( anyColorString )
					console.log('colorString:', colorString )
					console.log('-----')

					return anyColorString && ColorString.get( anyColorString ) ? true : false
				}
				else{
					return false
				}
			},
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
		created(){
			//const colorStringLog = ColorString.get( 'green' )
			//console.log('colorStringLog:', colorStringLog)
		},
		mounted(){
			//console.log('mounted')
			//this.model = this.value
		},
	}
</script>

<style lang="less">
	.BaseColor { // css vars
		--height : 2em;
		//--width  : 2em;
		--padding: 0.4em;
	}

	.pattern--checkerboard {
		@deepColor: rgba(0, 0, 0, .2);
		@cubeSize: 5px;
		background-color: white;
		background-image:
		linear-gradient(45deg,
			@deepColor 25%,
			transparent 25%,
			transparent 75%,
			@deepColor 75%,
			@deepColor
		),
		linear-gradient(45deg,
			@deepColor 25%,
			transparent 25%,
			transparent 75%,
			@deepColor 75%,
			@deepColor
		);
		background-size: (@cubeSize * 2) (@cubeSize * 2);
		background-position: 0 0, @cubeSize @cubeSize;
	}

	.BaseColor { // debug
		&__swatchWrapper,
		&__separator,
		&__input {
			//outline: 1px solid red;
		}
	}
	.BaseColor { // layout
		display: inline-block;
		flex-shrink: 0;

		&__inner {
			display: flex;
		}

		&__swatchWrapper {
			position: relative;
			flex-shrink: 0;
			display: flex;
			width: calc( var(--height)*2 - var(--padding)*0 );
			//margin-top: var(--padding);
			//margin-bottom: var(--padding);
			margin-right: calc( var(--padding) * -1 );
			border-top-left-radius: var(--borderRadius);
			border-bottom-left-radius: var(--borderRadius);
			overflow: hidden;
		}
		&__swatchPresentation {
			flex-grow: 1;
		}
		&__swatchInput {
			position: absolute;
			top: 0; left: 0; right: 0; bottom: 0;
			width: 100%;
    		height: 100%;
			opacity: 0;
			cursor: pointer;
			margin: 0;
		}

		&__separator {
			position: relative;
			height: 100%;
			width: var(--borderWidth);
			border-right: none;
			//border-right-style: var(--borderStyle);
			//border-right-color: var(--borderColor);
			//opacity: var(--borderOpacity);
			margin: 0 var(--padding);
		}

		&__input {
			height: 100%;
			//margin: var(--padding);
			flex-grow: 1;
			text-indent: 0;
		}
		//&__input--solidColorValue { width: 10em; }
		//&__input--alphaValue { width: 4em; text-align: right; }

		&__debug {
			padding-top: 0.5em;
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 0.5em;
			min-width: 300px;
		}
		&__debug pre {
			margin: 0;
		}
	}
	.BaseColor { // styling
		&__swatchWrapper {}
	}

	.BaseColor { // hover
	}
	.BaseColor { // focus
	}
	.BaseColor { // disabled
	}
</style>
