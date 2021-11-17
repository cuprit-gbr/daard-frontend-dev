import _ from 'lodash'
import axios from 'axios'
import Papa from 'papaparse'

let isReady = undefined // is true after all thesauri are fetched
let isLoading = undefined

const fetchSchemeThesauri = function( doc, callback, doLog = false ){
	const axiosAllPromises = []
	const scheme = doc._data.scheme

	if( doLog ){
		console.groupCollapsed('Doc • fetchThesauri()')
		console.log('thesauri before', scheme.thesauri)
		console.groupEnd()
	}

	// collect all the fetch urls from the thesauri
	_.forEach( scheme.thesauri, (v, k)=>{
		if( v.url ) axiosAllPromises.push( axios.get( v.url ) )
	})

	// there is something to fetch
	if( axiosAllPromises.length ) doc._data.isLoading = true

	// fetch all thesauri
	// add values to scheme thesauri
	// run final callback
	axios.all( axiosAllPromises ).then( axios.spread((...responses) => {
		if( doLog ){
			console.groupCollapsed('Doc • fetchThesauri() • after')
			console.log('responses:', responses)
		}

		let i = 0
		_.forEach( scheme.thesauri, (v, k)=>{
			if( v.url ){
				v.values = responses[i++].data
				if( doLog ) console.log( k, v.values )
			}
		})

		if( doLog ){
			console.log('------')
			console.log('thesauri after', scheme.thesauri)
			console.groupEnd()
		}

		doc._data.isLoading = false

		callback()
	}))
	.catch( errors => { // react on errors
		doc._data.isLoading = false

		console.log('errors:', errors)
	})
}

export default class {
	_data = {
		activeRowIndex : 0,
		scheme         : {},
		rows           : [],
		fields         : [],
		isLoading      : false,
		isReady        : false,
		csvTableLayout : 'vertical', // vertical: one dataset per row
		arraySeparator : ',', // used for string to array conversations with join and split
		unparseConfig  : { // see https://www.papaparse.com/docs#json-to-csv for all available options
			quotes         : false,
			quoteChar      : '"',
			escapeChar     : '"',
			delimiter      : ",",
			header         : false,
			newline        : "\r\n",
			skipEmptyLines : true, // other option is 'greedy', meaning skip delimiters, quotes, and whitespace.
			columns        : null, // or array of strings
		}
	}

	constructor( args, doLog = false ){
		if( doLog ){
			console.groupCollapsed('Doc • constructor()')
			console.log('args', args)
			console.groupEnd()
		}

		this._data.scheme         = args.scheme || {}
		this._data.csvTableLayout = args.csvTableLayout || 'vertical'
		this._data.arraySeparator = args.arraySeparator || ','

		// merge given unparseConfigs
		if( _.isObject( args.unparseConfig ) ){
			_.forEach( args.unparseConfig, (v, k)=>{
				this._data.unparseConfig[k] = v
			})
		}

		// plant fields
		if( _.isObject( this._data.scheme.fields ) ){
			_.forEach( this._data.scheme.fields, (pairValues, pairKey)=>{
				let field = {
					key          : pairKey,
					title        : pairValues.title,
					default      : pairValues.default,
					gui          : pairValues.gui,
					message      : pairValues.message,
					isRequired   : _.isFunction( pairValues.isRequired )   ? pairValues.isRequired : ()=>{ return false },
					isDisabled   : _.isFunction( pairValues.isDisabled )   ? pairValues.isDisabled : ()=>{ return false },

					isValidTest  : _.isFunction( pairValues.isValidTest )  ? pairValues.isValidTest : ()=>{ return true },
					importFilter : _.isFunction( pairValues.importFilter ) ? pairValues.importFilter : (v)=>{ return v },
					exportFilter : _.isFunction( pairValues.exportFilter ) ? pairValues.exportFilter : (v)=>{ return v },
					onChange     : _.isFunction( pairValues.onChange )     ? pairValues.onChange : (v)=>{ return v },
				}
				//_.assign( field, _.cloneDeep( pairValues ) )

				this._data.fields.push( _.cloneDeep( field ) )
			})
		}

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
		//this.resetData()

		// fetch all thesauri jsons
		fetchSchemeThesauri( this, ()=>{
			this._data.isReady = true
		})
	}

	get dataRows(){ // returns array with all rows, containing array with all cell values
		return this._data.rows
	}
	get countDataRows(){ // returns integer how many dataRows are in the doc
		return this._data.rows.length
	}
	get dataColumnTitles(){ // returns array with all dataset titles
		const titles = []

		_.forEach( this.fields, (values, key) => {
			titles.push( values.title )
		})

		return titles
	}
	get activeDataRow(){ // returns from this rows array the row with the activeRowIndex
		return this._data.rows[ this.activeRowIndex ]
	}
	get activeRowIndex(){ // returns index of currently active row
		return this._data.activeRowIndex
	}
	set activeRowIndex( newIndex ){ // sets index of new active row
		this._data.activeRowIndex = newIndex

		return this._data.activeRowIndex
	}
	get prevRowIndex() { // returns the prev activeRowIndex or false if there is none
		const activeRowIndex = this.activeRowIndex
		const nextActiveRowIndex = activeRowIndex - 1
		const isValid = nextActiveRowIndex > -1
		return isValid ? nextActiveRowIndex : false
	}
	get nextRowIndex(){ // returns the next activeRowIndex or false if there is none
		const activeRowIndex = this.activeRowIndex
		const nextActiveRowIndex = activeRowIndex + 1
		const isValid = nextActiveRowIndex < this.dataRows.length
		return isValid ? nextActiveRowIndex : false
	}
	get fields(){
		return this._data.fields
	}
	get countValues(){
		const countRows = this.dataRows.length
		const countColumns = this.dataRows[0] ? this.dataRows[0].length : 0

		return countRows * countColumns
	}
	get countInvalidValues(){
		let invalidValues = 0

		// walk the rows
		this.dataRows.forEach((r, rIndex)=>{
			// walk the colums
			r.forEach((value, cIndex)=>{
				const field = this.fields[cIndex]
				const isValid = this.isValidValue( rIndex, value, field )

				if( !isValid ) invalidValues++
				//console.log(rIndex, cIndex, value, field, isValid)
			})
		})

		return invalidValues
	}
	get countInvalidDataRows(){
		let invalidDataRows = 0

		// walk the rows
		this.dataRows.forEach((r, rIndex)=>{
			let isInvalidDataRow = false

			// walk the colums
			r.forEach((value, cIndex)=>{
				const field = this.fields[cIndex]
				const isValid = this.isValidValue( rIndex, value, field )

				if( !isValid ) isInvalidDataRow = true
				//console.log(rIndex, cIndex, value, field, isValid)
			})

			if( isInvalidDataRow ) invalidDataRows++
		})

		return invalidDataRows
	}
	get validPercentage(){
		const countValues = this.countValues
		const countInvalidValues = this.countInvalidValues
		const countValidValues = countValues - countInvalidValues

		const progressValue = _.round( ( countValidValues / countValues ) * 100, 2 )

		return _.isNaN( progressValue ) ? 0 : progressValue
	}
	get isLoading(){
		return this._data.isLoading
	}
	get isReady(){
		return this._data.isReady
	}
	get arraySeparator(){
		return this._data.arraySeparator
	}
	get csvTableLayout(){
		return this._data.csvTableLayout
	}

	getFieldByKey( key, doLog = false ){ // a field defines the cell properties like title, isRequired and the validation rule
		const fields = this.fields
		const field  = this.fields.find((o)=>{ return o.key === key })

		if( doLog ){
			console.groupCollapsed('Doc.class.js • getFieldByKey( key )', key)
			console.log('key:', key)
			console.log('fields:', fields)
			console.log('field:', field)
			console.groupEnd()
		}

		return field
	}
	getValueByIndex( rowIndex, columnIndex ){
		const getKey = [ rowIndex, columnIndex ]
		const value = _.get(this.dataRows, getKey, undefined)

		return value
	}
	getValueByKey( rowIndex, key ){
		const columnIndex = this.fields.findIndex((o)=>{ return o.key === key })

		//console.log('getValueByKey()', key, columnIndex)

		return this.getValueByIndex( rowIndex, columnIndex )
	}
	isValidValue( rowIndex, value, field, doLog = false ){ // returns boolean if value passes field validation
		if( doLog ){
			console.groupCollapsed('Doc.class.js • isValidValue( rowIndex, value, field )')
			console.log('value:', value)
			console.log('field:', field)
		}

		const isValidTest = _.isFunction( field.isValidTest ) ? field.isValidTest : ()=>{ return true }
		const isValid	  = isValidTest( value, rowIndex, this, field )

		if( doLog ){
			console.log('isValid:', isValid)
			console.groupEnd()
		}

		return isValid
	}
	addDataRow( pairs = undefined, doLog = false ){ // adds an row with given pairs or the default values from the scheme
		const fields = this.fields
		const dataRow  = []

		if( doLog ){
			console.groupCollapsed('Doc.class.js • addDataRow()')
			console.log('pairs:', pairs)
			console.log('fields:', fields)
			console.log('dataRow:', dataRow)
		}

		// wenn pairs übergeben wurden werden diese hier
		// inclusive importFilter übernommen.
		// ansonsten wird die default value verwendet
		_.forEach(fields, (field, index) => {
			const defaultValue = field.default
			const key = field.key
			const importFilterFn = field.importFilter
			let value = _.has( pairs, key ) ? _.get( pairs, key ) : defaultValue

			if( _.isFunction(importFilterFn) ) value = importFilterFn(value, this, field )

			if( doLog ) console.log('  key:', key)

			dataRow.push( value )
		})

		if( doLog ){
			console.groupEnd()
		}

		this._data.rows.push( dataRow )
	}
	removeDataRow( rowIndex, doLog = true ){
		if( doLog ){
			console.groupCollapsed('Doc.class.js • removeDataRow( rowIndex )', rowIndex)
			console.log('rowIndex:', rowIndex)
			console.groupEnd()
		}

		alert('TODO removeDataRow('+rowIndex+')')
	}
	emptyDataRows( doLog = true ){ // removes all data rows
		if( doLog ){
			console.groupCollapsed('Doc.class.js • emptyDataRows()' )
			console.groupEnd()
		}

		this._data.activeRowIndex = 0
		this._data.rows = []
	}
	setValue( rowIndex, key, value, doLog = false ){
		const columnIndex	 = this.fields.findIndex((o)=>{ return o.key === key })
		const isValidRowIndex = _.isArray( this.dataRows[rowIndex] )
		const isValidKey	  = columnIndex > -1 ? true : false

		if( doLog ){
			console.group('Doc.class.js • setValue( rowIndex, key, value )', rowIndex, key, value )
			console.log('rowIndex:', rowIndex)
			console.log('key:', key)
			console.log('value:', value)
			console.log('columnIndex:', columnIndex)
			console.log('isValidRowIndex:', isValidRowIndex)
			console.log('isValidKey:', isValidKey)
		}

		if( isValidRowIndex && isValidKey ){
			//console.log('old value:', this._data.rows[rowIndex][columnIndex])
			//console.log('old value:', mario)

			const row  = this._data.rows[rowIndex]

			//mario = value

			//console.log('new value:', mario)

			row.splice( columnIndex, 1, value ) // replace old value with new one

			//console.log('new value:', this._data.rows[rowIndex][columnIndex])
		}

		if( doLog ){
			console.groupEnd()
		}

		/*
		if( _.has( this.pairs, key ) ){
			// array to string
			if( _.isArray( value ) ) value = value.join(', ')

			// set value
			_.set( this.pairs, key, value )

			// run onChange if given
			if( _.isFunction(this._data.scheme.fields[key].onChange) ){
				this._data.scheme.fields[key].onChange( value, this.pairs )
			}
		}
		*/
	}
	getThesauriByKey( key ){
		const thesauri = _.get( this._data.scheme, 'thesauri['+key+'].values', [] )
		return thesauri
	}
	stringValueToArray( value ){
		return _.isEmpty( value ) ? [] : value.split( this.arraySeparator )
	}
	arrayValueToString( value ){
		return value.join( this.arraySeparator )
	}
	downloadAsCsv( filename = 'untitled.csv', doLog = false ){ // handles the csv download
		// groupCollapsed group
		if( doLog ){
			console.group('Doc.class.js • downloadAsCsv()')
		}

		const headerRow      = []
		const bodyRows       = []
		const csvTableLayout = this.csvTableLayout
		let   csvData        = []

		// generate headerRow with column titles
		_.forEach( this.fields, (field)=>{
			headerRow.push( field.title )
		})

		// generate bodyRows with applied export filter for each value
		_.forEach( this.dataRows, (dataRow, dataRowIndex )=>{
			const bodyRow = []

			_.forEach( dataRow, (dataCell, dataCellIndex )=>{
				const field       = this.fields[dataCellIndex]
				const value       = dataCell
				const exportValue = _.isFunction(field.exportFilter) ? _.clone(field.exportFilter(value, this, field ) ) : _.clone( value )

				bodyRow.push( exportValue )
			})

			bodyRows.push( bodyRow )
		})

		/*
		// horizontal layout ( keys left, values right )
		if( csvTableLayout == 'horizontal' ){
			csvData = []

			_.forEach( headerRow, (key, i)=>{
				const value = bodyRow[i]

				csvData.push([key, value])

				//console.log(i, key, value)
			})
		}
		*/

		// vertical layout (default table: keys on top as header, rows with values below)
		if( csvTableLayout == 'vertical' ){
			// first: header row
			csvData.push( headerRow )
			// data rows below
			bodyRows.forEach( bodyRow =>{ csvData.push( bodyRow ) })
		}

		const csvStr = Papa.unparse({
			data : csvData,
		}, this._data.unparseConfig)

		if( doLog ){
			console.log('---')
			console.log('headerRow:', headerRow)
			console.log('bodyRows:', bodyRows)
			console.log('---')
			console.log('csvData:', csvData)
			console.log('---')
			console.log('csvStr:', csvStr)
			console.groupEnd()
		}

		// start the download via fake link click
		const downloadLinkElm = document.createElement("a")
		const csvFile		  = new Blob(["\uFEFF"+csvStr], {type: "text/csv; charset=UTF-8"})

		// File name
		downloadLinkElm.download = filename

		// Create a link to the file
		downloadLinkElm.href = window.URL.createObjectURL(csvFile);

		// Hide download link
		downloadLinkElm.style.display = "none"

		// Add the link to DOM
		document.body.appendChild( downloadLinkElm )

		// Click download link
		downloadLinkElm.click()

		// remove the created link after
		downloadLinkElm.remove()
	}
	parseCsv( fileOrCsvString, config = {}, doLog = false ){
		const data = Papa.parse(fileOrCsvString, config )

		if( doLog ){
			console.group('Doc.class.js • parseCsv( fileOrCsvString, config )')
			console.log('fileOrCsvString:', fileOrCsvString)
			console.log('config:', config)
			console.log('data:', data)
			console.groupEnd()
		}

		return data
	}
}
