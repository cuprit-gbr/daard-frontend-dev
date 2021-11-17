<!--

	Was macht diese Componente?
	Wofür ist die Compoente da?

	Welche $props gibt es?

	Beispiel Code:
		<DocEditForm></DocEditForm>

	2021-07-05	init

-->

<template>
	<div class="DocEditForm" name="DocEditForm" :class="elmClasses">
		<div class="DocEditForm__inner">

			<br/><br/>

			<HeaderRow
				title="Cumulus-Metadaten-Generator"
				:isCloseable="false"
			></HeaderRow>
			<SelectRow
				:datasets="[]"
			></SelectRow>

			<br/>
			<!--
			<keep-alive>
			-->
			<template v-if="doc.dataRows.length">
			<transition-group
				name="fade"
				mode="out-in"

				XXXduration="{ leave: 1500, enter: 1500  }"
				:key="doc.activeRowIndex"
				appear>

					<ToggleRow
						:title="toggleRow.title"
						:isOpen="openToggleRows.includes( toggleRow.title ) || toggleRow.isOpen"
						:countErrors="countErrorsinToggleRow( toggleRow )"
						@hasToggled="onToggleToggleRow"
						v-for="(toggleRow, i) in toggleRows" :key="'tR'+i">
						<FormRow
							:labelText="field ? field.title : ''"
							:descText="field ?
								'<p>'+ field.message.title + '</p>' +
								'<p>'+ field.message.text + '</p>'
								: ''
							"
							:isRequired="field ? field.isRequired( doc.activeRowIndex, doc, field ) : false"
							:isValid="
								doc.isValidValue(
									doc.activeRowIndex,
									doc.getValueByKey( doc.activeRowIndex, field.key ),
									field,
								)
							"
							v-for="(field, j) in toggleRow.fields" :key="'fR'+j">

							<!--
							<BaseText
								:value="doc.getValueByKey( doc.activeRowIndex, field.key, field )"
								:disabled="field.isDisabled( doc.activeRowIndex, doc, field )"
								@input="setValueDebounced( doc.activeRowIndex, field.key, $event )"
							></BaseText>
							-->

							<template v-if="field.gui.element == 'input'">
								<!--
								<hr/><mark>input</mark>
								-->
								<div class="flex">
									<BaseText
										:value="doc.getValueByKey( doc.activeRowIndex, field.key, field )"
										:disabled="field.isDisabled( doc.activeRowIndex, doc, field )"
										@input="setValueDebounced( doc.activeRowIndex, field.key, $event )"
									></BaseText>
									<template v-if="field.key !== 'dateiname'">
										<div>
											<a  class="DocEditForm__copyButton circleIcon"
											    :class="{'circleIcon--isDisabled' : !doc.isValidValue(
													doc.activeRowIndex,
													doc.getValueByKey( doc.activeRowIndex, field.key ),
													field,
												)}"
												title="Diesen Wert für alle anderen Datensätze übernehmen."
												@click="copyAndApplyValue( doc.activeRowIndex, field )" role="button">
												<BaseIcon type="copy-and-paste" ></BaseIcon>
											</a>
										</div>
									</template>
								</div>
							</template>
							<template v-if="field.gui.element == 'textarea'">
								<!--
								<hr/><mark>textarea</mark>
								-->
								<div class="flex">
									<BaseTextarea
										:value="doc.getValueByKey( doc.activeRowIndex, field.key, field )"
										:disabled="field.isDisabled( doc.activeRowIndex, doc, field )"
										@input="setValueDebounced( doc.activeRowIndex, field.key, $event )"
									></BaseTextarea>
									<div>
										<a  class="DocEditForm__copyButton circleIcon"
											:class="{'circleIcon--isDisabled' : !doc.isValidValue(
												doc.activeRowIndex,
												doc.getValueByKey( doc.activeRowIndex, field.key ),
												field,
											)}"
											title="Diesen Wert für alle anderen Datensätze übernehmen."
											@click="copyAndApplyValue( doc.activeRowIndex, field )" role="button">
											<BaseIcon type="copy-and-paste" ></BaseIcon>
										</a>
									</div>
								</div>
							</template>
							<template v-if="field.gui.element == 'select'">
								<!--
								<hr/><mark>select</mark>
								-->
								<div class="flex">
									<BaseSelect
										:label="'Bitte wählen ...'"
										:value="doc.getValueByKey( doc.activeRowIndex, field.key )"
										:options="doc.getThesauriByKey( field.gui.thesaurus )"
										:disabled="field.isDisabled( doc.activeRowIndex, doc, field )"
										@input="setValueDebounced( doc.activeRowIndex, field.key, $event )"
									></BaseSelect>
									<div>
										<a  class="DocEditForm__copyButton circleIcon"
											:class="{'circleIcon--isDisabled' : !doc.isValidValue(
												doc.activeRowIndex,
												doc.getValueByKey( doc.activeRowIndex, field.key ),
												field,
											)}"
											title="Diesen Wert für alle anderen Datensätze übernehmen."
											@click="copyAndApplyValue( doc.activeRowIndex, field )" role="button">
											<BaseIcon type="copy-and-paste" ></BaseIcon>
										</a>
									</div>
								</div>
							</template>
							<template v-if="field.gui.element == 'multiselect'">
								<!--
								<hr/><mark>multiselect</mark>
								-->
								<div class="flex">
									<template v-if="field.key === 'objekttyp'">
										<div class="activateSelect" :class="!maxItems.objekttyp ? 'activateSelect--isVisible' : 'activateSelect--isHidden'">
											<BaseSelect
												:label="'Bitte wählen ...'"
												:multiple="true"
												:value="doc.stringValueToArray( doc.getValueByKey( doc.activeRowIndex, field.key ) )"
												:options="_.slice( doc.getThesauriByKey( field.gui.thesaurus ), 0, maxItems.objekttyp )"
												:disabled="field.isDisabled( doc.activeRowIndex, doc, field )"
												@input="setValueDebounced( doc.activeRowIndex, field.key, doc.arrayValueToString( $event ) )"
											></BaseSelect>
											<div class="activateSelect__overlay">
												<div class="activateSelect__overlayGui font font--sizeSmall">
													<p>Der Thesaurus enthält sehr viele Elemente.</p>
													<BaseButton
														:isOutlined="true"
														@click.native="setMaxItems('objekttyp', 10000)"
													>Alle Elemente laden</BaseButton>
												</div>
											</div>
										</div>
									</template>
									<template v-else-if="field.key === 'gemeinde_name'">
										<div class="activateSelect" :class="!maxItems.gemeinde_name ? 'activateSelect--isVisible' : 'activateSelect--isHidden'">
											<BaseSelect
												:label="'Bitte wählen ...'"
												:multiple="true"
												:value="doc.stringValueToArray( doc.getValueByKey( doc.activeRowIndex, field.key ) )"
												:options="_.slice( doc.getThesauriByKey( field.gui.thesaurus ), 0, maxItems.gemeinde_name )"
												:disabled="field.isDisabled( doc.activeRowIndex, doc, field )"
												@input="setValueDebounced( doc.activeRowIndex, field.key, doc.arrayValueToString( $event ) )"
											></BaseSelect>
											<div class="activateSelect__overlay">
												<div class="activateSelect__overlayGui">
													<p>Der Thesaurus enthält sehr viele Elemente.</p>
													<BaseButton
														:isOutlined="true"
														@click.native="setMaxItems('gemeinde_name', 10000)"
													>Alle Elemente laden</BaseButton>
												</div>
											</div>
										</div>
									</template>
									<template v-else-if="field.key === 'gemarkung_name'">
										<div class="activateSelect" :class="!maxItems.gemarkung_name ? 'activateSelect--isVisible' : 'activateSelect--isHidden'">
											<BaseSelect
												:label="'Bitte wählen ...'"
												:multiple="true"
												:value="doc.stringValueToArray( doc.getValueByKey( doc.activeRowIndex, field.key ) )"
												:options="_.slice( doc.getThesauriByKey( field.gui.thesaurus ), 0, maxItems.gemarkung_name )"
												:disabled="field.isDisabled( doc.activeRowIndex, doc, field )"
												@input="setValueDebounced( doc.activeRowIndex, field.key, doc.arrayValueToString( $event ) )"
											></BaseSelect>
											<div class="activateSelect__overlay">
												<div class="activateSelect__overlayGui">
													<p>Der Thesaurus enthält sehr viele Elemente.</p>
													<BaseButton
														:isOutlined="true"
														@click.native="setMaxItems('gemarkung_name', 10000)"
													>Alle Elemente laden</BaseButton>
												</div>
											</div>
										</div>
									</template>
									<template v-else>
										<BaseSelect
											:label="'Bitte wählen ...'"
											:multiple="true"
											:value="doc.stringValueToArray( doc.getValueByKey( doc.activeRowIndex, field.key ) )"
											:options="_.slice( doc.getThesauriByKey( field.gui.thesaurus ), 0, 200 )"
											:disabled="field.isDisabled( doc.activeRowIndex, doc, field )"
											@input="setValueDebounced( doc.activeRowIndex, field.key, doc.arrayValueToString( $event ) )"
										></BaseSelect>
									</template>

									<div>
										<a  class="DocEditForm__copyButton circleIcon"
											:class="{'circleIcon--isDisabled' : !doc.isValidValue(
												doc.activeRowIndex,
												doc.getValueByKey( doc.activeRowIndex, field.key ),
												field,
											)}"
											title="Diesen Wert für alle anderen Datensätze übernehmen."
											@click="copyAndApplyValue( doc.activeRowIndex, field )" role="button">
											<BaseIcon type="copy-and-paste" ></BaseIcon>
										</a>
									</div>
								</div>
							</template>

							<!--
							<pre name="field.gui.element">{{field.gui.element}}</pre>
							<pre name="field.gui.thesaurus">{{field.gui.thesaurus}}</pre>
							<pre name="doc.isValidValue()">{{
								doc.isValidValue(
									doc.activeRowIndex,
									doc.getValueByKey( doc.activeRowIndex, field.key ),
									field
								)
							}}</pre>
							-->

							<!--
							<pre name="field">{{field}}</pre>
							<pre name="getValueByKey">{{doc.getValueByKey( doc.activeRowIndex, field.key )}}</pre>
							<pre name="doc.mario">{{doc.mario}}</pre>
							<button>Copy+Paste</button>
							-->
						</FormRow>
					</ToggleRow>

			</transition-group>
			</template>
			<template v-else>
				<TextRow>
					Das Dokument kann nicht bearbeitet werden.<br/>
					Es wurden bisher keine Bilder ausgewählt.
				</TextRow>
			</template>
			<!--
			</keep-alive>
			-->

			<br/><br/><br/>

		</div>
	</div>
</template>

<script>
	// @ is an alias to /src
	//import DevInfos from '@/components/DevInfos.vue'
	import EventBus from '../../event-bus.js'
	//import _ from 'lodash'
	import debounce from 'lodash/debounce';

	import HeaderRow from './HeaderRow.vue'
	import SelectRow from './SelectRow.vue'
	import TextRow from './TextRow.vue'
	import ToggleRow from './ToggleRow.vue'
	import FormRow from './FormRow.vue'

	import BaseButton from './BaseButton.vue'
	import BaseIcon from './BaseIcon.vue'
	import BaseText from '/Users/Mario/Dropbox/htdocs/2020-09-17__MhForm/vue-cli-dev/src/components/MhForm/v2/BaseText.vue'
	import BaseTextarea from '/Users/Mario/Dropbox/htdocs/2020-09-17__MhForm/vue-cli-dev/src/components/MhForm/v2/BaseTextarea.vue'
	import BaseSelect from '/Users/Mario/Dropbox/htdocs/2020-09-17__MhForm/vue-cli-dev/src/components/MhForm/v2/BaseSelect.vue'
	import BaseMultiSelect from '/Users/Mario/Dropbox/htdocs/2020-09-17__MhForm/vue-cli-dev/src/components/MhForm/v3/BaseMultiSelect.vue'

	export default {
		name: 'DocEditForm',
		components: {
			HeaderRow,
			SelectRow,
			TextRow,
			ToggleRow,
			FormRow,

			BaseButton,
			BaseIcon,
			BaseText,
			BaseTextarea,
			BaseSelect,
			BaseMultiSelect,
		},
		mixins: [],
		props: {
			//imageObject: [Object, Boolean],
			//text: [String],
			/*
			myProp: {
				type	 : [String, Boolean],
				default  : false,
				required : false,
			},
			*/
		},
		data(){
			return {
				openToggleRows : [], // stores all titles from toggleRows that are open
				maxItems : {
					objekttyp : 0,
					gemeinde_name : 0,
					gemarkung_name : 0,
				}
			}
		},
		watch: {
			'doc.activeRowIndex': { // reset maxItems on sheet change to empty large multiselects again
				handler: function( to, from ) {
					/*
					*/
					this.setMaxItems('objekttyp', 0)
					this.setMaxItems('gemeinde_name', 0)
					this.setMaxItems('gemarkung_name', 0)
				},
				immediate : true,
				deep: true,
			},
		},
		computed: {
			app(){
				return this.$root.$children[0]
			},
			elmClasses(){
				let classes = []

				//classes.push( this.$options.name + '--isAnimating')

				return classes
			},
			doc(){
				return this.app.doc
			},
			toggleRows(){
				const rows = [
					{ title : 'A)  Datei', fields : [
						this.doc.getFieldByKey('dateiname'),
						this.doc.getFieldByKey('dateipfad'),
					]},
					{ title : 'B)  Nutzungs- und Urheberrecht', fields : [
						this.doc.getFieldByKey('nutzungsrecht'),
						this.doc.getFieldByKey('urheber'),
						this.doc.getFieldByKey('bearbeiter_in'),
						this.doc.getFieldByKey('freigabestatus'),
						this.doc.getFieldByKey('nutzungshinweis'),
						this.doc.getFieldByKey('einwilligung_liegt_vor'),
						this.doc.getFieldByKey('sichtbarkeit'),
					]},
					{ title : 'C)  Allgemeines', fields : [
						this.doc.getFieldByKey('fachbereich'),
						this.doc.getFieldByKey('asset_typ'),
						this.doc.getFieldByKey('bild_typ'),
						this.doc.getFieldByKey('denkmal'),
						this.doc.getFieldByKey('fundstelle'),
						this.doc.getFieldByKey('vorgangsnummer'),
						this.doc.getFieldByKey('interne_anmerkungen'),
					]},
					{ title : 'D)  Fachthemen', fields : [
						this.doc.getFieldByKey('datierung'),
						this.doc.getFieldByKey('datierung_jahreszahl_en'),
						this.doc.getFieldByKey('objekttyp'),
						this.doc.getFieldByKey('material'),
						this.doc.getFieldByKey('fachthemen_buk'),
						this.doc.getFieldByKey('bauteile'),
						this.doc.getFieldByKey('künstler_architekt'),
						this.doc.getFieldByKey('veranstaltung'),
					] },
					{ title : 'E)  Topografie', fields : [
						this.doc.getFieldByKey('straße_und_hausnummer'),
						this.doc.getFieldByKey('land_name'),
						this.doc.getFieldByKey('regierungsbezirk_name'),
						this.doc.getFieldByKey('kreis_name'),
						this.doc.getFieldByKey('gemeinde_name'),
						this.doc.getFieldByKey('gemarkung_name'),
						this.doc.getFieldByKey('staat'),
						this.doc.getFieldByKey('provinz_nicht_brd'),
						this.doc.getFieldByKey('längengrad_dg'),
						this.doc.getFieldByKey('breitengrad_dg'),
					] },
					{ title : 'F)  Veröffentlichung', fields : [
						this.doc.getFieldByKey('verwendet_für'),
						this.doc.getFieldByKey('seitenzahl'),
						this.doc.getFieldByKey('bildnummer'),
						this.doc.getFieldByKey('bilduntertext'),
					] },
					{ title : 'G)  Zukauf', fields : [
						this.doc.getFieldByKey('zugekauft'),
						this.doc.getFieldByKey('herkunft_z_b_falls_zugekauft'),
					] },
					{ title : 'H)  Objektbeschreibung und Bearbeitung', fields : [
						this.doc.getFieldByKey('objektbeschreibung'),
						this.doc.getFieldByKey('in_bearbeitung'),
					] },
				]

				//return []
				return rows
			}
		},
		methods: {
			handleScroll( doLog = true ){
				// groupCollapsed group
				if( doLog ){
					console.groupCollapsed( this.$options.name, '• handleScroll()' )
					//console.log('key:', value)
					console.groupEnd()
				}
			},
            countErrorsinToggleRow( toggleRow ){
                const activeRowIndex = this.doc.activeRowIndex
                const fields = toggleRow.fields
            	let countErrors = 0

				// walk the fields and validate values against their fields
                fields.forEach((field)=>{
                    const key = field.key
                    const rowIndex = activeRowIndex
                    const value = this.doc.getValueByKey( rowIndex, key )
					const isValid = this.doc.isValidValue( rowIndex, value, field )

					if( !isValid ) countErrors++
                })

                return countErrors
            },
			onToggleToggleRow( payload, doLog = false ){
				// groupCollapsed group
				if( doLog ){
					console.groupCollapsed( this.$options.name, '• onToggleToggleRow( payload )' )
					console.log('payload:', payload)
					console.groupEnd()
				}

				if( this.openToggleRows.includes( payload.title ) ){
					this.openToggleRows = this._.without( this.openToggleRows, payload.title )
				}else{
					this.openToggleRows.push( payload.title )
				}
			},
			onFileInput( fileList, doLog = true ){
				this.filenames = []

				// groupCollapsed group
				if( doLog ){
					console.groupCollapsed( this.$options.name, '• onFileInput()' )
					console.log('fileList:', fileList)
				}

				this._.forEach(fileList, (file)=>{
					if( doLog ) console.log('   file.name:', file.name)
					this.filenames.push( file.name )
				})

				if( doLog ){
					console.groupEnd()
				}
			},
			onFileChange( e, doLog = true ){
				// groupCollapsed group
				if( doLog ){
					console.groupCollapsed( this.$options.name, '• onFileChange()' )
					console.log('e:', e)
					console.groupEnd()
				}
			},
			setValueDebounced : debounce( function( rowIndex, key, value ){
				//console.log('debounce', rowIndex, key, value)
				this.doc.setValue( rowIndex, key, value, false )
			}, 250),
			copyAndApplyValue( activeRowIndex, field, doLog = false ){
				const value = this.doc.getValueByKey( activeRowIndex, field.key )

				// groupCollapsed group
				if( doLog ){
					console.groupCollapsed( this.$options.name, '• copyAndApplyValue( activeRowIndex, field )' )
					console.log('activeRowIndex:', activeRowIndex)
					console.log('field:', field)
					console.log('value:', value)
					console.groupEnd()
				}

				// walk the rows
				// set the given field value to all other rows
				for( let rowIndex = 0; rowIndex < this.doc.countDataRows; rowIndex++ ){
					console.log('rowIndex:', rowIndex)
					this.doc.setValue( rowIndex, field.key, value, true )
				}
			},
			setMaxItems( fieldKey, newMaxItems ){
				this.maxItems[fieldKey] = newMaxItems
			}
		},
		created(){},
		mounted(){},
		destroyed(){},
	}
</script>

<style lang="less">
	@import (reference) "../../less/vars.less";
	@import (reference) "../../less/mixins.less";
	@import (reference) "../../less/atoms.less";

	.DocEditForm { // debug
		[showBorders2] & {}
	}
	.DocEditForm { // layout
		//
	}
	.DocEditForm { // styling
		&__copyButton {
			margin-left: 0.5em;
		}
	}
    .DocEditForm { // fade transition between rows
         .fade-enter-active, .fade-leave-active {
          transition: opacity .35s ease-in-out;
        }
        .fade-enter, .fade-leave-to {
          opacity: 0;
        }
    }

	.activateSelect {
		position: relative;
		width: 100%;
		min-height: 10em;

		&--isVisible {
			opacity: 1;
		}
		&--isHidden &__overlay {
			opacity: 0;
			pointer-events: none;
		}

		&__overlay {
			@inset : 0px;

			position: absolute;
			top: @inset; left: @inset; right: @inset; bottom: @inset;
			background-color: fade( white, 75 );
			background-color: @swatches[primaryLighter];
			border: 1px solid @swatches[primary];
			border-radius: 3px;
			transition: opacity 0.2s ease;

			display: flex;
			justify-content: center;
			align-items: center;

			&Gui { padding-top: 2em; text-align: center; }
			p { color: @swatches[primary]; }
			.BaseButton { margin-top: 0.5em; }
		}

	}

	// MhForms overrides
	.SelectRow {
		.BaseSelect {
			&__select { padding-right: 5.5em; }
		}
	}

	// TODO: zu BaseSelect übernehmen
	.BaseSelect {
		&--isDisabled .BaseSelect__inner {
			border-style: dashed;
			background-color: fade( black, 3 );
		}
		&--isDisabled {
			opacity: 0.85;
		}
	}

	// es gibt sehr lange options,
	// damit diese komplett sichtbar sind,
	// wird hier ein text-umbruch ermöglicht
	.BaseSelect--isMultiple {
		overflow: hidden;

		.BaseSelect__optionsItem {
			height: auto;
			min-height: 2em;
			white-space: initial;
			padding-top: 5px;
			padding-bottom: 5px;
		}
	}

	@media @mq[xs] {}
	@media @mq[sm] {}
	@media @mq[md] {}
	@media @mq[dt] {}
	@media @mq[lg] {}
	@media @mq[xl] {}
</style>
