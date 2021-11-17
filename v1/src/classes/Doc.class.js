import _ from 'lodash'
import axios from 'axios'
import Papa from 'papaparse'

let isReady = undefined // is true after all thesauri are fetched
let isLoading = undefined 

const fetchSchemeThesauri = function( scheme, callback, doLog = true ){
	const axiosAllPromises = []

	isReady   = false
	isLoading = true

	if( doLog ){
		console.groupCollapsed('Doc • fetchThesauri()')
		console.log('thesauri', scheme.thesauri)
		console.log('pairs', scheme.pairs)
		console.groupEnd()
	}

	// collect all the urls to fetch from
	_.forEach( scheme.thesauri, (v, k)=>{
		if( v.url ){
			axiosAllPromises.push( axios.get( v.url ) )
		}
	})

	// fetch all and run callback
	axios.all( axiosAllPromises ).then( axios.spread((...responses) => {
		if( doLog ){
			console.groupCollapsed('Doc • fetchThesauri() • after')
			console.log('responses:', responses)
		}

		let i = 0
		_.forEach( scheme.thesauri, (v, k)=>{
			if( v.url ){
				v.values = responses[i++].data
				if(doLog) console.log('v.values:', v.values)
			}
		})

		if( doLog ){
			console.groupEnd()
		}

		isReady = true 
		isLoading = false

		callback()
	}))
	.catch( errors => { // react on errors
		isLoading = false
		
		console.log('errors:', errors)
	})
}

//console.log('first • Papa', Papa)

export default class {
	title          = ''
	scheme         = {}
	pairs          = {}
	csvTableLayout = ''
	unparseConfig  = {
		quotes: false,
		quoteChar: '"',
		escapeChar: '"',
		delimiter: ";",
		header: false,
		newline: "\r\n",
		skipEmptyLines: true, //other option is 'greedy', meaning skip delimiters, quotes, and whitespace.
		columns: null //or array of strings
	}

	constructor( args, doLog = true ){
		if( doLog ){
			console.groupCollapsed('Doc • constructor()')
			console.log('args', args)
			console.groupEnd()
		}

		this.title          = args.title || ''
		this.scheme         = args.scheme || {}
		this.csvTableLayout = args.csvTableLayout || 'vertical'

		// plant computed
		if( _.isObject( args.computed ) ){
			_.forEach( args.computed, (value, key)=>{
				if( _.isFunction( value ) ){
					Object.defineProperty( this, key, {
						get: value,
						set: ()=>{},
					})
				}
			})
		}

		// plant methods
		if( _.isObject( args.methods ) ){
			_.forEach( args.methods, (value, key)=>{
				if( _.isFunction( value ) ){
					this[key] = value
				}
			})
		}

		// plant item with scheme fields default values
		this.resetData()

		// fetch all thesauri jsons
		fetchSchemeThesauri(this.scheme, ()=>{
			isReady = true
		})

		setTimeout(()=>{
			this.title = 'not more'
		}, 2000)
	}

	get datasets(){
		const datasets     = []
		const schemeFields = this.scheme.fields
		const doLog        = false

		if( doLog ){
			console.group('Doc • datasets')
		}

		_.forEach( schemeFields, (pairValues, pairKey)=>{
			const value      = !_.isUndefined( this.pairs[pairKey] ) ? this.pairs[pairKey] : pairValues.default
			const haystack   = pairValues.gui.thesaurus ? _.get( this.scheme.thesauri[ pairValues.gui.thesaurus( this.pairs ) ], 'values') : undefined
			
			if( doLog ){
				console.log(pairKey, pairValues)
			}

			if( doLog && pairValues.gui.thesaurus ){
				/*
				console.log('args', pairValues.gui.thesaurus( this.pairs ) )
				console.log('thesauri', this.scheme.thesauri )
				console.log('haystack', haystack )
				console.log('----')
				*/
			}

			const isValid    = pairValues.rule ? pairValues.rule.testFn( value, haystack, this.pairs, this.scheme ) : false
			const exportFilter = 'value' //pairValues.exportFilter
			
			let dataset = {
				title       : pairValues.title,
				key         : pairKey,
				value       : value,
				message     : pairValues.message,
				exportFilter: exportFilter,
				isValid     : isValid,
			}
			_.assign( dataset, _.cloneDeep( pairValues ) )
			
			datasets.push( dataset )
			
			/*
			console.log('dataset:', dataset)
			*/
		})

		if( doLog ){
			console.groupEnd()
		}

		return datasets
	}
	get isLoading(){
		return isLoading
	}
	get isReady(){
		return isReady
	}
	get isValid(){
		let isValid = true
		_.forEach( this.datasets, (dataset)=>{
			if(!dataset.isValid) isValid = false
		})

		return isValid
	}
	get countInvalidDatasets(){
		const datasets        = this.datasets
		const inValidDatasets = _.filter( datasets, { isValid : false })

		return inValidDatasets.length
	}

	setDatasetValue( key, value, doLog = true ){
		if( doLog ){
			console.group('Doc • setDatasetValue( key, newValue )', key, value )
			console.groupEnd()
		}
		
		if( _.has( this.pairs, key ) ){
			// array to string
			if( _.isArray( value ) ) value = value.join(', ')

			// set value
			_.set( this.pairs, key, value )
			
			// run onChange if given
			if( _.isFunction(this.scheme.fields[key].onChange) ){
				this.scheme.fields[key].onChange( value, this.pairs )
			}
		}
	}
	downloadAsCsv( doLog = true ){ // handles the csv download
		if( doLog ){
			console.groupCollapsed('Doc.class.js • downloadAsCsv()')
		}

		const headerRow      = []
		const bodyRow        = []
		const csvTableLayout = this.csvTableLayout
		let   csvData        = undefined

		// generate rows array with cells	
		_.forEach( this.datasets, (dataset)=>{
			headerRow.push( dataset.title )
			
			// use export filter if given
			if( _.isFunction( dataset.exportFilter ) ){
				bodyRow.push( dataset.exportFilter( dataset.value ) )
			}
			// no export filter given: just use the value
			else{
				bodyRow.push( dataset.value )
			}
		})

		// horizontal layout ( keys left, values right )
		if( csvTableLayout == 'horizontal' ){
			csvData = []
			
			_.forEach( headerRow, (key, i)=>{
				const value = bodyRow[i]
				
				csvData.push([key, value])
				
				//console.log(i, key, value)
			})
		}
		// vertical layout (default table: keys on top, values below)
		if( csvTableLayout == 'vertical' ){
			csvData = [
				headerRow,
				bodyRow,
			]
		}

		const csvStr = Papa.unparse({
			data : csvData,
		}, this.unparseConfig)

		if( doLog ){
			console.log('this.datasets:', this.datasets)
			console.log('this.pairs:', this.pairs)
			console.log('headerRow:', headerRow)
			console.log('bodyRow:', bodyRow)
			console.log('csvTableLayout:', csvTableLayout)
			console.log('csvData:', csvData)
			console.log('csvStr:', csvStr)
			console.groupEnd()
		}

		// start the download via fake link click
		const downloadLinkElm = document.createElement("a")
		const csvFile         = new Blob(["\uFEFF"+csvStr], {type: "text/csv; charset=UTF-8"})

		// File name
		downloadLinkElm.download = this.title

		// Create a link to the file
		downloadLinkElm.href = window.URL.createObjectURL(csvFile);

		// Hide download link
		downloadLinkElm.style.display = "none"

		// Add the link to DOM
		document.body.appendChild(downloadLinkElm)

		// Click download link
		downloadLinkElm.click()
					
		// remove the created link after
		downloadLinkElm.remove()
	}
	resetData(){
		// plant item with scheme fields default values
		_.forEach( this.scheme.fields, (pairValues, pairKey)=>{
			// needs to be a function zo make the template <component></component>
			// working with every properties. pervent is-no-function-error
			// every pair has to have the same keys
			if( !_.isFunction(pairValues.gui.thesaurus) ){
				pairValues.gui.thesaurus = ()=>{}
			}
			this.pairs[pairKey] = pairValues.default
		})
	}
	getThesauri( key ){
		let thesauri = _.get(this.scheme, 'thesauri['+key+'].values', [] )
		return thesauri
	}
}
