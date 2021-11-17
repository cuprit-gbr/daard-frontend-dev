<!--

	Was macht diese Componente?
	Wofür ist die Compoente da?

	Welche $props gibt es?

	Beispiel Code:
		<SelectRow></SelectRow>

	2021-07-05	init

-->

<template>
	<div class="SelectRow contentModule" name="SelectRow" :class="elmClasses">
		<div class="SelectRow__inner hSpace hSpace--formRow contentModule__inner">
			<div class="SelectRow__label">
				<div class="font font--medium">Aktueller Datensatz</div>
				<div>1 / 52</div>
			</div>
			<div class="SelectRow__selectWrapper">
				<BaseSelect
					XXXv-model="BaseSelect2.model"
					:value="selectOptions[doc.activeRowIndex]"
					:label="'Choose ...'"
					:options="selectOptions"
					@input="onChangeActiveRow"
					XXXchange="onChangeActiveRow"
				></BaseSelect>
				<div class="SelectRow__currentIndexInfo">
					<template v-if="doc.dataRows.length">
						{{doc.activeRowIndex+1}}
					</template>
					<template v-else>
						{{doc.activeRowIndex}}
					</template>
					/ {{doc.dataRows.length}}
				</div>
			</div>
			<div class="SelectRow__btnsWrapper">
				<BaseButton
					:isOutlined="true"
					:isDisabled="!_.isNumber( doc.prevRowIndex )"
					@click.native="gotoRowIndex( doc.prevRowIndex )">
					<template v-slot:before>
						<BaseIcon type="arrow-left"></BaseIcon>
					</template>
					Vorheriger
				</BaseButton>
				<BaseButton
					:isOutlined="true"
					:isDisabled="!_.isNumber( doc.nextRowIndex )"
					@click.native="gotoRowIndex( doc.nextRowIndex )">
					Nächster
					<template v-slot:after>
						<BaseIcon type="arrow-right"></BaseIcon>
					</template>
				</BaseButton>
			</div>
		</div>

		<!--
		<pre name="selectOptions">{{selectOptions}}</pre>
		<pre name="doc.activeRowIndex">{{doc.activeRowIndex}}</pre>
		<pre name="doc.prevRowIndex">{{doc.prevRowIndex}}</pre>
		<pre name="doc.nextRowIndex">{{doc.nextRowIndex}}</pre>
		-->
	</div>
</template>

<script>
	// @ is an alias to /src
	//import DevInfos from '@/components/DevInfos.vue'
	import EventBus from '../../event-bus.js'

	import BaseSelect from '/Users/Mario/Dropbox/htdocs/2020-09-17__MhForm/vue-cli-dev/src/components/MhForm/v2/BaseSelect.vue'
	import BaseButton from './BaseButton.vue'
	import BaseIcon from './BaseIcon.vue'

	export default {
		name: 'SelectRow',
		components: {
			BaseSelect,
			BaseButton,
			BaseIcon,
		},
		mixins: [],
		props: {
			datasets: {
				type     : [Array, Boolean],
				default  : false,
				required : false,
			},
		},
		data(){
			return {
				stickyObserver : undefined
			}
		},
		watch: {},
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
			selectOptions(){
				const rows = this._.get( this.doc, 'dataRows', [] )
				const options = []

				rows.forEach((row, i)=>{
					const value = this.doc.getValueByIndex( i, 0 )

					options.push( value )
				})

				return options
			},
		},
		methods: {
			onChangeActiveRow( newValue, doLog = false ){
				const selectOptions = this.selectOptions
				let newActiveIndex = this._.indexOf( selectOptions, newValue )

				if( doLog ){
					console.groupCollapsed( this.$options.name, '• onChangeActiveRow()' )
					console.log('newValue:', newValue)
					console.log('selectOptions:', selectOptions)
					console.log('newActiveIndex:', newActiveIndex)
					console.groupEnd()
				}

				this.doc.activeRowIndex = newActiveIndex
			},
			gotoRowIndex( newRowIndex, doLog = false ){
				// groupCollapsed group
				if( doLog ){
					console.groupCollapsed( this.$options.name, '• gotoRowIndex( newRowIndex )',newRowIndex )
					console.log('newRowIndex:', newRowIndex)
					console.groupEnd()
				}

				this.doc.activeRowIndex = newRowIndex
			},
			handleScroll( doLog = true ){
				// groupCollapsed group
				if( doLog ){
					console.groupCollapsed( this.$options.name, '• handleScroll()' )
					//console.log('key:', value)
					console.groupEnd()
				}
			},
		},
		created(){},
		mounted(){
			// apply isSticky class via IntersectionObserver
			// taken from https://stackoverflow.com/a/57991537

			// define the observer
			this.stickyObserver = new IntersectionObserver(
				([e]) => e.target.classList.toggle('isSticky', e.intersectionRatio < 1),
				{threshold: [1]}
			);

			// apply the observer
			this.stickyObserver.observe( this.$el )
		},
		destroyed(){
			// remove the observer
			this.stickyObserver.unobserve( this.$el )
			this.stickyObserver = undefined
		},
	}
</script>

<style lang="less">
	@import (reference) "../../less/vars.less";
	@import (reference) "../../less/mixins.less";
	@import (reference) "../../less/atoms.less";

	.SelectRow { // debug
		[showBorders2] & {}

		/*
		&__label { background-color: fade( red, 10 );}
		&__selectWrapper { background-color: fade( green, 10 );}
		&__btnsWrapper { background-color: fade( blue, 10 );}
		*/
	}
	.SelectRow { // layout
		position: sticky;
		top: -1px; // needed for stickyObserver
		z-index: 10;
		padding-top: calc(0em + 1px);

		&__inner {
			.grid;
			.grid--colGap;
			.grid--cols-12;
			z-index: 11;
		}
		&__label {
			grid-column: 1 / span 7;
			display: flex;
			justify-content: space-between;
			display: none;
		}
		&__selectWrapper {
			position: relative;
			grid-column: 1 / span 7;
		}
		&__currentIndexInfo {
			position: absolute;
			top: 0; right: 0; bottom: 0;
		}
		&__btnsWrapper {
			grid-column: 8 / span 5;
			display: flex;
			justify-content: space-between;
		}
		&__btnsWrapper > * {
			width: calc( 50% - 5px );
		}
	}
	.SelectRow { // styling
		border-top: 1px solid @swatches[primary];
		border-bottom: 1px solid @swatches[primary];
		background-color: @swatches[whiteBg];
		//margin-bottom: -1px;
		color: @swatches[primary];
		//box-shadow: 0px 10px 10px -5px red;

		&:after { // shadow below
			position: absolute;
			left: 0; right: 0;
			bottom: -1px;
			height: 5px;
			transform: translateY(100%);
			background: linear-gradient(to bottom, fade(black, 30), fade(black, 0));
			opacity: 0.5;
			content: "";
			z-index: -10;
			pointer-events: none;
		}


		&__inner {
			transition: all 0.1s ease;
			padding-top: 13px;
			padding-bottom: 15px;
		}
		&.isSticky &__inner {
			//padding-top: 8px;
			//padding-bottom: 8px;
			background-color: @swatches[primaryLight];
		}

		&__currentIndexInfo {
			display: flex;
			align-items: center;
			padding-right: 2em;
			opacity: 0.5;
			pointer-events: none;
			user-select: none;
		}

		&__label {
			margin-bottom: 10px;
		}
	}

	@media @mq[xs] {}
	@media @mq[sm] {}
	@media @mq[md] {}
	@media @mq[dt] {}
	@media @mq[lg] {}
	@media @mq[xl] {}
</style>
