<!--

	Was macht diese Componente?
	Wofür ist die Compoente da?

	Welche $props gibt es?
		tag				String		"button"
		isDisabled		Boolean		false
		isOutlined		Boolean		false

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

	2021-07-05	init

-->

<template>
	<div class="BaseButton" name="BaseButton" :is="tag" :disabled="isDisabled" :class="elmClasses">
		<span class="BaseButton__inner">
			<span class="BaseButton__slot BaseButton__slot--before"><slot name="before"></slot></span>
			<span class="BaseButton__slot BaseButton__slot--text"><slot></slot></span>
			<span class="BaseButton__slot BaseButton__slot--after"><slot name="after"></slot></span>
		</span>
	</div>
</template>

<script>
	// @ is an alias to /src
	//import DevInfos from '@/components/DevInfos.vue'
	//import EventBus from '../../event-bus.js'

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
			isDisabled: {
				type	 : [Boolean],
				default  : false,
				required : false,
			},
			isOutlined: {
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

	.BaseButton { // vars
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
	.BaseButton { // debug
		[showBorders2] & {}

		&__inner > * {
			//outline: 1px solid red;
			//background-color: fade( red, 25 );
		}
	}
	.BaseButton { // layout
		height: var(--height);
		display: inline-block;
		overflow: hidden;

		&__inner {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 100%;
		}
		&__slot {
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
	}
	.BaseButton { // styling
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

	//@media @mq[xs] {}
	//@media @mq[sm] {}
	//@media @mq[md] {}
	//@media @mq[dt] {}
	//@media @mq[lg] {}
	//@media @mq[xl] {}
</style>
