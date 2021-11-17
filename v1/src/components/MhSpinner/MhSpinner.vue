<template>
	<svg class="spinner" height="1em" width="1em" viewBox="0 0 44 44" stroke-width="2" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" vector-effect="non-scaling-stroke">
		<g fill="none" fill-rule="evenodd" transform="translate(3, 3)">
			<g transform="translate(1 1)" vector-effect="non-scaling-stroke">
				<circle stroke-opacity=".35" cx="18" cy="18" r="18" vector-effect="non-scaling-stroke" />
				<path d="M36 18c0-9.94-8.06-18-18-18" vector-effect="non-scaling-stroke">
					<animateTransform
						attributeName="transform"
						type="rotate"
						from="0 18 18"
						to="360 18 18"
						dur="1s"
						repeatCount="indefinite"/>
				</path>
			</g>
		</g>
	</svg>
</template>

<script>
	// @ is an alias to /src 

	export default {
		name: 'MhSpinner',
		components: {
		},			
		props: {
			//imageObject: [Object, Boolean],
		},
		data() {
			return {
				strokeWidth : 5,
				width: 138,
				height: 138,								
				color: 'red',
			}
		},
		methods: {						
			getViewbox() {
				return '0 0 38 38'
			},
			getStyles() {
				return {
					//width : '5em',
					//height : '5em',
				}
			}
		},
		created() {
			
		},
		mounted() {			
		},
	}
</script>

<style lang="less">
</style>
