<!--

	Was macht diese Componente?
	Wofür ist die Compoente da?

	Welche $props gibt es?

	Beispiel Code:
		<OutlinedLabel></OutlinedLabel>

	2021-07-05	init

-->

<template>
	<div class="OutlinedLabel contentModule" name="OutlinedLabel" :class="elmClasses">
		<div class="OutlinedLabel__inner contentModule__inner">
			<div class="OutlinedLabel__label font font--medium font--sizeMini">
                <slot></slot>
            </div>
		</div>
	</div>
</template>

<script>
	// @ is an alias to /src
	//import DevInfos from '@/components/DevInfos.vue'
	import EventBus from './../../event-bus.js'

	export default {
		name: 'OutlinedLabel',
		components: {},
		mixins: [],
		props: {
			//imageObject: [Object, Boolean],
			//text: [String],
			type: {
				type      : [String, Boolean],
				default   : 'default',
                required  : false,
				validator : (value)=>{ // The value must match one of these strings
					return ['default', 'error', 'ok'].indexOf(value) !== -1
				},
			},
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

				classes.push( this.$options.name + '--type-' + this.type)

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
	@import (reference) "../../less/vars.less";
	@import (reference) "../../less/mixins.less";
	@import (reference) "../../less/atoms.less";

	.OutlinedLabel { // debug
		[showBorders2] & {}
	}
	.OutlinedLabel { // layout
        display: inline-block;
	}
	.OutlinedLabel { // styling
        border: 1px solid;
        padding: 1px 4px;
        border-radius: 4px;

        &--type-default {
            //background-color: @swatches[textBlack];
            border-color: @swatches[textBlack];
            color: @swatches[textBlack];
        }
        &--type-error {
            background-color: @swatches[lightRed];
            border-color: @swatches[red];
            color: @swatches[red];
        }
        &--type-ok {
            background-color: @swatches[lightGreen];
            border-color: @swatches[green];
            color: @swatches[green];
        }
	}

	@media @mq[xs] {}
	@media @mq[sm] {}
	@media @mq[md] {}
	@media @mq[dt] {}
	@media @mq[lg] {}
	@media @mq[xl] {}
</style>
