<!--

	Diese Componente gibt eine Übersicht
	über alle BaseForm Elemente mit
	all ihren möglichen Zuständen.

	<BaseDebugOverview></BaseDebugOverview>

	2021-08-14	init

-->

<template>
	<div class="BaseDebugOverview" name="BaseDebugOverview" :class="elmClasses">
		<div class="BaseDebugOverview__inner">
			<strong>BaseDebugOverview</strong><br/>
			Überlick über alle FormFields<br/>
			<br/>
			<hr/>
			<BaseFileInput
				class="fon font--sizeSmall"
				:accept="'.csv'"
				:multiple="false"
				@input="(e)=>{}"
				@change="(e)=>{}">
				<template slot="before">
					★
				</template>
				<template slot="default">CSV-Datei hochladen ...</template>
				<template slot="after">
					②
				</template>
			</BaseFileInput> &nbsp;
			<BaseFileInput
				class="fon font--sizeSmall"
				:accept="'.csv'"
				:multiple="false"
				:isDisabled="true"
				@input="(e)=>{}"
				@change="(e)=>{}">
				<template slot="before">
					B
				</template>
				<template slot="default">CSV-Datei hochladen ...</template>
				<template slot="after">
					A
				</template>
			</BaseFileInput>
			&emsp; <mark>Todo: BaseFileInput</mark>
			<hr/>
			<BaseButton>
				<template v-slot:before>B</template>
				<template v-slot:default>Absenden</template>
				<template v-slot:after>A</template>
			</BaseButton> &nbsp;
			<BaseButton :isDisabled="true">
				<template v-slot:before>B</template>
				<template v-slot:default>Absenden</template>
				<template v-slot:after>A</template>
			</BaseButton>
			<hr/>
			<BaseButton :isOutlined="true">OK</BaseButton> &nbsp;
			<BaseButton :isOutlined="true">
				<template v-slot:before>B</template>
				<template v-slot:default>Absenden</template>
				<template v-slot:after>A</template>
			</BaseButton> &nbsp;
			<BaseButton :isOutlined="true" :isDisabled="true">Cancel</BaseButton>

			<hr/>
			<div class="grid grid--cols-2 grid--gap" style="font-size: 1em;">
				<!--
				<BaseRadio
					:name="'myGroup'"
					:value="true"
					:disabled="false"
					@change="()=>{}"
					@input="()=>{}"
				></BaseRadio>
				<BaseRadio
					:name="'myGroup'"
					:value="true"
					:disabled="true"
					@change="()=>{}"
					@input="()=>{}"
				></BaseRadio>
				-->
				<BaseRadio
					style="color: green"
					:name="'myGroup23'"
					v-model="trashModel2"
					:checkedValue="'B'"
					@change="()=>{}"
					@input="()=>{}"
				></BaseRadio>
				<BaseRadio
					style="color: red"
					:name="'myGroup23'"
					v-model="trashModel2"
					:checkedValue="'B'"
					@change="()=>{}"
					@input="()=>{}"
				></BaseRadio>
				<div>
					<pre name="trashModel2">{{trashModel2}}</pre>
				</div>
				<div>
				<input type=radio name=daltons value=jack>
				<input type=radio name=daltons value=joe>
				<input type=radio name=daltons value=jim>
				<input type=checkbox :value="'heiko'" v-model="trashModel">

				</div>

				<BaseCheckbox
					:value="true"
					@change="()=>{}"
					@input="()=>{}"
				></BaseCheckbox>
				<BaseCheckbox
					:value="true"
					:disabled="true"
					@change="()=>{}"
					@input="()=>{}"
				></BaseCheckbox>
				<BaseCheckbox
					style="color: green"
					:value="true"
					:disabled="true"
					@change="()=>{}"
					@input="()=>{}"
				></BaseCheckbox>
				<BaseCheckbox
					style="color: red"
					:value="true"
					:disabled="true"
					@change="()=>{}"
					@input="()=>{}"
				></BaseCheckbox>

				<BaseSelect
					:value="'Heiko'"
					:label="'Choose ...'"
					:options="[
						'Mario',
						'Heiko',
						'Silvio'
					]"
					@change="()=>{}"
				></BaseSelect>
				<BaseSelect
					:value="'mario'"
					:label="'Choose ...'"
					:disabled="true"
					:options="[
						{ label : 'Mario',  value : 'mario', },
						{ label : 'Heiko',  value : 'heiko', },
						{ label : 'Silvio', value : 'silvio', },
					]"
					@change="()=>{}"
				></BaseSelect>

				<BaseSelect
					style="color: green"
					:value="'mario'"
					:label="'Choose ...'"
					:options="[
						{ label : 'Mario',  value : 'mario', },
						{ label : 'Heiko',  value : 'heiko', },
						{ label : 'Silvio', value : 'silvio', },
					]"
					@change="()=>{}"
				></BaseSelect>
				<BaseSelect
					style="color: green"
					:value="'mario'"
					:label="'Choose ...'"
					:disabled="true"
					:options="[
						{ label : 'Mario',  value : 'mario', },
						{ label : 'Heiko',  value : 'heiko', },
						{ label : 'Silvio', value : 'silvio', },
					]"
					@change="()=>{}"
				></BaseSelect>

				<BaseSelect
					style="color: red"
					:value="'mario'"
					:label="'Choose ...'"
					:hasClearButton="true"
					:options="[
						{ label : 'Mario123 mit einem richtig langem Label, dass garantiert einen Overflow verursacht.',  value : 'mario', },
						{ label : 'Heiko',  value : 'heiko', },
						{ label : 'Silvio', value : 'silvio', },
					]"
					@change="()=>{}"
				></BaseSelect>
				<BaseSelect
					style="color: red"
					:value="'mario'"
					:label="'Choose ...'"
					:disabled="true"
					:hasClearButton="true"
					:options="[
						{ label : 'Mario',  value : 'mario', },
						{ label : 'Heiko',  value : 'heiko', },
						{ label : 'Silvio', value : 'silvio', },
					]"
					@change="()=>{}"
				></BaseSelect>

				<BaseText
					:value="'Mein Standardwert'"
					:placeholder="''"
					:required="false"
					:disabled="false"
					:hasClearButton="false"
					@change="(e)=>{}"
					@input="(value)=>{}"
				></BaseText>
				<BaseText
					:value="'disabled • Mein Standardwert'"
					:placeholder="''"
					:required="false"
					:disabled="true"
					:hasClearButton="false"
					@change="(e)=>{}"
					@input="(value)=>{}"
				></BaseText>

				<BaseText
					style="color: red;"
					:value="'color:red • und mal ein längerer text mit overflow'"
					:placeholder="'Enter ..'"
					:required="false"
					:disabled="false"
					:hasClearButton="true"
					@change="(e)=>{}"
					@input="(value)=>{}"
				></BaseText>
				<BaseText
					style="color: red;"
					:value="'color:red • und mal ein längerer text mit overflow'"
					:placeholder="'Enter ..'"
					:required="false"
					:disabled="true"
					:hasClearButton="true"
					@change="(e)=>{}"
					@input="(value)=>{}"
				></BaseText>

				<BaseText
					style="color: green;"
					:value="'color:green • In Ordnung'"
					:placeholder="'Enter ..'"
					:required="false"
					:hasClearButton="true"
					@change="(e)=>{}"
					@input="(value)=>{}"
				></BaseText>
				<BaseText
					style="color: green;"
					:value="'color:green • disabled'"
					:placeholder="''"
					:required="false"
					:disabled="true"
					:hasClearButton="true"
					@change="(e)=>{}"
					@input="(value)=>{}"
				></BaseText>
			</div><hr/>
			<div class="grid grid--cols-2 grid--gap">
				<BaseTextarea
					:value="'Beispieltext'"
					:placeholder="''"
					:required="false"
					:resizeable="'vertical'"
					@change="(e)=>{}"
					@input="(value)=>{}"
				></BaseTextarea>
				<BaseTextarea
					:value="'disabled • Beispieltext'"
					:placeholder="''"
					:required="false"
					:disabled="true"
					@change="(e)=>{}"
					@input="(value)=>{}"
				></BaseTextarea>
				<BaseTextarea
					style="color: red; font-size: 14px;"
					:value="'color:red font-size:14px • Beispieltext'"
					:placeholder="''"
					:required="false"
					:disabled="false"
					@change="(e)=>{}"
					@input="(value)=>{}"
				></BaseTextarea>
				<BaseTextarea
					style="color: red; font-size: 14px;"
					:value="'disabled • color:red font-size:14px • Beispieltext'"
					:placeholder="''"
					:required="false"
					:disabled="true"
					@change="(e)=>{}"
					@input="(value)=>{}"
				></BaseTextarea>
			</div>
			<!-- -->
		</div>
	</div>
</template>

<script>
	// @ is an alias to /src
	import "./FormField.less";

	import BaseFileInput from './BaseFileInput.vue'
	import BaseCheckbox from './BaseCheckbox.vue'
	import BaseRadio from './BaseRadio.vue'
	import BaseSelect from './BaseSelect.vue'
	import BaseButton from './BaseButton.vue'
	import BaseText from './BaseText.vue'
	import BaseTextarea from './BaseTextarea.vue'

	export default {
		name: 'BaseDebugOverview',
		components: {
			BaseCheckbox,
			BaseRadio,
			BaseSelect,
			BaseFileInput,
			BaseButton,
			BaseText,
			BaseTextarea,
		},
		mixins: [],
		props: {},
		data(){
			return {
				trashModel  : 'mario',
				trashModel2 : 'hanna',
			}
		},
		watch: {},
		computed: {
			app(){
				return this.$root.$children[0]
			},
			elmClasses(){
				let classes = []

				return classes
			},
		},
		methods: {},
		created(){},
		mounted(){},
		destroyed(){},
	}
</script>

<style lang="less">
	.BaseDebugOverview { // layout
		&__inner {}
	}
	.BaseDebugOverview { // styling
		&__inner { padding: 1em; }
	}
</style>
