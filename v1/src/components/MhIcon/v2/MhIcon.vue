<!--

	Was macht diese Componente?
	Wofür ist die Compoente da?

	Welche $props gibt es?

	Beispiel Code:
		<MhIcon
			:type="'info'"
			:isSpinning="false"
		></MhIcon>

	2022-09-26	bugfix: circle was missing for plus-circle
	2022-09-26	improvement: added minus-circle
	2022-09-26	improvement: added trash
	2021-10-31	improvement: example code
	2021-09-26	refactor: renamed to MhIcon
	2021-09-06	improvement: added calendar
	2021-09-02	improvement: added map-pin
	2021-09-02	improvement: added search
	2021-09-02	improvement: type as class
	2021-07-06	init

-->

<template>
	<span class="MhIcon" name="MhIcon" :class="elmClasses" v-if="type">
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
				<path d="M19 14H10C8.89543 14 8 13.1046 8 12V3C8 1.89543 8.89543 1 10 1H19C20.1046 1 21 1.89543 21 3V12C21 13.1046 20.1046 14 19 14Z" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M4 8H3C2.46957 8 1.96086 8.21071 1.58579 8.58579C1.21071 8.96086 1 9.46957 1 10V19C1 19.5304 1.21071 20.0391 1.58579 20.4142C1.96086 20.7893 2.46957 21 3 21H12C12.5304 21 13.0391 20.7893 13.4142 20.4142C13.7893 20.0391 14 19.5304 14 19V18" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</template>
		<template v-if="type=='cross'">
			<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M1.70862 15.2085L15.1436 1.77347" stroke-linecap="round"/>
				<path d="M15.4724 14.8977L2.02879 1.47127" stroke-linecap="round"/>
			</svg>
		</template>
		<template v-if="type=='triangle-down'">
			<svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M1 1L8 9L15 1" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</template>
		<template v-if="type=='search'">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M21 20.9999L16.65 16.6499" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</template>
		<template v-if="type=='map-pin'">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</template>
		<template v-if="type=='calendar'">
			<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M19.1304 4.5686H5.13037C4.0258 4.5686 3.13037 5.46403 3.13037 6.5686V20.5686C3.13037 21.6732 4.0258 22.5686 5.13037 22.5686H19.1304C20.2349 22.5686 21.1304 21.6732 21.1304 20.5686V6.5686C21.1304 5.46403 20.2349 4.5686 19.1304 4.5686Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M16.1304 2.5686V6.5686" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M8.13037 2.5686V6.5686" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M3.13037 10.5686H21.1304" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</template>
		<template v-if="type=='rotate-cw'">
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
				<polyline points="23 4 23 10 17 10"></polyline>
				<path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
			</svg>
		</template>
		<template v-if="type=='info'">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M12 16V12" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M12 8H12.01" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</template>
		<template v-if="type=='loader'">
			<svg xmlns="http://www.w3.org/2000/svg"
				width="24" height="24" viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round">
					<line x1="12" y1="2" x2="12" y2="6"></line>
					<line x1="12" y1="18" x2="12" y2="22"></line>
					<line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
					<line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
					<line x1="2" y1="12" x2="6" y2="12"></line>
					<line x1="18" y1="12" x2="22" y2="12"></line>
					<line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
					<line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
			</svg>
		</template>
		<template v-if="type=='menu'">
			<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M3.15295 12.0225H21.153" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M3.15295 6.02246H21.153" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M3.15295 18.0225H21.153" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</template>
		<template v-if="type=='book-open'">
			<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M2.50488 3.42969H8.50488C9.56575 3.42969 10.5832 3.85111 11.3333 4.60126C12.0835 5.35141 12.5049 6.36882 12.5049 7.42969V21.4297C12.5049 20.634 12.1888 19.871 11.6262 19.3084C11.0636 18.7458 10.3005 18.4297 9.50488 18.4297H2.50488V3.42969Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M22.5049 3.42969H16.5049C15.444 3.42969 14.4266 3.85111 13.6765 4.60126C12.9263 5.35141 12.5049 6.36882 12.5049 7.42969V21.4297C12.5049 20.634 12.821 19.871 13.3836 19.3084C13.9462 18.7458 14.7092 18.4297 15.5049 18.4297H22.5049V3.42969Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</template>
		<template v-if="type=='youtube'">
			<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
				<g clip-path="url(#clip0_756:4380)">
					<path d="M23.1402 6.69344C23.0214 6.21885 22.7795 5.78401 22.4388 5.43284C22.0982 5.08168 21.6709 4.82662 21.2002 4.69344C19.4802 4.27344 12.6002 4.27344 12.6002 4.27344C12.6002 4.27344 5.72018 4.27344 4.00018 4.73344C3.52943 4.86662 3.10216 5.12168 2.76153 5.47284C2.4209 5.82401 2.17897 6.25885 2.06018 6.73344C1.7454 8.47899 1.59142 10.2497 1.60018 12.0234C1.58896 13.8105 1.74295 15.5947 2.06018 17.3534C2.19114 17.8133 2.43849 18.2316 2.77832 18.5679C3.11816 18.9043 3.539 19.1473 4.00018 19.2734C5.72018 19.7334 12.6002 19.7334 12.6002 19.7334C12.6002 19.7334 19.4802 19.7334 21.2002 19.2734C21.6709 19.1403 22.0982 18.8852 22.4388 18.534C22.7795 18.1829 23.0214 17.748 23.1402 17.2734C23.4525 15.541 23.6065 13.7838 23.6002 12.0234C23.6114 10.2364 23.4574 8.45214 23.1402 6.69344V6.69344Z" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					<path d="M10.3506 15.2939L16.1006 12.0239L10.3506 8.75391V15.2939Z" stroke="currentcolor" stroke-width="2" stroke-linecap="round" fill="currentColor" stroke-linejoin="round"/>
				</g>
				<defs>
					<clipPath id="clip0_756:4380">
						<rect width="24" height="24" fill="white" transform="translate(0.600586 0.273438)"/>
					</clipPath>
				</defs>
			</svg>
		</template>
		<template v-if="type=='instagram'">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M15.9997 11.3703C16.1231 12.2025 15.981 13.0525 15.5935 13.7993C15.206 14.5461 14.5929 15.1517 13.8413 15.53C13.0898 15.9082 12.2382 16.0399 11.4075 15.9062C10.5768 15.7726 9.80947 15.3804 9.21455 14.7855C8.61962 14.1905 8.22744 13.4232 8.09377 12.5925C7.96011 11.7619 8.09177 10.9102 8.47003 10.1587C8.84829 9.40716 9.45389 8.79404 10.2007 8.40654C10.9475 8.01904 11.7975 7.87689 12.6297 8.0003C13.4786 8.12619 14.2646 8.52176 14.8714 9.12861C15.4782 9.73545 15.8738 10.5214 15.9997 11.3703Z" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M17.5 6.5H17.51" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</template>
		<template v-if="type=='twitter'">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M23 2.99834C22.0424 3.67381 20.9821 4.19045 19.86 4.52834C19.2577 3.83585 18.4573 3.34503 17.567 3.12226C16.6767 2.8995 15.7395 2.95553 14.8821 3.28279C14.0247 3.61005 13.2884 4.19274 12.773 4.95205C12.2575 5.71137 11.9877 6.61067 12 7.52834V8.52834C10.2426 8.5739 8.50127 8.18415 6.93101 7.39378C5.36074 6.60342 4.01032 5.43697 3 3.99834C3 3.99834 -1 12.9983 8 16.9983C5.94053 18.3963 3.48716 19.0973 1 18.9983C10 23.9983 21 18.9983 21 7.49834C20.9991 7.21979 20.9723 6.94193 20.92 6.66834C21.9406 5.66183 22.6608 4.39105 23 2.99834V2.99834Z" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</template>
		<template v-if="type=='facebook'">
			<svg class="noStroke" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M18.1924 2.30469H15.1924C13.8663 2.30469 12.5945 2.83147 11.6568 3.76915C10.7192 4.70684 10.1924 5.97861 10.1924 7.30469V10.3047H7.19238V14.3047H10.1924V22.3047H14.1924V14.3047H17.1924L18.1924 10.3047H14.1924V7.30469C14.1924 7.03947 14.2977 6.78512 14.4853 6.59758C14.6728 6.41004 14.9272 6.30469 15.1924 6.30469H18.1924V2.30469Z" stroke="transparent" stroke-color="red" stroke-linecap="round" stroke-linejoin="round" fill="currentColor" />
			</svg>
		</template>
		<template v-if="type=='play'">
			<svg class="noStroke" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M5 3L19 12L5 21V3Z" fill="currentColor" stroke="transparent" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</template>
		<template v-if="type=='pause'">
			<svg class="noStroke" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M10 4H6V20H10V4Z" fill="currentColor" stroke="transparent" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M18 4H14V20H18V4Z" fill="currentColor" stroke="transparent" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</template>
		<template v-if="type=='plus'">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M12 5V19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</template>
		<template v-if="type=='minus'">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</template>
		<template v-if="type=='plus-circle'">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M12 8V16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M8 12H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</template>
		<template v-if="type=='minus-circle'">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M8 12H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</template>
		<template v-if="type=='chevron-down'">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</template>
		<template v-if="type=='trash'">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M3 6H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M19 6V20C19 21 18 22 17 22H7C6 22 5 21 5 20V6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M8 6V4C8 3 9 2 10 2H14C15 2 16 3 16 4V6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M10 11V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M14 11V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</template>
	</span>
</template>

<script>
	// @ is an alias to /src
	//import DevInfos from '@/components/DevInfos.vue'
	//import EventBus from './../../event-bus.js'

	export default {
		name: 'MhIcon',
		components: {},
		mixins: [],
		props: {
			type: {
				type     : [String, Boolean],
				default  : false,
				required : false,
			},
			isSpinning: {
				type     : [Boolean],
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

				if( this.isSpinning ) classes.push( this.$options.name + '--isSpinning' )

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
	.MhIcon { // vars
		--height : 1em;
		--width : 1em;
		--stroke : currentColor;
		--stroke-width : 2px;
	}
	.MhIcon { // debug
		[showBorders2] & {}
		//outline: 1px solid red;;
	}
	.MhIcon { // layout
		display: inline-flex;
		height: var(--height);
		width: var(--width);
		overflow: hidden;

		svg { height: 100%; width: 100%; }
	}
	.MhIcon { // styling
		svg:not(.noStroke) path {
			stroke: var(--stroke);
			stroke-width: var(--stroke-width);
			vector-effect: non-scaling-stroke;
		}

		&--isSpinning svg { animation: spin 1.5s linear infinite both; }

		@keyframes spin {
			0% { transform: rotate(0); }
			100% { transform: rotate(360deg);  }
		}
	}
</style>
