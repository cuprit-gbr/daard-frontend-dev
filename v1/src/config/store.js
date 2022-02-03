import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		currentEnv: {},
		requestToken: '',
		accessToken: '',
		fields: {},
		steps: [],
		route: {},
		boneChangesForm: [],
	},
	getters: {
		currentEnv: (state) => {return state.currentEnv},
		restBase: (state) => {return state.currentEnv.restBase},
		requestToken: (state) => {return state.requestToken},
		accessToken: (state) => {return state.accessToken},
		fields: (state) => {return state.fields},
		steps: (state) => {return state.steps},
		boneChangesForm: (state) => {return state.boneChangesForm},
		isStepValid: (state, getters) => (stepSlug) => {
			//const step = state.steps.find( ( item ) => {return item.slug === stepSlug} )
			const step = getters.getStepBySlug(stepSlug)
			const stepFields = _.get(step, 'fields', [])
			let isValid = true

			if ('disease' === stepSlug) {
				if (!getters.getFieldProp('disease', '_value')) isValid = false
				if (!getters.getFieldProp('age_class', '_value')) isValid = false
				if (!getters.getFieldProp('age', '_value')) isValid = false
				if (!getters.getFieldProp('sex', '_value')) isValid = false
			}
			if ('inventory' === stepSlug) {
				const amountFields = stepFields.filter((item) => {return _.endsWith(item, '_amount')})

				let values = []
				amountFields.forEach((item) => {
					values.push(getters.getFieldProp(item, '_value'))
				})
				values = _.compact(values) // remove falsy and empty values
				values = _.uniq(values) // remove duplicates

				//console.log('inventory stepFields:', stepFields)
				//console.log('inventory amountFields:', amountFields)
				//console.log('inventory values:', values)

				if (!_.size(values)) isValid = false // wenn gar kein feld ausgefüllt wurde
				if (_.size(values) == 1 && values[ 0 ] == 'absent') isValid = false // wenn alle knochen "absent" sind
			}
			if ('bone-changes' === stepSlug) {
				//console.log( 'stepFields:', stepFields )

				// every field needs a value
				stepFields.forEach((item) => {
					if (!_.size(getters.getFieldProp(item, '_value'))) isValid = false
				})

				if (!_.size(stepFields)) isValid = false // wenn es gar kein felder gibt

				//console.log( 'stepFields:', stepFields )
			}
			if ('site' === stepSlug) {
				if (!getters.getFieldProp('origin', '_value')) isValid = false
				if (!getters.getFieldProp('position', '_value')) isValid = false
				//if (!getters.getFieldProp('storage_condition', '_value')) isValid = false
				if (!getters.getFieldProp('storage_place', '_value')) isValid = false
				if (!getters.getFieldProp('chronology', '_value')) isValid = false

				if ('archaeological' == getters.getFieldProp('origin', '_value')) {
					if (!getters.getFieldProp('archaeological_funery_context', '_value')) isValid = false
					if (!getters.getFieldProp('archaeological_burial_type', '_value')) isValid = false
				}

				if (!getters.getFieldProp('dating_method', '_value')) isValid = false
			}
			if ('publication' === stepSlug) {
				if (!getters.getFieldProp('dna_analyses', '_value')) isValid = false
				if (!getters.getFieldProp('privacyConsent', '_value')) isValid = false
			}
			if ('all' === stepSlug) {
				if (!getters.isStepValid('disease')) isValid = false
				if (!getters.isStepValid('inventory')) isValid = false
				if (!getters.isStepValid('bone-changes')) isValid = false
				if (!getters.isStepValid('site')) isValid = false
				if (!getters.isStepValid('publication')) isValid = false
			}

			return isValid
		},
		getStepBySlug: (state) => (stepSlug) => {
			const step = state.steps.find((item) => {return item.slug === stepSlug})

			return step
		},
		getStepProp: (state, getters) => (stepSlug, key, fallbackValue = undefined) => {
			const step = getters.getStepBySlug(stepSlug)
			let value = _.get(step, key, fallbackValue)

			//if( _.isEmpty(value) && !_.isUndefined(fallbackValue) ) value = fallbackValue

			return value
		},
		getFieldBySlug: (state, getters) => (fieldSlug) => {
			const field = state.fields[ fieldSlug ]

			return field
		},
		getFieldProp: (state, getters) => (fieldSlug, key, fallbackValue = undefined) => {
			const field = getters.getFieldBySlug(fieldSlug)
			let value = _.get(field, key, fallbackValue)

			//if( _.isEmpty(value) && !_.isUndefined(fallbackValue) ) value = fallbackValue

			return value
		},
		activeStep: (state, getters) => {
			const doLog = false
			const currentRouteStepSlug = _.get(state.route, 'params.stepSlug')
			const activeStep = getters.getStepBySlug(currentRouteStepSlug)

			if (doLog) {
				console.groupCollapsed('store.js', '• activeStep')
				console.log('currentRouteStepSlug:', currentRouteStepSlug)
				console.groupEnd()
			}

			return activeStep
		},
		activeStepIndex: (state, getters) => {
			const doLog = false
			const currentRouteStepSlug = _.get(state.route, 'params.stepSlug')
			const activeStepIndex = getters.steps.findIndex(item => {return item.slug === currentRouteStepSlug})

			if (doLog) {
				console.groupCollapsed('store.js', '• activeStepIndex')
				console.log('activeStepIndex:', activeStepIndex)
				console.groupEnd()
			}

			return activeStepIndex
		},
		availableBoneIds: (state, getters) => {
			let doLog = false
			const step = getters.getStepBySlug('inventory')
			const stepFields = _.get(step, 'fields', [])

			// es werden alle *_amount fields gesammelt
			// die sonderfälle für die zähne später extra behandelt
			const amountFields = stepFields.filter(fieldSlug => {
				const fieldSlugIsAmountField = _.endsWith(fieldSlug, '_amount')
				const specialFieldSlugs = [
					'cranial_district__deciduous-teeth_amount',
					'cranial_district__permanent-teeth_amount',
				]
				const fieldIsNotSpecial = !specialFieldSlugs.includes(fieldSlug)

				return fieldSlugIsAmountField && fieldIsNotSpecial ? true : false
			})
			// es gelten nur die amount-fields deren _value nicht "absent" ist
			const validAmountFields = amountFields.filter(fieldSlug => {
				return getters.getFieldProp(fieldSlug, '_value') !== 'absent'
			})
			// jetzt werden alle ids der validen fields gesammelt
			const boneIds = validAmountFields.map(fieldSlug => {
				return getters.getFieldProp(fieldSlug, 'id')
			})

			// sonderfall für die zähne, diese sind anders in den fields organisiert
			// nur wenn der amount gültig ist
			// und nur wenn es auch ids gibt werden diese den boneIds hinzugefügt
			const hasValidDeciduousTeethAmount = getters.getFieldProp('cranial_district__deciduous-teeth_amount', '_value') != 'absent' ? true : false
			const hasValidPermanentTeethAmount = getters.getFieldProp('cranial_district__permanent-teeth_amount', '_value') != 'absent' ? true : false
			const deciduousTeethValue = hasValidDeciduousTeethAmount ? getters.getFieldProp('cranial_district__deciduous-teeth', '_value') : []
			const permanentTeethValue = hasValidPermanentTeethAmount ? getters.getFieldProp('cranial_district__permanent-teeth', '_value') : []
			const deciduousTeethIds = _.isArray(deciduousTeethValue) ? deciduousTeethValue : []
			const permanentTeethIds = _.isArray(permanentTeethValue) ? permanentTeethValue : []
			deciduousTeethIds.forEach(boneId => {boneIds.push(boneId)})
			permanentTeethIds.forEach(boneId => {boneIds.push(boneId)})

			// groupCollapsed group
			if (doLog) {
				console.group('store.js', '• boneIds')
				console.log('amountFields:', amountFields)
				console.log('validAmountFields:', validAmountFields)
				console.log('boneIds:', boneIds)
				console.log('hasValidDeciduousTeethAmount:', hasValidDeciduousTeethAmount)
				console.log('hasValidPermanentTeethAmount:', hasValidPermanentTeethAmount)
				console.log('deciduousTeethIds:', deciduousTeethIds)
				console.log('permanentTeethIds:', permanentTeethIds)
				console.groupEnd()
			}

			return boneIds
		},
		finalSubmitObject: (state, getters) => {
			const inventoryStep = getters.getStepBySlug('inventory')
			const boneChangesStep = getters.getStepBySlug('bone-changes')
			const inventoryStepFields = _.get(inventoryStep, 'fields', [])
			const boneChangesStepFields = _.get(boneChangesStep, 'fields', [])
			const specialFieldSlugs = [
				'cranial_district__deciduous-teeth',
				'cranial_district__permanent-teeth',
			]
			const labelFields = inventoryStepFields.filter((fieldSlug) => {
				const fieldIsNotSpecial = !specialFieldSlugs.includes(fieldSlug)
				const hasValidSlug = !_.endsWith(fieldSlug, '_amount')
				return fieldIsNotSpecial && hasValidSlug
			})

			let data = {
				adults: getters.getFieldProp('adults', '_value'),
				subadults: getters.getFieldProp('subadults', '_value'),
				age_class: getters.getFieldProp('age_class', '_value'),
				disease: getters.getFieldProp('disease', '_value'),
				age: getters.getFieldProp('age', '_value'),
				age_freetext: getters.getFieldProp('age_freetext', '_value'),
				sex: getters.getFieldProp('sex', '_value'),

				inventory: {},
				bone_relations: {},

				reference_images: getters.getFieldProp('reference_images', '_value'),
				origin: getters.getFieldProp('origin', '_value'),
				site: getters.getFieldProp('archaeological_site', '_value'),
				position: getters.getFieldProp('position', '_value'),
				gazId: getters.getFieldProp('gazId', '_value'),
				gaz_link: getters.getFieldProp('gaz_link', '_value'),
				archaeological_tombid: getters.getFieldProp('archaeological_tombid', '_value'),
				archaeological_individualid: getters.getFieldProp('archaeological_individualid', '_value'),
				archaeological_funery_context: getters.getFieldProp('archaeological_funery_context', '_value'),
				archaeological_burial_type: getters.getFieldProp('archaeological_burial_type', '_value'),
				storage_place: getters.getFieldProp('storage_place', '_value'),
				storage_place_freetext: getters.getFieldProp('storage_place_freetext', '_value'),
				//storage_condition: getters.getFieldProp('storage_condition', '_value'),
				chronology: getters.getFieldProp('chronology', '_value'),
				chronology_freetext: getters.getFieldProp('chronology_freetext', '_value'),

				dating_method: getters.getFieldProp('dating_method', '_value'),
				dna_analyses: getters.getFieldProp('dna_analyses', '_value'),
				dna_analyses_link: getters.getFieldProp('dna_analyses_link', '_value'),
				published: getters.getFieldProp('published', '_value'),
				doi: getters.getFieldProp('doi', '_value'),
				references: getters.getFieldProp('references', '_value'),
			}

			// fill data.inventory
			// merge field with its corresponding _amount field
			// create merged inventory object
			labelFields.forEach(fieldSlug => {
				const field = getters.getFieldBySlug(fieldSlug)
				const amountField = getters.getFieldBySlug(fieldSlug + '_amount')

				const id = field.id
				const label = field.label
				const svgid = field.svgid
				const amount = amountField._value
				const name = field.name
				const section = field.section

				if (amount != 'absent') {
					const fieldObj = {
						id: id,
						label: label,
						svgid: svgid,
						amount: amount,
						name: name,
						section: section,
						//slug: section + '__' + name + '__' + id,
					}

					/*
					console.log( '-----' )
					console.log( 'field:', field, field.id )
					console.log( 'amountField:', amountField, amountField.id )
					console.log( 'fieldObj:', fieldObj )
					*/

					data.inventory[ id ] = fieldObj
				}
			})

			// fill data.inventory
			// special handling for teeths
			// merge field with its corresponding _amount field
			// create merged inventory object
			specialFieldSlugs.forEach(fieldSlug => {
				const field = getters.getFieldBySlug(fieldSlug)
				const amountField = getters.getFieldBySlug(fieldSlug + '_amount')
				const ids = getters.getFieldProp(fieldSlug, '_value')
				const label = field.label
				const svgid = field.svgid
				const amount = amountField._value
				const name = field.name
				const section = field.section

				if (amount != 'absent' && _.size(ids)) {
					console.log('-----')
					console.log('field:', field, field.id)
					console.log('amountField:', amountField, amountField.id)
					console.log('ids:', ids)

					ids.forEach(id => {
						const fieldObj = {
							id: id,
							label: label,
							svgid: svgid,
							amount: amount,
							name: name,
							section: section,
							//slug: section + '__' + name + '__' + id,
						}

						//data.inventory.push( fieldObj )
						data.inventory[ id ] = fieldObj
					})
				}
			})

			// fill bone-relation
			boneChangesStepFields.forEach(fieldSlug => {
				const field = getters.getFieldBySlug(fieldSlug)
				const fieldObj = {
					id: field.id,
					slug: field._slug,
					label: field.label,
					name: field.name,
					section: field.section,
					//technic: field.technic,
					//bone_change: field._value || [],
					//bone_change: field._slug || [],
					//bone_change: getters.getFieldProp( fieldSlug, '_value' ),
					_changes: []
				}
				const changeObj = {
					technic: field.technic,
					bone_change: field._value || [],
				}

				// bone is already there > just add the change
				if (_.has(data, 'bone_relations[' + fieldObj.id + ']')) {
					data.bone_relations[ fieldObj.id ]._changes.push(changeObj)
				}
				// bone is new > add the pair
				else {
					fieldObj._changes.push(changeObj)
					data.bone_relations[ fieldObj.id ] = fieldObj
				}

			})

			return data
		},
	},
	mutations: {
		clearState(state, payload, doLog = false) {
			state.fields = {}
			state.steps = []
			state.route = {}
		},
		setCurrentEnv(state, payload, doLog = false) {
			if (doLog) {
				console.groupCollapsed('store.js', '• setCurrentEnv()')
				console.log('payload:', payload)
				console.groupEnd()
			}

			state.currentEnv = payload
		},
		setAccessToken(state, payload, doLog = true) {
			if (doLog) {
				console.groupCollapsed('store.js', '• setAccessToken()')
				console.log('payload:', payload)
				console.groupEnd()
			}

			state.accessToken = payload
		},
		setRequestToken(state, payload, doLog = true) {
			if (doLog) {
				console.groupCollapsed('store.js', '• setRequestToken()')
				console.log('payload:', payload)
				console.groupEnd()
			}

			state.requestToken = payload
		},
		setRoute(state, payload, doLog = false) {
			if (doLog) {
				console.groupCollapsed('store.js', '• setRoute()')
				console.log('payload:', payload)
				console.groupEnd()
			}

			state.route = payload
		},
		addStep(state, payload, doLog = false) {
			const step = {
				title: payload.title,
				slug: payload.slug,
				desc: payload.desc,
				isEnabled: payload.isEnabled,
				fields: [],
				tabs: payload.tabs,
			}

			state.steps.push(step)
		},
		addStepField(state, payload, doLog = false) {
			const stepSlug = payload.stepSlug
			const step = state.steps.find((item) => {return item.slug === stepSlug})
			const field = payload.field
			const fieldName = field.name
			let type = _.toLower(field.type)

			// groupCollapsed group
			if (doLog) {
				console.groupCollapsed('store.js', '• addStepField()')
				console.log('payload:', payload)
				console.log('stepSlug:', stepSlug)
				console.log('field:', field)
				console.log('type:', type)
				console.log('step:', step)
				console.groupEnd()
			}

			if ('bone-changes' == stepSlug) {
				let fixedOptions = []
				//console.warn( 'payload:', payload )
			}

			if ('checkbox' == type) {
				Vue.set(field, '_type', type)
				Vue.set(field, '_disabled', false)
				Vue.set(field, '_isLoading', false)
				Vue.set(field, '_value', false)
				Vue.set(field, '_label', field.label)
			}
			if ('textfield' == type) {
				Vue.set(field, '_type', type)
				Vue.set(field, '_disabled', false)
				Vue.set(field, '_isLoading', false)
				Vue.set(field, '_value', '')
				Vue.set(field, '_label', field.label)
			}
			if ('textarea' == type) {
				Vue.set(field, '_type', type)
				Vue.set(field, '_disabled', false)
				Vue.set(field, '_isLoading', false)
				Vue.set(field, '_value', '')
				Vue.set(field, '_label', field.label)
			}
			if ('rest-selectfield' == type) {
				Vue.set(field, '_type', type)
				Vue.set(field, '_disabled', false)
				Vue.set(field, '_options', [])
				Vue.set(field, '_isLoading', false)
				Vue.set(field, '_value', '')
				Vue.set(field, '_label', field.label)
			}
			if ('rest-textfield' == type) { // becomes rest-searchfield
				Vue.set(field, '_type', 'rest-searchfield')
				Vue.set(field, '_disabled', false)
				Vue.set(field, '_options', [])
				Vue.set(field, '_search', '')
				Vue.set(field, '_isLoading', false)
				Vue.set(field, '_value', '')
				Vue.set(field, '_label', field.label)
			}
			if ('selectfield' == type) {
				Vue.set(field, '_type', type)
				Vue.set(field, '_disabled', false)

				let _options = []
				field.options.forEach((item) => {
					const option = {
						label: item.value,
						value: item.name,
					}
					_options.push(option)
				})
				Vue.set(field, '_options', _options)

				Vue.set(field, '_isLoading', false)
				Vue.set(field, '_value', '')
				Vue.set(field, '_label', field.label)
			}
			if ('radiogroup' == type) { // becomes radiogroup, use childs as options
				Vue.set(field, '_type', 'radiogroup')
				Vue.set(field, '_disabled', false)

				let _options = []
				_.forEach(field.objects, (value, key) => {
					const option = {
						label: value.label,
						value: value.name,
					}
					_options.push(option)
				})
				Vue.set(field, '_options', _options)

				Vue.set(field, '_isLoading', false)
				Vue.set(field, '_value', _options[ 0 ].value)
				Vue.set(field, '_label', field.label)
			}
			if ('hiddenfield' == type) { // becomes disabled textfield
				Vue.set(field, '_type', 'textfield')
				Vue.set(field, '_disabled', true)
				Vue.set(field, '_isLoading', false)
				Vue.set(field, '_value', '')
				Vue.set(field, '_label', field.label)
			}

			// set _value to 'absent' for amount fields in step 'inventory'
			// has to be below type-checkings
			if ('inventory' == stepSlug && _.endsWith(fieldName, '_amount')) {
				//console.log(stepSlug, 'field.name:', field.name)
				Vue.set(field, '_value', 'absent')
			}

			// set field unique slug
			const fieldSlug = field.section ? field.section + '__' + field.name : field.name
			Vue.set(field, '_slug', fieldSlug)

			// set field label
			Vue.set(field, '_label', field.label)

			//console.log(stepSlug, 'field._slug:', field._slug)

			// add step field to state
			if (_.isObject(step)) {
				step.fields.push(fieldSlug)
				Vue.set(state.fields, fieldSlug, field)
			}
		},
		removeStepFields(state, payload, doLog = false) {
			const stepSlug = payload.stepSlug
			const step = state.steps.find((item) => {return item.slug === stepSlug})
			const fieldSlugsToRemove = step.fields

			// groupCollapsed group
			if (doLog) {
				console.groupCollapsed('store.js', '• removeStepField()')
				console.log('payload:', payload)
				console.log('stepSlug:', stepSlug)
				console.log('step:', step)
				console.log('fieldSlugsToRemove:', fieldSlugsToRemove)
				console.groupEnd()
			}

			step.fields = []

			fieldSlugsToRemove.forEach(fieldSlug => {
				//console.log( 'fieldSlug:', fieldSlug, state.fields[fieldSlug] )

				delete state.fields[ fieldSlug ]
			})

		},
		setStepProp(state, payload, doLog = false) {
			const stepSlug = payload.stepSlug
			const key = payload.key
			const value = payload.value
			const step = state.steps.find((item) => {return item.slug === stepSlug})

			// groupCollapsed group
			if (doLog) {
				console.group('store.js', '• setStepProp()')
				console.log('payload:', payload)
				console.log('stepSlug:', stepSlug)
				console.log('key:', key)
				console.log('value:', value)
				console.log('step:', step)
				console.groupEnd()
			}

			step[ key ] = value
		},
		setFieldProp(state, payload, doLog = false) {
			const fieldName = payload.fieldName
			const key = payload.key
			const value = payload.value
			const field = state.fields[ fieldName ]

			// groupCollapsed group
			if (doLog) {
				console.group('store.js', '• setFieldProp()')
				console.log('payload:', payload)
				console.log('fieldName:', fieldName)
				console.log('key:', key)
				console.log('value:', value)
				console.log('field:', field)
				console.groupEnd()
			}

			Vue.set(field, key, value)

			/*
			if( 'subadults' === fieldName ) {
				console.log( '•••' )
				//fetch( state.restBase +  )
			}
			*/
		},
		setBoneChangesForm(state, payload, doLog = false) {
			//const key       = payload.key
			//const field     = state.fields[fieldName]

			// groupCollapsed group
			if (doLog) {
				console.group('store.js', '• setBoneChangesForm()')
				console.log('payload:', payload)
				console.groupEnd()
			}

			state.boneChangesForm = payload
		}
	},
	actions: {}
})
