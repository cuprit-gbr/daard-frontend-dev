<!-- 

	Die Componente dient als transparent Wrapper für alle Input Elemente
	
	Props:
		value	String 	Wird als value des Inputs verwendet
		label 	String 	Wird vor dem Input angezeigt
	
	Markup:
		<BaseDate
			@change="myFunction( $event.target.value )"
			:value="'Mein Standardwert'"
		></BaseDate>
	
	Changelog
		2020-07-27	init

-->

<template>
	<div class="BaseDate" :class="elmClasses">
		<div class="BaseDate__inner">
			<!--https://github.com/date-fns/date-fns-->
			<input
				ref="input"
				type="date"
				class="BaseDate__input"
				:placeholder="format+''"
				:required="required"
				:disabled="disabled"
				v-model="model"
			  	@input="emit"
			/>
		</div>
		<template v-if="debug">
			<br />
			<pre name="BaseDate.value">{{value}}</pre>
			<pre name="BaseDate.model">{{model}}</pre>
		</template>
	</div>
</template>

<script>
	// @ is an alias to /src
	//import DevInfos from '@/components/DevInfos.vue'
	//import { EventBus } from '@/event-bus.js'

	Date.prototype.yyyymmdd = function() {
		const mm = this.getMonth() + 1; // getMonth() is zero-based
		const dd = this.getDate();

		return [
			String( this.getFullYear() ).padStart(4, '0'), // force leading zero for years like 32 > 0032
		    (mm>9 ? '' : '0') + mm,
		    (dd>9 ? '' : '0') + dd
		].join('-');
	};
	Date.prototype.isValid = function () { 
		  
		// If the date object is invalid it 
		// will return 'NaN' on getTime()  
		// and NaN is never equal to itself. 
		return this.getTime() === this.getTime(); 
	}
	
	export default {
		name: 'BaseDate',
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
			required: {
				type: [String, Boolean],
				default: false,
			},
			format: {
				type: [String],
				default: 'yyyy-mm-dd',
			},
			disabled: {
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
				model : null,
			}
		},
		watch: {
			value: {
				// watch value and set model
				// this is needed to react on model changes from outside
				handler: function( to, from ) {
					const value = this.handleValue( to )
					
					if( this.model != value ) this.model = value
				},
			},
		},
		computed: {
			elmClasses(){
				 let classes = []
				 
				 if( this.required ) classes.push( 'BaseDate--isRequired' )
				 if( this.disabled ) classes.push( 'BaseDate--isDisabled' )
				 if( !this._.trim( this.value ) ) classes.push( 'BaseDate--noValue' )
				 
				 return classes
			},
			emitValue(){
				let doLog    = false
				const input  = this.model
				const format = this.format
				const parts  = input ? input.split('-') : []
				
				let output = format
			    output = output.replace('dd', parts[2])
			    output = output.replace('mm', parts[1])
			    output = output.replace('yyyy', parts[0])
				
				if( doLog ){
					console.group('emitValue()')
					console.log('input:', input)
					console.log('format:', format)
					console.log('output:', output)
					console.groupEnd()
				}
				
				return input ? output : null
			},
		},
		methods: {
			emit( event, doLog = false ) {
				const inputValue  = this.model
				const changeValue = event
				const emitValue   = this.emitValue
				
				if( doLog ){
					console.group('emit()')
					console.log('inputValue:', inputValue)
					console.log('changeValue:', changeValue)
					console.groupEnd()
				}
				
				//console.log('BaseDate emit')
				this.$emit('input', emitValue)
				this.$emit('change', changeValue)
			},
			parseInputDate( input, doLog = false ) {
				let format = this._.clone( this.format )
			    format = format || 'yyyy-mm-dd'; // default format
			  	let parts = input ? input.match(/(\d+)/g) : []
			    let i = 0
				let fmt = {}

				// extract date-part indexes from the format
				format.replace(/(yyyy|dd|mm)/g, (part)=>{ fmt[part] = i++; })
			  	
				let dateStr         = parts[fmt['yyyy']] + '-' +
							  		  parts[fmt['mm']] + '-' +
							  		  parts[fmt['dd']]
				let newDate         = new Date( dateStr )
				let formatedNewDate = newDate.yyyymmdd()
				let isValid         = (dateStr === formatedNewDate)
				
				if( doLog ){
					console.group('parseInputDate()')
					console.log('input:', input)
					console.log('format:', format)
					console.log('parts:', parts)
					console.log('dateStr:', dateStr)
					console.log('newDate:', newDate)
					console.log('newDate.isValid():', newDate.isValid())
					console.log('isValid:', isValid)
					console.log('formatedNewDate:', formatedNewDate)
					console.groupEnd()
				}	

			  	return (parts && input && isValid) ? newDate : null
		    },
			handleValue( value, doLog = false ){
				if( doLog ){
					console.group('handleValue()')
				}
					
				const parsedDate   = this.parseInputDate( value )
				const formatedDate = parsedDate ? parsedDate.yyyymmdd() : null
				const emitValue    = this.emitValue
				
				if( doLog ){
					console.log('value:', value)
					console.log('parsedDate:', parsedDate)
					console.log('formatedDate:', formatedDate)
					console.log('emitValue:', emitValue)
					console.groupEnd()
				}
				
				return formatedDate
			},
		},
		created() {},
		mounted() {
			const value = this.handleValue( this._.clone( this.value ) )
			
			this.model  = value
		},
	}
</script>

<style lang="less">
	@import (reference) "./vars.less";
	@import (reference) "./mixins.less";
	
	.BaseDate { // css vars
		--height                : @dateElm[height];
		--paddingLeft           : @dateElm[paddingLeft];
		--borderRadius          : @dateElm[borderRadius];
		--border                : @dateElm[border];
		--hoverBorder           : @dateElm[hoverBorder];
		--backgroundColor       : @dateElm[backgroundColor];
		--activeBackgroundColor : @baseElm[activeBackgroundColor];
		--activeForegroundColor : @baseElm[activeForegroundColor];
	}
	.BaseDate {
		position: relative;
		width: 100%;

		&__inner {
			position: relative;
			width: 100%;
			height: @dateElm[height]; height: var(--height);
			background-color: @dateElm[backgroundColor]; background-color: var(--backgroundColor);
			border-radius: @dateElm[borderRadius]; border-radius: var(--borderRadius);
			border: @dateElm[border]; border: var(--border);
			color: inherit;		
		}
		&__input {
			max-width: 100%;
			width: 100%;
			height: 100%;
			text-indent: @dateElm[paddingLeft]; text-indent: var(--paddingLeft);
			//cursor: pointer;

			border: none;
			outline: none;
			background-color: transparent;
			-webkit-appearance: none;
    		-moz-appearance: none;
    		appearance: none;
			font: inherit;
			color: inherit;
			padding: 0;
			margin: 0;
			
			.BaseDate--noValue &,
			&::placeholder { 				
				opacity: 0.5;
				color: currentColor;
			}
			.BaseDate--noValue:hover & {
				opacity: 1;
			}
			&:focus {
				outline: none;
				opacity: 1;
								
				&::placeholder { 
					opacity: 0;
				}
			}
		}
		&__clearBtn {
			position: absolute;
			top: 50%; right: 0;
			height: 1.2em;
			width: 1.2em;
			display: flex;
			justify-content: center;
			align-items: center;
			
			transition: all 0.1s ease;
			transform: translateY(-50%) translateX(-50%);
			font-size: @dateElm[height]/2; font-size: calc( var(--height) / 2 );
			line-height: 1em;
			//color: @dateElm[backgroundColor];
			//text-decoration: none;
			
			border-radius: 50%;
			background-color: fade( black, 65 );
			opacity: 0;
			pointer-events: none;
			cursor: pointer;
			
			&::after, &::before {
				position: absolute;
				top: calc( 50% + 0px ); left: calc( 50% );
				width: 0.8em; height: 2px;
				//transform: translateY(-64%) translateX(-54%);
				background-color: white;
				transform-origin: left top;
				content: "";
			}
			&::after {
				transform: rotate(45deg) translateY(-50%) translateX(-50%);
			}
			&::before {
				transform: rotate(-45deg) translateY(-50%) translateX(-50%);
			}
			
			&--isVisible {
				pointer-events: auto;
				opacity: 0.5;				
			}
			&--isVisible:hover {
				opacity: 1;				
			}
		}
	}
	.BaseDate:focus-within,
	.BaseDate:hover:not(.BaseDate--isDisabled) {
		.BaseDate__inner {
			border: @dateElm[hoverBorder]; border: var(--hoverBorder);
		}
	}
	
	.BaseDate--isRequired {}
	.BaseDate--isDisabled {
		.BaseDate__input {
			opacity: 0.75;
		}
	}
</style>
