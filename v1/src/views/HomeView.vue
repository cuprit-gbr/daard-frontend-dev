<template>
	<MhRouterView class="HomeView view hSpace hSpace--app" :isContentReady="isContentReady">

		<div class="HomeView__inner view__inner">

			<iframe src="https://dai-gn-test.csgis.de/maps/5629/embed#/" allowtransparency="true"></iframe>

			<!--
			<DocCreateForm></DocCreateForm>
			-->

		</div>

	</MhRouterView>
</template>

<script>
	// @ is an alias to /src
	import EventBus from '@/helper/EventBus.js'
	import MhRouterView from '@/components/MhRouterView/v4/MhRouterView.vue'

	export default {
		name: 'HomeView',
		components: {
			MhRouterView,
		},
		mixins: [],
		directives: {},
		props: {},
		data(){
			return {
				isContentReady: false,
			}
		},
		computed: {
			app(){
				return this.$root.$children[0]
			},
			elmClasses(){
				let classes = []

				//classes.push('new_class')

				return classes
			},
		},
		methods: {},
		mounted(){
			this.isContentReady = true
		},
	}
</script>

<style lang="less">
	@import (reference) "@/less/vars.less";
	@import (reference) "@/less/mixins.less";
	@import (reference) "@/less/atoms.less";

	.HomeView { // layout
		display: flex;
		flex-direction: column;
		justify-content: center;

		&__inner {
			//background-color: fade( red, 10 );
			//flex-grow: 1;
		}

		iframe {
			position: fixed;
			top: 0; left: var(--sidebar-width);
			height: 100vh; width: calc( 100vw - var(--sidebar-width) );
			border: none;
			//bottom: 0; right: 0;
		}
	}

	@media @mq[xs] {}
	@media @mq[sm] {}
	@media @mq[md] {}
	@media @mq[dt] {}
	@media @mq[lg] {}
	@media @mq[xl] {}
</style>
