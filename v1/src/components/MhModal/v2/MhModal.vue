<!--

	Was macht diese Componente?
	Wofür ist die Compoente da?

	Welche $props gibt es?

	Beispiel Code:
		<MhModal :show="showTableModal" @close="showTableModal = false">
			<template slot="header">
				header
			</template>
			<template slot="closeButton">
				<span>close</span>
			</template>
			<template slot="body">
				body
			</template>
			<template slot="footer">
				footer
			</template>
		</MhModal>

	2021-07-23	improvement: added prop: closeOnEsc with default true
	2021-07-23	improvement: added optional slot: closeButton
	2021-07-23	improvement: added show/hide animations
	2021-07-23	improvement: refactor styling and added css-vars
	2021-07-23	improvement: besseres example
	2020-08-08	refactor, vereinfacht
	2019-06-08	init

-->

<template>
	<div class="MhModal" :class="elmClasses">
		<div class="MhModal__background" @click="close()"></div>
		<div class="MhModal__modal">
			<div class="MhModal__header">
				<div class="MhModal__headerInner">
					<div class="MhModal__headerInnerLeft"><slot name="header"></slot></div>
					<div class="MhModal__headerInnerRight" @click="close()">
						<template v-if="$slots.closeButton">
							<slot name="closeButton"></slot>
						</template>
						<template v-else>
							<span class="MhModal__closeButton" role="button" >×</span>
						</template>
					</div>
				</div>
			</div>
			<div class="MhModal__body">
				<div class="MhModal__bodyInner"><slot name="body"></slot></div>
			</div>
			<div class="MhModal__footer" v-if="$slots.footer">
				<div class="MhModal__footerInner"><slot name="footer"></slot></div>
			</div>
		</div>
	</div>
</template>

<script>
	// @ is an alias to /src
	//import EventBus from '@/helper/EventBus.js'

	export default {
		name: 'MhModal',
		components: {},
		mixins: [],
		props: {
			show: {
				type: Boolean,
				default: true,
			},
			closeOnEsc: {
				type: Boolean,
				default: true,
			},
		},
		data() {
			return {
				isVisible : undefined,
			}
		},
		watch: {
			'show': {
				handler: function( to, from ) {
					this.isVisible = to
					this.show = to
				},
				immediate: true,
			},
		},
		computed: {
			app() {
				return this.$root.$children[0]
			},
			elmClasses(){
				let classes = []

				if( this.isVisible ){
					classes.push('MhModal--isVisible')
				}else{
					classes.push('MhModal--isHidden')
				}

				return classes
			},
		},
		methods: {
			open(){
				this.isVisible = true
			},
			close(){
				this.isVisible = false
				this.$emit('close')
			},
			handleKeypress( e ){
				if( e.key == 'Escape' && this.closeOnEsc ) this.close()
			},
		},
		created(){
			window.addEventListener('keydown', this.handleKeypress);
		},
		mounted() {
			this.isVisible = this.show
		},
		destroyed(){
			window.removeEventListener('keydown', this.handleKeypress);
		},
	}
</script>

<style lang="less">
	//@import "../../less/vars.less";
	//@import "../../less/mixins.less";
	//@import (reference) "../../less/atoms.less";

	.MhModal { // vars
		--zIndex : 100;
		--modalMaxWidth : 650px;
		--modalBorderRadius : 0.5em;
		--modalBackgroundColor : white;
		--overlayBackgroundColor : fade(black, 35);
		--contentPadding : 1em;
	}
	.MhModal { // debug
	}
	.MhModal { // layout
		position: fixed;
		top: 0; left: 0; right: 0; bottom: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: var(--zIndex);

		&__background {
			position: absolute;
			top: 0; left: 0; right: 0; bottom: 0;
			background-color: yellow;
		}

		&__modal {
			position: relative;
			width: var(--modalMaxWidth);
			max-width: var(--modalMaxWidth);
			background-color: var(--modalBackgroundColor);

			display: flex;
			flex-direction: column;
			max-height: 90vh;
		}
		&__headerInner {
			display: flex;

			&Left { flex-grow: 1; }
		}
		&__header {
			position: relative;
		}
		&__body {
			position: relative;
			overflow: hidden;
			overflow-y: auto;
		}
		&__footer {
			position: relative;
		}
	}
	.MhModal { // styling
		&--isHidden {
			opacity: 0;
			pointer-events: none;
		}
		&--isVisible {
			opacity: 1;
			pointer-events: auto;
		}

		&__background {
			background-color: var(--overlayBackgroundColor);
		}
		&__modal {
			border-radius: var(--modalBorderRadius);
		}
		&__header::after { // border bottom
			position: absolute;
			bottom: 0; left: 0; right: 0;
			border-top: 1px solid currentColor;
			content: "";
			opacity: 0.35;
			z-index: 1;
		}
		&__footer::after { // border top
			position: absolute;
			top: 0; left: 0; right: 0;
			border-top: 1px solid currentColor;
			content: "";
			opacity: 0.35;
			z-index: 1;
		}
		&__headerInner,
		&__bodyInner,
		&__footerInner {
			padding: var(--contentPadding);
		}

		&__closeButton {
			cursor: pointer;
			opacity: 0.5;
			&:hover { opacity: 1; }
		}
	}
	.MhModal {
		transition: all 0.2s ease;

		&__modal {
			transition: all 0.2s ease;
			transform: translateY(0%);
			opacity: 1;
			transform: scale(1);
		}
		&--isHidden &__modal {
			transform: scale(0.5);
			opacity: 0;
		}
	}
</style>
