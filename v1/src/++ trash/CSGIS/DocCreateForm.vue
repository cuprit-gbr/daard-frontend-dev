<!--

	Was macht diese Componente?
	Wofür ist die Compoente da?

	Welche $props gibt es?

	Beispiel Code:
		<DocCreateForm></DocCreateForm>

	2021-07-05	init

-->

<template>
	<div class="DocCreateForm" name="DocCreateForm" :class="elmClasses">
		<div class="DocCreateForm__inner">

			<br/><br/>

			<HeaderRow
				title="Cumulus-Metadaten-Generator"
				:isCloseable="false"
			></HeaderRow>
			<TextRow>
				Mit Hilfe des CSV-Validators des Landesamtes für Denkmalpflege können
				Sie Ihre CSV-Listen gegen unsere Vorlagen validieren. Benutzen Sie dazu
				bitte die jeweils aktuellen Browserversionen von Google Chrome,
				Mozilla Firefox oder Microsoft Edge. Ältere Browser können unter
				Umständen Probleme bei der Darstellung der Inhalte haben.
				Eingeschaltetes JavaScript ist erforderlich.
			</TextRow>
			<WizardRow></WizardRow>

			<!--
			<DevDocTable :doc="app.doc"></DevDocTable>
			-->

			<br/><br/>

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
	import TextRow from './TextRow.vue'
	import WizardRow from './WizardRow.vue'
	import DevDocTable from './DevDocTable.vue'

	export default {
		name: 'DocCreateForm',
		components: {
			HeaderRow,
			TextRow,
			WizardRow,
			DevDocTable,
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
		methods: {},
		created(){},
		mounted(){},
		destroyed(){},
	}
</script>

<style lang="less">
	@import (reference) "../../less/vars.less";
	@import (reference) "../../less/mixins.less";
	@import (reference) "../../less/atoms.less";

	.DocCreateForm { // debug
		[showBorders2] & {}
	}
	.DocCreateForm { // layout
		//
	}
	.DocCreateForm { // styling
		//
	}

	@media @mq[xs] {}
	@media @mq[sm] {}
	@media @mq[md] {}
	@media @mq[dt] {}
	@media @mq[lg] {}
	@media @mq[xl] {}
</style>
