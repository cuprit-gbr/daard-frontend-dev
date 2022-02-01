<!--

	Was macht diese Componente?
	Wofür ist die Compoente da?

	Welche $props gibt es?

	Beispiel Code:
		<KnAppSidebar></KnAppSidebar>

	2021-07-05	init

-->

<template>
	<div class="KnAppSidebar" name="KnAppSidebar" :class="elmClasses">
		<div class="KnAppSidebar__inner">
			<!-- logo -->
			<div class="KnAppSidebar__box KnAppSidebar__box--logo">
				<router-link :to="'/'"></router-link>
			</div>

			<!-- body -->
			<div class="KnAppSidebar__box KnAppSidebar__box--title">
				<p class="font font--sizeLarge color color--primary75">
					<strong class="">DAARD</strong><br/>
					<span class="font font--medium">Digital Atlas Of Ancient Rare Diseases</span><br/>
					<br/>
				</p>
			</div>
			<div class="KnAppSidebar__box KnAppSidebar__box--buttons flex flex--column flex--center">
				<BaseButton
					:isOutlined="'HomeView' !== $route.name"
					@click.native="$router.push('/')">
					Map
				</BaseButton>
				<BaseButton
					:isOutlined="'LoginView' !== $route.name"
					@click.native="$router.push('/login/')">
					Login
				</BaseButton>
				<BaseButton
					:isOutlined="'EditView' !== $route.name"
					:isDisabled="!accessToken"
					@click.native="$router.push('/edit/')">
					Create Record
				</BaseButton>
				<BaseButton
					:isOutlined="true"
					:isDisabled="false"
					:tag="'a'"
					:target="'_blank'"
					:href="currentEnv.baseUrl + '/uploaded/pdfs/daard_help.pdf'">
					Help
				</BaseButton>
			</div>

			<!-- debug infos -->
			<div class="KnAppSidebar__box KnAppSidebar__box--debug">
				<pre name="requestToken">{{requestToken}}</pre>
				<pre name="accessToken">{{accessToken}}</pre>
				<pre name="currentEnv.restBase">{{currentEnv.restBase}}</pre>
			</div>

			<!-- footer -->
			<div class="KnAppSidebar__expander"></div>
			<div class="KnAppSidebar__box KnAppSidebar__box--footer color color--primary75">
				<a class="link" href="https://www.dainst.org/impressum" target="_blank">Imprint</a>
				<a class="link" @click="app.showContactModal = true">Contact</a>
			</div>
		</div>
	</div>
</template>

<script>
	// @ is an alias to /src
	import EventBus from '@/helper/EventBus.js'
	import { mapGetters } from 'vuex'
	import currentEnv from '@/helper/getCurrentEnv.js'
	import BaseButton from '/Users/Mario/Dropbox/htdocs/2020-09-17__MhForm/vue-cli-dev/src/components/MhForm/v4/BaseButton.vue'

	export default {
		name: 'KnAppSidebar',
		components: {
			BaseButton,
		},
		mixins: [],
		props: {},
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

				//classes.push( this.$options.name + '--isAnimating')

				return classes
			},
			...mapGetters([
				'currentEnv',
				'requestToken',
				'accessToken',
    		]),
		},
		methods: {
			XXXdoDevFetch( doLog = true ){
				console.group( this.$options.name, '• doDevFetch()')
				console.groupEnd()

				let dataToSubmit = {
					"adults": true,
					"subadults": true,
					"age_class": "0–3",
					"disease": 2,
					"age": "does_not_apply",
					"age_freetext": "",
					"sex": "unknown",
					"inventory": {
						"1": {
						"id": 1,
						"label": "Neurocranium",
						"svgid": "bone166,bone152,bone170",
						"amount": "<75%",
						"name": "neurocranium",
						"section": "cranial_district"
						},
						"3": {
						"id": 3,
						"label": "Mandible",
						"svgid": "bone153",
						"amount": "<75%",
						"name": "mandible",
						"section": "cranial_district"
						}
					},
					"bone_relations": {
						"1": {
						"id": 1,
						"label": "Neurocranium (cranial_district)",
						"name": "neurocranium__radiography",
						"section": "cranial_district",
						"technic": "Radiography",
						"bone_change": []
						},
						"3": {
						"id": 3,
						"label": "Mandible (cranial_district)",
						"name": "mandible__radiography",
						"section": "cranial_district",
						"technic": "Radiography",
						"bone_change": []
						}
					},
					"reference_images": "",
					"origin": "archaeological",
					"position": "11.68396376604082,48.1405923004482",
					"gazId": "2114755",
					"gaz_link": "https://gazetteer.dainst.org/place/2114755",
					"archaeological_tombid": "",
					"archaeological_individualid": "",
					"archaeological_funery_context": "primary",
					"archaeological_burial_type": "single",
					"storage_place": "institution_3",
					"storage_place_freetext": "",
					"storage_condition": "accessible_for_study",
					"chronology": "",
					"dating_method": "horn",
					"dna_analyses": "absent",
					"dna_analyses_link": "",
					"published": false,
					"publication_link": ""
				}

				console.log('v', 6)

				//dataToSubmit.disease = 'helbing' // force type error

				const accessToken = this.$store.getters.accessToken
				const requestUrl = this.$store.getters.restBase + '/api/disease-case/'
				let res = fetch( requestUrl, {
						body: JSON.stringify( dataToSubmit ),
						//mode: 'no-cors',
						//cache: 'no-cache',
						//credentials: 'include',
						//referrerPolicy: 'origin-when-cross-origin',
						referrerPolicy: 'origin-when-cross-origin',
						headers: {
							//'Accept': 'application/json, text/plain, */*',
							'Authorization': `Bearer ${accessToken}`,
							'Content-Type': 'application/json',
						},
						method: "post"
					}
				)
				//.then( response => response.json() )
				.then( response => {
					console.log( response.status ) // Will show you the status
					console.log( response ) // Will show you the status
    				if ( !response.ok ) {
						//this.isRunningFinalSubmit = false
						//console.error( response.json() )
        				//throw new Error("HTTP status " + response.status);
						console.log('error!')
    				}

					return response.json()
				})
				.then( data => {
					console.log('data:', data )
				});


			},
		},
		created(){},
		mounted(){},
		destroyed(){},
	}
</script>

<style lang="less">
	@import (reference) "@/less/vars.less";
	@import (reference) "@/less/mixins.less";
	@import (reference) "@/less/atoms.less";

	.KnAppSidebar { // vars
		//
	}
	.KnAppSidebar { // debug
		[showBorders1] &__box--debug { display: block; }
	}
	.KnAppSidebar { // layout
		&__inner {
			display: flex;
			flex-direction: column;
			height: 100%;
			overflow-x: hidden;
			overflow-y: auto;
		}
		&__expander {
			flex-grow: 1;
		}
		&__box--footer {
			display: flex;
			justify-content: center;
		}
		&__box--debug {
			display: none;
		}
	}
	.KnAppSidebar { // styling
		background-color: @swatches[sidebarBg];
		color: @swatches[primary];

		&::after { // shadow left
			position: absolute;
			top: 0; right: 0; bottom: 0;
			width: 15px;
			transform: translateX(100%);
			background: linear-gradient(90deg, #000000 0%, rgba(0, 0, 0, 0) 100%);
			opacity: 0.05;
			content: "";
		}

		&__box {
			padding: 15px;
			border-top: 1px solid @swatches[primary15];
		}
		&__box--logo {
			padding: 30px;

			a {
				//outline: 1px solid red;
				padding-bottom: 100%;
				display: block;
				background-image: url("~@/assets/imgs/logo.svg");
				background-position: center;
				background-repeat: no-repeat;
				background-size: contain;
				//border: 15px solid transparent;
			}
		}
		&__box--title {}
		&__box--footer {
			a { padding: 0 0.5em; }
		}

		.BaseButton + .BaseButton {
			margin-top: 0.5em;
		}

		//&__footer { border: none; }
	}

	@media @mq[xs] {}
	@media @mq[sm] {}
	@media @mq[md] {}
	@media @mq[dt] {}
	@media @mq[lg] {}
	@media @mq[xl] {}
</style>
