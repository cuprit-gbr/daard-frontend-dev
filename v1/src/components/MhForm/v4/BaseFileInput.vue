<!--

	Die Componente ist ein Wrapper im input[type=file]

	Welche props gibt es?
		isDisabled			Boolean		false
		isOutlined			Boolean		false
		fileSelectedText	String		'{filename} selected ({size} MB)'
		filesSelectedText	String		'{count} files selected ({size} MB)'
		accept				String		''
		multiple			Boolean		false

	Welche events gibt es?
		change				returns event
		input 				returns value as FileList

	Beispiel Code:
		<BaseFileInput>
			Hello World
		</BaseFileInput>

		<BaseFileInput>
			<template slot="before">Hello</template>
			<template slot="default">World</template>
			<template slot="after">
				<BaseIcon type="arrow-right"></BaseIcon>
			</template>
		</BaseFileInput>

	❌ Todo:
		Naming Konsistenz: die props isDisabled und isOutlined sollten besser
			disabled und outlined heißen. damit wäre ihr naming konsitent zu
			den html-attributen multiple, disabled usw.
		Handle overflow and wrapping behaviour
			white-space: nowrap; overflow: hidden;
			text-overflow: ellipsis;

	Changelog
		2021-07-25	init

-->

<template>
	<div class="BaseFileInput" name="BaseFileInput" :class="elmClasses">
		<span class="BaseFileInput__inner">

			<span  class="BaseFileInput__slot BaseFileInput__slot--before">
				<slot name="before"></slot>
			</span>
			<span  class="BaseFileInput__slot BaseFileInput__slot--text">
				<template v-if="files.length">
					<span v-html="labelText"></span>
				</template>
				<template v-else>
					<slot></slot>
				</template>
			</span>
			<span  class="BaseFileInput__slot BaseFileInput__slot--after">
				<slot name="after"></slot>
			</span>

			<input class="BaseFileInput__input"
					type="file"
					@change="change"
					:accept="accept"
					:multiple="multiple"
					:disabled="isDisabled"
			/>
		</span>
	</div>
</template>

<script>
	// @ is an alias to /src
	//import DevInfos from '@/components/DevInfos.vue'
	//import { EventBus } from '../../event-bus.js'

	export default {
		name: 'BaseFileInput',
		components: {},
		mixins: [],
		props: {
			isDisabled: {
				type	 : [Boolean],
				default  : false,
				required : false,
			},
			isOutlined: {
				type	 : [Boolean],
				default  : false,
				required : false,
			},
			fileSelectedText: {
				type: [String],
				default: '{filename} selected ({size} MB)'
			},
			filesSelectedText: {
				type: [String],
				default: '{count} files selected ({size} MB)'
			},
			accept: {
				type: [String],
				default: ''
			},
			multiple: {
				type: [Boolean],
				default: false,
			},
		},
		data(){
			return {
				files : [],
			}
		},
		watch: {},
		computed: {
			app(){
				return this.$root.$children[0]
			},
			elmClasses(){
				let classes = []

				if( this.isDisabled ) classes.push( this.$options.name + '--isDisabled' )

				if( this.isOutlined ) classes.push( this.$options.name + '--isOutlined' )
				else classes.push( this.$options.name + '--isFilled' )

				return classes
			},
			labelText(){ // kann je nachdem ob und wieviele files selected wurden variieren
				const countFiles = this.files.length
				const filename   = countFiles ? this.files[0].name : ''
				let   text       = ''
				let   sizeMB     = 0

				// addiere alle filesizes zu sizeMB
				this._.forEach( this.files, file=>{
					const kb = file.size/1000
					const mb = kb/1024

					sizeMB = this._.round( sizeMB + mb, 2 )
				})

				if( countFiles == 1 ){
					text = this.fileSelectedText
					text = text.replace('{size}', sizeMB)
					text = text.replace('{filename}', filename)
				}
				if( countFiles > 1 ){
					text = this.filesSelectedText
					text = text.replace('{size}', sizeMB)
					text = text.replace('{count}', countFiles)
				}

				return text
			},
		},
		methods: {
			change( event, doLog = false ) {
				const elm   = event.target
				const files = elm.files

				if( doLog ){
					console.group(this.$options.name + ' • change()')
					console.log('event:', event )
					console.log('  elm:', elm )
					console.log('files:', files )
					console.groupEnd()
				}

				this.files = elm.files

				this.emit( event )
			},
			emit( event, doLog = false ) {
				if( doLog ){
					console.log(this.$options.name + ' • emit()', event )
				}

				this.$emit('input', this.files)
				this.$emit('change', event)
			},
		},
		created(){},
		mounted(){},
		destroyed(){},
	}
</script>

<style lang="less">
	//@import (reference) "../../less/vars.less";
	//@import (reference) "../../less/mixins.less";
	//@import (reference) "../../less/atoms.less";

	.BaseFileInput { // vars
		--transition : all 0.15s ease;

		--height	   : 30px;
		--paddingLeft  : 0.85em;
		--paddingRight : 0.85em;

		--fontFamily   : inherit;
		--fontWeight   : inherit;

		--borderRadius : 15px;
		--borderWidth  : 2px;
		--borderStyle  : solid;
		--borderColor  : blue;

		--filled-bgColor	 : blue;
		--filled-textColor   : white;
		--outlined-bgColor   : fade( blue, 10 );
		--outlined-textColor : blue;

		--hover-color			: darken( blue, 5 );
		--hover-outlined-bgColor : fade( blue, 20 );

		--active-outlined-bgColor : fade( blue, 30 );
		--active-transform : translateY(2px);
	}
	.BaseFileInput { // debug
		[showBorders2] & {}

		&__inner > * {
			//outline: 1px solid red;
			//background-color: fade( red, 25 );
		}
	}
	.BaseFileInput { // layout
		height: var(--height);
		display: inline-block;
		overflow: hidden;

		&__inner {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 100%;
			//overflow: hidden; // musste raus, da in firefox ansonsten das input[type=file] nicht klickbar war
		}
		&__slot {
			//display: none !important;
			display: flex;
			max-height: 100%;
		}
		&__slot:empty { display: none; }
		&__slot--text { flex-grow: 1; }
		&__slot--text {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		&__input {
			position: absolute;
			top: 0; left: 0; right: 0; bottom: 0;
			opacity: 0;
			z-index: 1;
			cursor: pointer;
			overflow: hidden;

			&::-webkit-file-upload-button {
				cursor: pointer;
			}
		}

	}
	.BaseFileInput { // styling
		outline: none;
		border: none;
		background-color: transparent;
		font-family: var(--fontFamily);
		font-weight: var(--fontWeight);
		line-height: 1em; //var(--height); // this v-centers the text
		user-select: none;
		overflow: visible; // needed for not cutting the :active translateY style
		cursor: pointer;

		&__inner {
			transition: var(--transition);
			border-radius: var(--borderRadius);
			padding-left: var(--paddingLeft);
			padding-right: var(--paddingRight);
		}

		&__slot--text { justify-content: center; }
		&__slot--before { transform: translateX( -0.25em ); padding: 0 0.25em; }
		&__slot--after { transform: translateX( 0.25em ); padding: 0 0.25em; }

		&--isFilled &__inner { background-color: var(--filled-bgColor); }
		&--isFilled { color: var(--filled-textColor); }

		&--isOutlined &__inner { background-color: var(--outlined-bgColor); border: var(--borderWidth) var(--borderStyle) var(--borderColor); }
		&--isOutlined { color: var(--outlined-textColor); }

		&--isDisabled { opacity: 0.5; pointer-events: none; }
		&--isOutlined&--isDisabled &__inner { background-color: none; border-style: dotted; }

		&:hover&--isFilled &__inner { background-color: var(--hover-color); }

		&:hover&--isOutlined &__inner { background-color: var(--hover-outlined-bgColor); border-color: var(--hover-color); }
		&:hover&--isOutlined { color: var(--hover-color); }

		&:active &__inner { transform: var(--active-transform); }
		&:active&--isOutlined &__inner { background-color: var(--active-outlined-bgColor); }
	}

	//@media @mediaQueries[xs] {}
	//@media @mediaQueries[sm] {}
	//@media @mediaQueries[md] {}
	//@media @mediaQueries[dt] {}
	//@media @mediaQueries[lg] {}
	//@media @mediaQueries[xl] {}
</style>
