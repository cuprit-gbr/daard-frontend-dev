<!--

	Was macht diese Componente?
	Wofür ist die Compoente da?

	Welche $props gibt es?

	Beispiel Code:
		<WizardRow></WizardRow>

	2021-07-05	init

-->

<template>
	<div class="WizardRow contentModule hSpace hSpace--formRow" name="WizardRow" :class="elmClasses">
		<div class="WizardRow__inner contentModule__inner">
			<div class="WizardRow__left">
                <div class="font font--sizeLarge font--bold">
                    Neue Befüllung beginnen
                </div>
                <div class="WizardRow__text">
                    Wählen Sie von der Festplatte die zubearbeitenden
                    Dateien aus. Danach wird eine leere Tabelle erzeugt
                    und zum Bearbeiten geöffnet.
                </div>
                <div>
                    <!--
					<BaseButton>
                        <template v-slot:before></template>
                        <template v-slot:default>Bilder auswählen ...</template>
                        <template v-slot:after>
                            <BaseIcon type="arrow-right"></BaseIcon>
                        </template>
                    </BaseButton>
					-->
					<!--
					<BaseFileInput
						:label="'Bilder auswählen ...'"
						:accept="'image/*'"
						:multiple="true"
						:disabled="false"
						@input="onSelectImageFiles"
					></BaseFileInput>
					-->
					<BaseFileInput
						:accept="'image/*'"
						:multiple="true"
						@input="onSelectImageFiles"
						@change="(e)=>{}">
						<template slot="before"></template>
						<template slot="default">Bilder auswählen ...</template>
						<template slot="after">
							<BaseIcon type="upload"></BaseIcon>
						</template>
					</BaseFileInput>
                </div>
            </div>
			<div class="WizardRow__middle WizardRow__orColumn">
                <span>oder</span>
            </div>
			<div class="WizardRow__right">
                <div class="font font--sizeLarge font--bold">
                    Befüllung fortsetzen
                </div>
                <div class="WizardRow__text">
                    Laden Sie eine zuvor erstellte CSV-Datei hoch
                    um mit der Befüllung fortzufahren.
                </div>
                <div>
                    <!--
					<BaseButton>
                        <template v-slot:before></template>
                        <template v-slot:default>CSV-Datei hochladen ...</template>
                        <template v-slot:after>
                            <BaseIcon type="arrow-right"></BaseIcon>
                        </template>
                    </BaseButton>
					-->
                    <!--
					<BaseFileInput
						:label="'CSV-Datei hochladen ...'"
						:accept="'.csv'"
						:multiple="false"
						:disabled="false"
						@input="onSelectCsvFile"
					></BaseFileInput>
					-->
					<BaseFileInput
						:accept="'.csv'"
						:multiple="false"
						@input="onSelectCsvFile"
						@change="(e)=>{}">
						<template slot="before"></template>
						<template slot="default">CSV-Datei hochladen ...</template>
						<template slot="after">
							<BaseIcon type="upload"></BaseIcon>
						</template>
					</BaseFileInput>
                </div>
            </div>
		</div>
	</div>
</template>

<script>
	// @ is an alias to /src
	//import DevInfos from '@/components/DevInfos.vue'
	import EventBus from './../../event-bus.js'
    import BaseButton from './BaseButton.vue'
    import BaseIcon from './BaseIcon.vue'

	import BaseFileInput from '/Users/Mario/Dropbox/htdocs/2020-09-17__MhForm/vue-cli-dev/src/components/MhForm/v3/BaseFileInput.vue'
	//import BaseFileInput from '/Users/Mario/Dropbox/htdocs/2020-09-17__MhForm/vue-cli-dev/src/components/MhForm/v2/BaseFileInput.vue'

	export default {
		name: 'WizardRow',
		components: {
            BaseButton,
            BaseIcon,
			BaseFileInput,
        },
		mixins: [],
		props: {},
		data(){
			return {}
		},
		watch: {
			someVar: {
				handler: function( to, from ) {
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
		},
		methods: {
			onSelectImageFiles( fileList, doLog = false ){
				const filenames = []

				// groupCollapsed group
				if( doLog ){
					console.groupCollapsed( this.$options.name, '• onSelectImageFiles()' )
					console.log('fileList:', fileList)
				}

				// walk the FileList and collect all filenames
				this._.forEach( fileList, (file)=>{
					if( doLog ) console.log('   file.name:', file.name)
					filenames.push( file.name )
				})

				if( doLog ){
					console.groupEnd()
				}

				// delete previously added data rows
				this.doc.emptyDataRows()

				// fill the doc: add filenames as data rows
				filenames.forEach((o)=>{
					this.doc.addDataRow({
						dateiname : o
					})
				})

				// switch to edit view
				this.$router.push({ name: 'EditView' })
			},
			onSelectCsvFile( fileList, doLog = true ){
				const file = fileList[0]

				// delete previously added data rows
				this.doc.emptyDataRows()

				// groupCollapsed group
				if( doLog ){
					console.groupCollapsed( this.$options.name, '• onSelectCsvFile()' )
					console.log('fileList:', fileList)
					console.log('file:', file)
				}
				if( doLog ){
					console.groupEnd()
				}

				// set config including callback function
				// https://www.papaparse.com/docs#config
				const papaParseConfig = {
					complete: ( result )=>{
						const rows      = result.data
						const headerRow = rows[0]
						rows.shift() // remove header row
						const bodyRows  = rows

						// walk the given rows
						// add them to doc
						bodyRows.forEach( (row, rowIndex)=>{
							let pairs = {}

							// walk the field for every row
							// and fill the pairs ( key : value )
							this.doc.fields.forEach( (field, fieldIndex)=>{
								pairs[field.key] = row[fieldIndex]
							})

							this.doc.addDataRow( pairs )
						})

						// switch to edit view
						this.$router.push({ name: 'EditView' })
					},
				}

				this.doc.parseCsv( file, papaParseConfig )
			},
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

	.WizardRow { // debug
		[showBorders2] & {}
        //&__inner > * { outline: 1px solid red; }
        //&__orColumn { background-color: fade( red, 25 ); }
	}
	.WizardRow { // layout
        &__inner { display: flex; justify-content: space-between; }
        &__inner > * { display: flex; flex-direction: column; }
        &__left { flex-basis: 0; flex-grow: 1; }
        &__center { flex-basis: 0; }
        &__right { flex-basis: 0; flex-grow: 1; }

        &__orColumn {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            justify-content: center;

            span { padding: 0.25em; }

            &:before, &:after {
                content: "";
                width: calc( 50% - 1px );
                border-right: 1px solid currentColor;
                flex-grow: 1;
            }
        }

        &__text {
            flex-grow: 1;
	    }
	}
	.WizardRow { // styling
        border-top: 1px solid @swatches[primary];
        border-bottom: 1px solid @swatches[primary];
        background-color: @swatches[whiteBg];
        margin-bottom: -1px;
        color: @swatches[primary];

        &__inner {
            padding-top: 13px;
            padding-bottom: 25px;
        }
        &__inner > * {
            padding: 0.5em 2em;
        }
        &__text {
            padding-top: 0.5em;
            padding-bottom: 1.5em;
        }
	}

	@media @mq[xs] {}
	@media @mq[sm] {}
	@media @mq[md] {}
	@media @mq[dt] {}
	@media @mq[lg] {}
	@media @mq[xl] {}
</style>
