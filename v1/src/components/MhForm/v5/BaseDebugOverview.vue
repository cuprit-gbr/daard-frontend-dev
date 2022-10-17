<!--

	Diese Componente gibt eine Übersicht
	über alle BaseForm Elemente mit
	all ihren möglichen Zuständen.

	<BaseDebugOverview></BaseDebugOverview>

	2021-08-14	init

-->

<template>
	<div class="BaseDebugOverview" name="BaseDebugOverview" :class="elmClasses">
		<strong>BaseDebugOverview • v4</strong><br/>
		Überlick über alle FormFields<br/>
		<br/>

		<!-- BaseSearchSelect -->
		<section class="section">
			<h2 class="section__title">
				BaseSearchSelect
			</h2>
			<div class="section__desc">
				Inspired by <a href="https://select2.org/tagging">https://select2.org/tagging</a><br/>
				<hr>
			</div>

			<!-- Prämise -->
			<div class="grid grid--cols-2 grid--gap">
				<div>
					<strong>Prämise:</strong><br/>
					Das die :value eines &lt;select&gt; muss zwingend in den :options
					vorhanden sein, damit das select als --isValid gilt.
					Ein &lt;select&gt; mit einer leeren :value ist immer --isValid.
					<br/>
					<strong>Daraus ergeben sich folgende Fälle:</strong><br/>
					<br/>
				</div>
			</div>

			<!-- All cases -->
			<div class="section__subSection grid grid--cols-2 grid--gap">
				<div>
					<div class="section__numberedRow" number="1">
						Ein &lt;select&gt; mit einer :value, die im :options Array enthalten ist, ist gültig.<br/>
						Die :value wird im &lt;select&gt; angezeigt<br/>
						<br/>
						<div class="textarea__wrapper" name="baseSearchSelect1__markup">
							<textarea
								:value="getCodeStr( baseSearchSelect1__markup )"
								v-textarea-autogrow
								disabled
							></textarea>
						</div>
					</div>
				</div>
				<div>
					<BaseSearchSelect
						:value="'Heiko'"
						:placeholder="'Choose ...'"
						:options="[
							'Mario',
							'Heiko',
							'Silvio',
						]"
						:hasClearButton="true"
						:debug="true"
						@change="()=>{}"
					></BaseSearchSelect>
				</div>
			</div>
			<div class="section__subSection grid grid--cols-2 grid--gap">
				<div>
					<div class="section__numberedRow" number="2">
						Ein &lt;select&gt; mit einer :value, die nicht im :options Array enthalten ist, ist	ungültig. <br/>
						Die ungültige :value wird nicht im &lt;select&gt; angezeigt, stattdessen wird der :placeholder angezeigt.<br/>
						<br/>
						<div class="textarea__wrapper" name="baseSearchSelect1__markup">
							<textarea
								:value="getCodeStr( baseSearchSelect2__markup )"
								v-textarea-autogrow
								disabled
							></textarea>
						</div>
					</div>
				</div>
				<div>
					<BaseSearchSelect
						:value="'Philipp'"
						:placeholder="'Choose ...'"
						:options="[
							'Tom',
							'Sashi',
							'Nora',
						]"
						:hasClearButton="true"
						:debug="true"
						@change="()=>{}"
					></BaseSearchSelect>
				</div>
			</div>
			<div class="section__subSection grid grid--cols-2 grid--gap">
				<div>
					<div class="section__numberedRow" number="3">
						Ein &lt;select mit einer leeren :value ist gültig.<br/>
						Im &lt;select&gt; wird der :placeholder angezeigt.<br/>
						<br/>
						<div class="textarea__wrapper" name="baseSearchSelect3__markup">
							<textarea
								:value="getCodeStr( baseSearchSelect3__markup )"
								v-textarea-autogrow
								disabled
							></textarea>
						</div>
					</div>
				</div>
				<div>
					<BaseSearchSelect
						:value="''"
						:placeholder="'Choose ...'"
						:options="[
							'Mario',
							'Franzi',
							'Philipp',
							'Hanna',
						]"
						:hasClearButton="true"
						:debug="true"
						@change="()=>{}"
					></BaseSearchSelect>
				</div>
			</div>
			<div class="section__subSection grid grid--cols-2 grid--gap">
				<div>
					<div class="section__numberedRow" number="4">
						Ein &lt;select&gt; mit einer :value die im :options Array enthalten ist, ist gültig. <br/>
						Die :value wird im &lt;select&gt; angezeigt. <br/>
						Wird nun das :options Array geändert, so dass die :value auf einmal nicht mehr
						vorhanden ist, wird das &lt;select&gt; ungültig. Im &lt;select&gt; wird nun der
						:placeholder angezeigt.<br/>
						<br/>
						<div class="textarea__wrapper" name="baseSearchSelect4__markup">
							<textarea
								:value="getCodeStr( baseSearchSelect4__markup )"
								v-textarea-autogrow
								disabled
							></textarea>
						</div>
						<div class="textarea__wrapper" name="baseSearchSelect4__options1">
							<textarea
								:value="getCodeStr( baseSearchSelect4__options1 )"
								v-textarea-autogrow
								disabled
							></textarea>
						</div>
						<div class="textarea__wrapper" name="baseSearchSelect4__options2">
							<textarea
								:value="getCodeStr( baseSearchSelect4__options2 )"
								v-textarea-autogrow
								disabled
							></textarea>
						</div>
						<div>
							Toggle options: <input type="checkbox" v-model="baseSearchSelect4__isTogglesOptions" /><br/>
							<pre name="baseSearchSelect4__isTogglesOptions">{{baseSearchSelect4__isTogglesOptions}}</pre>
						</div>
					</div>
				</div>
				<div>
					<BaseSearchSelect
						:value="'Franzi'"
						:placeholder="'Choose ...'"
						:options="baseSearchSelect4__isTogglesOptions ? getParsedStr(baseSearchSelect4__options2) : getParsedStr(baseSearchSelect4__options1)"
						:hasClearButton="true"
						:debug="true"
						@change="()=>{}"
					></BaseSearchSelect>
				</div>
			</div>
			<div class="section__subSection grid grid--cols-2 grid--gap">
				<div>
					<div class="section__numberedRow" number="5">
						Gleiches gilt, wenn die :value später ausgetauscht wird: Das
						&lt;select&gt; wird ungültig und im &lt;select&gt; wird nun der :placeholder
						angezeigt.<br/>
						<br/>
						<div class="textarea__wrapper" name="baseSearchSelect1__markup">
							<textarea
								:value="getCodeStr( baseSearchSelect5__markup )"
								:name="'baseSearchSelect5__markup'"
								v-textarea-autogrow
								disabled
							></textarea>
						</div>
						<div class="textarea__wrapper" name="baseSearchSelect5__value1">
							<textarea
								:value="getCodeStr( baseSearchSelect5__value1 )"
								v-textarea-autogrow
								disabled
							></textarea>
						</div>
						<div class="textarea__wrapper" name="baseSearchSelect5__value2">
							<textarea
								:value="getCodeStr( baseSearchSelect5__value2 )"
								v-textarea-autogrow
								disabled
							></textarea>
						</div>
						<div>
							Toggle values: <input type="checkbox" v-model="baseSearchSelect5__isTogglesValues" /><br/>
							<pre name="baseSearchSelect5__isTogglesValues">{{baseSearchSelect5__isTogglesValues}}</pre>
						</div>
					</div>
				</div>
				<div>
					<BaseSearchSelect
						:value="baseSearchSelect5__isTogglesValues ? getParsedStr( baseSearchSelect5__value2 ) : getParsedStr( baseSearchSelect5__value1 )"
						:placeholder="'Choose ...'"
						:options="[
							'Mario',
							'Franzi',
							'Philipp',
							'Hanna',
						]"
						:hasClearButton="true"
						:debug="true"
						@change="()=>{}"
					></BaseSearchSelect>
				</div>
			</div>

		</section>

		<!-- BaseSelect -->
		<section class="section">
			<h2 class="section__title">
				BaseSelect
			</h2>
			<div class="section__desc"></div>

			<!-- Prämise -->
			<div class="grid grid--cols-2 grid--gap">
				<div>
					<strong>Prämise:</strong><br/>
					Das die :value eines &lt;select&gt; muss zwingend in den :options
					vorhanden sein, damit das select als --isValid gilt.
					Ein &lt;select&gt; mit einer leeren :value ist immer --isValid.
					<br/>
					<strong>Daraus ergeben sich folgende Fälle:</strong><br/>
					<br/>
				</div>
			</div>

			<!-- All cases -->
			<div class="section__subSection grid grid--cols-2 grid--gap">
				<div>
					<div class="section__numberedRow" number="1">
						Ein &lt;select&gt; mit einer :value, die im :options Array enthalten ist, ist gültig.<br/>
						Die :value wird im &lt;select&gt; angezeigt<br/>
						<br/>
						<div class="textarea__wrapper" name="baseSelect1__markup">
							<textarea
								:value="getCodeStr( baseSelect1__markup )"
								v-textarea-autogrow
								disabled
							></textarea>
						</div>
					</div>
				</div>
				<div>
					<BaseSelect
						:value="'Heiko'"
						:placeholder="'Choose ...'"
						:options="[
							'Mario',
							'Heiko',
							'Silvio',
						]"
						:hasClearButton="true"
						:debug="true"
						@change="()=>{}"
					></BaseSelect>
				</div>
			</div>
			<div class="section__subSection grid grid--cols-2 grid--gap">
				<div>
					<div class="section__numberedRow" number="2">
						Ein &lt;select&gt; mit einer :value, die nicht im :options Array enthalten ist, ist	ungültig. <br/>
						Die ungültige :value wird nicht im &lt;select&gt; angezeigt, stattdessen wird der :placeholder angezeigt.<br/>
						<br/>
						<div class="textarea__wrapper" name="baseSelect2__markup">
							<textarea
								:value="getCodeStr( baseSelect2__markup )"
								v-textarea-autogrow
								disabled
							></textarea>
						</div>
					</div>
				</div>
				<div>
					<BaseSelect
						:value="'Philipp'"
						:placeholder="'Choose ...'"
						:options="[
							'Tom',
							'Sashi',
							'Nora',
						]"
						:hasClearButton="true"
						:debug="true"
						@change="()=>{}"
					></BaseSelect>
				</div>
			</div>
			<div class="section__subSection grid grid--cols-2 grid--gap">
				<div>
					<div class="section__numberedRow" number="3">
						Ein &lt;select mit einer leeren :value ist gültig.<br/>
						Im &lt;select&gt; wird der :placeholder angezeigt.<br/>
						<br/>
						<div class="textarea__wrapper" name="baseSelect3__markup">
							<textarea
								:value="getCodeStr( baseSelect3__markup )"
								v-textarea-autogrow
								disabled
							></textarea>
						</div>
					</div>
				</div>
				<div>
					<BaseSelect
						:value="''"
						:placeholder="'Choose ...'"
						:options="[
							'Mario',
							'Franzi',
							'Philipp',
							'Hanna',
						]"
						:hasClearButton="true"
						:debug="true"
						@change="()=>{}"
					></BaseSelect>
				</div>
			</div>
			<div class="section__subSection grid grid--cols-2 grid--gap">
				<div>
					<div class="section__numberedRow" number="4">
						Ein &lt;select&gt; mit einer :value die im :options Array enthalten ist, ist gültig. <br/>
						Die :value wird im &lt;select&gt; angezeigt. <br/>
						Wird nun das :options Array geändert, so dass die :value auf einmal nicht mehr
						vorhanden ist, wird das &lt;select&gt; ungültig. Im &lt;select&gt; wird nun der
						:placeholder angezeigt.<br/>
						<br/>
						<div class="textarea__wrapper" name="baseSelect4__markup">
							<textarea
								:value="getCodeStr( baseSelect4__markup )"
								v-textarea-autogrow
								disabled
							></textarea>
						</div>
						<div class="textarea__wrapper" name="baseSelect4__options1">
							<textarea
								:value="getCodeStr( baseSelect4__options1 )"
								v-textarea-autogrow
								disabled
							></textarea>
						</div>
						<div class="textarea__wrapper" name="baseSelect4__options2">
							<textarea
								:value="getCodeStr( baseSelect4__options2 )"
								v-textarea-autogrow
								disabled
							></textarea>
						</div>
						<div>
							Toggle options: <input type="checkbox" v-model="baseSelect4__isTogglesOptions" /><br/>
							<pre name="baseSelect4__isTogglesOptions">{{baseSelect4__isTogglesOptions}}</pre>
						</div>
					</div>
				</div>
				<div>
					<BaseSelect
						:value="'Franzi'"
						:placeholder="'Choose ...'"
						:options="baseSelect4__isTogglesOptions ? getParsedStr(baseSelect4__options2) : getParsedStr(baseSelect4__options1)"
						:hasClearButton="true"
						:debug="true"
						@change="()=>{}"
					></BaseSelect>
				</div>
			</div>
			<div class="section__subSection grid grid--cols-2 grid--gap">
				<div>
					<div class="section__numberedRow" number="5">
						Gleiches gilt, wenn die :value später ausgetauscht wird: Das
						&lt;select&gt; wird ungültig und im &lt;select&gt; wird nun der :placeholder
						angezeigt.<br/>
						<br/>
						<div class="textarea__wrapper" name="baseSearchSelect1__markup">
							<textarea
								:value="getCodeStr( baseSelect5__markup )"
								:name="'baseSelect5__markup'"
								v-textarea-autogrow
								disabled
							></textarea>
						</div>
						<div class="textarea__wrapper" name="baseSelect5__value1">
							<textarea
								:value="getCodeStr( baseSelect5__value1 )"
								v-textarea-autogrow
								disabled
							></textarea>
						</div>
						<div class="textarea__wrapper" name="baseSelect5__value2">
							<textarea
								:value="getCodeStr( baseSelect5__value2 )"
								v-textarea-autogrow
								disabled
							></textarea>
						</div>
						<div>
							Toggle values: <input type="checkbox" v-model="baseSelect5__isTogglesValues" /><br/>
							<pre name="baseSelect5__isTogglesValues">{{baseSelect5__isTogglesValues}}</pre>
						</div>
					</div>
				</div>
				<div>
					<BaseSelect
						:value="baseSelect5__isTogglesValues ? getParsedStr( baseSelect5__value2 ) : getParsedStr( baseSelect5__value1 )"
						:placeholder="'Choose ...'"
						:options="[
							'Mario',
							'Franzi',
							'Philipp',
							'Hanna',
						]"
						:hasClearButton="true"
						:debug="true"
						@change="()=>{}"
					></BaseSelect>
				</div>
			</div>

		</section>

		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>

		<!-- BaseButton -->
		<section class="section">
			<h2 class="section__title">
				BaseButton
			</h2>
			<div class="section__desc"></div>

			<div>
				<BaseFileInput
					class="font font--sizeSmall"
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
					class="font font--sizeSmall"
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
			</div>
			<div>
				<BaseButton>
					<template v-slot:before></template>
					<template v-slot:default>OK</template>
					<template v-slot:after></template>
				</BaseButton> &nbsp;
				<BaseButton :showSpinner="true">
					Loading
				</BaseButton> &nbsp;
				<BaseButton>
					<template v-slot:before>1</template>
					<template v-slot:default>Absenden</template>
					<template v-slot:after>2</template>
				</BaseButton> &nbsp;
				<BaseButton :isDisabled="true">
					<template v-slot:before></template>
					<template v-slot:default>Cancel</template>
					<template v-slot:after></template>
				</BaseButton>
			</div>
			<div>
				<BaseButton :isOutlined="true">
					OK
				</BaseButton> &nbsp;
				<BaseButton :isOutlined="true" :showSpinner="true">
					Loading
				</BaseButton> &nbsp;
			</div>
			<div>
				<BaseButton :isOutlined="true">
					<template v-slot:before>1</template>
					<template v-slot:default>Absenden</template>
					<template v-slot:after>2</template>
				</BaseButton> &nbsp;
				<BaseButton :isOutlined="true" :isDisabled="true">
					Cancel
				</BaseButton>
			</div>
		</section>

		<!-- BaseColor -->
		<section class="section">
			<h2 class="section__title">
				BaseColor
			</h2>
			<div class="section__desc"></div>

			<div>
				<BaseColor
					:value="'invalid-value'"
				></BaseColor>
				<BaseColor
					:value="'yellow'"
				></BaseColor>
				<BaseColor
					:value="'#646464'"
				></BaseColor>
				<BaseColor
					:value="'rgb( 50, 150, 50 )'"
				></BaseColor>
			</div>
		</section>

		<!-- BaseRadio -->
		<div class="grid grid--cols-2 grid--gap" style="font-size: 1em;">
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
		</div>

		<!-- BaseCheckbox -->
		<div class="grid grid--cols-2 grid--gap" style="font-size: 1em;">
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
		</div>

		<!-- BaseSelect -->
		<div class="grid grid--cols-2 grid--gap" style="font-size: 1em;">
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
		</div>

		<!-- BaseText -->
		<div class="grid grid--cols-2 grid--gap" style="font-size: 1em;">
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
		</div>

		<!-- BaseTextarea -->
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

	</div>
</template>

<script>
	// @ is an alias to /src
	import "./FormField.less";
	import textareaAutogrow from '/Users/Mario/Dropbox/htdocs/2019-05-20__wp-kickstart-vue/wordpress/wp-content/themes/wp-kickstart-v3-theme/vue-cli-dev/src/directives/textareaAutogrow.directive.js'

	import BaseFileInput from './BaseFileInput.vue'
	import BaseCheckbox from './BaseCheckbox.vue'
	import BaseRadio from './BaseRadio.vue'
	import BaseSelect from './BaseSelect.vue'
	import BaseButton from './BaseButton.vue'
	import BaseText from './BaseText.vue'
	import BaseTextarea from './BaseTextarea.vue'
	import BaseColor from './BaseColor.vue'
	import BaseSearchSelect from './BaseSearchSelect.vue'

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
			BaseColor,
			BaseSearchSelect,
		},
		mixins: [],
		directives : {
			textareaAutogrow
		},
		props: {},
		data(){
			return {
				trashModel  : 'mario',
				trashModel2 : 'hanna',
				baseSearchSelect1__markup : `
					<BaseSearchSelect
						:value="'Heiko'"
						:placeholder="'Choose ...'"
						:options="[
							'Mario',
							'Heiko',
							'Silvio',
						]"
						:hasClearButton="true"
						:debug="false"
						@change="()=>{}"
					></BaseSearchSelect>
				`,
				baseSearchSelect2__markup : `
					<BaseSearchSelect
						:value="'Philipp'"
						:placeholder="'Choose ...'"
						:options="[
							'Tom',
							'Sashi',
							'Nora',
						]"
						:hasClearButton="true"
						:debug="false"
						@change="()=>{}"
					></BaseSearchSelect>
				`,
				baseSearchSelect3__markup : `
					<BaseSearchSelect
						:value="''"
						:placeholder="'Choose ...'"
						:options="[
							'Mario',
							'Franzi',
							'Philipp',
							'Hanna',
						]"
						:hasClearButton="true"
						:debug="false"
						@change="()=>{}"
					></BaseSearchSelect>
				`,
				baseSearchSelect4__markup : `
					<BaseSearchSelect
						:value="'Franzi'"
						:placeholder="'Choose ...'"
						:options="baseSearchSelect4__options1"
						:hasClearButton="true"
						:debug="false"
						@change="()=>{}"
					></BaseSearchSelect>
				`,
				baseSearchSelect4__options1 : `
					[
						'Mario',
						'Franzi',
						'Philipp',
						'Hanna'
					]
				`,
				baseSearchSelect4__options2 : `
					[
						'Silvio',
						'Chiara',
						'Jakob'
					]
				`,
				baseSearchSelect4__isTogglesOptions : false,
				baseSearchSelect5__markup : `
					<BaseSearchSelect
						:value="BaseSearchSelect5__value1"
						:placeholder="'Choose ...'"
						:options="[
							'Mario',
							'Franzi',
							'Philipp',
							'Hanna',
						]"
						:hasClearButton="true"
						:debug="false"
						@change="()=>{}"
					></BaseSearchSelect>
				`,
				baseSearchSelect5__value1 : `
					'Mario'
				`,
				baseSearchSelect5__value2 : `
					'Tom'
				`,
				baseSearchSelect5__isTogglesValues : false,

				baseSelect1__markup : `
					<BaseSelect
						:value="'Heiko'"
						:placeholder="'Choose ...'"
						:options="[
							'Mario',
							'Heiko',
							'Silvio',
						]"
						:hasClearButton="true"
						:debug="false"
						@change="()=>{}"
					></BaseSelect>
				`,
				baseSelect2__markup : `
					<BaseSelect
						:value="'Philipp'"
						:placeholder="'Choose ...'"
						:options="[
							'Tom',
							'Sashi',
							'Nora',
						]"
						:hasClearButton="true"
						:debug="false"
						@change="()=>{}"
					></BaseSelect>
				`,
				baseSelect3__markup : `
					<BaseSelect
						:value="''"
						:placeholder="'Choose ...'"
						:options="[
							'Mario',
							'Franzi',
							'Philipp',
							'Hanna',
						]"
						:hasClearButton="true"
						:debug="false"
						@change="()=>{}"
					></BaseSelect>
				`,
				baseSelect4__markup : `
					<BaseSelect
						:value="'Franzi'"
						:placeholder="'Choose ...'"
						:options="baseSelect4__options1"
						:hasClearButton="true"
						:debug="false"
						@change="()=>{}"
					></BaseSelect>
				`,
				baseSelect4__options1 : `
					[
						'Mario',
						'Franzi',
						'Philipp',
						'Hanna'
					]
				`,
				baseSelect4__options2 : `
					[
						'Silvio',
						'Chiara',
						'Jakob'
					]
				`,
				baseSelect4__isTogglesOptions : false,
				baseSelect5__markup : `
					<BaseSelect
						:value="BaseSelect5__value1"
						:placeholder="'Choose ...'"
						:options="[
							'Mario',
							'Franzi',
							'Philipp',
							'Hanna',
						]"
						:hasClearButton="true"
						:debug="false"
						@change="()=>{}"
					></BaseSelect>
				`,
				baseSelect5__value1 : `
					'Mario'
				`,
				baseSelect5__value2 : `
					'Tom'
				`,
				baseSelect5__isTogglesValues : false,

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
		methods: {
			getCodeStr( inputStr ){
				let oldLinesArr = inputStr.trimEnd().split(/\r?\n/);
				let newLinesArr = []
				let startWhitespace = null

				oldLinesArr.forEach( (line, index) => {
					let _line = this._.trimEnd( line )

					if( _line && this._.isNull(startWhitespace) ){
						const pttrn = /^\s*/;
						const match = _line.match(pttrn)[0]
						//const test = '    '.search(/\S|$/)
						//console.log( index, match)
						//console.log( index, _line)
						startWhitespace = match
					}
					if( _line ){
						_line = this._.replace( _line, startWhitespace, '' )
						//console.log( index, line, _line )
						newLinesArr.push( _line )
					}
				});

				const fixedStr = newLinesArr.join('\n')

				/*
				console.log('startWhitespace >', startWhitespace, '<')
				console.log('oldLinesArr:', oldLinesArr)
				console.log('newLinesArr:', newLinesArr)
				console.log('fixedStr:', fixedStr)
				*/

				return fixedStr
			},
			getParsedStr( inputStr ){
				let old = this._.trim( inputStr )
				old = old.replaceAll("'", '"')

				/*
				console.log('getParsedStr( inputStr)')
				console.log('inputStr:', inputStr)
				console.log('old:', old)
				*/

				let newStr = JSON.parse( old )
				//console.log('newStr:', newStr)

				return newStr
			},
		},
		created(){},
		mounted(){},
		destroyed(){},
	}
</script>

<style lang="less">
	@import "@/less/vars.less";
	@import "@/less/mixins.less";
	@import (reference) "@/less/atoms.less";

	.BaseDebugOverview { // layout + styling
		padding: 1em;

		.section {
			margin-bottom: 2em;
			border-top: 4px solid;
		}
		.section__title {
			//grid-column: 1 / span 2;
			padding-top: 0.35em;
			margin-bottom: 1em;
			font-weight: bold;
			font-size: 2em;
		}
		.section__desc {
			//grid-column: 1 / span 2;
			margin-bottom: 1em;
		}
		.section__subSection {
			border-top: 2px solid;
			padding-top: 0.5em;
		}
		.section__numberedRow {
			//background-color: fade(red, 20);
			//outline: 1px solid red;
			position: relative;
			padding-left: 2em;
			margin-bottom: 1em;

			&::before {
				position: absolute;
				top: 0; left: 0;
				content: attr(number);
				font-weight: bold;
			}
		}

		.textarea__wrapper {
			position: relative;
			margin: 0.25em 0;

			&[name]::before {
				position: absolute;
				top: 0; right: 0;
				content: attr(name);
				padding: 0.35em;
				background-color: fade(black, 15);
				font-size: 0.85em;
				line-height: 0.85em;
			}
		}

		textarea {
			position: relative;
			width: 100%;
			height: auto;
			//height: 300px;
			//padding: 0.5em;
			overflow: hidden;

			font-family: monospace;
			tab-size: 2;
			//white-space: pre;
			resize: vertical;
			border: 1px solid fade( black, 25);
			background-color: fade( black, 5 );

			&[disabled] {
				color: inherit;
			}
			&[autogrow] {
				//overflow: hidden;
				resize: none;
			}

			&[name] {
				//.label( 'mario' );
			}
		}
		ol {
			margin-left: 1.25em;
		}
		li {
			padding-left: 0.5em;
		}

	}
</style>
