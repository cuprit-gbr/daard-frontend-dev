/**
 * stepper directive for input-elements
 * enables number increasing, descreasing with ArrowUp and ArrowDown
 * supports shiftKey as *10 multiplier
 *
 * usage example:
	<input class=""
		type="text"
		:value="100+'%'"
		v-stepper="{
			unit : '%',
			max : 100,
			min : 0,
			step : 1,
			callback : onChangeValue
		}"
		@keydown.enter="onChangeValue"
		@blur="onChangeValue"
	/>
  *
  * changelog
  * 	2022-06-24	init
  *
  */


import { get, isNumber, isFunction } from "lodash"

const numberStepper = {
    bind( el, binding, vnode, doLog = true ) {
		let handlerInput = (e) => {
			const key = e.key
			const value = e.target.value
			const multiplier = e.shiftKey ? 10 : 1
			const step = get( binding.value, 'step', 1 )
			const unit = get( binding.value, 'unit' )
			const max = parseFloat( get( binding.value, 'max' ) )
			const min = parseFloat( get( binding.value, 'min' ) )
			const callback = get( binding.value, 'callback' )
			const number = isNaN( parseFloat( value ) ) ? 100 : parseFloat( value )
			let newValue

			if( 'ArrowUp' === key ){
				newValue = number + ( step*multiplier )
				if( isNumber( max ) && newValue > max ) newValue = max
				e.target.value = newValue + unit
				if( isFunction( callback ) ) callback( e )
				vnode.elm.dispatchEvent( new CustomEvent('input') )
				//e.preventDefault()
			}
			else if( 'ArrowDown' === key ){
				newValue = number - ( step*multiplier )
				if( isNumber( min ) && newValue < min ) newValue = min
				e.target.value = newValue + unit
				if( isFunction( callback ) ) callback( e )
				vnode.elm.dispatchEvent( new CustomEvent('input') )
				//e.preventDefault()
			}

			if( doLog ){
				console.group('numberStepper • handlerInput( e )', e)
				console.log('key:', key)
				console.log('value:', value)
				console.log('multiplier:', multiplier)
				console.log('unit:', unit)
				console.log('max:', max)
				console.log('min:', min)
				console.log('-------')
				console.log('number:', number)
				console.log('newValue:', newValue)
				console.log('-------')
				console.log('e.target.value:', e.target.value)
				console.groupEnd()
			}
		}
		el.addEventListener('keydown', handlerInput)
    }
}

export default numberStepper;