<template>
	<MhRouterView class="EditView view maxWidth maxWidth--appBody" :isContentReady="isContentReady">

		<div class="EditView__inner view__inner">

			<!--
			<pre>{{$store.getters.getStep('disease')}}</pre>
			<pre>{{$store.getters.fields}}</pre>
			-->

			<KnEditForm></KnEditForm>

		</div>

	</MhRouterView>
</template>

<script>
	// @ is an alias to /src
	import EventBus from '@/helper/EventBus.js'
	import { mapGetters } from 'vuex'
	import RestHandler from '@/components/RestHandler/RestHandler.js'
	import MhRouterView from '@/components/MhRouterView/v2/MhRouterView.vue'
	import KnEditForm from '@/organisms/KnEditForm.vue'

	export default {
		name: 'EditView',
		components: {
			MhRouterView,
			KnEditForm,
		},
		mixins: [ RestHandler ],
		directives: {},
		props: {},
		data() {
			return {
				isContentReady: false,
				currentStep : 'disease',
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
			...mapGetters([
				'currentEnv',
				'requestToken',
				'accessToken',
    		]),
		},
		methods: {},
		mounted(){
			this.isContentReady = true

			if( !this.accessToken ) this.$router.push('/login/')

			// der edit view kann nur aufgerufen werden,
			// wenn es bereits dataRows im doc gibt.
			// die befüllung des docs findet im HomeView
			// via file-select oder csv-upload statt.
			/*
			if( !this.doc.countDataRows ){
				this.$router.push({ name: 'HomeView' })
			}
			*/
		},
	}
</script>

<style lang="less">
	@import (reference) "../less/vars.less";
	@import (reference) "../less/mixins.less";
	@import (reference) "../less/atoms.less";

	.EditView {}

	@media @mq[xs] {}
	@media @mq[sm] {}
	@media @mq[md] {}
	@media @mq[dt] {}
	@media @mq[lg] {}
	@media @mq[xl] {}
</style>
