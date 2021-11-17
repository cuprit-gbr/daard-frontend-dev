<!--

	Was macht diese Componente?
	Wofür ist die Compoente da?

	Welche $props gibt es?

	Beispiel Code:
		<ToggleRow>

		</ToggleRow>

	2021-07-05	init

-->

<template>
	<div class="ToggleRow contentModule" name="ToggleRow" :class="elmClasses">
		<div class="ToggleRow__inner contentModule__inner">
            <!-- header -->
			<div class="ToggleRow__header hSpace hSpace--formRow" @click="toggleOpen" ref="header">
				<!-- title -->
				<div class="ToggleRow__title font font--medium" v-html="title"></div>
				<!-- error/ok label -->
				<template v-if="countErrors > 0">
					<OutlinedLabel type="error">{{countErrors}} Fehler</OutlinedLabel>
				</template>
				<template v-else>
					<OutlinedLabel type="ok">OK</OutlinedLabel>
				</template>
				<!-- toggle btn -->
				<span class="ToggleRow__toggleIcon circleIcon color--yellowDark" role="button">
					<BaseIcon type="triangle-down" ></BaseIcon>
				</span>
            </div>
			<!-- body/content -->
            <div class="ToggleRow__body" v-show-slide="isBodyVisible">
                <div class="ToggleRow__bodyInner">
                    <slot></slot>
                </div>
            </div>
		</div>
		<!--
		<hr/>
		<pre name="title">{{title}}</pre>
		<pre name="isBodyVisible">{{isBodyVisible}}</pre>
		<pre name="countErrors">{{countErrors}}</pre>
		-->
	</div>
</template>

<script>
	// @ is an alias to /src
	//import DevInfos from '@/components/DevInfos.vue'
	import EventBus from './../../event-bus.js'
	import BaseIcon from './BaseIcon.vue'
	import OutlinedLabel from './OutlinedLabel.vue'

	export default {
		name: 'ToggleRow',
		components: {
			BaseIcon,
			OutlinedLabel,
		},
		mixins: [],
		props: {
			title: {
				type     : [String, Boolean],
				default  : 'The title',
				required : false,
			},
			isOpen: {
				type     : [Boolean],
				default  : false,
				required : false,
			},
            countErrors: {
                type     : [Number],
                default  : 0,
                required : false,
            },
		},
		data(){
			return {
                isBodyVisible : false,
            }
		},
		watch: {
			isOpen: {
				handler: function( to, from ) {
					this.isBodyVisible = to
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

				if( this.isBodyVisible ) classes.push( this.$options.name + '--isOpen')

				return classes
			},
			isValid(){
				return this.countErrors ? false : true
			},
			XXXslug(){
				return this._.kebabCase( this.title )
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
            toggleOpen(){
                this.isBodyVisible = !this.isBodyVisible
				this.$emit('hasToggled', {
					title : this.title,
					state : this.isBodyVisible,
				})
            },
        },
		created(){
			//window.addEventListener('scroll', this.handleScroll);
		},
		mounted(){
			// apply isSticky class via IntersectionObserver
			// taken from https://stackoverflow.com/a/57991537

			// define the observer
			this.stickyObserver = new IntersectionObserver(
				([e]) => e.target.classList.toggle('isSticky', e.intersectionRatio < 1),
				{threshold: [1]}
			);

			// apply the observer
			this.stickyObserver.observe( this.$refs.header )
			//this.stickyObserver.observe( this.$el )
		},
		destroyed(){
   			//window.removeEventListener('scroll', this.handleScroll);
 		},
	}
</script>

<style lang="less">
	@import (reference) "../../less/vars.less";
	@import (reference) "../../less/mixins.less";
	@import (reference) "../../less/atoms.less";

	.ToggleRow { // debug
		[showBorders2] & {}

        &__bodyInner {
            //margin-top: 1rem;
            //padding: 0.5rem;
            //outline: 1px solid fade(green, 15);
        }
	}
	.ToggleRow { // layout
		&__header {
			display: flex;
			align-items: center;
			height: 50px;
		}
		&__header {
			position: sticky;
			top: 58px; // needed for stickyObserver
			z-index: 1;
			//margin-top: calc(0em + 58px);
		}
		&__title {
			flex-grow: 1;
		}
	}
	.ToggleRow { // styling
		&__inner {}

		&__header {
			//position: relative;
			border-top: 1px solid lighten( @swatches[yellowDark], 15 );
			border-bottom: 1px solid lighten( @swatches[yellowDark], 15 );
			background-color: @swatches[yellow];
			color: @swatches[yellowDark];
			user-select: none;
			cursor: pointer;
		}
		XXX&__header { // shadow below
			&:after {
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
		}
		&__body {
			background-color: @swatches[whiteBg];
			border-bottom: 1px solid lighten( @swatches[yellowDark], 15 );
			margin-bottom: -2px;
		}

		&__toggleIcon { transition: all 0.2s ease; }
		&--isOpen &__toggleIcon { transform: rotate( 180deg ); }

		.OutlinedLabel {
			margin-right: 1rem;
		}
	}

	@media @mq[xs] {}
	@media @mq[sm] {}
	@media @mq[md] {}
	@media @mq[dt] {}
	@media @mq[lg] {}
	@media @mq[xl] {}
</style>
