/**
 *
 *  die json-files für die thesauri liegen unter /public/
 *
 *	importFilter	noch nicht eingebaut
 *	exportFilter	ist die Function, durch die die Value des Keys läuft bevor die
 *			 		die Daten als CSV-File heruntergeladen werden
 *			 		Hilfreich z.B. wenn eine Value "2019" (als String) ist aber 2019 (als Zahl) sein sollte.
 *  onChange		wird noch jeder Value-Änderung aufgerufen
 */

import _ from 'lodash'

const thesauri = { // die json-files für die thesauri liegen unter /public/
	freigabestatus : {
		url    : '/thesauri/freigabestatus.json',
		values : [],
	},
	dienstorte : {
		//url  : 'http://localhost:8111/landkreise',
		url    : '/thesauri/dienstorte.json',
		values : [],
	},
	einwilligung_liegt_vor : {
		//url  : 'http://localhost:8111/landkreise',
		url    : '/thesauri/einwilligung_liegt_vor.json',
		values : [],
	},
	sichtbarkeit : {
		//url  : 'http://localhost:8111/landkreise',
		url    : '/thesauri/sichtbarkeit.json',
		values : [],
	},
	fachbereich : {
		url    : '/thesauri/fachbereich.json',
		values : [],
	},
	asset_typ : {
		url    : '/thesauri/asset_typ.json',
		values : [],
	},
	bild_typ : {
		url    : '/thesauri/bild_typ.json',
		values : [],
	},

	datierung : {
		url    : '/thesauri/datierung.json',
		values : [],
	},

	objekttyp : {
		url    : '/thesauri/objekttyp.json',
		values : [],
	},
	material : {
		url    : '/thesauri/material.json',
		values : [],
	},
	fachthemen_buk : {
		url    : '/thesauri/fachthemen_buk.json',
		values : [],
	},
	bauteile : {
		url    : '/thesauri/bauteile.json',
		values : [],
	},
	veranstaltung : {
		url    : '/thesauri/veranstaltung.json',
		values : [],
	},
	land_name : {
		url    : '/thesauri/land_name.json',
		values : [],
	},
	regierungsbezirk_name : {
		url    : '/thesauri/regierungsbezirk_name.json',
		values : [],
	},
	kreis_name : {
		url    : '/thesauri/kreis_name.json',
		values : [],
	},
	gemeinde_name : {
		url    : '/thesauri/gemeinde_name.json',
		values : [],
	},
	gemarkung_name : {
		url    : '/thesauri/gemarkung_name.json',
		values : [],
	},
	staat : {
		url    : '/thesauri/staat.json',
		values : [],
	},
	zugekauft : {
		url    : '/thesauri/zugekauft.json',
		values : [],
	},
	in_bearbeitung : {
		url    : '/thesauri/in_bearbeitung.json',
		values : [],
	},
}
const fields = {

	// Datei

	dateiname : {
		title: 'Dateiname',
		default: '',
		gui: {
			element: 'input',
		},
		message: {
			title: `Dateinamen können hier aus einem Windowsordner in die Tabelle eingefügt werden: Ein Dateiname pro Zeile.`,
			text: `Pflichtfeld`,
		},
		isRequired : ( rowIndex, doc, field )=>{ return true },
		isDisabled : ( rowIndex, doc, field )=>{ return true },
		isValidTest : ( value = undefined, args = undefined )=>{
			let notEmpty = !_.isEmpty( value )

			//console.log('dateiname isValidTest', value)

			return notEmpty ? true : false
		},
		importFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		exportFilter: ( value, doc, field, doLog = false ) => {
			//console.log('dateiname • exportFilter')
			return value
		},
		onChange: ( value, pairs ) => { return value },
	},
	dateipfad: {
		title: 'Dateipfad',
		default: '',
		gui: {
			element: 'input',
		},
		message: {
			title: `Der Dateipfad in Windows (Ablageort der Datei in Q:, H:, T:, oder an einem anderen Ort) wird zusammen mit dem Dateinamen ausgelesen und hier angezeigt.`,
			text: ``,
		},
		isRequired : ( rowIndex, doc, field )=>{ return true },
		isDisabled : ( rowIndex, doc, field )=>{ return false },
		isValidTest : ( value, rowIndex, doc, field )=>{
			let notEmpty = !_.isEmpty( value )
			const noFalsy = [ notEmpty ]
			return !noFalsy.includes( false ) ? true : false

			/*
			return true
			*/
		},
		importFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		exportFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		onChange: ( value, pairs ) => { return value },
	},

	// Nutzungs- und Urheberrecht

	nutzungsrecht: {
		title: 'Nutzungsrecht',
		default: 'Landesamt für Denkmalpflege im Regierungspräsidium Stuttgart',
		gui: {
			element: 'input',
		},
		message: {
			title: `Bitte so vollständig wie möglich ausfüllen; wenn möglich keine Abkürzungen verwenden. Lizenzen liegen meist bei Institutionen.`,
			text: ``,
		},
		isRequired : ( rowIndex, doc, field )=>{ return true },
		isDisabled : ( rowIndex, doc, field )=>{ return false },
		isValidTest : ( value, rowIndex, doc, field )=>{
			let notEmpty = !_.isEmpty( value )

			const noFalsy = [ notEmpty ]

			return !noFalsy.includes( false ) ? true : false
		},
		importFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		exportFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		onChange: ( value, pairs ) => { return value },
	},
	urheber: {
		title: 'Urheber',
		default: 'unbekannt',
		gui: {
			element: 'input',
		},
		message: {
			title: `Bitte so vollständig wie möglich ausfüllen (Bsp.: Mustermann, Dr. Max). Urheber*innen sind Personen. Mehrfachnennung ist möglich.`,
			text: ``,
		},
		isRequired: true,
		isDisabled : ( rowIndex, doc, field )=>{ return false },
		isValidTest : ( value, rowIndex, doc, field )=>{
			let notEmpty = !_.isEmpty( value )

			const noFalsy = [ notEmpty ]

			return !noFalsy.includes( false ) ? true : false
		},
		importFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		exportFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		onChange: ( value, pairs ) => { return value },
	},
	bearbeiter_in: {
		title: 'Bearbeiter_in',
		default: '',
		gui: {
			element: 'input',
		},
		message: {
			title: `Hier den eigenen Namen, bzw. den Namen der Bearbeiter_in, eintragen. Dieses Feld wird in Cumulus Portals nicht durchsucht.`,
			text: ``,
		},
		isRequired : ( rowIndex, doc, field )=>{ return true },
		isDisabled : ( rowIndex, doc, field )=>{ return false },
		isValidTest : ( value, rowIndex, doc, field )=>{
			let notEmpty = !_.isEmpty( value )

			const noFalsy = [ notEmpty ]

			return !noFalsy.includes( false ) ? true : false
		},
		importFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		exportFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		onChange: ( value, pairs ) => { return value },
	},
	freigabestatus: {
		title: 'Freigabestatus',
		default: 'nur intern verwendbar',
		gui: {
			element: 'select',
			thesaurus: 'freigabestatus',
			/*
			thesaurus : ( fields )=>{
				return 'freigabestatus'
			},
			*/
		},
		message: {
			title: `Auf Grundlage der Angaben in 'Nutzungsrecht' und 'Urheber' muss hier 'freigegeben', 'eingeschränkt verwendbar' oder 'nur intern verwendbar' ausgewählt werden.`,
			text: ``,
		},
		isRequired : ( rowIndex, doc, field )=>{ return false },
		isDisabled : ( rowIndex, doc, field )=>{ return false },
		isValidTest : ( value, rowIndex, doc, field )=>{
			let notEmpty = !_.isEmpty( value )
			let isInThesaurus = thesauri[field.gui.thesaurus].values.includes( value )

			//console.log('freigabestatus isValidTest', value, isInThesaurus)

			const noFalsy = [ isInThesaurus ]

			return !noFalsy.includes( false ) ? true : false
		},
		importFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		exportFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		onChange: ( value, pairs ) => { return value },
	},
	nutzungshinweis: {
		title: 'Nutzungshinweis',
		default: '',
		gui: {
			element: 'input',
		},
		message: {
			title: `Ist der Freigabestatus 'nur eingeschränkt verwendbar' kann hier ein Grund oder eine Bedingung sowie ein Kontakt genannt werden.`,
			text: ``,
		},
		isRequired : ( rowIndex, doc, field )=>{
			const freigabestatus = doc.getValueByKey( rowIndex, 'freigabestatus' )
			const isRequired = freigabestatus === 'eingeschränkt verwendbar' ? true : false

			/*
			console.log('')
			console.log('nutzungshinweis • isRequired( rowIndex, doc )')
			console.log('rowIndex:', rowIndex)
			console.log('doc:', doc)
			console.log('freigabestatus:', freigabestatus)
			console.log('isRequired:', isRequired)
			*/

			return isRequired
		},
		isDisabled : ( rowIndex, doc, field )=>{
			const freigabestatus = doc.getValueByKey( rowIndex, 'freigabestatus' )
			const isDisabled = freigabestatus !== 'eingeschränkt verwendbar'

			return isDisabled
		},
		isValidTest : ( value, rowIndex, doc, field )=>{
			const noFalsy    = []
			const isRequired = field.isRequired( rowIndex, doc, field )
			const isEmpty    = _.isEmpty( value )
			let   notEmpty   = !isEmpty

			if( isRequired && isEmpty ) noFalsy.push( false )

			return !noFalsy.includes( false ) ? true : false
		},
		importFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		exportFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		onChange: ( value, pairs ) => { return value },
	},
	einwilligung_liegt_vor: {
		title: 'Einwilligung liegt vor',
		default: '',
		gui: {
			element: 'select',
			thesaurus: 'einwilligung_liegt_vor',
		},
		message: {
			title: `Sind Personen auf dem Foto, wird hier vermerkt, ob eine Einwilligung dieser abgebildeten Personen vorliegt.`,
			text: ``,
		},
		isRequired : ( rowIndex, doc, field )=>{ return false },
		isDisabled : ( rowIndex, doc, field )=>{ return false },
		isValidTest : ( value, rowIndex, doc, field )=>{
			const isInThesaurus = thesauri[field.gui.thesaurus].values.includes( value )

			const noFalsy = [ isInThesaurus ]

			return !noFalsy.includes( false ) ? true : false
		},
		importFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		exportFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		onChange: ( value, pairs ) => { return value },
	},
	sichtbarkeit: {
		title: 'Sichtbarkeit',
		default: 'freigegeben',
		gui: {
			element: 'select',
			thesaurus: 'sichtbarkeit',
		},
		message: {
			title: `Schaltet die Durchsuchbarkeit und Sichtbarkeit in Cumulus jeweils an oder aus.`,
			text: ``,
		},
		isRequired : ( rowIndex, doc, field )=>{ return false },
		isDisabled : ( rowIndex, doc, field )=>{ return false },
		isValidTest : ( value, rowIndex, doc, field )=>{
			let notEmpty = !_.isEmpty( value )
			let isInThesaurus = thesauri[field.gui.thesaurus].values.includes( value )

			const noFalsy = [ isInThesaurus ]

			return !noFalsy.includes( false ) ? true : false
		},
		importFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		exportFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		onChange: ( value, pairs ) => { return value },
	},

	// Allgemeines

	fachbereich: { // zuarbeit fehlt, siehe doc unter "Mario: Progress"
		title: 'Fachbereich',
		default: '',
		gui: {
			element: 'select',
			thesaurus: 'fachbereich',
		},
		message: {
			title: `Hier sind nur Einträge aus dem Thesaurus 'Container' möglich. Die Zuordnung der Assets zu Containern ist sehr wichtig für deren Verwaltung und sollte bestmöglich durchgeführt werden.`,
			text: ``,
		},
		isRequired : ( rowIndex, doc, field )=>{ return false },
		isDisabled : ( rowIndex, doc, field )=>{ return false },
		isValidTest : ( value, rowIndex, doc, field )=>{
			let notEmpty = !_.isEmpty( value )
			let isInThesaurus = thesauri[field.gui.thesaurus].values.includes( value )

			const noFalsy = [ isInThesaurus ]

			return !noFalsy.includes( false ) ? true : false
		},
		importFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		exportFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		onChange: ( value, pairs ) => { return value },
	},
	asset_typ: {
		title: 'Asset-Typ',
		default: '',
		gui: {
			element: 'select',
			thesaurus: 'asset_typ',
		},
		message: {
			title: `Hier sind nur Einträge aus dem Thesaurus 'Asset-Typ' möglich.`,
			text: ``,
		},
		isRequired : ( rowIndex, doc, field )=>{ return true },
		isDisabled : ( rowIndex, doc, field )=>{ return false },
		isValidTest : ( value, rowIndex, doc, field )=>{
			let notEmpty = !_.isEmpty( value )
			let isInThesaurus = thesauri[field.gui.thesaurus].values.includes( value )

			const noFalsy = [ isInThesaurus ]

			return !noFalsy.includes( false ) ? true : false
		},
		importFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		exportFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		onChange: ( value, pairs ) => { return value },
	},
	bild_typ: {
		title: 'Bild-Typ',
		default: '',
		gui: {
			element: 'multiselect',
			thesaurus: 'bild_typ',
		},
		message: {
			title: `Hier sind nur Einträge aus dem Thesaurus 'Bild-Typ' möglich.`,
			text: ``,
		},
		isRequired : ( rowIndex, doc, field )=>{ return false },
		isDisabled : ( rowIndex, doc, field )=>{
			const asset_typ = doc.getValueByKey( rowIndex, 'asset_typ' )
			const isDisabled = asset_typ !== 'Bild'

			return isDisabled
		},
		isValidTest : ( value, rowIndex, doc, field )=>{
			const thesaurus = thesauri[field.gui.thesaurus].values
			const valuesArray = doc.stringValueToArray( value )
			let hasOnlyInThesauriValues = true

			// walk the given values and check if all of them are inside the thesaurus
			valuesArray.forEach((i)=>{
				if( !thesaurus.includes( i ) ) hasOnlyInThesauriValues = false
			})

			const noFalsy = [hasOnlyInThesauriValues]

			return !noFalsy.includes( false ) ? true : false
		},
		importFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		exportFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		onChange: ( value, pairs ) => { return value },
	},
	denkmal: {
		title: 'Denkmal',
		default: '',
		gui: {
			element: 'input',
		},
		message: {
			title: `Freitext: Bitte auf korrekte Schreibweise achten.`,
			text: ``,
		},
		isRequired : ( rowIndex, doc, field )=>{ return false },
		isDisabled : ( rowIndex, doc, field )=>{ return false },
		isValidTest : ( value, rowIndex, doc, field )=>{
			let notEmpty = !_.isEmpty( value )

			const noFalsy = []

			return !noFalsy.includes( false ) ? true : false
		},
		importFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		exportFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		onChange: ( value, pairs ) => { return value },
	},
	fundstelle: {
		title: 'Fundstelle',
		default: '',
		gui: {
			element: 'input',
		},
		message: {
			title: `Freitext: Bitte auf korrekte Schreibweise achten.`,
			text: ``,
		},
		isRequired : ( rowIndex, doc, field )=>{ return false },
		isDisabled : ( rowIndex, doc, field )=>{ return false },
		isValidTest : ( value, rowIndex, doc, field )=>{
			let notEmpty = !_.isEmpty( value )

			const noFalsy = []

			return !noFalsy.includes( false ) ? true : false
		},
		importFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		exportFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		onChange: ( value, pairs ) => { return value },
	},
	vorgangsnummer: {
		title: 'Vorgangsnummer',
		default: '',
		gui: {
			element: 'input',
		},
		message: {
			title: `Freitext: Bitte auf korrekte Schreibweise achten.`,
			text: ``,
		},
		isRequired : ( rowIndex, doc, field )=>{ return false },
		isDisabled : ( rowIndex, doc, field )=>{ return false },
		isValidTest : ( value, rowIndex, doc, field )=>{
			let notEmpty = !_.isEmpty( value )

			const noFalsy = []

			return !noFalsy.includes( false ) ? true : false
		},
		importFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		exportFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		onChange: ( value, pairs ) => { return value },
	},
	interne_anmerkungen: {
		title: 'Interne Anmerkungen',
		default: '',
		gui: {
			element: 'input',
		},
		message: {
			title: `Kommentarfunktion für die Arbeit in Cumulus. <br/>ACHTUNG: Dieses Feld wird nicht durchsucht.`,
			text: ``,
		},
		isRequired : ( rowIndex, doc, field )=>{ return false },
		isDisabled : ( rowIndex, doc, field )=>{ return false },
		isValidTest : ( value, rowIndex, doc, field )=>{
			let notEmpty = !_.isEmpty( value )

			const noFalsy = []

			return !noFalsy.includes( false ) ? true : false
		},
		importFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		exportFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		onChange: ( value, pairs ) => { return value },
	},

	// Fachthemen

	datierung: { // zuarbeit fehlt, siehe doc unter "Mario: Progress"
		title: 'Datierung',
		default: '',
		gui: {
			element: 'multiselect',
			thesaurus: 'datierung',
		},
		message: {
			title: `Hier sind nur Einträge aus dem Thesaurus 'Datierung' möglich.`,
			text: ``,
		},
		isRequired : ( rowIndex, doc, field )=>{ return false },
		isDisabled : ( rowIndex, doc, field )=>{ return false },
		isValidTest : ( value, rowIndex, doc, field )=>{
			const thesaurus = thesauri[field.gui.thesaurus].values
			const valuesArray = doc.stringValueToArray( value )
			let hasOnlyInThesauriValues = true

			// walk the given values and check if all of them are inside the thesaurus
			valuesArray.forEach((i)=>{
				if( !thesaurus.includes( i ) ) hasOnlyInThesauriValues = false
			})

			const noFalsy = [hasOnlyInThesauriValues]

			return !noFalsy.includes( false ) ? true : false
		},
		importFilter: ( value, doc, field, doLog = false ) => {
			const items     = doc.stringValueToArray( value )
			const thesaurus = thesauri[field.gui.thesaurus].values
			const valuesArr = []

			if (doLog) {
				console.group('datierung • importFilter()')
				console.log('value:', value)
				console.log('items:', items)
				console.log('field:', field)
				console.log('thesaurus:', thesaurus)
			}

			// walk the whole thesauri and find the value that ends with the given one
			_.forEach( items, (item, itemIndex) => {
				const result = _.find(thesaurus, (v)=>{
					return _.endsWith( v, item )
				})
				if (doLog) console.log(itemIndex, 'item:', item, ' result:', result)

				valuesArr.push( result )
			})

			const returnValue = doc.arrayValueToString(valuesArr)

			if (doLog) {
				console.log('returnValue:', returnValue)
				console.groupEnd()
			}

			return returnValue
		},
		exportFilter: ( value, doc, field, doLog = false ) => {
			const items     = doc.stringValueToArray( value )
			const valuesArr = []

			if( doLog ){
				console.group('datierung • exportFilter()')
				console.log('value:', value)
				console.log('items:', items)
			}

			_.forEach(items, (item) => {
				const lastPart = _.last( item.split(' > ') )

				if (doLog) console.log('	lastPart:', lastPart)

				valuesArr.push( lastPart )
			})

			const returnValue = doc.arrayValueToString(valuesArr)

			if (doLog) {
				console.log('returnValue:', returnValue)
				console.groupEnd()
			}

			return doc.arrayValueToString( valuesArr )
		},
		onChange: ( value, pairs ) => { return value },
	},
	datierung_jahreszahl_en: {
		title: 'Datierung: Jahreszahl(en)',
		default: '',
		gui: {
			element: 'input',
		},
		message: {
			title: `Hier sind nur Einträge von Zahlen (XXXX oder XXXX–XXXX) möglich. Der Strich ist der Halbgeviertstrich. Mehrfachnennnung mit Doppelpunkt trennen.`,
			text: ``,
		},
		isRequired : ( rowIndex, doc, field )=>{ return false },
		isDisabled : ( rowIndex, doc, field )=>{ return false },
		isValidTest : ( value, rowIndex, doc, field )=>{
			let notEmpty = !_.isEmpty( value )

			const noFalsy = []

			return !noFalsy.includes( false ) ? true : false
		},
		importFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		exportFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		onChange: ( value, pairs ) => { return value },
	},
	objekttyp: { // lausige renderperformance weil es 3600 datensätze gibt, mmmh ...
		title: 'Objekttyp',
		default: '',
		gui: {
			//element: 'select',
			element: 'multiselect',
			thesaurus: 'objekttyp',
		},
		message: {
			title: `Hier sind nur Einträge aus dem Thesaurus 'Objekttyp' möglich.`,
			text: ``,
		},
		isRequired : ( rowIndex, doc, field )=>{ return false },
		isDisabled : ( rowIndex, doc, field )=>{ return false },
		isValidTest : ( value, rowIndex, doc, field )=>{
			let notEmpty = !_.isEmpty( value )

			const thesaurus = thesauri[field.gui.thesaurus].values
			const valuesArray = doc.stringValueToArray( value )
			let hasOnlyInThesauriValues = true

			// walk the given values and check if all of them are inside the thesaurus
			valuesArray.forEach((i)=>{
				if( !thesaurus.includes( i ) ) hasOnlyInThesauriValues = false
			})

			const noFalsy = [hasOnlyInThesauriValues]

			return !noFalsy.includes( false ) ? true : false
		},
		importFilter: (value, doc, field, doLog = false) => {
			const items = doc.stringValueToArray(value)
			const thesaurus = thesauri[field.gui.thesaurus].values
			const valuesArr = []

			if (doLog) {
				console.group('objekttyp • importFilter()')
				console.log('value:', value)
				console.log('items:', items)
				console.log('field:', field)
				console.log('thesaurus:', thesaurus)
			}

			// walk the whole thesauri and find the value that ends with the given one
			_.forEach(items, (item, itemIndex) => {
				const result = _.find(thesaurus, (v) => {
					return _.endsWith(v, item)
				})
				if (doLog) console.log(itemIndex, 'item:', item, ' result:', result)

				valuesArr.push(result)
			})

			const returnValue = doc.arrayValueToString(valuesArr)

			if (doLog) {
				console.log('returnValue:', returnValue)
				console.groupEnd()
			}

			return returnValue
		},
		exportFilter: (value, doc, doLog = false) => {
			const items = doc.stringValueToArray(value)
			const valuesArr = []

			if (doLog) {
				console.group('objekttyp • exportFilter()')
				console.log('value:', value)
				console.log('items:', items)
			}

			_.forEach(items, (item) => {
				const lastPart = _.last(item.split(' > '))

				if (doLog) console.log('	lastPart:', lastPart)

				valuesArr.push(lastPart)
			})

			const returnValue = doc.arrayValueToString(valuesArr)

			if (doLog) {
				console.log('returnValue:', returnValue)
				console.groupEnd()
			}

			return doc.arrayValueToString(valuesArr)
		},
		onChange: ( value, pairs ) => { return value },
	},
	material: {
		title: 'Material',
		default: '',
		gui: {
			element: 'multiselect',
			thesaurus: 'material',
		},
		message: {
			title: `Hier sind nur Einträge aus dem Thesaurus 'Material' möglich.`,
			text: ``,
		},
		isRequired : ( rowIndex, doc, field )=>{ return false },
		isDisabled : ( rowIndex, doc, field )=>{ return false },
		isValidTest : ( value, rowIndex, doc, field )=>{
			const thesaurus = thesauri[field.gui.thesaurus].values
			const valuesArray = doc.stringValueToArray( value )
			let hasOnlyInThesauriValues = true

			/*
			console.log('')
			console.log('material • isValidTest()')
			console.log('thesaurus:', thesaurus)
			console.log('valuesArray:', valuesArray)
			*/

			// walk the given values and check if all of them are inside the thesaurus
			valuesArray.forEach((i)=>{
				//console.log('	item:', value)

				if( !thesaurus.includes( i ) ) hasOnlyInThesauriValues = false
			})

			//console.log('')

			const noFalsy = [hasOnlyInThesauriValues]

			return !noFalsy.includes( false ) ? true : false
		},
		importFilter: (value, doc, field, doLog = false) => {
			const items = doc.stringValueToArray(value)
			const thesaurus = thesauri[field.gui.thesaurus].values
			const valuesArr = []

			if (doLog) {
				console.group('material • importFilter()')
				console.log('value:', value)
				console.log('items:', items)
				console.log('field:', field)
				console.log('thesaurus:', thesaurus)
			}

			// walk the whole thesauri and find the value that ends with the given one
			_.forEach(items, (item, itemIndex) => {
				const result = _.find(thesaurus, (v) => {
					return _.endsWith(v, item)
				})
				if (doLog) console.log(itemIndex, 'item:', item, ' result:', result)

				valuesArr.push(result)
			})

			const returnValue = doc.arrayValueToString(valuesArr)

			if (doLog) {
				console.log('returnValue:', returnValue)
				console.groupEnd()
			}

			return returnValue
		},
		exportFilter: (value, doc, doLog = false) => {
			const items = doc.stringValueToArray(value)
			const valuesArr = []

			if (doLog) {
				console.group('material • exportFilter()')
				console.log('value:', value)
				console.log('items:', items)
			}

			_.forEach(items, (item) => {
				const lastPart = _.last(item.split(' > '))

				if (doLog) console.log('	lastPart:', lastPart)

				valuesArr.push(lastPart)
			})

			const returnValue = doc.arrayValueToString(valuesArr)

			if (doLog) {
				console.log('returnValue:', returnValue)
				console.groupEnd()
			}

			return doc.arrayValueToString(valuesArr)
		},
		onChange: ( value, pairs ) => { return value },
	},
	fachthemen_buk: {
		title: 'Fachthemen BuK',
		default: '',
		gui: {
			element: 'multiselect',
			thesaurus: 'fachthemen_buk',
		},
		message: {
			title: `Hier sind nur Einträge aus dem Thesaurus 'Fachthemen BuK' möglich.`,
			text: ``,
		},
		isRequired : ( rowIndex, doc, field )=>{ return false },
		isDisabled : ( rowIndex, doc, field )=>{ return false },
		isValidTest : ( value, rowIndex, doc, field )=>{
			const thesaurus = thesauri[field.gui.thesaurus].values
			const valuesArray = doc.stringValueToArray( value )
			let hasOnlyInThesauriValues = true

			// walk the given values and check if all of them are inside the thesaurus
			valuesArray.forEach((i)=>{
				if( !thesaurus.includes( i ) ) hasOnlyInThesauriValues = false
			})

			const noFalsy = [hasOnlyInThesauriValues]

			return !noFalsy.includes( false ) ? true : false
		},
		importFilter: (value, doc, field, doLog = false) => {
			const items = doc.stringValueToArray(value)
			const thesaurus = thesauri[field.gui.thesaurus].values
			const valuesArr = []

			if (doLog) {
				console.group('fachthemen_buk • importFilter()')
				console.log('value:', value)
				console.log('items:', items)
				console.log('field:', field)
				console.log('thesaurus:', thesaurus)
			}

			// walk the whole thesauri and find the value that ends with the given one
			_.forEach(items, (item, itemIndex) => {
				const result = _.find(thesaurus, (v) => {
					return _.endsWith(v, item)
				})
				if (doLog) console.log(itemIndex, 'item:', item, ' result:', result)

				valuesArr.push(result)
			})

			const returnValue = doc.arrayValueToString(valuesArr)

			if (doLog) {
				console.log('returnValue:', returnValue)
				console.groupEnd()
			}

			return returnValue
		},
		exportFilter: (value, doc, doLog = false) => {
			const items = doc.stringValueToArray(value)
			const valuesArr = []

			if (doLog) {
				console.group('fachthemen_buk • exportFilter()')
				console.log('value:', value)
				console.log('items:', items)
			}

			_.forEach(items, (item) => {
				const lastPart = _.last(item.split(' > '))

				if (doLog) console.log('	lastPart:', lastPart)

				valuesArr.push(lastPart)
			})

			const returnValue = doc.arrayValueToString(valuesArr)

			if (doLog) {
				console.log('returnValue:', returnValue)
				console.groupEnd()
			}

			return doc.arrayValueToString(valuesArr)
		},
		onChange: ( value, pairs ) => { return value },
	},
	bauteile: {
		title: 'Bauteile',
		default: '',
		gui: {
			element: 'multiselect',
			thesaurus: 'bauteile',
		},
		message: {
			title: `Hier sind nur Einträge aus dem Thesaurus 'Bauteile' möglich.`,
			text: ``,
		},
		isRequired : ( rowIndex, doc, field )=>{ return false },
		isDisabled : ( rowIndex, doc, field )=>{ return false },
		isValidTest : ( value, rowIndex, doc, field )=>{
			const thesaurus = thesauri[field.gui.thesaurus].values
			const valuesArray = doc.stringValueToArray( value )
			let hasOnlyInThesauriValues = true

			// walk the given values and check if all of them are inside the thesaurus
			valuesArray.forEach((i)=>{
				if( !thesaurus.includes( i ) ) hasOnlyInThesauriValues = false
			})

			const noFalsy = [hasOnlyInThesauriValues]

			return !noFalsy.includes( false ) ? true : false
		},
		importFilter: (value, doc, field, doLog = false) => {
			const items = doc.stringValueToArray(value)
			const thesaurus = thesauri[field.gui.thesaurus].values
			const valuesArr = []

			if (doLog) {
				console.group('bauteile • importFilter()')
				console.log('value:', value)
				console.log('items:', items)
				console.log('field:', field)
				console.log('thesaurus:', thesaurus)
			}

			// walk the whole thesauri and find the value that ends with the given one
			_.forEach(items, (item, itemIndex) => {
				const result = _.find(thesaurus, (v) => {
					return _.endsWith(v, item)
				})
				if (doLog) console.log(itemIndex, 'item:', item, ' result:', result)

				valuesArr.push(result)
			})

			const returnValue = doc.arrayValueToString(valuesArr)

			if (doLog) {
				console.log('returnValue:', returnValue)
				console.groupEnd()
			}

			return returnValue
		},
		exportFilter: (value, doc, doLog = false) => {
			const items = doc.stringValueToArray(value)
			const valuesArr = []

			if (doLog) {
				console.group('bauteile • exportFilter()')
				console.log('value:', value)
				console.log('items:', items)
			}

			_.forEach(items, (item) => {
				const lastPart = _.last(item.split(' > '))

				if (doLog) console.log('	lastPart:', lastPart)

				valuesArr.push(lastPart)
			})

			const returnValue = doc.arrayValueToString(valuesArr)

			if (doLog) {
				console.log('returnValue:', returnValue)
				console.groupEnd()
			}

			return doc.arrayValueToString(valuesArr)
		},
		onChange: ( value, pairs ) => { return value },
	},
	künstler_architekt: {
		title: 'Künstler / Architekt',
		default: '',
		gui: {
			element: 'input',
		},
		message: {
			title: ``,
			text: ``,
		},
		isRequired : ( rowIndex, doc, field )=>{ return false },
		isDisabled : ( rowIndex, doc, field )=>{ return false },
		isValidTest : ( value, rowIndex, doc, field )=>{
			let notEmpty = !_.isEmpty( value )

			const noFalsy = []

			return !noFalsy.includes( false ) ? true : false
		},
		importFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		exportFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		onChange: ( value, pairs ) => { return value },
	},
	veranstaltung: {
		title: 'Veranstaltung',
		default: '',
		gui: {
			element: 'multiselect',
			thesaurus: 'veranstaltung',
		},
		message: {
			title: `Hier sind nur Einträge aus dem Thesaurus 'Veranstaltung' möglich.`,
			text: ``,
		},
		isRequired : ( rowIndex, doc, field )=>{ return false },
		isDisabled : ( rowIndex, doc, field )=>{ return false },
		isValidTest : ( value, rowIndex, doc, field )=>{
			const thesaurus = thesauri[field.gui.thesaurus].values
			const valuesArray = doc.stringValueToArray( value )
			let hasOnlyInThesauriValues = true

			// walk the given values and check if all of them are inside the thesaurus
			valuesArray.forEach((i)=>{
				if( !thesaurus.includes( i ) ) hasOnlyInThesauriValues = false
			})

			const noFalsy = [hasOnlyInThesauriValues]

			return !noFalsy.includes( false ) ? true : false
		},
		importFilter: (value, doc, field, doLog = false) => {
			const items = doc.stringValueToArray(value)
			const thesaurus = thesauri[field.gui.thesaurus].values
			const valuesArr = []

			if (doLog) {
				console.group('veranstaltung • importFilter()')
				console.log('value:', value)
				console.log('items:', items)
				console.log('field:', field)
				console.log('thesaurus:', thesaurus)
			}

			// walk the whole thesauri and find the value that ends with the given one
			_.forEach(items, (item, itemIndex) => {
				const result = _.find(thesaurus, (v) => {
					return _.endsWith(v, item)
				})
				if (doLog) console.log(itemIndex, 'item:', item, ' result:', result)

				valuesArr.push(result)
			})

			const returnValue = doc.arrayValueToString(valuesArr)

			if (doLog) {
				console.log('returnValue:', returnValue)
				console.groupEnd()
			}

			return returnValue
		},
		exportFilter: (value, doc, doLog = false) => {
			const items = doc.stringValueToArray(value)
			const valuesArr = []

			if (doLog) {
				console.group('veranstaltung • exportFilter()')
				console.log('value:', value)
				console.log('items:', items)
			}

			_.forEach(items, (item) => {
				const lastPart = _.last(item.split(' > '))

				if (doLog) console.log('	lastPart:', lastPart)

				valuesArr.push(lastPart)
			})

			const returnValue = doc.arrayValueToString(valuesArr)

			if (doLog) {
				console.log('returnValue:', returnValue)
				console.groupEnd()
			}

			return doc.arrayValueToString(valuesArr)
		},
		onChange: ( value, pairs ) => { return value },
	},

	// Topografie

	straße_und_hausnummer: {
		title: 'Straße und Hausnummer',
		default: '',
		gui: {
			element: 'input',
		},
		message: {
			title: `Freitext: Bitte auf korrekte Schreibweise achten.`,
			text: ``,
		},
		isRequired : ( rowIndex, doc, field )=>{ return false },
		isDisabled : ( rowIndex, doc, field )=>{ return false },
		isValidTest : ( value, rowIndex, doc, field )=>{
			let notEmpty = !_.isEmpty( value )

			const noFalsy = []

			return !noFalsy.includes( false ) ? true : false
		},
		importFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		exportFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		onChange: ( value, pairs ) => { return value },
	},
	land_name: {
		title: 'land_name',
		default: '',
		gui: {
			element: 'multiselect',
			thesaurus: 'land_name',
		},
		message: {
			title: `Hier sind nur Einträge aus dem Thesaurus 'Land Name' möglich. `,
			text: ``,
		},
		isRequired : ( rowIndex, doc, field )=>{ return false },
		isDisabled : ( rowIndex, doc, field )=>{ return false },
		isValidTest : ( value, rowIndex, doc, field )=>{
			const thesaurus = thesauri[field.gui.thesaurus].values
			const valuesArray = doc.stringValueToArray( value )
			let hasOnlyInThesauriValues = true

			// walk the given values and check if all of them are inside the thesaurus
			valuesArray.forEach((i)=>{
				if( !thesaurus.includes( i ) ) hasOnlyInThesauriValues = false
			})

			const noFalsy = [hasOnlyInThesauriValues]

			return !noFalsy.includes( false ) ? true : false
		},
		importFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		exportFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		onChange: ( value, pairs ) => { return value },
	},
	regierungsbezirk_name: {
		title: 'regierungsbezirk_name',
		default: '',
		gui: {
			element: 'multiselect',
			thesaurus: 'regierungsbezirk_name',
		},
		message: {
			title: `Hier sind nur Einträge aus dem Thesaurus 'Regierungsbezirk Name' möglich. `,
			text: ``,
		},
		isRequired : ( rowIndex, doc, field )=>{ return false },
		isDisabled : ( rowIndex, doc, field )=>{ return false },
		isValidTest : ( value, rowIndex, doc, field )=>{
			const thesaurus = thesauri[field.gui.thesaurus].values
			const valuesArray = doc.stringValueToArray( value )
			let hasOnlyInThesauriValues = true

			// walk the given values and check if all of them are inside the thesaurus
			valuesArray.forEach((i)=>{
				if( !thesaurus.includes( i ) ) hasOnlyInThesauriValues = false
			})

			const noFalsy = [hasOnlyInThesauriValues]

			return !noFalsy.includes( false ) ? true : false
		},
		importFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		exportFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		onChange: ( value, pairs ) => { return value },
	},
	kreis_name: {
		title: 'kreis_name',
		default: '',
		gui: {
			element: 'multiselect',
			thesaurus: 'kreis_name',
		},
		message: {
			title: `Hier sind nur Einträge aus dem Thesaurus 'kreis Name' möglich. `,
			text: ``,
		},
		isRequired : ( rowIndex, doc, field )=>{ return false },
		isDisabled : ( rowIndex, doc, field )=>{ return false },
		isValidTest : ( value, rowIndex, doc, field )=>{
			const thesaurus = thesauri[field.gui.thesaurus].values
			const valuesArray = doc.stringValueToArray( value )
			let hasOnlyInThesauriValues = true

			// walk the given values and check if all of them are inside the thesaurus
			valuesArray.forEach((i)=>{
				if( !thesaurus.includes( i ) ) hasOnlyInThesauriValues = false
			})

			const noFalsy = [hasOnlyInThesauriValues]

			return !noFalsy.includes( false ) ? true : false
		},
		importFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		exportFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		onChange: ( value, pairs ) => { return value },
	},
	gemeinde_name: {
		title: 'gemeinde_name',
		default: '',
		gui: {
			element: 'multiselect',
			thesaurus: 'gemeinde_name',
		},
		message: {
			title: `Hier sind nur Einträge aus dem Thesaurus 'Gemeinde Name' möglich. `,
			text: ``,
		},
		isRequired : ( rowIndex, doc, field )=>{ return false },
		isDisabled : ( rowIndex, doc, field )=>{ return false },
		isValidTest : ( value, rowIndex, doc, field )=>{
			const thesaurus = thesauri[field.gui.thesaurus].values
			const valuesArray = doc.stringValueToArray( value )
			let hasOnlyInThesauriValues = true

			// walk the given values and check if all of them are inside the thesaurus
			valuesArray.forEach((i)=>{
				if( !thesaurus.includes( i ) ) hasOnlyInThesauriValues = false
			})

			const noFalsy = [hasOnlyInThesauriValues]

			return !noFalsy.includes( false ) ? true : false
		},
		importFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		exportFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		onChange: ( value, pairs ) => { return value },
	},
	gemarkung_name: {
		title: 'gemarkung_name',
		default: '',
		gui: {
			element: 'multiselect',
			thesaurus: 'gemarkung_name',
		},
		message: {
			title: ``,
			text: ``,
		},
		isRequired : ( rowIndex, doc, field )=>{ return false },
		isDisabled : ( rowIndex, doc, field )=>{ return false },
		isValidTest : ( value, rowIndex, doc, field )=>{
			const thesaurus = thesauri[field.gui.thesaurus].values
			const valuesArray = doc.stringValueToArray( value )
			let hasOnlyInThesauriValues = true

			// walk the given values and check if all of them are inside the thesaurus
			valuesArray.forEach((i)=>{
				if( !thesaurus.includes( i ) ) hasOnlyInThesauriValues = false
			})

			const noFalsy = [hasOnlyInThesauriValues]

			return !noFalsy.includes( false ) ? true : false
		},
		importFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		exportFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		onChange: ( value, pairs ) => { return value },
	},
	staat: {
		title: 'Staat',
		default: 'Deutschland',
		gui: {
			element: 'multiselect',
			thesaurus: 'staat',
		},
		message: {
			title: `Hier sind nur Einträge aus dem Thesaurus 'Staat' möglich. Sollte ein Staat nicht mehr existieren, bitte Eintrag in FELD: Objektbeschreibung vornehmen.`,
			text: ``,
		},
		isRequired : ( rowIndex, doc, field )=>{ return false },
		isDisabled : ( rowIndex, doc, field )=>{ return false },
		isValidTest : ( value, rowIndex, doc, field )=>{
			const thesaurus = thesauri[field.gui.thesaurus].values
			const valuesArray = doc.stringValueToArray( value )
			let hasOnlyInThesauriValues = true

			// walk the given values and check if all of them are inside the thesaurus
			valuesArray.forEach((i)=>{
				if( !thesaurus.includes( i ) ) hasOnlyInThesauriValues = false
			})

			const noFalsy = [hasOnlyInThesauriValues]

			return !noFalsy.includes( false ) ? true : false
		},
		importFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		exportFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		onChange: ( value, pairs ) => { return value },
	},
	provinz_nicht_brd: {
		title: 'Provinz (nicht BRD)',
		default: '',
		gui: {
			element: 'input',
		},
		message: {
			title: `Freitext: Bitte auf korrekte Schreibweise achten.`,
			text: ``,
		},
		isRequired : ( rowIndex, doc, field )=>{ return false },
		isDisabled : ( rowIndex, doc, field )=>{ return false },
		isValidTest : ( value, rowIndex, doc, field )=>{
			let notEmpty = !_.isEmpty( value )

			const noFalsy = []

			return !noFalsy.includes( false ) ? true : false
		},
		importFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		exportFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		onChange: ( value, pairs ) => { return value },
	},
	längengrad_dg: {
		title: 'Längengrad (DG)',
		default: '',
		gui: {
			element: 'input',
		},
		message: {
			title: `Freitext: Bitte auf korrekte Schreibweise achten. Ggf. werden diese Daten automatisch ausgelesen. Bitte die Metadaten des Bildes prüfen.`,
			text: ``,
		},
		isRequired : ( rowIndex, doc, field )=>{ return false },
		isDisabled : ( rowIndex, doc, field )=>{ return false },
		isValidTest : ( value, rowIndex, doc, field )=>{
			let notEmpty = !_.isEmpty( value )

			const noFalsy = []

			return !noFalsy.includes( false ) ? true : false
		},
		importFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		exportFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		onChange: ( value, pairs ) => { return value },
	},
	breitengrad_dg: {
		title: 'Breitengrad (DG)',
		default: '',
		gui: {
			element: 'input',
		},
		message: {
			title: `Freitext: Bitte auf korrekte Schreibweise achten. Ggf. werden diese Daten automatisch ausgelesen. Bitte die Metadaten des Bildes prüfen.`,
			text: ``,
		},
		isRequired : ( rowIndex, doc, field )=>{ return false },
		isDisabled : ( rowIndex, doc, field )=>{ return false },
		isValidTest : ( value, rowIndex, doc, field )=>{
			let notEmpty = !_.isEmpty( value )

			const noFalsy = []

			return !noFalsy.includes( false ) ? true : false
		},
		importFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		exportFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		onChange: ( value, pairs ) => { return value },
	},

	// Veröffentlichung

	verwendet_für: {
		title: 'Verwendet für',
		default: '',
		gui: {
			element: 'input',
		},
		message: {
			title: `Freitext: Bitte auf korrekte Schreibweise achten.`,
			text: ``,
		},
		isRequired : ( rowIndex, doc, field )=>{ return false },
		isDisabled : ( rowIndex, doc, field )=>{ return false },
		isValidTest : ( value, rowIndex, doc, field )=>{
			let notEmpty = !_.isEmpty( value )

			const noFalsy = []

			return !noFalsy.includes( false ) ? true : false
		},
		importFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		exportFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		onChange: ( value, pairs ) => { return value },
	},
	seitenzahl: {
		title: 'Seitenzahl',
		default: '',
		gui: {
			element: 'input',
		},
		message: {
			title: `Freitext: Bitte auf korrekte Schreibweise achten.`,
			text: ``,
		},
		isRequired : ( rowIndex, doc, field )=>{ return false },
		isDisabled : ( rowIndex, doc, field )=>{ return false },
		isValidTest : ( value, rowIndex, doc, field )=>{
			let notEmpty = !_.isEmpty( value )

			const noFalsy = []

			return !noFalsy.includes( false ) ? true : false
		},
		importFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		exportFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		onChange: ( value, pairs ) => { return value },
	},
	bildnummer: {
		title: 'Bildnummer',
		default: '',
		gui: {
			element: 'input',
		},
		message: {
			title: `Freitext: Bitte auf korrekte Schreibweise achten.`,
			text: ``,
		},
		isRequired : ( rowIndex, doc, field )=>{ return false },
		isDisabled : ( rowIndex, doc, field )=>{ return false },
		isValidTest : ( value, rowIndex, doc, field )=>{
			let notEmpty = !_.isEmpty( value )

			const noFalsy = []

			return !noFalsy.includes( false ) ? true : false
		},
		importFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		exportFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		onChange: ( value, pairs ) => { return value },
	},
	bilduntertext: {
		title: 'Bilduntertext',
		default: '',
		gui: {
			element: 'input',
		},
		message: {
			title: `Freitext: Bitte auf korrekte Schreibweise achten.`,
			text: ``,
		},
		isRequired : ( rowIndex, doc, field )=>{ return false },
		isDisabled : ( rowIndex, doc, field )=>{ return false },
		isValidTest : ( value, rowIndex, doc, field )=>{
			let notEmpty = !_.isEmpty( value )

			const noFalsy = []

			return !noFalsy.includes( false ) ? true : false
		},
		importFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		exportFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		onChange: ( value, pairs ) => { return value },
	},

	// Zukauf

	zugekauft: {
		title: 'Zugekauft',
		default: 'falsch',
		gui: {
			element: 'select',
			thesaurus: 'zugekauft',
		},
		message: {
			title: `Zugekauft? 'wahr' oder 'falsch' möglich. `,
			text: ``,
		},
		isRequired : ( rowIndex, doc, field )=>{ return false },
		isDisabled : ( rowIndex, doc, field )=>{ return false },
		isValidTest : ( value, rowIndex, doc, field )=>{
			const isInThesaurus = thesauri[field.gui.thesaurus].values.includes( value )

			const noFalsy = [ isInThesaurus ]

			return !noFalsy.includes( false ) ? true : false
		},
		importFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		exportFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		onChange: ( value, pairs ) => { return value },
	},
	herkunft_z_b_falls_zugekauft: {
		title: 'Herkunft (z.B. falls zugekauft)',
		default: '',
		gui: {
			element: 'input',
		},
		message: {
			title: `Freitext: Bitte auf korrekte Schreibweise achten.`,
			text: ``,
		},
		isRequired : ( rowIndex, doc, field )=>{ return false },
		isDisabled : ( rowIndex, doc, field )=>{ return false },
		isValidTest : ( value, rowIndex, doc, field )=>{
			let notEmpty = !_.isEmpty( value )

			const noFalsy = []

			return !noFalsy.includes( false ) ? true : false
		},
		importFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		exportFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		onChange: ( value, pairs ) => { return value },
	},

	// Objektbeschreibung und Bearbeitung

	objektbeschreibung: {
		title: 'Objektbeschreibung',
		default: '',
		gui: {
			element: 'textarea',
		},
		message: {
			title: `Hier sind alle Informationen unterzubringen, die durchsucht werden können und für die es kein vordefiniertes Metadatenfeld gibt. ACHTUNG: Für die Durchsuchbarkeit auf korrekte Schreibweise achten.`,
			text: ``,
		},
		isRequired : ( rowIndex, doc, field )=>{ return false },
		isDisabled : ( rowIndex, doc, field) => { return false },
		isValidTest : ( value, rowIndex, doc, field )=>{
			let notEmpty = !_.isEmpty( value )

			const noFalsy = []

			return !noFalsy.includes( false ) ? true : false
		},
		importFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		exportFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		onChange: ( value, pairs ) => { return value },
	},
	in_bearbeitung: {
		title: 'in Bearbeitung',
		default: 'falsch',
		gui: {
			element: 'select',
			thesaurus: 'zugekauft',
		},
		message: {
			title: `Metadatensatz noch in Bearbeitung --> wahr`,
			text: ``,
		},
		isRequired : ( rowIndex, doc, field )=>{ return false },
		isDisabled : ( rowIndex, doc, field )=>{ return false },
		isValidTest : ( value, rowIndex, doc, field )=>{
			const isInThesaurus = thesauri[field.gui.thesaurus].values.includes( value )

			const noFalsy = [ isInThesaurus ]

			return !noFalsy.includes( false ) ? true : false
		},
		importFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		exportFilter: ( value, doc, field, doLog = false ) => {
			return value
		},
		onChange: ( value, pairs ) => { return value },
	},

}

//console.log('fourth • thesauri', thesauri)

export default {
	thesauri : thesauri,
	fields   : fields,
}
