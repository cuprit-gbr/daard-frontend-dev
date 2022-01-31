<template>
	<MhRouterView class="LoginView view hSpace hSpace--app" :isContentReady="isContentReady">

		<div class="LoginView__inner view__inner">

			<div class="LoginView__form">
				<!-- headline -->
				<KnFormHeaderRow
					:title="'Login'"
				></KnFormHeaderRow>
				<!-- text -->
				<KnFormFieldRow>
					<div class="richText" style="grid-column: span 12;">
						<p>
							Before you can add a new record it's needed to login with your
							GeoServer Account at <a href="https://geoserver.dainst.org/">https://geoserver.dainst.org/</a>
						</p>
						<p>
							If you do not have an account yet please follow the link to register.
						</p>
					</div>
				</KnFormFieldRow>
				<!-- buttons -->
				<KnFormFieldRow>
					<div style="grid-column: span 12; display: flex; justify-content: flex-end;">
						<div>
							<br/>
							<BaseButton
								class="font font--sizeLarge font--bold"
								:tag="'a'"
								:href="registerUrl"
								:isOutlined="true"
								:isDisabled="false">
								<template slot="before"></template>
								<template slot="default">Register</template>
								<!--
								<template slot="after">
									<MhIcon type="arrow-right" ></MhIcon>
								</template>
								-->
							</BaseButton>
							<BaseButton
								class="font font--sizeLarge font--bold"
								:tag="'a'"
								:href="loginUrl"
								:isOutlined="false"
								:isDisabled="false">
								<template slot="before"></template>
								<template slot="default">Login</template>
								<template slot="after">
									<MhIcon type="arrow-right" ></MhIcon>
								</template>
								<!--
								-->
							</BaseButton>
							<br/>
							<br/>
						</div>
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
	import MhRouterView from '@/components/MhRouterView/v2/MhRouterView.vue'
	import KnFormHeaderRow from '@/molecules/KnFormHeaderRow.vue'
	import KnFormFieldRow from '@/molecules/KnFormFieldRow.vue'
	import BaseButton from '/Users/Mario/Dropbox/htdocs/2020-09-17__MhForm/vue-cli-dev/src/components/MhForm/v4/BaseButton.vue'
	import MhIcon from '/Users/Mario/Dropbox/htdocs/2019-05-20__wp-kickstart-vue/wordpress/wp-content/themes/wp-kickstart-v3-theme/vue-cli-dev/src/components/MhIcon/v2/MhIcon.vue'

	export default {
		name: 'LoginView',
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
			someVar : {
				handler: function( to, from ) {
					//if( to ) this.fetchAuthToken()
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
				'requestToken',
				'accessToken',
    		]),
			locationHrefWithoutQuery(){
				const location = window.location
				const href = location.protocol + '//' + location.host + location.pathname + location.hash
				return href
			},
			registerUrl(){
				const redirectUri = this.locationHrefWithoutQuery.replace('#', '%23')

				console.log('redirectUri:', redirectUri)

				const uri = this._.get( this.currentEnv, 'registerUrl', '' ).replace('%redirect_uri%', redirectUri)
				return uri
			},
			loginUrl(){
				//const redirectUri = encodeURI( this.locationHrefWithoutQuery )
				//const redirectUri = this.locationHrefWithoutQuery.replace('#', '%23')
				const redirectUri = location.protocol + '//' + location.host
				const uri = this._.get( this.currentEnv, 'loginUrl', '' ).replace('%redirect_uri%', redirectUri)
				return uri
			},
		},
		methods: {
			fetchAuthToken( doLog = true ){ // nachdem der requestToken erhalten wurde, wird hier nach dem Auth-Token gefragt
				const redirectUri = this.locationHrefWithoutQuery
				const queryString = window.location.search
				const urlParams = new URLSearchParams(queryString)
				const requestToken = urlParams.get('code')

				if( doLog ){
					console.group( this.$options.name, '• fetchAuthToken()')
					console.log('redirectUri:', redirectUri)
					console.log('queryString:', queryString)
					console.log('requestToken:', requestToken)
					console.groupEnd()
				}

				this.$router.replace('/login/')
				this.$store.commit('setRequestToken', requestToken)

				//let res = fetch("https://dai-gn-test.csgis.de/o/token/", {
				let res = fetch( this.currentEnv.tokenUrl, {
					body: new URLSearchParams({
						grant_type: 'authorization_code',
						code: requestToken,
						redirect_uri: redirectUri,
						client_id: this.currentEnv.tokenClientId,
					}),
					headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
						method: "POST"
					}
				)
				.then( response => response.json() )
				.then( data => {
					const accessToken = this._.get( data, 'access_token')
					console.log('fetchAuthToken:', data )

					if( accessToken ){
						this.$store.commit('setAccessToken', accessToken )
						this.$router.replace('/edit/')

					}
				});
				/*
				*/
			},
		},
		mounted() {
			this.isContentReady = true
		},
	}
</script>

<style lang="less">
	@import (reference) "@/less/vars.less";
	@import (reference) "@/less/mixins.less";
	@import (reference) "@/less/atoms.less";

    .LoginView { // debug
        [showBorders2] & {}
    }
    .LoginView { // layout
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		&__form {
			max-width: 650px;
		}
    }
    .LoginView { // styling
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
