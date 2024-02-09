import _ from 'lodash'

export default {
	get( key = null ){
		// return all props if no key is given
		if( key === null ){
			return _.cloneDeep( this.item )
		}
		// return the value of the given type
		else{
			const value = _.get( this.item, key )
			return value ? _.cloneDeep( value ) : undefined
		}
	},
	set( key, value, doLog = false ){
		const props     = this.props
		const keyIsPath = key.includes('[') || key.includes('.')
		const keyExists = _.has( this.item, key )
		let   theReturn = undefined
		
		if( doLog ){
			console.group('set()')
			console.log('         key:', key)
			console.log('       value:', value)
			console.log('------------')
			console.log('   keyIsPath:', keyIsPath)
			console.log('   keyExists:', keyExists)
		}
		
		// stop if key is not in props and no valid path
		if( !_.has( props, key ) && !keyExists ){
			if( doLog ){
				console.groupEnd()
			}
			return
		}
		
		// check if value has right type 
		// for root pairs only, not paths
		if( !keyIsPath ){
			const expectedType   = _.get( props[key], 'type' )
			let   castedValue    = expectedType(value)
			const expectedTypeOf = _.get( expectedType, 'name' )
			if( expectedTypeOf === 'Array' ) castedValue = castedValue[0]
			let   isValidType    = (value === castedValue) ? true : false
			
			if( doLog ){
				console.log('expectedTypeOf:', expectedTypeOf)
				console.log('   castedValue:', castedValue)
				console.log('   isValidType:', isValidType)
			}
			
			// set if type is valid
			if( isValidType ){
				_.set( this.item, key, value )
				theReturn = value
			}
		}
		// just set value for paths
		else{
			if( doLog ){
				console.log('2')
			}
			
			_.set( this.item, key, value )
		}
		
		if( doLog ){
			console.groupEnd()
		}
		
		return theReturn
	},	
	plant( props = {} ){ // set data from props
		const defaults = this.props
		
		// set the props with their default values
		_.forEach( defaults, (value, key)=>{
			//console.log(k, v)
			this.item[key] = _.cloneDeep( value.default )
		})
	}
}
