<!--

	Was macht diese Componente?
	Wofür ist die Compoente da?

	Welche $props gibt es?

	Beispiel Code:
		<DevDocTable></DevDocTable>

	2021-07-05	init

-->

<template>
	<div class="DevDocTable contentModule" name="DevDocTable" :class="elmClasses">
		<div class="DevDocTable__inner contentModule__inner">
			<strong>DevDocTable.vue</strong> — Displays the Doc data as table<br/>
            <br/><hr/><br/>

			<div class="DevDocTable__tableWrapper">
				<table>
					<!-- head -->
					<thead>
						<tr>
							<th>#</th>
							<th v-for="(col, thIndex) in doc.dataColumnTitles" :key="'thIndex' + thIndex">
								{{col}}
							</th>
							<th></th>
						</tr>
					</thead>
					<!-- body -->
					<tbody>
						<tr v-for="(row, trIndex) in doc.dataRows" :key="'trIndex' + trIndex">
							<td>{{trIndex}}</td>
							<td v-for="(col, tdIndex) in row" :key="'tdIndex' + tdIndex">
								{{col}}
							</td>
							<td>
								<button @click="doc.removeDataRow( trIndex )">Remove</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

            <br/>
			<button @click="doc.addDataRow()">Add Row</button>
            <br/><br/>

			<!--
            <pre name="doc.dataRows">{{doc.dataRows}}</pre>
            <pre name="doc.activeRowIndex">{{doc.activeRowIndex}}</pre>
            <pre name="doc.dataColumnTitles">{{doc.dataColumnTitles}}</pre>
            <pre name="doc.activeDataRow">{{doc.activeDataRow}}</pre>
			-->
		</div>
	</div>
</template>

<script>
	// @ is an alias to /src
	//import DevInfos from '@/components/DevInfos.vue'
	import EventBus from './../../event-bus.js'

	export default {
		name: 'DevDocTable',
		components: {},
		mixins: [],
		props: {
			//imageObject: [Object, Boolean],
			//text: [String],
			doc: {
				type     : [Object, Boolean],
				default  : false,
				required : false,
			},
		},
		data(){
			return {}
		},
		watch: {
			someVar: {
				handler: function( to, from ) {
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

				//classes.push( this.$options.name + '--isAnimating')

				return classes
			},
        },
		methods: {
			handleScroll( doLog = true ){
				// groupCollapsed group
				if( doLog ){
					console.groupCollapsed( this.$options.name, '• handleScroll()' )
					//console.log('key:', value)
					console.groupEnd()
				}
			},
		},
		created(){
			//window.addEventListener('scroll', this.handleScroll);
		},
		mounted(){},
		destroyed(){
   			//window.removeEventListener('scroll', this.handleScroll);
 		},
	}
</script>

<style lang="less">
	@import (reference) "../../less/vars.less";
	@import (reference) "../../less/mixins.less";
	@import (reference) "../../less/atoms.less";

	.DevDocTable { // debug
		[showBorders2] & {}
	}
	.DevDocTable { // layout
		&__tableWrapper { width: 100%; overflow: scroll; }
        table { width: 100%; }
	}
	.DevDocTable { // styling
        padding: 1em;
        outline: 1px solid fade(black, 50);
        background-color: fade(white, 75);

        table { border-collapse: collapse; background-color: fade(white, 75); }
        table, td, th { border: 1px solid black; }
        thead tr { background-color: fade(black, 15); }
        th, td { padding: 0.25em; text-align: left; vertical-align: top; }
	}

	@media @mq[xs] {}
	@media @mq[sm] {}
	@media @mq[md] {}
	@media @mq[dt] {}
	@media @mq[lg] {}
	@media @mq[xl] {}
</style>
