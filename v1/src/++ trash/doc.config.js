import _ from 'lodash'
import scheme from './schemes/cumulus.config.js'

const yyyymmdd = function( date = new Date(), separator = '-' ){
	var d = date,
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2)
		month = '0' + month;
	if (day.length < 2)
		day = '0' + day;

	return [year, month, day].join( separator );
}
const hhmm = function(){
	const date = new Date();
	let currentHours = date.getHours();
	currentHours = ("0" + currentHours).slice(-2);
	let currentMinutes = (date.getMinutes()<10?'0':'') + date.getMinutes()

	return currentHours + '-' + currentMinutes
}

export default {
	scheme         : scheme,
	csvTableLayout : 'vertical', // vertical = one dataset per row
	arraySeparator : ':',
	unparseConfig  : { // see https://www.papaparse.com/docs#json-to-csv for all available options
		delimiter  : "\t",
	},
	computed       : {
		filename(){
			const dateString         = yyyymmdd( new Date(), '' )
			const countInvalidValues = this.countInvalidValues
			const basename           = countInvalidValues ? 'cumulus_' + dateString + '--invalid' : 'cumulus_' + dateString
			const extension          = 'csv'
			const filename           = basename + '.' + extension

			return filename
		}
	},
	methods : {},
}