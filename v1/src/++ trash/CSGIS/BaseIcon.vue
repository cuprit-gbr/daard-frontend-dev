<!--

	Was macht diese Componente?
	Wofür ist die Compoente da?

	Welche $props gibt es?

	Beispiel Code:
		<BaseIcon></BaseIcon>

	2021-09-06	improvement: added calendar
	2021-09-02	improvement: added map-pin
	2021-09-02	improvement: added search
	2021-09-02	improvement: type as class
	2021-07-06	init

-->

<template>
	<span class="BaseIcon" name="BaseIcon" :class="elmClasses">
		<template v-if="type=='arrow-right'">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M5 12H19" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M12 5L19 12L12 19" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</template>
		<template v-if="type=='arrow-left'">
			<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M19.4531 12.3839H5.45312" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M12.4531 19.3839L5.45312 12.3839L12.4531 5.38391" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</template>
		<template v-if="type=='upload'">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M16.9999 8.00012L11.9999 3.00012L6.99988 8.00012" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M11.9998 3.00012L11.9998 15.0001" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</template>
		<template v-if="type=='download'">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M7 10L12 15L17 10" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M12 15V3" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</template>
		<template v-if="type=='copy-and-paste'">
			<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M19 14H10C8.89543 14 8 13.1046 8 12V3C8 1.89543 8.89543 1 10 1H19C20.1046 1 21 1.89543 21 3V12C21 13.1046 20.1046 14 19 14Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M4 8H3C2.46957 8 1.96086 8.21071 1.58579 8.58579C1.21071 8.96086 1 9.46957 1 10V19C1 19.5304 1.21071 20.0391 1.58579 20.4142C1.96086 20.7893 2.46957 21 3 21H12C12.5304 21 13.0391 20.7893 13.4142 20.4142C13.7893 20.0391 14 19.5304 14 19V18" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</template>
		<template v-if="type=='cross'">
			<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M1.70862 15.2085L15.1436 1.77347" stroke-width="2" stroke-linecap="round"/>
				<path d="M15.4724 14.8977L2.02879 1.47127" stroke-width="2" stroke-linecap="round"/>
			</svg>
		</template>
		<template v-if="type=='triangle-down'">
			<svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M1 1L8 9L15 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</template>
		<template v-if="type=='search'">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M21 20.9999L16.65 16.6499" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</template>
		<template v-if="type=='map-pin'">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</template>
		<template v-if="type=='calendar'">
			<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M19.1304 4.5686H5.13037C4.0258 4.5686 3.13037 5.46403 3.13037 6.5686V20.5686C3.13037 21.6732 4.0258 22.5686 5.13037 22.5686H19.1304C20.2349 22.5686 21.1304 21.6732 21.1304 20.5686V6.5686C21.1304 5.46403 20.2349 4.5686 19.1304 4.5686Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M16.1304 2.5686V6.5686" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M8.13037 2.5686V6.5686" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M3.13037 10.5686H21.1304" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</template>
		<template v-if="type=='rotate-cw'">
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<polyline points="23 4 23 10 17 10"></polyline>
				<path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
			</svg>
		</template>
		<template v-if="type=='info'">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M12 16V12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M12 8H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</template>
	</span>
</template>

<script>
	// @ is an alias to /src
	//import DevInfos from '@/components/DevInfos.vue'
	import EventBus from './../../event-bus.js'

	export default {
		name: 'BaseIcon',
		components: {},
		mixins: [],
		props: {
			//imageObject: [Object, Boolean],
			//text: [String],
			type: {
				type     : [String, Boolean],
				default  : false,
				required : false,
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

	.BaseIcon { // vars
		--stroke : currentColor;
		--strokeWidth : 2px;
	}
	.BaseIcon { // debug
		[showBorders2] & {}
		//outline: 1px solid red;;
	}
	.BaseIcon { // layout
		display: inline-flex;
		height: 1em; width: 1em;
		overflow: hidden;
	}
	.BaseIcon { // styling
		svg {
			height: 100%; width: 100%;
		}
		path {
			stroke: var(--stroke);
			stroke-width: var(--strokeWidth);
			vector-effect: non-scaling-stroke;
		}
	}

	@media @mq[xs] {}
	@media @mq[sm] {}
	@media @mq[md] {}
	@media @mq[dt] {}
	@media @mq[lg] {}
	@media @mq[xl] {}
</style>
