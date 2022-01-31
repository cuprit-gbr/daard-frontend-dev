<template>
	<div class="App font font--sans font--sizeDefault" lang="de">

		<KnAppSidebar class="App__sidebar"></KnAppSidebar>

		<div class="knDebug">
			<strong>Steps isValid state</strong>
			<div class="flex flex--spaceBetween" v-for="(step, index) in $store.getters.steps" :key="'s'+index">
				<span v-html="step.title + ' • ' + step.slug"></span>
				<template v-if="isStepValid( step.slug )"> • true</template>
				<template v-else> • false</template>
			</div>
			<div class="flex flex--spaceBetween">
				<span>all</span>
				<template v-if="isStepValid( 'all' )"> • true</template>
				<template v-else> • false</template>
			</div>
			<pre name="availableBoneIds">{{availableBoneIds}}</pre>
		</div>

		<MhRouterViewWrapper v-if="isReady" class="App__body hSpace hSpace--appBody"></MhRouterViewWrapper>

		<MhDelegateLinks
			:doLog="false"
		></MhDelegateLinks>
		<MhDevInfos
			:showOnHosts="[
				'localhost',
				'knochen.in-kombination.de',
				'daard-atlas-staging.csgis.de',
			]"
		></MhDevInfos>

	</div>
</template>

<script>
	// @ is an alias to /src
	import EventBus from '@/helper/EventBus.js'
	import { mapGetters } from 'vuex'
	import currentEnv from '@/helper/getCurrentEnv.js'
	import resize from 'vue-resize-directive'
	import RestHandler from '@/components/RestHandler/RestHandler.js'

	import MhDevInfos from '/Users/Mario/Dropbox/htdocs/2019-05-20__wp-kickstart-vue/wordpress/wp-content/themes/wp-kickstart-v3-theme/vue-cli-dev/src/components/MhDevInfos/v2/MhDevInfos.vue'
	import MhDelegateLinks from '/Users/Mario/Dropbox/htdocs/2019-05-20__wp-kickstart-vue/wordpress/wp-content/themes/wp-kickstart-v3-theme/vue-cli-dev/src/components/MhDelegateLinks/v5/MhDelegateLinks.vue'
	import MhRouterViewWrapper from './components/MhRouterView/v2/MhRouterViewWrapper.vue'
	import MhModal from './components/MhModal/v2/MhModal.vue'
	import KnAppSidebar from '@/molecules/KnAppSidebar.vue'

	import steps from '@/config/steps.js'

	export default {
		name: 'App',
		components: {
			MhRouterViewWrapper,
			MhDevInfos,
			MhDelegateLinks,
			MhModal,
			KnAppSidebar,
		},
		directives: {
			resize,
		},
		mixins: [ RestHandler ],
		data() {
			return {
				isReady : false,
			}
		},
		computed: {
			...mapGetters([
				'currentEnv',
				'steps',
				'activeStep',
      			'activeStepIndex',
      			'isStepValid',
      			'fields',
      			'getFieldBySlug',
      			'getFieldProp',
      			'availableBoneIds',
      			'boneChangesForm',
    		]),
		},
		methods: {
			getLinkWithoutHostname( url ){
				let theReturn = ''

				try {
					let _url = new URL( url )
					theReturn = _url.pathname
				}
				catch(e) {
					//
				}

				return theReturn
			},
			fetchAccessToken( requestToken, doLog = true ){
				const redirectUri = location.protocol + '//' + location.host

				if( doLog ){
					console.group( this.$options.name, '• fetchAccessToken()')
					console.log('redirectUri:', redirectUri)
					//console.log('queryString:', queryString)
					console.log('requestToken:', requestToken)
					console.groupEnd()
				}

				//this.$router.replace('/login/')
				this.$store.commit('setRequestToken', requestToken)

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
						/*
						this.$router.replace({
							name : 'EditViewStart',
							query : null,
						})
						*/

					}
				});
				/*
				*/
			},
			fetchAll( finalCallback, doLog = false ){
				let thingsToLoad = 4

				const runCallback = ()=>{
					--thingsToLoad

					if( !thingsToLoad && this._.isFunction( finalCallback ) ) finalCallback()
				}

				// step disease
				this.restHandler__fetch({
					action : 'GET',
					route : this.$store.getters.restBase + '/api/forms/?filter_by_key=disease',
					params : {},
					callback : (response) => {
						const results = response.data

						if( doLog ) console.log( this.$options.name, '• fetchAll() • disease', results)

						this._.forEach( results, (result)=>{
							const payload = {
								stepSlug : 'disease',
								field    : result,
							}
							this.$store.commit('addStepField', payload)
						})
						/*
						*/

						runCallback()
					},
				})
				// step inventory
				this.restHandler__fetch({
					action : 'GET',
					route : this.$store.getters.restBase + '/api/forms/?filter_by_key=inventory',
					params : {},
					callback : (response) => {
						const results = response.data

						if( doLog ) console.log( this.$options.name, '• fetchAll() • inventory', results)

						const tabs = results
						//const tabs = { cranial_district : results.cranial_district }

						this._.forEach( tabs, (tab)=>{
							this._.forEach( tab, (field)=>{
								const payload = {
									stepSlug : 'inventory',
									field    : field,
								}
								this.$store.commit('addStepField', payload)
							})
						})

						/*
						this.$store.commit('setStepProp', {
							stepSlug : 'inventory',
							key : 'tabs',
							value : '1222'
						})
						*/

						runCallback()
					},
				})
				// step site
				this.restHandler__fetch({
					action : 'GET',
					route : this.$store.getters.restBase + '/api/forms/?filter_by_key=site',
					params : {},
					callback : (response) => {
						const results = response.data

						if( doLog ) console.log( this.$options.name, '• fetchAll() • site', results)

						this._.forEach( results, (field)=>{
							const payload = {
								stepSlug : 'site',
								field    : field,
							}
							this.$store.commit('addStepField', payload)
						})
						/*
						*/

						// we need some more fields
						const additionalFields = [
							{ name : 'gazId', label : 'gazId', type : 'textfield' },
							{ name : 'gaz_link', label : 'gaz_link', type : 'textfield' },
						]
						this._.forEach( additionalFields, (field)=>{
							const payload = {
								stepSlug : 'site',
								field    : field,
							}
							this.$store.commit('addStepField', payload)
						})

						runCallback()
					},
				})
				// step publication
				this.restHandler__fetch({
					action : 'GET',
					route : this.$store.getters.restBase + '/api/forms/?filter_by_key=publication',
					params : {},
					callback : (response) => {
						const results = response.data

						if( doLog ) console.log( this.$options.name, '• fetchAll() • publication', results)

						this._.forEach( results, (field)=>{
							const payload = {
								stepSlug : 'publication',
								field    : field,
							}
							this.$store.commit('addStepField', payload)
						})
						/*
						*/

						// we need some more fields
						const additionalFields = [
							{
								name : 'privacyConsent',
								label : 'Privacy consent',
								type : 'checkbox',
								mandatory : true,
								help_text : `I consent to the <a href="https://www.dainst.org/datenschutz" target="_blank">privacy policy</a> of dainst.org.
									   This includes the processing of my data and granting public acces to the disease record described
									   in steps 2 and 3.
									   `
							},
						]
						this._.forEach( additionalFields, (field)=>{
							const payload = {
								stepSlug : 'publication',
								field    : field,
							}
							this.$store.commit('addStepField', payload)
						})

						runCallback()
					},
				})
			},
		},
		mounted(){
			// start with empty state
			this.$store.commit('clearState')
			// set env config urls
			this.$store.commit('setCurrentEnv', currentEnv )
			// store all steps in vuex
			steps.forEach((step)=>{
				this.$store.commit('addStep', step)
			})
			// fetch steps
			this.fetchAll(()=>{
				//console.log( this.$options.name, '• fetchAll() • finalCallback()')
				this.isReady = true
			})

			// wenn die url nach dem login das notwendige code-param als requestToken in der url hat,
			// wird hier der requestToken als sessionStorage zwischengespeichert und die seite wird ohne
			// query params neu geladen
			const urlSearchParams = new URLSearchParams( window.location.search )
			const requestTokenQueryParam = urlSearchParams.get('code')
			const requestTokenSessionStorage = sessionStorage.getItem('kn__requestToken')
			if( requestTokenQueryParam ){
				console.log( this.$options.name, '• has requestToken as code in url' )
				sessionStorage.setItem('kn__requestToken', requestTokenQueryParam)
				window.location.href = '/'
			}
			// wenn das requestToken im sessionStorage gefunden wurde,
			// wird hier das accessToken geholt und danach zum EditView gewechselt
			else if( requestTokenSessionStorage ) {
				this.fetchAccessToken( requestTokenSessionStorage )
			}

		}
	}
</script>

<style lang="less">
	@import (reference) "@/less/vars.less";
	@import (reference) "@/less/mixins.less";
	@import "@/less/atoms.less";

	html {
		--primary   : #00378B;
		--primary75 : fade(#00378B,75);
		--primary50 : fade(#00378B,50);
		--primary15 : fade(#00378B,15);
		--primary5  : fade(#00378B,5);
	}

	html {
		.font;
		.font--sans;
		.font--sizeDefault;

		background-color: @swatches[appBg];
		color: @swatches[textBlack];
	}
	strong, b {
		.font--bold;
	}
	button {
		cursor: pointer;
	}
	h1, h2, h3, h4, h5 {
		font-size: inherit;
		line-height: inherit;
		font-weight: inherit;
		margin: 0;
	}
	a {
		cursor: pointer;
		color: inherit;
		text-decoration: none;

		&.link {
			transition: all 0.1s ease;
			opacity: 0.75;

			&:hover { opacity: 1; }
		}
	}
	pre {
		@color: black;

		position: relative;
		padding: 0.5em;
		width: 100%;
		min-height: 2em;

		//margin-bottom: 0.5em;
		//&:first-of-type { margin-top: 1em; }
		//&:last-of-type { margin-bottom: 0em; }
		& + & { margin-top: 1em; }

		//color: fade(@color, 65);
		tab-size: 4;
		white-space: pre;

		outline: 1px solid fade(@color, 25);
		background-color: fade(@color, 5);
		overflow: auto;
		//display: none;

		// label
		&[name]:after {
			position: absolute;
			top: 0; right: 0;
			background-color: fade(@color, 15);
			font-size: 13px;
			line-height: 1em;
			font-family: sans-serif;
			color: fade(@color, 75);
			padding: 0.25em 0.5em;
			content: attr(name);
			font-family: inherit;
		}

		&[maxheight] {
			max-height: 12em;;
		}
	}
	hr {
		border: none;
		border-top: 1px solid;
		margin: 0.5em 0;
		opacity: 0.25;
	}
	ul, ol {
		margin-left: 1rem;
	}
	mark {
		[showBorders2] & { display: inline-block; }

		//display: none;
	}

	.view {
		margin: 0 auto;
		&__inner {
			//background-color: fade( white, 90 );
			//padding: 1rem;
		}
	}
	.hSpace--app {
		padding-left: 1rem;
		padding-right: 1rem;
	}
	.hSpace--formRow {
		padding-left: 1rem;
		padding-right: 1rem;
	}
	.hSpace--appBody {
		padding-left: 2rem;
		padding-right: 2rem;
	}
	.maxWidth--appBody {
		max-width: 950px;
	}
	.contentModule {
		position: relative;

		[showBorders3] & {
			.label( attr(name), blue, white );
			outline: 1px solid blue;
			background-color: fade( blue, 10 );
		}

		//&__inner { padding: 1em; }
	}
	.circleIcon {
		position: relative;
		height: 30px; width: 30px;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		cursor: pointer;
		transition: all 0.2s ease;

		&::before { // border
			position: absolute;
			top: 0; left: 0; right: 0; bottom: 0;
			border-radius: inherit;
			border: 1px solid currentColor;
			content: "";
			opacity: 0.5;
			transition: inherit;
		}
		&::after { // background
			position: absolute;
			top: 0; left: 0; right: 0; bottom: 0;
			border-radius: inherit;
			background-color: currentColor;
			content: "";
			opacity: 0.05;
			transition: inherit;
		}
		&:active {
			transform: translateY(2px);
		}

		.BaseIcon {
			opacity: 0.75;
			transition: inherit;
		}

		&:hover {
			&::before, .BaseIcon { opacity: 1; }
			&::after { opacity: 0.1; }
		}

		&--isDisabled {
			pointer-events: none;
			&::before { border-style: dashed; opacity: 0.35; }
			.BaseIcon { opacity: 0.35; }
		}
	}
	.richText {
		a {
			transition: all 0.1s ease;
			opacity: 0.65;
		}
		a:hover {
			opacity: 1;
			text-decoration: underline;
		}
		p + p {
			margin-top: 0.65em;
		}
	}
	.circleNumber {
		.font--sizeMini;
		.font--medium;

		height: 15px; width: 15px;
		display: inline-flex;
		justify-content: center;
		align-items: center;

		background-color: currentColor;
		border-radius: 50%;
		transform: translateY(-25%);

		&::before {
			content: attr(nr);
			line-height: 1em;
			color: white;
		}
	}
	.pointer {
		cursor: pointer;
	}
	.knDebug {
		[showBorders1] & { display: block; }

		position: fixed;
		left: 1em;
		bottom: 2em;
		background-color: lighten(red, 30);
		padding: 1em;
		z-index: 10;
		max-height: 250px;
		overflow-y: auto;
		overflow-x: hidden;
		display: none;
	}

	.App { // vars
		--sidebar-width : 250px; //@app[sidebarWidth];
	}
	.App { // layout
		min-height: 100vh;

		&__body {
			width: calc( 100% - var(--sidebar-width));
			margin-left: var(--sidebar-width);
		}
		&__sidebar {
			position: fixed;
			top: 0; left: 0; bottom : 0;
			width: var(--sidebar-width);
			z-index: 10;
		}
	}

	.App .KnTabsRow {
		.KnTabsRow__item--isEnabled + .KnTabsRow__item--isDisabled {
			margin-left: 5em;
		}
	}
	.App .BaseButton { // css vars
		//--transition   : all 0.15s ease;
		//--height       : 3em;
		//--fontFamily   : inherit;
		//--fontWeight   : inherit;
		//--borderRadius : 1em;

		--paddingLeft  : 1em;
		--paddingRight : 1em;
		--fontWeight : 500;

		--bgColor-filled          : @swatches[primary75];
		--bgColor-filled-hover    : @swatches[primary];
		--color-filled            : white;

		--borderWidth-outlined    : 0.15em;
		--borderStyle-outlined    : solid;
		--borderColor-outlined    : @swatches[primary75];

		--bgColor-outlined        : @swatches[primary5];
		--bgColor-outlined-hover  : @swatches[primary15];
		--bgColor-outlined-active : @swatches[primary15];
		--color-outlined          : @swatches[primary75];
		--color-outlined-hover    : @swatches[primary75];

		--transform-active        : translateY(2px);
	}
	.App .BaseButton--finish {
		--bgColor-filled          : fade(green, 75);
		--bgColor-filled-hover    : fade(green, 100);
		--color-filled            : white;
	}

	.vue-treeselect { // layout
		.vue-treeselect__control {
			height: 2em;
		}
		.vue-treeselect__placeholder, .vue-treeselect__single-value {
			line-height: 30px;
		}
		.vue-treeselect__multi-value {
			margin-bottom: 2px;
			line-height: 1em;
		}

		.vue-treeselect__multi-value-item-container {
			padding-top: 3px;
			padding-right: 2px;
		}
		.vue-treeselect__multi-value-item {
			padding: 2px 0;
		}
	}
	.vue-treeselect { // styling
		.vue-treeselect__control {
			background-color: fade( @swatches[primary], 10 );
			border: 1px solid fade( @swatches[primary], 25 );
			border-radius: 0.25em;
		}
		.vue-treeselect__control:hover {
			border-color: fade( @swatches[primary], 50 ) !important;
			background-color: fade( @swatches[primary], 20 ) !important;
		}

		.vue-treeselect__x-container,
		.vue-treeselect__control-arrow {
			color: fade( @swatches[primary], 50 );
		}
		.vue-treeselect__control-arrow:hover,
		.vue-treeselect__x-container:hover {
			color: fade( @swatches[primary], 100 );
		}

		.vue-treeselect__placeholder {
			color: fade( @swatches[primary], 35 );
		}

		.vue-treeselect__single-value {
			color: currentColor;
		}

		.vue-treeselect__multi-value-item {
			background-color: fade( @swatches[primary], 75 );
			color: fade( @swatches[white], 90 );
			border-radius: 0.35em;
		}
		.vue-treeselect__value-remove {
			color: fade( @swatches[white], 50 );
			border-left-color: fade( @swatches[white], 25 );
		}
		.vue-treeselect__multi-value-item:hover .vue-treeselect__value-remove {
			color: fade( @swatches[white], 100 );
		}
	}

	@media @mq[xs] {}
	@media @mq[sm] {}
	@media @mq[md] {}
	@media @mq[dt] {}
	@media @mq[lg] {}
	@media @mq[xl] {}
</style>
