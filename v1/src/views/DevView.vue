<template>
	<MhRouterView class="DevView view maxWidth maxWidth--appBody" :isContentReady="isContentReady">

		<div class="DevView__inner view__inner">

			<br /><strong>DevView.vue</strong><hr />

			<BaseDebugOverview class="background background--white"></BaseDebugOverview>
			<br/><br/><br/><hr />

			<KnFormHeaderRow
				:title="'Create Record'"
				:subTitle="'Step 2/5'"
			></KnFormHeaderRow>
			<hr/>
			<KnTabsRow
				class="font font--sizeLarge font--medium background background--white"
				:activeClass="''"
				:inactiveClass="'inactiveClass'"
				:enabledClass="'enabledClass'"
				:disabledClass="'color--primary50'"
				:items="[
					{ label : '<span class=circleNumber nr=1></span> Disease', isEnabled : true, },
					{ label : '<span class=circleNumber nr=2></span> Inventory', isEnabled : true, },
					{ label : '<span class=circleNumber nr=3></span> Bone&nbsp;changes', isEnabled : false, },
					{ label : '<span class=circleNumber nr=4></span> Site', isEnabled : false, },
					{ label : '<span class=circleNumber nr=5></span> Publication', isEnabled : false, },
				]"
			></KnTabsRow>
			<hr/>
			<KnTextRow
				class="font font--sizeDefault background background--white50">
				Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
			</KnTextRow>
			<hr/>
			<KnTabsRow
				class="font font--sizeDefault font--medium background background--white50"
				:inactiveClass="'color--primary50'"
				:items="[
					{ label : 'Cranial District', },
					{ label : 'Axial sceleton',  },
					{ label : 'Right upper limb',  },
					{ label : 'Left upper limb',  },
					{ label : 'Right lower limb',  },
				]"
			></KnTabsRow>
			<hr/>
			<KnColumnLabelsRow
				class="font font--sizeSmall color color--primary50"
				:items="[
					{ label : 'Bone', span : 5 },
					{ label : 'Investigatable material', span : 5, },
				]"
			></KnColumnLabelsRow>
			<hr/>
			<KnFormFieldRow>
				<div class="flex flex--middle font font--medium color color--primary50"
					 style="grid-column: span 5;">
					 Splanchnocranium
				</div>
				<div style="grid-column: span 3;">
					<BaseSelect
						:value="'Heiko richtig voll langer Nachname'"
						:label="'Choose ...'"
						:options="[
							'Mario',
							'Heiko richtig voll langer Nachname',
							'Silvio'
						]"
						@input="()=>{}"
						@change="()=>{}"
					></BaseSelect>
				</div>
				<div class="font font--sizeSmall color color--primary50"
					 style="grid-column: span 4;">Vier</div>
			</KnFormFieldRow>
			<KnFormFieldRow>
				<div class="flex flex--middle font font--medium color color--primary50"
					 style="grid-column: span 5;">
					 Permanent teeth
				</div>
				<div style="grid-column: span 3;">
					<BaseSelect
						:value="'Heiko'"
						:label="'Choose ...'"
						:options="[
							'Mario',
							'Heiko',
							'Silvio'
						]"
						@input="()=>{}"
						@change="()=>{}"
					></BaseSelect>
				</div>
				<div class="font font--sizeSmall color color--primary50"
					 style="grid-column: span 4;">
					 Vier
				</div>
			</KnFormFieldRow>
			<KnFormFieldRow>
				<div class="flex flex--middle font font--medium color color--primary50"
					 style="grid-column: span 2;">
					 Desiduous teeth
				</div>
				<div style="grid-column: span 3;">
					<BaseSelect
						:value="'Heiko langer Nachname'"
						:label="'Choose ...'"
						:options="[
							'Mario',
							'Heiko',
							'Silvio'
						]"
						@input="()=>{}"
						@change="()=>{}"
					></BaseSelect>
				</div>
				<div style="grid-column: span 3;">
					<BaseSelect
						:value="'Heiko'"
						:label="'Choose ...'"
						:options="[
							'Mario',
							'Heiko',
							'Silvio'
						]"
						@input="()=>{}"
						@change="()=>{}"
					></BaseSelect>
				</div>
				<div class="font font--sizeSmall color color--primary50"
					 style="grid-column: span 4;">
					 Vier
				</div>
			</KnFormFieldRow>
			<hr/>
			<KnFormFieldRow>
				<div style="grid-column: span 8; display: flex; justify-content: flex-end;">
					<div>
						<br/>
						<BaseButton
								class="font font--sizeLarge font--bold"
								:isOutlined="true"
								:isDisabled="true"
							>
							<template slot="before"></template>
							<template slot="default">Next step</template>
							<template slot="after">
								<MhIcon type="arrow-right"></MhIcon>
							</template>
						</BaseButton>
						<br/>
						<br/>
						<br/>
					</div>
				</div>
			</KnFormFieldRow>

			<hr/>

			<div class="background--white vhSpace vhSpace--medium">
				<strong>Vue-Treeselect Examples</strong><br/>
				<a href="https://vue-treeselect.js.org/">https://vue-treeselect.js.org/</a><br/>
				<br/>
				<div class="grid grid--gap grid--cols-3">
					<div>
						<Treeselect class="" v-model="value" :multiple="true" :options="options" />
					</div>
					<div>
						<Treeselect class="" v-model="value2" :multiple="true" :options="options2" />
					</div>
					<div>
						<Treeselect class="" v-model="value3" :multiple="false" :options="options2" />
					</div>
				</div>
				<hr/>
				<div class="grid grid--gap grid--cols-3">
					<pre name="value">{{value}}</pre>
					<pre name="value2">{{value2}}</pre>
					<pre name="value3">{{value3}}</pre>
				</div>
			</div>

			<hr/>

			<div>
				<MhIcon></MhIcon> &nbsp;
				<MhIcon type="arrow-left"></MhIcon> &nbsp;
				<MhIcon type="arrow-right"></MhIcon> &nbsp;
				<MhIcon type="download"></MhIcon> &nbsp;
				<MhIcon type="upload"></MhIcon> &nbsp;
				<MhIcon type="search-lense"></MhIcon> &nbsp;

				<hr />

				<div style="color: red">

					<a class="circleIcon">
						<MhIcon type="copy-and-paste"></MhIcon>
					</a> &nbsp;
					<a class="circleIcon">
						<MhIcon type="cross"></MhIcon>
					</a> &nbsp;
					<a class="circleIcon">
						<MhIcon type="triangle-down"></MhIcon>
					</a>

					&nbsp; &nbsp; &nbsp;

					<a class="circleIcon circleIcon--isDisabled">
						<MhIcon type="copy-and-paste"></MhIcon>
					</a> &nbsp;
					<a class="circleIcon circleIcon--isDisabled">
						<MhIcon type="cross"></MhIcon>
					</a> &nbsp;
					<a class="circleIcon circleIcon--isDisabled">
						<MhIcon type="triangle-down"></MhIcon>
					</a>

				</div>

				<hr />

				<div style="color: green">

					<a class="circleIcon">
						<MhIcon type="copy-and-paste"></MhIcon>
					</a> &nbsp;
					<a class="circleIcon">
						<MhIcon type="cross"></MhIcon>
					</a> &nbsp;
					<a class="circleIcon">
						<MhIcon type="triangle-down"></MhIcon>
					</a>

					&nbsp; &nbsp; &nbsp;

					<a class="circleIcon circleIcon--isDisabled">
						<MhIcon type="copy-and-paste"></MhIcon>
					</a> &nbsp;
					<a class="circleIcon circleIcon--isDisabled">
						<MhIcon type="cross"></MhIcon>
					</a> &nbsp;
					<a class="circleIcon circleIcon--isDisabled">
						<MhIcon type="triangle-down"></MhIcon>
					</a>

				</div>

				<br/><br/><br/>

			</div>

		</div>

	</MhRouterView>
</template>

<script>
	// @ is an alias to /src
	import Treeselect from '@riophae/vue-treeselect'
	import '@riophae/vue-treeselect/dist/vue-treeselect.css'

	import EventBus from '@/helper/EventBus.js'
	import RestHandler from '@/components/RestHandler/RestHandler.js'
	import MhRouterView from '@/components/MhRouterView/v4/MhRouterView.vue'

	import BaseDebugOverview from '@/components/MhForm/v5/BaseDebugOverview.vue'
	import MhIcon from '@/components/MhIcon/v2/MhIcon.vue'
	import BaseButton from '@/components/MhForm/v5/BaseButton.vue'
	import BaseSelect from '@/components/MhForm/v5/BaseSelect.vue'

	import KnFormHeaderRow from '@/molecules/KnFormHeaderRow.vue'
	import KnTabsRow from '@/molecules/KnTabsRow.vue'
	import KnTextRow from '@/molecules/KnTextRow.vue'
	import KnColumnLabelsRow from '@/molecules/KnColumnLabelsRow.vue'
	import KnFormFieldRow from '@/molecules/KnFormFieldRow.vue'

	import KnFieldCheckbox from '@/components/KnFieldCheckbox.vue'
	import KnFieldRestSelect from '@/components/KnFieldRestSelect.vue'
	import KnFieldSelect from '@/components/KnFieldSelect.vue'
	import KnFieldText from '@/components/KnFieldText.vue'

	export default {
		name: 'DevView',
		components: {
			MhRouterView,

			Treeselect,
			BaseButton,
			BaseSelect,

			BaseDebugOverview,
			MhIcon,

			KnFormHeaderRow,
			KnTabsRow,
			KnTextRow,
			KnColumnLabelsRow,
			KnFormFieldRow,

			KnFieldCheckbox,
			KnFieldRestSelect,
			KnFieldSelect,
			KnFieldText,
		},
		mixins: [
			RestHandler,
		],
		directives: {},
		props: {},
		data() {
			return {
				inventory      : undefined,
				isContentReady : false,

				// define the default value
				value: null,
				value2: null,
				value3: null,
				// define options
				options2: [
					{ id: 'a1', label: 'a1 Zusammenhalt', },
					{ id: 'b1', label: 'b2 Überwindung', },
					{ id: 'c1', label: 'c3 Fluchtursachen', },
				],
				options: [
					{
						id: 'a',
						label: 'a',
						children: [
							{
								id: 'aa',
								label: 'aa',
							},
							{
								id: 'ab',
								label: 'ab',
							}
						],
					},
					{
						id: 'b',
						label: 'b',
					},
					{
						id: 'c',
						label: 'c',
					}
				],
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
				let thingsToLoad = 2

				const runCallback = ()=>{
					--thingsToLoad

					if( !thingsToLoad && this._.isFunction( finalCallback ) ) finalCallback()
				}

				this.restHandler__fetch({
					action : 'GET',
					route : this.$store.getters.restBase + '/api/forms/?filter_by_key=disease',
					params : {},
					callback : (response) => {
						const results = response.data

						this._.forEach( results, (result)=>{
							this.$store.commit('addField', result)
						})

						runCallback()
					},
				})
				this.restHandler__fetch({
					action : 'GET',
					route : this.$store.getters.restBase + '/api/forms/?filter_by_key=inventory',
					params : {},
					callback : (response) => {
						const results = response.data

						this.inventory = {}
						this.inventory['cranial_district'] = results.cranial_district

						this._.forEach( this.inventory.cranial_district, (field)=>{
							this.$store.commit('addField', field)
						})

						runCallback()
					},
				})
				/*
				*/
			},
		},
		mounted(){
			/*
			this.fetchAll(()=>{
				console.log( this.$options.name, '• fetchAll() • finalCallback()')

				this.isContentReady = true
			})
			*/
			this.isContentReady = true
		},
	}
</script>

<style lang="less">
	@import (reference) "../less/vars.less";
	@import (reference) "../less/mixins.less";
	@import (reference) "../less/atoms.less";

	.DevView {
		&__inner {}
	}


	@media @mq[xs] {}
	@media @mq[sm] {}
	@media @mq[md] {}
	@media @mq[dt] {}
	@media @mq[lg] {}
	@media @mq[xl] {}
</style>
