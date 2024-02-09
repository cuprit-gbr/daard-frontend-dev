<template>
	<MhRouterView class="ThankYouView view hSpace hSpace--app" :isContentReady="isContentReady">

		<div class="ThankYouView__inner view__inner">

			<div class="ThankYouView__form">
				<!-- headline -->
				<KnFormHeaderRow
					:title="'Thank you!'"
				></KnFormHeaderRow>
				<!-- text -->
				<KnFormFieldRow>
					<div class="richText" style="grid-column: span 12;">
						<p>
							Your data has been received and will be checked. <br/>
							As soon as the new entry is approved your information will <br/>
							show up on our atlas and you will be notified by e-mail. <br/>
						</p>
						<p>
							In case you like to change your record please write to:
							<a href="mailto:daard@dainst.de">daard@dainst.de</a>
						</p>
					</div>
				</KnFormFieldRow>
			</div>
			<!--
			<pre name="locationHrefWithoutQuery">{{locationHrefWithoutQuery}}</pre>
			<pre name="currentEnv">{{currentEnv}}</pre>
			<pre name="registerUrl">{{registerUrl}}</pre>
			<pre name="loginUrl">{{loginUrl}}</pre>
			<pre name="isReturnRequestTokenUri">{{isReturnRequestTokenUri}}</pre>
			<pre name="requestToken">{{requestToken}}</pre>
			<pre name="accessToken">{{accessToken}}</pre>
			-->

		</div>

	</MhRouterView>
</template>

<script>
	// @ is an alias to /src
	import EventBus from '@/helper/EventBus.js'
	import { mapGetters } from 'vuex'
	import RestHandler from '@/components/RestHandler/RestHandler.js'
	import MhRouterView from '@/components/MhRouterView/v4/MhRouterView.vue'
	import KnFormHeaderRow from '@/molecules/KnFormHeaderRow.vue'
	import KnFormFieldRow from '@/molecules/KnFormFieldRow.vue'
	import BaseButton from '@/components/MhForm/v5/BaseButton.vue'
	import MhIcon from '@/components/MhIcon/v2/MhIcon.vue'

	export default {
		name: 'ThankYouView',
		components: {
			MhRouterView,
			KnFormHeaderRow,
			KnFormFieldRow,
			BaseButton,
			MhIcon,
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
		watch: {
			isReturnRequestTokenUri: {
				handler: function( to, from ) {
					if( to ) this.fetchAuthToken()
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

				//classes.push('new_class')

				return classes
			},
			...mapGetters([
				'currentEnv',
    		]),
		},
		methods: {},
		mounted() {
			this.isContentReady = true
		},
	}
</script>

<style lang="less">
	@import (reference) "@/less/vars.less";
	@import (reference) "@/less/mixins.less";
	@import (reference) "@/less/atoms.less";

    .ThankYouView { // debug
        [showBorders2] & {}
    }
    .ThankYouView { // layout
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		&__form {
			max-width: 650px;
		}
    }
    .ThankYouView { // styling
		.BaseButton + .BaseButton {
			margin-left: 0.5em;
		}
    }

	@media @mq[xs] {}
	@media @mq[sm] {}
	@media @mq[md] {}
	@media @mq[dt] {}
	@media @mq[lg] {}
	@media @mq[xl] {}
</style>
