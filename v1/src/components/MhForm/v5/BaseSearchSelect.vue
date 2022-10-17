<!--

	Die Componente dient als Wrapper für <select></select>-Elemente.

	Props:
		value		String	Wird als value des Selects verwendet
		placeholder String	Die Handlungsanweisung an den User sofern noch keine valide value vorhanden ist
		options		Array	Alle Options aus denen der User wählen kann

	Events:
		@input		String	Returns new value
		@change		Object	Returns change event

	Markup:
		<BaseSearchSelect
			:value="'Heiko'"
			:placeholder="'Choose ...'"
			:options="[
				'Mario',
				'Heiko',
				'Silvio'
			]"
			:hasClearButton="false"
			@input="(value)=>{}"
			@change="(e)=>{}"
		></BaseSearchSelect>

		<BaseSearchSelect
			:value="'Heiko'"
			:placeholder="'Choose ...'"
			:options="[
				{ label : 'Mario',  value : 'mario', aliases : ['oldest', 'tallest'] },
				{ label : 'Heiko',  value : 'heiko', aliases : [] },
				{ label : 'Silvio', value : 'silvio', aliases : ['youngest'] },
			]"
			:hasClearButton="false"
			@input="(value)=>{}"
			@change="(e)=>{}"
		></BaseSearchSelect>

	Changelog
		2022-10-10	init

-->

<template>
	<div class="BaseSearchSelect FormField FormField--BaseSearchSelect" :class="elmClasses" v-click-outside="onClickOutside">
		<div class="BaseSearchSelect__inner FormField__inner">
			<div class="BaseSearchSelect__bg FormField__bg"></div>
			<div class="BaseSearchSelect__selectedOptionLabel FormField__selectedOptionLabel"
				:class="{'BaseSearchSelect__select--isUnset FormField__selectedOptionLabel--isUnset' : !_.get( selectedOption, 'label')}"
				v-html="_.get( selectedOption, 'label', this.placeholder )"
				@click="onClickSelectedOption"
				tabIndex="0"
				@keydown="onSelectedOptionLabelKeydown"
			></div>
			<svg class="BaseSearchSelect__clearBtn FormField__clearBtn"
					v-if="_.get( selectedOption, 'label' ) && hasClearButton"
					@click="onClickClearBtn"
					viewBox="0 0 20 20"
					aria-hidden="true"
					fill="none" xmlns="http://www.w3.org/2000/svg">
				<path 	fill-rule="evenodd"
						clip-rule="evenodd"
						d="M20 10.1421C20 15.6649 15.5228 20.1421 10 20.1421C4.47715 20.1421 0 15.6649 0 10.1421C0 4.61924 4.47715 0.14209 10 0.14209C15.5228 0.14209 20 4.61924 20 10.1421ZM5.899 14.5264C5.50848 14.1359 5.50848 13.5027 5.899 13.1122L8.62636 10.3848L5.89889 7.65738C5.50836 7.26685 5.50836 6.63369 5.89889 6.24316C6.28941 5.85264 6.92258 5.85264 7.3131 6.24316L10.0406 8.97063L12.9701 6.04114C13.3606 5.65061 13.9938 5.65061 14.3843 6.04114C14.7748 6.43166 14.7748 7.06483 14.3843 7.45535L11.4548 10.3848L14.3842 13.3142C14.7747 13.7048 14.7747 14.3379 14.3842 14.7284C13.9936 15.119 13.3605 15.119 12.97 14.7284L10.0406 11.7991L7.31322 14.5264C6.92269 14.9169 6.28953 14.9169 5.899 14.5264Z"
				/>
			</svg>
			<svg class="FormField__openIcon"
					viewBox="0 0 20 20"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
				<path d="M10 16L3.0718 7L16.9282 7L10 16Z" />
			</svg>
			<div class="BaseSearchSelect__border FormField__border"></div>
		</div>

		<div class="BaseSearchSelect__dropdownWrapper FormField__dropdownWrapper" v-show-slide="showDropdownWrapper">
			<div class="BaseSearchSelect__bg FormField__bg"></div>

			<div class="BaseSearchSelect__searchWrapper FormField__searchWrapper">
				<input class="BaseSearchSelect__searchWrapperInput"
					type="text"
					placeholder="Search ..."
					v-model="searchString"
					ref="searchInput"
					spellcheck="false"
					@keydown="onSearchInputKeydown"
				/>
				<div class="BaseSearchSelect__searchWrapperCounter" v-html="counterString"></div>
				<div class="BaseSearchSelect__searchWrapperBorder"></div>
			</div>

			<div class="BaseSearchSelect__optionsWrapper FormField__optionsWrapper" ref="optionsWrapper">
				<div class="BaseSearchSelect__optionsWrapperOption FormField__optionsWrapperOption"
					v-for="(option, index) in filteredOptions" :key="'o' + index"
					:index="index"
					:class="{
						'BaseSearchSelect__optionsWrapperOption--selected' : option.value === model,
						'BaseSearchSelect__optionsWrapperOption--preSelected' : index === preSelectedOptionIndex,
					}"
					@click="onClickOption( $event, option )">
					<div class="BaseSearchSelect__optionsWrapperOptionBg"></div>
					<span class="BaseSearchSelect__optionsWrapperOptionLabel" v-html="option.label"></span>
					<div class="BaseSearchSelect__optionsWrapperOptionBorder"></div>
				</div>
				<div class="BaseSearchSelect__optionsWrapperOption BaseSearchSelect__optionsWrapperOption--noResultsMsg"
					v-if="searchString && !filteredOptions.length && internalOptions.length">
					<!--
					<MhIcon
						class="BaseSearchSelect__optionsWrapperOptionIcon"
						:type="'info'"
						:isSpinning="false"
					></MhIcon>
					-->
					<span class="BaseSearchSelect__optionsWrapperOptionLabel" v-html="noResultsMsg"></span>
				</div>
			</div>

			<div class="BaseSearchSelect__border FormField__border"></div>
		</div>

		<template v-if="debug">
			<pre name="value">{{value}}</pre>
			<pre name="options">{{options}}</pre>
			<pre name="model">{{model}}</pre>
			<pre name="isValid">{{isValid}}</pre>
			<pre name="searchString">{{searchString}}</pre>
			<pre name="preSelectedOptionIndex">{{preSelectedOptionIndex}}</pre>
			<pre name="internalOptions">{{internalOptions}}</pre>
		</template>
	</div>
</template>

<script>
	import clickOutside from './directives/clickOutside.directive.js'

	// taken from https://stackoverflow.com/a/45411081/7899788
	function scrollParentToChild( parent, child ){

		// Where is the parent on page
		var parentRect = parent.getBoundingClientRect()
		// What can you see?
		var parentViewableArea = {
			height: parent.clientHeight,
			width: parent.clientWidth
		};

		// Where is the child
		var childRect = child.getBoundingClientRect()
		// Is the child viewable?
		var isViewable = (childRect.top >= parentRect.top) && (childRect.bottom <= parentRect.top + parentViewableArea.height);

		// if you can't see the child try to scroll parent
		if (!isViewable) {
				// Should we scroll using top or bottom? Find the smaller ABS adjustment
				const scrollTop = childRect.top - parentRect.top;
				const scrollBot = childRect.bottom - parentRect.bottom;
				if (Math.abs(scrollTop) < Math.abs(scrollBot)) {
					// we're near the top of the list
					parent.scrollTop += scrollTop;
				} else {
					// we're near the bottom of the list
					parent.scrollTop += scrollBot;
				}
		}

	}

	export default {
		name: 'BaseSearchSelect',
		components: {},
		mixins: [],
		directives: { clickOutside },
		props: {
    		value: {
      			type: [String, Number, Array, Boolean],
      			default: '',
    		},
    		placeholder: {
      			type: [String, Number, Boolean],
      			default: 'Choose ...',
    		},
    		options: {
      			type: [Array],
      			default: function(){ return [] },
    		},
			disabled: {
				type: [String, Boolean],
				default: false,
			},
			hasClearButton: {
				type: [String, Boolean],
				default: false,
			},
			noResultsMsg: {
				type: [String],
				default: 'no results found',
			},
			debug: {
				type: [Boolean],
      			default: false,
    		},
    	},
		data() {
			return {
				model                   : '',
				internalOptions         : [],
				showDropdownWrapper     : false,
				searchString            : '',
				preSelectedOptionIndex  : null, // mit dem keyboard vorausgewählt
			}
		},
		watch: {
			value: {
				// watch prop value and set to model
				// this is needed to react on model changes from outside
				handler: function( to, from ) {
					//if( this._.isEqual( to, from ) ) return
					//console.log('watcher value', from, to)

					this.model = to
					//this.model = this.isValid ? this.value : ''
				},
				immediate: true,
			},
			options: {
				// watch prop options and set internalOptions
				// this is needed to react on options changes from outside
				handler: function( to, from ) {
					//if( this._.isEqual( to, from ) ) return
					//console.log('watcher options', from, to)

					this.setInternalOptions()
					//this.model = this.isValid ? this.value : ''
				},
				immediate: true,
				deep: true
			},
			showDropdownWrapper: {
				handler: function( to, from ) {
					setTimeout(()=>{
						if( to ){
							if( this.$refs.searchInput ) this.$refs.searchInput.focus()
						}
						else{
							if( this.$refs.searchInput ) this.$refs.searchInput.blur()
							this.searchString = ''
							this.preSelectedOptionIndex = null
						}
					}, 75)
				},
				immediate: false,
			},
		},
		computed: {
			elmClasses(){
				let classes = []

				if( this.required ) classes.push( this.$options.name + '--isRequired' )
				if( this.required ) classes.push( 'FormField--isRequired' )

				if( this.disabled ) classes.push( this.$options.name + '--isDisabled' )
				if( this.disabled ) classes.push( 'FormField--isDisabled' )

				if( this.hasClearButton ) classes.push( this.$options.name + '--hasClearButton' )
				if( this.hasClearButton ) classes.push( 'FormField--hasClearButton' )

				if( this.isValid ) classes.push( this.$options.name + '--isValid ' + 'FormField--isValid' )
				else classes.push( this.$options.name + '--isInvalid ' + 'FormField--isInvalid' )

				return classes
			},
			selectedOption(){
				const option = this._.find( this.internalOptions, { value : this.model } )
				return option
			},
			filteredOptions(){
				let allOptions = this.internalOptions
				let filteredOptions = []
				const searchString = this._.trim( this.searchString ).toLowerCase()

				this._.forEach( allOptions, (o)=>{
					// there is a searchString: check matches
					if( searchString ){
						let matches = false

						// check the label
						if( o.label.toLowerCase().includes( searchString ) ) matches = true
						// check the aliases
						this._.forEach( o.aliases, (a)=>{ if( a.toLowerCase().includes( searchString ) ) matches = true })

						if( matches ) filteredOptions.push( o )
					}
					// no search: just take the option
					else{
						filteredOptions.push( o )
					}
				})

				return filteredOptions
			},
			counterString(){
				return this.filteredOptions.length + ' / ' + this.internalOptions.length
			},
			isValid(){ // die value muss entweder leer sein oder in den options vorkommen
				let allOptions = this.internalOptions
				let isValid = false

				// valid if value and model are both empty
				if( this._.isEmpty( this.value ) && this._.isEmpty( this.model ) ) isValid = true

				// valid if model is in options
				this._.forEach( allOptions, (o)=>{
					if( o.value === this.model ) isValid = true
				})

				return isValid
			},
		},
		methods: {
			emit( e ){ // emit input (values only) and change (e)
				const returnValue = this.model

				this.$emit('change', e)
				this.$emit('input', returnValue) // this changes parent v-model
			},
			setInternalOptions(){
				const selectedValues      = this.value
				const options             = this.options
				this.internalOptions      = []

				options.forEach((item) => {
					//console.log('item:', item)

					const newItem = {
						label   : this._.get( item, 'label', item ),
						value   : this._.get( item, 'value', item ),
						aliases : this._.get( item, 'aliases', [] ),
					}
					this.internalOptions.push( newItem )
				})
			},
			doSelectOption( option ){
				this.model = option.value

				this.$emit('change', this.model)
				this.$emit('input', this.model) // this changes parent v-model
			},
			onSelectedOptionLabelKeydown( e ){
				const keyCode = e.code

				console.log( this.$options.name, '• onSelectedOptionLabelKeydown( e )', e)

				if( 'Space' === keyCode ) this.onClickSelectedOption( e )
			},
			onClickSelectedOption( e ){
				console.log( this.$options.name, '• onClickSelectedOption( e )', e)

				this.showDropdownWrapper = !this.showDropdownWrapper
			},
			onClickOption( e, option ){
				console.log( this.$options.name, '• onClickOption( e, option )')

				this.showDropdownWrapper = false

				this.doSelectOption( option )
			},
			onSearchInputKeydown( e ){
				const keyCode = e.code

				//console.log( this.$options.name, '• onSearchInputKeydown( e )', e)

				if( 'ArrowUp' === keyCode ){
					this.preSelectedOptionIndex = this._.isNull( this.preSelectedOptionIndex ) ? 0 : this.preSelectedOptionIndex-1
					if( this.preSelectedOptionIndex < 0 ) this.preSelectedOptionIndex = 0

					const optionsWrapperElm = this.$refs.optionsWrapper
					const optionElm = optionsWrapperElm.querySelector('[index="'+this.preSelectedOptionIndex+'"]')
					//console.log('optionsWrapperElm:', optionsWrapperElm)
					//console.log('optionElm:', optionElm)
					//optionElm.scrollIntoView({behavior: 'smooth'})
					if( optionsWrapperElm && optionElm) scrollParentToChild( optionsWrapperElm, optionElm )

					e.preventDefault()
				}
				if( 'ArrowDown' === keyCode ){
					this.preSelectedOptionIndex = this._.isNull( this.preSelectedOptionIndex ) ? 0 : this.preSelectedOptionIndex+1
					if( this.preSelectedOptionIndex > this.filteredOptions.length-1 ) this.preSelectedOptionIndex = this.filteredOptions.length-1

					const optionsWrapperElm = this.$refs.optionsWrapper
					const optionElm = optionsWrapperElm.querySelector('[index="'+this.preSelectedOptionIndex+'"]')
					//console.log('optionsWrapperElm:', optionsWrapperElm)
					//console.log('optionElm:', optionElm)
					//optionElm.scrollIntoView({behavior: 'smooth'})
					if( optionsWrapperElm && optionElm) scrollParentToChild( optionsWrapperElm, optionElm )

					e.preventDefault()
				}
				if( 'Enter' === keyCode || 'Space' === keyCode ){
					const optionToSelect = this._.get( this.filteredOptions, '['+this.preSelectedOptionIndex+']' )

					if( optionToSelect ){
						this.doSelectOption( optionToSelect )
						this.showDropdownWrapper = false
					}

					e.preventDefault()
				}
				if( 'Escape' === keyCode ){
					this.showDropdownWrapper = false

					e.preventDefault()
				}
			},
			onClickOutside( e ){
				if( this.showDropdownWrapper ) this.showDropdownWrapper = false
			},
			onClickClearBtn( e ){
				//console.log('BaseText onClickClearBtn')
				this.model = ''
				this.emit( e )
			},
		},
		created(){},
		mounted(){},
	}
</script>

<style lang="less">
	.BaseSearchSelect { // vars
		--height : 2em;
	}

	.BaseSearchSelect {  // debug styling
	}

	.BaseSearchSelect { // layout + styling
		&__dropdownWrapper {
			position: relative;
			margin-top: 3px;
		}

		&__searchWrapper {
			position: relative;

			&Border {
				position: absolute;
				bottom: 0; left: 0; right: 0;
				border-bottom: 1px solid var(--borderColor);
				opacity: var(--borderOpacity);
			}
			&Input {
				padding: 0 var(--padding);
				height: var(--height);
				width: 100%;
				border: none;
				outline: none;
				color: inherit;
				font-family: inherit;
				font-size: inherit;
				font-weight: inherit;

				&::placeholder { color: inherit; opacity: 0.5; }
			}
			&:focus-within &Border { opacity: 1; }
			&Counter {
				//background-color: fade( red, 20 );
				position: absolute;
				top: 0; bottom: 0; right: 0;
				display: flex;
				align-items: center;
				padding: 0 var(--padding);
				opacity: 0.75;
			}
		}

		&__optionsWrapper {
			//background-color: fade( green, 20 );
			position: relative;
			max-height: calc( var(--height) * 6 );
			min-height: calc( var(--height) * 2 );
			overflow-x: hidden;
			overflow-y: auto;
			scroll-behavior: smooth;

			&Option {
				transition: all 0.1s ease;
				position: relative;
				display: flex;
				align-items: center;
				height: var(--height);
				padding: 0 var(--padding);
				cursor: pointer;
				user-select: none;

				&Border {
					transition: inherit;
					position: absolute;
					bottom: 0; left: 0; right: 0;
					border-bottom: 1px solid var(--borderColor);
					opacity: 0.25;
				}
				&Bg {
					transition: inherit;
					position: absolute;
					top: 0; bottom: 0; left: 0; right: 0;
					background-color: currentColor;
					pointer-events: none;
					opacity: 0;
				}
				&Label {
					transition: inherit;
					position: relative;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				&:hover:not(&--selected) &Bg { opacity: 0.2; }
				&--preSelected:not(&--selected) &Bg { opacity: 0.2; }
				&--selected &Bg { background-color: currentColor; opacity: 0.85; }
				&--selected &Label { color: white; }
			}
			&Option--noResultsMsg {
				opacity: 0.35;
			}
			&Option--noResultsMsg &OptionIcon {
				--stroke-width: 1;
				margin-right: 0.25em;
			}
		}
	}

	.BaseSearchSelect { // hover
	}
	.BaseSearchSelect { // focus
	}
	.BaseSearchSelect { // disabled
	}
</style>
