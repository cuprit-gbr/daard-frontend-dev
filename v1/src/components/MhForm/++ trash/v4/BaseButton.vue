<!--

	Was macht diese Componente?
	Wofür ist die Compoente da?

	Welche $props gibt es?
		tag				String		"button"
		isDisabled		Boolean		false
		isOutlined		Boolean		false
		showSpinner     Boolean		false

	Beispiel Code:
		<BaseButton>
			Hello World
		</BaseButton>

		<BaseButton>
			<template slot="before">Hello</template>
			<template slot="default">World</template>
			<template slot="after">
				<BaseIcon type="arrow-right"></BaseIcon>
			</template>
		</BaseButton>

	Todo:
		Handle overflow and wrapping behaviour
			white-space: nowrap; overflow: hidden;
			text-overflow: ellipsis;
		Add Loading Spinner

	2022-01-31	bugfix: prop target is now handled
	2021-09-10	feature: added showSpinner prop
	2021-07-05	init

-->

<template>
	<div class="BaseButton" name="BaseButton" :is="tag" :href="href" :disabled="isDisabled" :target="target" :class="elmClasses">
		<span class="BaseButton__inner">
			<span class="BaseButton__slot BaseButton__slot--before"><slot name="before"></slot></span>
			<span class="BaseButton__slot BaseButton__slot--text"><slot></slot></span>
			<span class="BaseButton__slot BaseButton__slot--after"><slot name="after"></slot></span>
			<span class="BaseButton__slot BaseButton__slot--spinner">
				<slot name="spinner">
					<svg xmlns="http://www.w3.org/2000/svg"
						width="24" height="24" viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round">
							<line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
					</svg>
				</slot>
			</span>
		</span>
	</div>
</template>

<script>
	// @ is an alias to /src
	//import DevInfos from '@/components/DevInfos.vue'
	//import { EventBus } from '../../event-bus.js'

	export default {
		name: 'BaseButton',
		components: {},
		mixins: [],
		props: {
			tag: {
				type	 : [String],
				default  : 'button',
				required : false,
			},
			href: {
				type	 : [String, Boolean],
				default  : false,
				required : false,
			},
			target: {
				type	 : [String, Boolean],
				default  : false,
				required : false,
			},
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
			showSpinner: {
				type	 : [Boolean],
				default  : false,
				required : false,
			}
		},
		data(){
			return {}
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

				if( this.showSpinner ) classes.push( this.$options.name + '--showSpinner' )

				return classes
			},
		},
		methods: {},
		created(){},
		mounted(){},
		destroyed(){},
	}
</script>

<style lang="less">
	//@import (reference) "../../less/vars.less";
	//@import (reference) "../../less/mixins.less";
	//@import (reference) "../../less/atoms.less";

	.BaseButton { // css vars
		--transition   : all 0.15s ease;
		--height       : 2em;
		--paddingLeft  : 0.85em;
		--paddingRight : 0.85em;
		--fontFamily   : inherit;
		--fontWeight   : inherit;
		--borderRadius : 1em;

		--bgColor-filled          : lighten( blue, 10 );
		--bgColor-filled-hover    : darken( blue, 5 );
		--color-filled            : white;
		--color-filled-hover	  : white;

		--borderWidth-outlined    : 2px;
		--borderStyle-outlined    : solid;
		--borderColor-outlined    : blue;

		--bgColor-outlined        : fade( blue, 10 );
		--bgColor-outlined-hover  : fade( blue, 20 );
		--bgColor-outlined-active : fade( blue, 30 );
		--color-outlined          : blue;
		--color-outlined-hover    : darken( blue, 5 );

		--transform-active        : translateY(2px);
	}
	.BaseButton { // animation
		@keyframes spin {
			0% { transform: rotate(0); }
			100% { transform: rotate(360deg);  }
		}
	}

	.BaseButton { // layout
		height: var(--height);
		display: inline-block;
		overflow: hidden;

		&__inner {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 100%;
		}
		&__slot {
			display: flex;
			height: 100%;
			align-items: center;
		}
		&__slot--text {
			flex-grow: 1;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		&__slot--spinner {
			position: absolute;
			top: 0; left: 50%; bottom: 0;
			transform: translateX(-50%);
		}
		&__slot:empty {
			display: none;
		}
	}
	.BaseButton { // styling
		outline: none;
		border: none;
		background-color: transparent;
		line-height: 1em; //var(--height); // this v-centers the text
		user-select: none;
		font-family: var(--fontFamily);
		overflow: visible; // needed for not cutting the :active translateY style
		cursor: pointer;

		&__inner {
			padding-left: var(--paddingLeft);
			padding-right: var(--paddingRight);
			transition: var(--transition);
			border-radius: var(--borderRadius);
		}

		&__slot {
			font-family: var(--fontFamily);
			font-weight: var(--fontWeight);
			justify-content: center;
		}
		&__slot--text { justify-content: center; }
		&__slot--before { transform: translateX( -0.25em ); }
		&__slot--after { transform: translateX( 0.25em ); }
		&__slot--spinner { transition: var(--transition); opacity: 0; pointer-events: none; }

		&--showSpinner &__slot--spinner { opacity: 1; }
		&--showSpinner &__slot--spinner svg { animation: spin 0.75s linear infinite both; }
		&--showSpinner &__slot--before { opacity: 0; }
		&--showSpinner &__slot--text { opacity: 0; }
		&--showSpinner &__slot--after { opacity: 0; }
		&--showSpinner { pointer-events: none; }

		&--isFilled &__inner { background-color: var(--bgColor-filled); }
		&--isFilled { color: var(--color-filled); }

		&--isOutlined &__inner { background-color: var(--bgColor-outlined); border: var(--borderWidth-outlined) var(--borderStyle-outlined) var(--borderColor-outlined); }
		&--isOutlined { color: var(--color-outlined); }

		&--isDisabled { opacity: 0.5; pointer-events: none; }
		&--isOutlined&--isDisabled &__inner { background-color: none; border-style: dotted; }

		&:hover&--isFilled &__inner { background-color: var(--bgColor-filled-hover); }
		&:hover&--isFilled &__inner { color: var(--color-filled-hover); }

		&:hover&--isOutlined &__inner { background-color: var(--bgColor-outlined-hover); border-color: var(--color-hover); }
		&:hover&--isOutlined &__inner { color: var(--color-outlined-hover); }

		&:active &__inner { transform: var(--active-transform); }
		&:active&--isOutlined &__inner { background-color: var(--bgColor-outlined-active); }
	}
</style>
