<template>
	<MhRouterView class="DummyView view hSpace hSpace--app" :isContentReady="isContentReady">

		<div class="view__inner">

			<br /><strong>DummyView.vue</strong><hr /><br />

			<pre data-name="posts">{{posts}}</pre>

		</div>

	</MhRouterView>
</template>

<script>
	// @ is an alias to /src
	import EventBus from '@/helper/EventBus.js'
	import RestHandler from '@/components/RestHandler/RestHandler.js'
	import MhRouterView from '@/components/MhRouterView/v4/MhRouterView.vue'

	export default {
		name: 'DummyView',
		components: {
			MhRouterView,
		},
		mixins: [ RestHandler ],
		directives: {},
		props: {},
		data(){
			return {
				isContentReady: false,
                posts: undefined,
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
		methods: {
			fetchAll( finalCallback ){
				let thingsToLoad = 1

				const runCallback = ()=>{
					--thingsToLoad

					//console.log( this.$options.name, '• fetchAll() runCallback()', thingsToLoad)

					if( !thingsToLoad && this._.isFunction( finalCallback ) ) finalCallback()
				}

				// fetch pages
				this.restHandler__fetch({
					action : 'GET',
					route : '/wp-json/wp/v2/pages',
					params : {},
					callback : (response) => {
						this.posts = response.data
						this.isContentReady = true
					},
				})
			},
		},
		mounted() {
			this.fetchAll(()=>{
				//console.log( this.$options.name, '• fetchAll() • finalCallback()')

				this.isContentReady = true
			})
		},
	}
</script>

<style lang="less">
	@import (reference) "@/less/vars.less";
	@import (reference) "@/less/mixins.less";
	@import (reference) "@/less/atoms.less";

    .DummyView { // debug
        [showBorders2] & {}
    }
    .DummyView { // layout
    }
    .DummyView { // styling
    }

	@media @mq[xs] {}
	@media @mq[sm] {}
	@media @mq[md] {}
	@media @mq[dt] {}
	@media @mq[lg] {}
	@media @mq[xl] {}
</style>
