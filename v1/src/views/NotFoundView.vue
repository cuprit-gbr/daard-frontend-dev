<template>
	<MhRouterView class="NotFoundView view hSpace hSpace--app" :isContentReady="isContentReady">

		<div class="view__inner">

			<br /><strong>NotFoundView.vue</strong><hr /><br />

			<h1>404 for url "{{currentUrl}}"</h1>

		</div>

	</MhRouterView>
</template>

<script>
	// @ is an alias to /src
	import EventBus from '@/helper/EventBus.js'

	import MhRouterView from './../components/MhRouterView/v2/MhRouterView.vue'

	export default {
		name: 'NotFoundView',
		components: {
			MhRouterView,
		},
		props: {},
		data() {
			return {
				isContentReady : false,
			}
		},
		computed: {
			currentUrl(){
				return window.location
			}
		},
		methods: {},
		mounted(){
			this.isContentReady = true
		}
	}
</script>

<style lang="less">
	@import (reference) "../less/vars.less";
	@import (reference) "../less/mixins.less";
	@import (reference) "../less/atoms.less";

	.NotFoundView {}

	@media @mq[xs] {}
	@media @mq[sm] {}
	@media @mq[md] {}
	@media @mq[dt] {}
	@media @mq[lg] {}
	@media @mq[xl] {}
</style>
