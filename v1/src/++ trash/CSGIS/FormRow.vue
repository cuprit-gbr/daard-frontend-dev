<!--

	Was macht diese Componente?
	Wofür ist die Compoente da?

	Welche $props gibt es?

	Beispiel Code:
		<FormRow></FormRow>

	2021-07-05	init

-->

<template>
	<div class="FormRow contentModule hSpace hSpace--formRow" name="FormRow" :class="elmClasses">
		<div class="FormRow__inner contentModule__inner">
		    <!-- left: label + field -->
            <div class="FormRow__left">
                <div class="FormRow__label">
                    <span class="font font--medium" v-html="labelText"></span>
                    <span class="FormRow__isRequiredIndicator" v-if="isRequired">&emsp;*</span>
                </div>
                <div class="FormRow__slotWrapper">
                    <slot></slot>
                </div>
            </div>
            <!-- right: desc text -->
		    <div class="FormRow__right">
                <div class="FormRow__descText font font--sizeSmall" v-html="descText"></div>
            </div>
		</div>

        <!--
        <pre name="labelText">{{labelText}}</pre>
        <pre name="descText">{{descText}}</pre>
        -->
	</div>
</template>

<script>
	// @ is an alias to /src
	//import DevInfos from '@/components/DevInfos.vue'
	import EventBus from './../../event-bus.js'

	export default {
		name: 'FormRow',
		components: {},
		mixins: [],
		props: {
			//imageObject: [Object, Boolean],
			//text: [String],
			labelText: {
				type     : [String, Boolean],
				default  : 'My label text',
				required : false,
			},
            descText: {
				type     : [String, Boolean],
                default  : 'My desc text',
				required : false,
			},
            isRequired: {
                type     : [Boolean],
                default  : false,
                required : false,
            },
			isValid: {
                type     : [Boolean],
                default  : true,
                required : false,
            },
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

				if( !this.isValid ) classes.push( this.$options.name + '--isInvalid')

				return classes
			},
			/*
			_isRequired(){
				return this._.isFunction( this.isRequired ) ? this.isRequired() : this.isRequired
			}
			*/
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

	.FormRow { // debug
		[showBorders2] & {}

        //&__inner > * { outline: 1px solid fade( blue, 15 ); }
        //&__slotWrapper { background-color: fade( red, 20 ) }
	}
	.FormRow { // layout
         &__inner {
            .grid;
            .grid--colGap;
            .grid--cols-12;
         }
         &__left  { grid-column: span 7;  }
         &__right { grid-column: span 5;  }

		 //&__slotWrapper > * { width: 100%; }
	}
	.FormRow { // styling
        //border-top: 1px solid @swatches[primary];
        background-color: @swatches[whiteBg];
		transition: all 0.15s ease-out;

        & + & { border-top: 1px solid fade(black, 25); }

		&--isInvalid {
			background-color: @swatches[lightRed];
		}
		&--isInvalid &__label,
		&--isInvalid &__descText {
			color: @swatches[red];
		}

        &__inner {
            padding-top: 12px;
            padding-bottom: 15px;
        }

        &__label {
            margin-bottom: 10px;
        }
        &__isRequiredIndicator {
            color: @swatches[red];
        }

		&__descText {
			p + p { margin-top: 0.5em; }
		}
	}

	@media @mq[xs] {}
	@media @mq[sm] {}
	@media @mq[md] {}
	@media @mq[dt] {}
	@media @mq[lg] {}
	@media @mq[xl] {}
</style>
