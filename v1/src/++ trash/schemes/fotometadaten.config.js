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
	dienstorte : {
		//url  : 'http://localhost:8111/landkreise',
		url  : '/thesauri/dienstorte.json',
		values : [],
	},
	
	datierungen : {
		//url  : 'http://localhost:8111/datierungen',
		url  : '/thesauri/datierungen.json',
		values : [],
	},
	landkreise : {
		//url  : 'http://localhost:8111/landkreise',
		url  : '/thesauri/landkreise.json',
		values : [],
	},

	gemeinden_Alb_Donau_Kreis : {
		//url  : 'http://localhost:8111/gemeinden',
		url  : '/thesauri/gemeinden_Alb_Donau_Kreis.json',
		values : [],
	},
	gemeinden_Baden_Baden: {
		url  : '/thesauri/gemeinden_Baden_Baden.json',
		values : [],
	},
	gemeinden_Biberach: {
		url  : '/thesauri/gemeinden_Biberach.json',
		values : [],
	},
	gemeinden_Böblingen: {
		url  : '/thesauri/gemeinden_Boblingen.json',
		values : [],
	},
	gemeinden_Bodenseekreis: {
		url  : '/thesauri/gemeinden_Bodenseekreis.json',
		values : [],
	},
	gemeinden_Breisgau_Hochschwarzwald: {
		url  : '/thesauri/gemeinden_Breisgau_Hochschwarzwald.json',
		values : [],
	},
	gemeinden_Calw: {
		url  : '/thesauri/gemeinden_Calw.json',
		values : [],
	},
	gemeinden_Emmendingen: {
		url  : '/thesauri/gemeinden_Emmendingen.json',
		values : [],
	},
	gemeinden_Enzkreis: {
		url  : '/thesauri/gemeinden_Enzkreis.json',
		values : [],
	},
	gemeinden_Esslingen: {
		url  : '/thesauri/gemeinden_Esslingen.json',
		values : [],
	},
	gemeinden_Freiburg_im_Breisgau: {
		url  : '/thesauri/gemeinden_Freiburg_im_Breisgau.json',
		values : [],
	},
	gemeinden_Freudenstadt: {
		url  : '/thesauri/gemeinden_Freudenstadt.json',
		values : [],
	},
	gemeinden_Göppingen: {
		url  : '/thesauri/gemeinden_Goppingen.json',
		values : [],
	},
	gemeinden_Heidelberg: {
		url  : '/thesauri/gemeinden_Heidelberg.json',
		values : [],
	},
	gemeinden_Heidenheim: {
		url  : '/thesauri/gemeinden_Heidenheim.json',
		values : [],
	},
	gemeinden_Heilbronn: {
		url  : '/thesauri/gemeinden_Heilbronn.json',
		values : [],
	},
	gemeinden_Hohenlohekreis: {
		url  : '/thesauri/gemeinden_Hohenlohekreis.json',
		values : [],
	},
	gemeinden_Karlsruhe: {
		url  : '/thesauri/gemeinden_Karlsruhe.json',
		values : [],
	},
	gemeinden_Konstanz: {
		url  : '/thesauri/gemeinden_Konstanz.json',
		values : [],
	},
	gemeinden_Lörrach: {
		url  : '/thesauri/gemeinden_Lorrach.json',
		values : [],
	},
	gemeinden_Ludwigsburg: {
		url  : '/thesauri/gemeinden_Ludwigsburg.json',
		values : [],
	},
	gemeinden_Main_Tauber_Kreis: {
		url  : '/thesauri/gemeinden_Main_Tauber_Kreis.json',
		values : [],
	},
	gemeinden_Mannheim: {
		url  : '/thesauri/gemeinden_Mannheim.json',
		values : [],
	},
	gemeinden_Neckar_Odenwald_Kreis: {
		url  : '/thesauri/gemeinden_Neckar_Odenwald_Kreis.json',
		values : [],
	},
	gemeinden_Ortenaukreis: {
		url  : '/thesauri/gemeinden_Ortenaukreis.json',
		values : [],
	},
	gemeinden_Ostalbkreis: {
		url  : '/thesauri/gemeinden_Ostalbkreis.json',
		values : [],
	},
	gemeinden_Pforzheim: {
		url  : '/thesauri/gemeinden_Pforzheim.json',
		values : [],
	},
	gemeinden_Rastatt: {
		url  : '/thesauri/gemeinden_Rastatt.json',
		values : [],
	},
	gemeinden_Ravensburg: {
		url  : '/thesauri/gemeinden_Ravensburg.json',
		values : [],
	},
	gemeinden_Rems_Murr_Kreis: {
		url  : '/thesauri/gemeinden_Rems_Murr_Kreis.json',
		values : [],
	},
	gemeinden_Reutlingen: {
		url  : '/thesauri/gemeinden_Reutlingen.json',
		values : [],
	},
	gemeinden_Rhein_Neckar_Kreis: {
		url  : '/thesauri/gemeinden_Rhein_Neckar_Kreis.json',
		values : [],
	},
	gemeinden_Rottweil: {
		url  : '/thesauri/gemeinden_Rottweil.json',
		values : [],
	},
	gemeinden_Schwäbisch_Hall: {
		url  : '/thesauri/gemeinden_Schwabisch_Hall.json',
		values : [],
	},
	gemeinden_Schwarzwald_Baar_Kreis: {
		url  : '/thesauri/gemeinden_Schwarzwald_Baar_Kreis.json',
		values : [],
	},
	gemeinden_Sigmaringen: {
		url  : '/thesauri/gemeinden_Sigmaringen.json',
		values : [],
	},
	gemeinden_Stuttgart: {
		url  : '/thesauri/gemeinden_Stuttgart.json',
		values : [],
	},
	gemeinden_Tübingen: {
		url  : '/thesauri/gemeinden_Tubingen.json',
		values : [],
	},
	gemeinden_Tuttlingen: {
		url  : '/thesauri/gemeinden_Tuttlingen.json',
		values : [],
	},
	gemeinden_Ulm: {
		url  : '/thesauri/gemeinden_Ulm.json',
		values : [],
	},
	gemeinden_Waldshut: {
		url  : '/thesauri/gemeinden_Waldshut.json',
		values : [],
	},
	gemeinden_Zollernalbkreis: {
		url  : '/thesauri/gemeinden_Zollernalbkreis.json',
		values : [],
	},
	gemeinden_unbekannt: {
		values : ['unbekannt'],
	},	
	gemeinden_mehrere: {
		values : ['mehrere', 'unbekannt'],
	},
}
const fields = {
	auftraggeber_in : {
		title     : 'Auftraggeber*in',
		default   : '',
		gui       : {
			element : 'input',
		},		
		message   : {
			title : `Bitte vollständigen Namen eingeben.`,
			text  : `Pflichtfeld`,
		},
		rule      : {
			testFn : n => {
				let notEmpty = !_.isEmpty(n)
				let belowMaxChars = _.toString( n ).length < 256
				/*
				console.log('n:', n)
				console.log('belowMaxChars:', belowMaxChars)
				console.log('digitsMatching:', digitsMatching)
				console.log('rangeMatches:', rangeMatches)
				*/
				return notEmpty && belowMaxChars ? true : false
			},
		},
		importFilter: ( value )=>{
			return value
		},
		exportFilter: ( value )=>{
			return value
		},
		onChange: ( value, pairs )=>{ return value },
	},
	dienstort : {
		title     : 'Dienstort',
		default   : '',
		gui       : {
			element : 'customDienstort',
			thesaurus : ( fields )=>{
				return 'dienstorte'
			},
		},
		message   : {
			title : `<p>Bitte Dienstort auswählen oder frei eingeben.</p>
					 <p>Beispiele: <br/>
					  – Esslingen, Tübingen <br/>
					  – Firma Archaeo Connect GmbH <br/>
					 </p>
					`,
			text  : `Pflichtfeld`,
		},
		rule      : {
			testFn : n => {
				let notEmpty = !_.isEmpty(n)
				let belowMaxChars = _.toString( n ).length < 256
				/*
				console.log('n:', n)
				console.log('belowMaxChars:', belowMaxChars)
				console.log('digitsMatching:', digitsMatching)
				console.log('rangeMatches:', rangeMatches)
				*/
				return notEmpty && belowMaxChars ? true : false
			},
		},
		importFilter: ( value )=>{
			return value
		},
		exportFilter: ( value )=>{
			return value
		},
		onChange: ( value, pairs )=>{ return value },
	},
	telefonnummer : {
		title     : 'Telefonnummer',
		default   : '',
		gui       : {
			element : 'input',
		},
		message   : {
			title : `Telefonnummer für eventuelle Rückfragen`,
			text  : `Pflichtfeld`,			
		},
		rule      : {
			testFn : n => {
				let notEmpty = !_.isEmpty(n)
				let belowMaxChars = _.toString( n ).length < 256
				/*
				console.log('n:', n)
				console.log('belowMaxChars:', belowMaxChars)
				console.log('digitsMatching:', digitsMatching)
				console.log('rangeMatches:', rangeMatches)
				*/
				return notEmpty && belowMaxChars ? true : false
			},
		},
		importFilter: ( value )=>{
			return value
		},
		exportFilter: ( value )=>{
			return value
		},
		onChange: ( value, pairs )=>{ return value },
	},
	email : {
		title     : 'Email',
		default   : '',
		gui       : {
			element : 'input',
		},
		message   : {
			title : `E-Mail-Adresse für eventuelle Rückfragen`,
			text  : `Pflichtfeld`,			
		},
		rule      : {
			testFn : n => {
				let notEmpty = !_.isEmpty(n)
				let belowMaxChars = _.toString( n ).length < 256
				/*
				console.log('n:', n)
				console.log('belowMaxChars:', belowMaxChars)
				console.log('digitsMatching:', digitsMatching)
				console.log('rangeMatches:', rangeMatches)
				*/
				return notEmpty && belowMaxChars ? true : false
			},
		},
		importFilter: ( value )=>{
			return value
		},
		exportFilter: ( value )=>{
			return value
		},
		onChange: ( value, pairs )=>{ return value },
	},
	auftragsdatum: {
		title     : 'Auftragsdatum',
		default   : '',
		gui       : {
			element : 'date',
		},
		message   : {
			title : ``,
			text  : `Pflichtfeld`,			
		},
		rule      : {
			testFn : n => {
				let digitsMatching = /\d{2}(\.)\d{2}(\.)\d{4}/.test( n )
				let lengthMatching = (n && n.length == 10) ? true : false
				/*
				console.log('n:', n)
				console.log('digitsMatching:', digitsMatching)
				console.log('lengthMatching:', lengthMatching)
				*/
				return digitsMatching && lengthMatching ? true : false
			},
		},
		importFilter: ( value )=>{
			return value
		},
		exportFilter: ( value )=>{
			return value
		},
		onChange: ( value, pairs )=>{ return value },
	},
	fertigstellungstermin: {
		title     : 'Fertigstellungstermin',
		default   : '',
		gui       : {
			element : 'date',
		},
		message   : {
			title : `Bitte gewünschten Termin für die Fertigstellung des Fotoauftrags auswählen. Kommentare dazu sind im Feld „Anmerkungen“ möglich.`,
			text  : `Pflichtfeld`,
		},
		rule      : {
			testFn : (n, haystack, pairs, scheme, doLog = false) => {
				let digitsMatching   = /\d{2}(\.)\d{2}(\.)\d{4}/.test( n )
				let lengthMatching   = (n && n.length == 10) ? true : false
				let dateRangeisValid = true
				
				/*
				console.log('n:', n)
				console.log('digitsMatching:', digitsMatching)
				console.log('lengthMatching:', lengthMatching)
				console.log('pairs:', pairs)
				console.log('pairs.auftragsdatum:', pairs.auftragsdatum)
				*/

				// wenn das start-datum schon gesetzt wurde:
				// das datum dieses feldes darf nicht davor liegen
				const startDate = pairs.auftragsdatum
				const thisDate  = n
				if( startDate ){
					const startDateStr = startDate ? startDate.split('.').reverse().join('') : []
					const thisDateStr  = thisDate ? thisDate.split('.').reverse().join('') : []
					let startInt       = parseInt( startDateStr )
					let stopInt        = parseInt( thisDateStr )
					
					dateRangeisValid = (stopInt >= startInt) ? true : false
					
					if( doLog ){
						console.log('startDate:', startDate)
						console.log('thisDate:', thisDate)
						/*
						console.log('startPairs:', startPairs)
						console.log('stopPairs:', stopPairs)
						console.log('startInt:', startInt)
						console.log('stopInt:', stopInt)
						*/
						console.log('dateRangeisValid:', dateRangeisValid)
						console.log('-----')
					}
				}

				return digitsMatching && lengthMatching && dateRangeisValid ? true : false
			},
		},
		importFilter: ( value )=>{
			return value
		},
		exportFilter: ( value )=>{
			return value
		},
		onChange: ( value, pairs )=>{ return value },
	},
	fundort_kreis : {
		title     : 'Fundort, Kreis',
		default   : '',
		gui       : {
			element : 'select',
			thesaurus : ( fields )=>{
				return 'landkreise'
			},
		},
		message   : {
			title : `<p>Auswahl aus allen Landkreisen in Baden-Württemberg.</p>
					 <p>Die Angaben „unbekannt“ und „mehrere“ sind auch möglich.</p>
					 <p>Beispiel: Ludwigsburg</p>
					`,
			text  : `Pflichtfeld`,
		},
		rule      : {
			testFn : (needle, haystack) =>{
				/*
				console.group('fundort_gemeinde • testFn')
				console.log('needle:', needle)
				console.log('haystack:', haystack)
				console.groupEnd()
				*/

				return _.isArray( haystack ) && haystack.includes(needle) ? true : false
			},
		},
		importFilter: ( value )=>{
			return value
		},
		exportFilter: ( value )=>{
			return value
		},
		onChange: ( value, pairs )=>{
			//console.log('onChange:', value, pairs)
			if( 'unbekannt' == value ){
				pairs['fundort_gemeinde'] = 'unbekannt'
				/*
				console.log('change it')
				setTimeout(()=>{
					pairs['fundort_gemeinde'] = 'unbekannt'
					console.log('onChange • after', value, pairs)
				}, 25)
				*/
			}
			return value;
		},
	},
	fundort_gemeinde : {
		title     : 'Fundort, Gemeinde',
		default   : '',
		gui       : {
			element : 'select',
			thesaurus : ( fields )=>{
				// das gemeinden thesaurus ist abhängig vom gewählten kreis
				let useThesaurus = null
				let kreisKey = 'fundort_kreis'
				let kreisStr = fields[kreisKey]

				// anpassung des strings an den jeweiligen thesauri key
				if( _.isString( kreisStr ) && kreisStr ){
					kreisStr = 'gemeinden_' + fields[kreisKey]
					// replaceAll wurde wegen alten Browserversionen nicht unterstützt,
					// deswegen hier die Oldschool-Variante
					// kreisStr = kreisStr.replaceAll(' ', '_')
					// kreisStr = kreisStr.replaceAll('-', '_')
					kreisStr = kreisStr.replace( new RegExp(' ', 'g'), '_')
					kreisStr = kreisStr.replace( new RegExp('-', 'g'), '_')

					useThesaurus = kreisStr
				}

				//console.log('kreisStr:', kreisStr)
				//console.log('useThesaurus:', useThesaurus)

				return useThesaurus
			},
		},
		message   : {
			title : `<p>Auswahl aus allen Gemeinden des ausgewählten Landkreises.</p>
					 <p>Wurde „unbekannt“ im Feld „Fundort, Kreis“ ausgewählt, wird im Feld „Fundort, Gemeinde“ automatisch auch „unbekannt“ gesetzt.</p>
					 <p>Wurde „mehrere“ im Feld „Fundort, Kreis“ ausgewählt, kann im Feld „Fundort, Gemeinde“ lediglich zwischen „mehrere“ und „unbekannt“ gewählt werden. Bei Auswahl von „mehrere“ diese bitte im Feld „Anmerkungen“ auflisten, d.h. die Gemeinden nennen.</p>
					 <p>Beispiel: Marbach</p>
					`,
			text  : `Pflichtfeld`,			
		},
		rule      : {
			testFn : (needle, haystack) =>{
				/*
				console.group('fundort_gemeinde • testFn')
				console.log('needle:', needle)
				console.log('haystack:', haystack)
				console.groupEnd()
				*/

				return _.isArray( haystack ) && haystack.includes(needle) ? true : false
			},
		},
		importFilter: ( value )=>{
			return value
		},
		exportFilter: ( value )=>{
			return value
		},
		onChange: ( value, pairs )=>{ return value },
	},	
	vorgangsnummer_jahr : {
		title     : 'Vorgangsnummer (Jahr)',
		default   : '',
		gui       : {
			element : 'input',
		},
		message   : {
			title : `<p>Jahreszahl, vierstellig.</p>
					 <p>Beispiel: 2019</p>
					`,
			text  : `Das Feld kann auch leer bleiben.`,			
		},
		rule      : {
			testFn : n => {
				let isEmpty        = _.isEmpty( n )
				let digitsMatching = /^[0-9]{4}$/.test( n ) // four digits in a row
				let rangeMatches   = _.toNumber( n ) > 1899
				/*
				console.log('n:', n)
				console.log('digitsMatching:', digitsMatching)
				console.log('rangeMatches:', rangeMatches)
				*/
				return isEmpty || (digitsMatching && rangeMatches) ? true : false
			},
		},
		importFilter: ( value )=>{
			return value
		},
		exportFilter: ( value )=>{
			return value
		},
		onChange: ( value, pairs )=>{ return value },
	},
	vorgangsnummer_lfd : {
		title     : 'Vorgangsnummer (lfd.)',
		default   : '',
		gui       : {
			element : 'input',
		},
		message   : {
			title : `<p>Vorgangsnummer, vierstellig, zwischen 0001 und 5000</p>
				     <p>Beispiel: 0352</p>
					`,
			text  : `Das Feld kann auch leer bleiben.`,			
		},
		rule      : {
			testFn : n => {
				let isEmpty        = _.isEmpty( n )
				let digitsMatching = /^[0-9]{4}$/.test( n ) // four digits in a row
				let rangeMatches   = _.inRange( _.toNumber( n ), 1, 5001)
				/*
				console.log('n:', n)
				console.log('digitsMatching:', digitsMatching)
				console.log('rangeMatches:', rangeMatches)
				*/
				return isEmpty || (digitsMatching && rangeMatches) ? true : false
			},
		},
		importFilter: ( value )=>{
			return value
		},
		exportFilter: ( value )=>{
			return value
		},
		onChange: ( value, pairs )=>{ return value },
	},
	fundstelle : {
		title     : 'Fundstelle',
		default   : '',
		gui       : {
			element : 'textarea',
		},
		message   : {
			title : `<p>Angaben zur Fundstelle, wie Gemarkung, Kontext etc. Bei Sammelaufnahmen von Funden aus mehreren Fundstellen dies bitte ausführen.</p>
					 <p>Beispiele: <br/>
					 – Grubenhaus an der Nordspitze der Heuneburg<br/>
					 – Römischer Kastellvicus in der Flur „Burgwiesen“, Brandgrab  <br/>
					 – Gräberfeld an der Oberen Waiblinger Straße, Grab 43<br/>
					 </p>
					`,
			text  : `Pflichtfeld, maximal 256 Zeichen`,			
		},
		rule      : {
			testFn : n => {
				let notEmpty = !_.isEmpty(n)
				let belowMaxChars = _.toString( n ).length < 256
				/*
				console.log('n:', n)
				console.log('belowMaxChars:', belowMaxChars)
				console.log('digitsMatching:', digitsMatching)
				console.log('rangeMatches:', rangeMatches)
				*/
				return notEmpty && belowMaxChars ? true : false
			},
		},
		importFilter: ( value )=>{
			return value
		},
		exportFilter: ( value )=>{
			return value
		},
		onChange: ( value, pairs )=>{ return value },
	},
	befundnummer : {
		title     : 'Befundnummer',
		default   : '',
		gui       : {
			element : 'input',
		},
		message   : {
			title : `Befundnummer(n), sofern vorhanden`,
			text  : ``,			
		},
		rule      : {
			testFn : n => {
				let belowMaxChars = _.toString( n ).length < 256
				/*
				console.log('n:', n)
				console.log('belowMaxChars:', belowMaxChars)
				console.log('digitsMatching:', digitsMatching)
				console.log('rangeMatches:', rangeMatches)
				*/
				return belowMaxChars ? true : false
			},
		},
		importFilter: ( value )=>{
			return value
		},
		exportFilter: ( value )=>{
			return value
		},
		onChange: ( value, pairs )=>{ return value },
	},
	fundbuchnummer : {
		title     : 'Fundbuchnummer',
		default   : '',
		gui       : {
			element : 'input',
		},
		message   : {
			title : `Fundbuchnummer(n), sofern vorhanden`,
			text  : ``,			
		},
		rule      : {
			testFn : n => {
				let belowMaxChars = _.toString( n ).length < 256
				/*
				console.log('n:', n)
				console.log('belowMaxChars:', belowMaxChars)
				console.log('digitsMatching:', digitsMatching)
				console.log('rangeMatches:', rangeMatches)
				*/
				return belowMaxChars ? true : false
			},
		},
		importFilter: ( value )=>{
			return value
		},
		exportFilter: ( value )=>{
			return value
		},
		onChange: ( value, pairs )=>{ return value },
	},
	objektbeschreibung : {
		title     : 'Objektbeschreibung',
		default   : '',
		gui       : {
			element : 'textarea',
		},
		message   : {
			title : `<p>Objektbeschreibung mit Angaben zu Objekttyp und Material. Bei Sammelaufnahmen von mehreren Funden dies bitte entsprechend ausführen.</p>
					 <p>Beispiele: <br/>
					 – Scheibenfibel aus Eisen und Bronze, mit tauschierten Silber- und Messingfäden <br/>
				   	 – Armbrustbolzen aus Eisen <br/>
				   	 – Spanische Amphore des Typs Dressel 20 <br/>
					 </p>
					`,
			text  : `Pflichtfeld, maximal 256 Zeichen.`,			
		},
		rule      : {
			testFn : n => {
				let notEmpty = !_.isEmpty(n)
				let belowMaxChars = _.toString( n ).length < 256
				/*
				console.log('n:', n)
				console.log('belowMaxChars:', belowMaxChars)
				console.log('digitsMatching:', digitsMatching)
				console.log('rangeMatches:', rangeMatches)
				*/
				return notEmpty && belowMaxChars ? true : false
			},
		},
		importFilter: ( value )=>{
			return value
		},
		exportFilter: ( value )=>{
			return value
		},
		onChange: ( value, pairs )=>{ return value },
	},
	datierung : {
		title     : 'Datierung',
		default   : '',
		gui       : {
			element : 'multiselect',
			thesaurus : ( fields )=>{
				return 'datierungen'
			},
		},
		message   : {
			title : `<p>Bitte Werte aus Datierungs-Dropdownliste auswählen, Mehrfacheingaben möglich. </p>
					 <p>Beispiel: Hallstattzeit </p>
					`,
			text  : `Pflichtfeld`,			
		},
		rule      : {
			testFn : (needle, haystack) => {
				const needles    = _.toString( needle ).split(', ')
				const difference = _.difference( needles, _.cloneDeep( haystack) )

				/*
				console.log('')
				console.log('needle:', needle)
				console.log('haystack:', haystack)
				console.log('difference:', difference)
				*/

				return difference.length === 0
			},
		},
		importFilter: ( value )=>{
			return value
		},
		exportFilter: ( value )=>{
			return value
		},
		onChange: ( value, pairs )=>{ return value },
	},
	zweck_des_fotos : {
		title     : 'Zweck des Fotos',
		default   : '',
		gui       : {
			element : 'input',
		},
		message   : {
			title : `<p>Bitte Zweck des Fotos nennen.</p>
					 <p>Beispiel: Publikation in den Archäologischen Ausgrabungen 2021</p>
					`,
			text  : `Maximal 256 Zeichen.`,
		},
		rule      : {
			testFn : (n) => {
				const stringLength   = _.toString( n ).length
				const validateLength = stringLength < 256
				/*
				console.log('')
				console.log('n:', n)
				console.log('n.length:', n.length)
				console.log('stringLength:', stringLength)
				*/
				return validateLength
			},
		},
		importFilter: ( value )=>{
			return value
		},
		exportFilter: ( value )=>{
			return value
		},
		onChange: ( value, pairs )=>{ return value },
	},
	anmerkungen : {
		title     : 'Anmerkungen',
		default   : '',
		gui       : {
			element : 'textarea',
		},
		message   : {
			title : `<p>Hier sind Anmerkungen und Erläuterungen zu den oben getätigten Eingaben möglich.</p>
					`,
			text  : `Maximal 256 Zeichen. `,
		},
		rule      : {
			testFn : (n) => {
				const stringLength   = _.toString( n ).length
				const validateLength = stringLength < 256
				/*
				console.log('')
				console.log('n:', n)
				console.log('n.length:', n.length)
				console.log('stringLength:', stringLength)
				*/
				return validateLength
			},
		},
		importFilter: ( value )=>{
			return value
		},
		exportFilter: ( value )=>{
			return value
		},
		onChange: ( value, pairs )=>{ return value },
	},
}

//console.log('fourth • thesauri', thesauri)

export default { 
	title    : 'Fotometadaten',
	thesauri : thesauri,
	fields   : fields,
}
