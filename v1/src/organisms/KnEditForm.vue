<!--

	Was macht diese Componente?
	Wofür ist die Compoente da?

	Welche $props gibt es?

	Beispiel Code:
		<KnEditForm></KnEditForm>

	2019-06-08	init

-->

<template>
	<div class="KnEditForm" :class="elmClasses">
		<div class="KnEditForm__inner">

			<br /><br />

			<KnFormHeaderRow
				:title="'Create Record'"
				:subTitle="'Step ' + (activeStepIndex+1) + '/5'"
			></KnFormHeaderRow>
			<KnTabsRow
				class="KnEditForm__stepTabs sticky font font--sizeLarge font--medium background background--white"
				ref="stepTabs"
				:activeClass="''"
				:inactiveClass="'inactiveClass'"
				:enabledClass="'enabledClass'"
				:disabledClass="'color--primary50'"
				:items="stepTabs"
				:activeItemIndex="$store.getters.activeStepIndex"
				@tabChange="gotoStepIndex"
			></KnTabsRow>
			<KnTextRow
				class="font font--sizeDefault background background--white50">
				<span v-html="_.get($store.getters.activeStep, 'desc')"></span>
				<!--
				-->
			</KnTextRow>

			<template v-if="'disease' === _.get( activeStep, 'slug' )">

				<!-- ageGroup:  subadults and adults -->
				<KnFormFieldRow>
					<div class="KnEditForm__labelCell font font--medium color color--primary50"
						style="grid-column: span 2;">
						Age group *
					</div>
					<div style="grid-column: span 6;">
						<div class="KnEditForm__radioGroup">
							<label
								class="KnEditForm__radioGroupInner"
								v-for="(option, index) in ['Subadult', 'Adult']"
								:key="'rbo' + index">
								<BaseRadio
									class="KnEditForm__radioGroupRadio"
									:name="'ageGroup'"
									:checkedValue="option"
									@change="()=>{}"
									@input="setAgeGroup"
								></BaseRadio>
								<span class="KnEditForm__radioGroupLabel">{{option}}</span>
							</label>
						</div>
						<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('subadults')}}</pre>
						<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('adults')}}</pre>
					</div>
					<div class="font font--sizeSmall color color--primary50"
						style="grid-column: span 4;"
						v-html="getFieldProp( 'subadults', 'help_text' ) + '<br/>' + getFieldProp( 'adults', 'help_text' )"
					></div>
				</KnFormFieldRow>
				<!-- subadults -->
				<!--
				<KnFormFieldRow>
					<div class="KnEditForm__labelCell font font--medium color color--primary50"
						style="grid-column: span 2;">
						{{getFieldProp( 'subadults', '_label' )}}
						<template v-if="getFieldProp( 'subadults', 'mandatory' )">*</template>
					</div>
					<div style="grid-column: span 6;">
						<BaseCheckbox
							:value="getFieldProp( 'subadults', '_value' )"
							@input="$store.commit('setFieldProp', {
								fieldName : 'subadults',
								key       : '_value',
								value     : $event
							})"
						></BaseCheckbox>
					</div>
					<div class="font font--sizeSmall color color--primary50"
						style="grid-column: span 4;" v-html="getFieldProp( 'subadults', 'help_text' )"
					></div>
				</KnFormFieldRow>
				-->
				<!-- adults -->
				<!--
				<KnFormFieldRow>
					<div class="KnEditForm__labelCell font font--medium color color--primary50"
						style="grid-column: span 2;">
						{{getFieldProp( 'adults', '_label' )}}
						<template v-if="getFieldProp( 'adults', 'mandatory' )">*</template>
					</div>
					<div style="grid-column: span 6;">
						<BaseCheckbox
							:value="getFieldProp( 'adults', '_value' )"
							@input="$store.commit('setFieldProp', {
								fieldName : 'adults',
								key       : '_value',
								value     : $event
							})"
						></BaseCheckbox>
					</div>
					<div class="font font--sizeSmall color color--primary50"
						style="grid-column: span 4;" v-html="getFieldProp( 'adults', 'help_text' )"
					></div>
				</KnFormFieldRow>
				-->
				<!-- age_class -->
				<KnFormFieldRow>
					<div class="KnEditForm__labelCell font font--medium color color--primary50"
						style="grid-column: span 2;">
						{{getFieldProp( 'age_class', '_label' )}}
						<template v-if="getFieldProp( 'age_class', 'mandatory' )">*</template>
					</div>
					<div style="grid-column: span 6;">
						<BaseSelect
							:value="getFieldProp( 'age_class', '_value' )"
							:placeholder="'Select ...'"
							:options="getFieldProp( 'age_class', '_options' )"
							:hasClearButton="true"
							@input="$store.commit('setFieldProp', {
								fieldName : 'age_class',
								key       : '_value',
								value     : $event
							})"
						></BaseSelect>
						<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('age_class')}}</pre>
					</div>
					<div class="font font--sizeSmall color color--primary50"
						style="grid-column: span 4;" v-html="getFieldProp( 'age_class', 'help_text' )"
					></div>
				</KnFormFieldRow>
				<!-- age -->
				<KnFormFieldRow>
					<div class="KnEditForm__labelCell font font--medium color color--primary50"
						style="grid-column: span 2;">
						{{getFieldProp( 'age', '_label' )}}
						<template v-if="getFieldProp( 'age', 'mandatory' )">*</template>
					</div>
					<div style="grid-column: span 6;">
						<BaseSelect
							:value="getFieldProp( 'age', '_value' )"
							:placeholder="'Select ...'"
							:options="getFieldProp( 'age', '_options' )"
							:hasClearButton="true"
							@input="$store.commit('setFieldProp', {
								fieldName : 'age',
								key       : '_value',
								value     : $event
							})"
						></BaseSelect>
						<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('age')}}</pre>
					</div>
					<div class="font font--sizeSmall color color--primary50"
						style="grid-column: span 4;" v-html="getFieldProp( 'age', 'help_text' )"
					></div>
				</KnFormFieldRow>
				<!-- age_freetext_checkbox -->
				<KnFormFieldRow>
					<div class="KnEditForm__labelCell font font--medium color color--primary50"
						style="grid-column: span 2;">
						{{getFieldProp( 'age_freetext_checkbox', '_label' )}}
						<template v-if="getFieldProp( 'age_freetext_checkbox', 'mandatory' )">*</template>
					</div>
					<div style="grid-column: span 6;">
						<BaseCheckbox
							:value="getFieldProp( 'age_freetext_checkbox', '_value' )"
							@input="$store.commit('setFieldProp', {
								fieldName : 'age_freetext_checkbox',
								key       : '_value',
								value     : $event
							})"
						></BaseCheckbox>
						<span class="KnEditForm__labelInline" v-html="getFieldProp( 'age_freetext_checkbox', 'help_text' )"></span>
					</div>
					<div class="font font--sizeSmall color color--primary50" style="grid-column: span 4;"></div>
				</KnFormFieldRow>
				<!-- age_freetext -->
				<KnFormFieldRow v-if="getFieldProp( 'age_freetext_checkbox', '_value' )">
					<div class="KnEditForm__labelCell font font--medium color color--primary50"
						style="grid-column: span 2;">
						{{getFieldProp( 'age_freetext', '_label' )}}
						<template v-if="getFieldProp( 'age_freetext', 'mandatory' )">*</template>
					</div>
					<div style="grid-column: span 6;">
						<BaseTextarea
							:value="getFieldProp( 'age_freetext', '_value' )"
							:placeholder="'Enter ..'"
							:required="false"
							:disabled="false"
							:hasClearButton="true"
							@input="$store.commit('setFieldProp', {
								fieldName : 'age_freetext',
								key       : '_value',
								value     : $event
							})"
						></BaseTextarea>
						<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('age_freetext')}}</pre>
					</div>
					<div class="font font--sizeSmall color color--primary50"
						style="grid-column: span 4;" v-html="getFieldProp( 'age_freetext', 'help_text' )"
					></div>
				</KnFormFieldRow>
				<!-- disease -->
				<!--
					<KnFormFieldRow>
						<div class="KnEditForm__labelCell font font--medium color color--primary50"
							style="grid-column: span 2;">
							{{getFieldProp( 'disease', '_label' )}}
							<template v-if="getFieldProp( 'disease', 'mandatory' )">*</template>
						</div>
						<div style="grid-column: span 6;">
							<BaseSelect
								:value="getFieldProp( 'disease', '_value' )"
								:placeholder="'Select ...'"
								:disabled="false"
								:options="getFieldProp( 'disease', '_options' )"
								:hasClearButton="true"
								:debug="false"
								@input="$store.commit('setFieldProp', {
									fieldName : 'disease',
									key       : '_value',
									value     : $event
								})"
							></BaseSelect>
							<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('disease')}}</pre>
						</div>
						<div class="font font--sizeSmall color color--primary50"
							style="grid-column: span 4;" v-html="getFieldProp( 'disease', 'help_text' )"
						></div>
					</KnFormFieldRow>
				-->
				<!-- disease with search-field -->
				<KnFormFieldRow>
					<div class="KnEditForm__labelCell font font--medium color color--primary50"
						style="grid-column: span 2;">
						{{getFieldProp( 'disease', '_label' )}}
						<template v-if="getFieldProp( 'disease', 'mandatory' )">*</template>
					</div>
					<div style="grid-column: span 6;">
						<BaseSearchSelect
							:value="getFieldProp( 'disease', '_value' )"
							:disabled="!getFieldProp( 'adults', '_value' ) && !getFieldProp( 'subadults', '_value' )"
							:placeholder="'Select ...'"
							:options="getFieldProp( 'disease', '_options' )"
							:hasClearButton="true"
							:debug="false"
							@input="$store.commit('setFieldProp', {
								fieldName : 'disease',
								key       : '_value',
								value     : $event
							})"
						></BaseSearchSelect>
						<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('disease')}}</pre>
					</div>
					<div class="font font--sizeSmall color color--primary50"
						style="grid-column: span 4;" v-html="getFieldProp( 'disease', 'help_text' )"
					></div>
				</KnFormFieldRow>
				<!-- sex -->
				<KnFormFieldRow>
					<div class="KnEditForm__labelCell font font--medium color color--primary50"
						style="grid-column: span 2;">
						{{getFieldProp( 'sex', '_label' )}}
						<template v-if="getFieldProp( 'sex', 'mandatory' )">*</template>
					</div>
					<div style="grid-column: span 6;">
						<BaseSelect
							:value="getFieldProp( 'sex', '_value' )"
							:placeholder="'Select ...'"
							:options="getFieldProp( 'sex', '_options' )"
							:hasClearButton="true"
							@input="$store.commit('setFieldProp', {
								fieldName : 'sex',
								key       : '_value',
								value     : $event
							})"
						></BaseSelect>
						<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('sex')}}</pre>
					</div>
					<div class="font font--sizeSmall color color--primary50"
						style="grid-column: span 4;" v-html="getFieldProp( 'sex', 'help_text' )"
					></div>
				</KnFormFieldRow>
				<!-- next -->
				<KnFormFieldRow>
					<div style="grid-column: span 8; display: flex; justify-content: flex-end;">
						<div>
							<br/>
							<BaseButton
								class="font font--sizeLarge font--bold"
								:isOutlined="false"
								:isDisabled="!isStepValid('disease')"
								@click.native="enableNextStep()"
							>
								<template slot="before"></template>
								<template slot="default">Next step</template>
								<template slot="after">
									<MhIcon type="arrow-right" ></MhIcon>
								</template>
							</BaseButton>
							<br/>
							<br/>
							<br/>
						</div>
					</div>
				</KnFormFieldRow>

			</template>
			<template v-if="'inventory' === _.get( $store.getters.activeStep, 'slug' )">

				<!-- tabs -->
				<KnTabsRow
					class="font font--sizeDefault font--medium background background--white50"
					:inactiveClass="'color--primary50'"
					:items="getStepProp('inventory', 'tabs')"
					:activeItemIndex="currentInventoryTabIndex"
					@tabChange="gotoInventoryTabIndex"
				></KnTabsRow>

				<!-- cranial_district -->
				<template v-if="0 === currentInventoryTabIndex">
					<KnColumnLabelsRow
						class="font font--sizeSmall color color--primary50"
						:items="[
							{ label : 'Bone', span : 8 },
							{ label : 'Preservation', span : 3, },
						]"
					></KnColumnLabelsRow>

					<!-- neurocranium -->
					<KnFormFieldRow>
						<div class="KnEditForm__labelCell font font--medium color color--primary50"
							style="grid-column: span 8;">
							{{getFieldProp( 'cranial_district__neurocranium', '_label' )}}
						</div>
						<div style="grid-column: span 4;">
							<BaseSelect
								:value="getFieldProp( 'cranial_district__neurocranium_amount', '_value' )"
								:placeholder="'Select ...'"
								:options="getFieldProp( 'cranial_district__neurocranium_amount', '_options' )"
								:hasClearButton="true"
								@input="$store.commit('setFieldProp', {
									fieldName : 'cranial_district__neurocranium_amount',
									key       : '_value',
									value     : $event
								})"
							></BaseSelect>
							<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('cranial_district__neurocranium_amount')}}</pre>
						</div>
					</KnFormFieldRow>
					<!-- splanchnocranium -->
					<KnFormFieldRow>
						<div class="KnEditForm__labelCell font font--medium color color--primary50"
							style="grid-column: span 8;">
							{{getFieldProp( 'cranial_district__splanchnocranium', '_label' )}}
						</div>
						<div style="grid-column: span 4;">
							<BaseSelect
								:value="getFieldProp( 'cranial_district__splanchnocranium_amount', '_value' )"
								:placeholder="'Select ...'"
								:options="getFieldProp( 'cranial_district__splanchnocranium_amount', '_options' )"
								:hasClearButton="true"
								@input="$store.commit('setFieldProp', {
									fieldName : 'cranial_district__splanchnocranium_amount',
									key       : '_value',
									value     : $event
								})"
							></BaseSelect>
							<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('cranial_district__splanchnocranium_amount')}}</pre>
						</div>
					</KnFormFieldRow>
					<!-- mandible -->
					<KnFormFieldRow>
						<div class="KnEditForm__labelCell font font--medium color color--primary50"
							style="grid-column: span 8;">
							{{getFieldProp( 'cranial_district__mandible', '_label' )}}
						</div>
						<div style="grid-column: span 4;">
							<BaseSelect
								:value="getFieldProp( 'cranial_district__mandible_amount', '_value' )"
								:placeholder="'Select ...'"
								:options="getFieldProp( 'cranial_district__mandible_amount', '_options' )"
								:hasClearButton="true"
								@input="$store.commit('setFieldProp', {
									fieldName : 'cranial_district__mandible_amount',
									key       : '_value',
									value     : $event
								})"
							></BaseSelect>
							<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('cranial_district__mandible_amount')}}</pre>
						</div>
					</KnFormFieldRow>
					<!-- deciduous-teeth • with treeselect -->
					<KnFormFieldRow>
						<div class="KnEditForm__labelCell font font--medium color color--primary50"
							style="grid-column: span 4;">
							{{getFieldProp( 'cranial_district__deciduous-teeth', '_label' )}}
						</div>
						<div style="grid-column: span 4;">
							<Treeselect
								class=""
								:value="
									_.isEmpty( getFieldProp( 'cranial_district__deciduous-teeth', '_value' ) ) ? null :
									getFieldProp( 'cranial_district__deciduous-teeth', '_value', null )
								"
								:multiple="true"
								:placeholder="'Select teeth ...'"
								:valueConsistsOf="'LEAF_PRIORITY'"
								:options="deciduousTeethTreeselectOptions"
								@input="$store.commit('setFieldProp', {
									fieldName : 'cranial_district__deciduous-teeth',
									key       : '_value',
									value     : $event
								})"
							/>
							<!--
							-->
							<pre class="KnEditForm__pre" maxheight>{{getFieldProp( 'cranial_district__deciduous-teeth', '_value' )}}</pre>
							<pre class="KnEditForm__pre" maxheight>{{getFieldProp( 'cranial_district__deciduous-teeth', '_options' )}}</pre>
							<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('cranial_district__deciduous-teeth')}}</pre>
						</div>
						<div style="grid-column: span 4;">
							<BaseSelect
								:value="getFieldProp( 'cranial_district__deciduous-teeth_amount', '_value' )"
								:placeholder="'Select ...'"
								:options="getFieldProp( 'cranial_district__deciduous-teeth_amount', '_options' )"
								:hasClearButton="true"
								@input="$store.commit('setFieldProp', {
									fieldName : 'cranial_district__deciduous-teeth_amount',
									key       : '_value',
									value     : $event
								})"
							></BaseSelect>
							<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('cranial_district__deciduous-teeth_amount')}}</pre>
						</div>
					</KnFormFieldRow>
					<!-- permanent-teeth • with treeselect -->
					<KnFormFieldRow>
						<div class="KnEditForm__labelCell font font--medium color color--primary50"
							style="grid-column: span 4;">
							{{getFieldProp( 'cranial_district__permanent-teeth', '_label' )}}
						</div>
						<div style="grid-column: span 4;">
							<Treeselect
								class=""
								:value="
									_.isEmpty( getFieldProp( 'cranial_district__permanent-teeth', '_value' ) ) ? null :
									getFieldProp( 'cranial_district__permanent-teeth', '_value', null )
								"
								:multiple="true"
								:placeholder="'Select teeth ...'"
								:valueConsistsOf="'LEAF_PRIORITY'"
								XXXnormalizer="treeselectNormalizer"
								XXXoptions="getFieldProp( 'cranial_district__permanent-teeth', '_options' )"
								:options="permanentTeethTreeselectOptions"
								@input="$store.commit('setFieldProp', {
									fieldName : 'cranial_district__permanent-teeth',
									key       : '_value',
									value     : $event
								})"
							/>
							<pre class="KnEditForm__pre" maxheight>{{getFieldProp( 'cranial_district__permanent-teeth', '_value' )}}</pre>
							<pre class="KnEditForm__pre" maxheight>{{getFieldProp( 'cranial_district__permanent-teeth', '_options' )}}</pre>
						</div>
						<div style="grid-column: span 4;">
							<BaseSelect
								:value="getFieldProp( 'cranial_district__permanent-teeth_amount', '_value' )"
								:placeholder="'Select ...'"
								:options="getFieldProp( 'cranial_district__permanent-teeth_amount', '_options' )"
								:hasClearButton="true"
								@input="$store.commit('setFieldProp', {
									fieldName : 'cranial_district__permanent-teeth_amount',
									key       : '_value',
									value     : $event
								})"
							></BaseSelect>
							<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('cranial_district__permanent-teeth_amount')}}</pre>
						</div>
					</KnFormFieldRow>
				</template>
				<!-- axial_skeleton -->
				<template v-if="1 === currentInventoryTabIndex">
					<KnColumnLabelsRow
						class="font font--sizeSmall color color--primary50"
						:items="[
							{ label : 'Bone', span : 4 },
							{ label : 'Preservation', span : 6, },
						]"
					></KnColumnLabelsRow>

					<!-- cervical-vertebrae -->
					<KnFormFieldRow>
						<div class="KnEditForm__labelCell font font--medium color color--primary50"
							style="grid-column: span 4;">
							{{getFieldProp( 'axial_skeleton__cervical-vertebrae', '_label' )}}
						</div>
						<div style="grid-column: span 4;">
							<BaseSelect
								:value="getFieldProp( 'axial_skeleton__cervical-vertebrae_amount', '_value' )"
								:placeholder="'Select ...'"
								:options="getFieldProp( 'axial_skeleton__cervical-vertebrae_amount', '_options' )"
								:hasClearButton="true"
								@input="$store.commit('setFieldProp', {
									fieldName : 'axial_skeleton__cervical-vertebrae_amount',
									key       : '_value',
									value     : $event
								})"
							></BaseSelect>
							<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('axial_skeleton__cervical-vertebrae_amount')}}</pre>
						</div>
					</KnFormFieldRow>
					<!-- thoracic-vertebrae -->
					<KnFormFieldRow>
						<div class="KnEditForm__labelCell font font--medium color color--primary50"
							style="grid-column: span 4;">
							{{getFieldProp( 'axial_skeleton__thoracic-vertebrae', '_label' )}}
						</div>
						<div style="grid-column: span 4;">
							<BaseSelect
								:value="getFieldProp( 'axial_skeleton__thoracic-vertebrae_amount', '_value' )"
								:placeholder="'Select ...'"
								:options="getFieldProp( 'axial_skeleton__thoracic-vertebrae_amount', '_options' )"
								:hasClearButton="true"
								@input="$store.commit('setFieldProp', {
									fieldName : 'axial_skeleton__thoracic-vertebrae_amount',
									key       : '_value',
									value     : $event
								})"
							></BaseSelect>
							<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('axial_skeleton__thoracic-vertebrae_amount')}}</pre>
						</div>
					</KnFormFieldRow>
					<!-- lumbar-vertebrae -->
					<KnFormFieldRow>
						<div class="KnEditForm__labelCell font font--medium color color--primary50"
							style="grid-column: span 4;">
							{{getFieldProp( 'axial_skeleton__lumbar-vertebrae', '_label' )}}
						</div>
						<div style="grid-column: span 4;">
							<BaseSelect
								:value="getFieldProp( 'axial_skeleton__lumbar-vertebrae_amount', '_value' )"
								:placeholder="'Select ...'"
								:options="getFieldProp( 'axial_skeleton__lumbar-vertebrae_amount', '_options' )"
								:hasClearButton="true"
								@input="$store.commit('setFieldProp', {
									fieldName : 'axial_skeleton__lumbar-vertebrae_amount',
									key       : '_value',
									value     : $event
								})"
							></BaseSelect>
							<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('axial_skeleton__lumbar-vertebrae_amount')}}</pre>
						</div>
					</KnFormFieldRow>
					<!-- sacral-vertebrae -->
					<KnFormFieldRow>
						<div class="KnEditForm__labelCell font font--medium color color--primary50"
							style="grid-column: span 4;">
							{{getFieldProp( 'axial_skeleton__sacral-vertebrae', '_label' )}}
						</div>
						<div style="grid-column: span 4;">
							<BaseSelect
								:value="getFieldProp( 'axial_skeleton__sacral-vertebrae_amount', '_value' )"
								:placeholder="'Select ...'"
								:options="getFieldProp( 'axial_skeleton__sacral-vertebrae_amount', '_options' )"
								:hasClearButton="true"
								@input="$store.commit('setFieldProp', {
									fieldName : 'axial_skeleton__sacral-vertebrae_amount',
									key       : '_value',
									value     : $event
								})"
							></BaseSelect>
							<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('axial_skeleton__sacral-vertebrae_amount')}}</pre>
						</div>
					</KnFormFieldRow>
					<!-- Coccyx -->
					<KnFormFieldRow>
						<div class="KnEditForm__labelCell font font--medium color color--primary50"
							style="grid-column: span 4;">
							{{getFieldProp( 'axial_skeleton__coccyx', '_label' )}}
						</div>
						<div style="grid-column: span 4;">
							<BaseSelect
								:value="getFieldProp( 'axial_skeleton__coccyx_amount', '_value' )"
								:placeholder="'Select ...'"
								:options="getFieldProp( 'axial_skeleton__coccyx_amount', '_options' )"
								:hasClearButton="true"
								@input="$store.commit('setFieldProp', {
									fieldName : 'axial_skeleton__coccyx_amount',
									key       : '_value',
									value     : $event
								})"
							></BaseSelect>
							<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('axial_skeleton__coccyx_amount')}}</pre>
						</div>
					</KnFormFieldRow>
					<!-- sternum -->
					<KnFormFieldRow>
						<div class="KnEditForm__labelCell font font--medium color color--primary50"
							style="grid-column: span 4;">
							{{getFieldProp( 'axial_skeleton__sternum', '_label' )}}
						</div>
						<div style="grid-column: span 4;">
							<BaseSelect
								:value="getFieldProp( 'axial_skeleton__sternum_amount', '_value' )"
								:placeholder="'Select ...'"
								:options="getFieldProp( 'axial_skeleton__sternum_amount', '_options' )"
								:hasClearButton="true"
								@input="$store.commit('setFieldProp', {
									fieldName : 'axial_skeleton__sternum_amount',
									key       : '_value',
									value     : $event
								})"
							></BaseSelect>
							<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('axial_skeleton__sternum_amount')}}</pre>
						</div>
					</KnFormFieldRow>
					<!-- right-ribs -->
					<KnFormFieldRow>
						<div class="KnEditForm__labelCell font font--medium color color--primary50"
							style="grid-column: span 4;">
							{{getFieldProp( 'axial_skeleton__right-ribs', '_label' )}}
						</div>
						<div style="grid-column: span 4;">
							<BaseSelect
								:value="getFieldProp( 'axial_skeleton__right-ribs_amount', '_value' )"
								:placeholder="'Select ...'"
								:options="getFieldProp( 'axial_skeleton__right-ribs_amount', '_options' )"
								:hasClearButton="true"
								@input="$store.commit('setFieldProp', {
									fieldName : 'axial_skeleton__right-ribs_amount',
									key       : '_value',
									value     : $event
								})"
							></BaseSelect>
							<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('axial_skeleton__right-ribs_amount')}}</pre>
						</div>
					</KnFormFieldRow>
					<!-- left-ribs -->
					<KnFormFieldRow>
						<div class="KnEditForm__labelCell font font--medium color color--primary50"
							style="grid-column: span 4;">
							{{getFieldProp( 'axial_skeleton__left-ribs', '_label' )}}
						</div>
						<div style="grid-column: span 4;">
							<BaseSelect
								:value="getFieldProp( 'axial_skeleton__left-ribs_amount', '_value' )"
								:placeholder="'Select ...'"
								:options="getFieldProp( 'axial_skeleton__left-ribs_amount', '_options' )"
								:hasClearButton="true"
								@input="$store.commit('setFieldProp', {
									fieldName : 'axial_skeleton__left-ribs_amount',
									key       : '_value',
									value     : $event
								})"
							></BaseSelect>
							<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('axial_skeleton__left-ribs_amount')}}</pre>
						</div>
					</KnFormFieldRow>
				</template>
				<!-- left_upper_limb -->
				<template v-if="2 === currentInventoryTabIndex">
					<KnColumnLabelsRow
						class="font font--sizeSmall color color--primary50"
						:items="[
							{ label : 'Bone', span : 4 },
							{ label : 'Preservation', span : 6, },
						]"
					></KnColumnLabelsRow>

					<!-- clavicle -->
					<KnFormFieldRow>
						<div class="KnEditForm__labelCell font font--medium color color--primary50"
							style="grid-column: span 4;">
							{{getFieldProp( 'left_upper_limb__clavicle', '_label' )}}
						</div>
						<div style="grid-column: span 4;">
							<BaseSelect
								:value="getFieldProp( 'left_upper_limb__clavicle_amount', '_value' )"
								:placeholder="'Select ...'"
								:options="getFieldProp( 'left_upper_limb__clavicle_amount', '_options' )"
								:hasClearButton="true"
								@input="$store.commit('setFieldProp', {
									fieldName : 'left_upper_limb__clavicle_amount',
									key       : '_value',
									value     : $event
								})"
							></BaseSelect>
							<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('left_upper_limb__clavicle_amount')}}</pre>
						</div>
					</KnFormFieldRow>
					<!-- scapula -->
					<KnFormFieldRow>
						<div class="KnEditForm__labelCell font font--medium color color--primary50"
							style="grid-column: span 4;">
							{{getFieldProp( 'left_upper_limb__scapula', '_label' )}}
						</div>
						<div style="grid-column: span 4;">
							<BaseSelect
								:value="getFieldProp( 'left_upper_limb__scapula_amount', '_value' )"
								:placeholder="'Select ...'"
								:options="getFieldProp( 'left_upper_limb__scapula_amount', '_options' )"
								:hasClearButton="true"
								@input="$store.commit('setFieldProp', {
									fieldName : 'left_upper_limb__scapula_amount',
									key       : '_value',
									value     : $event
								})"
							></BaseSelect>
							<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('left_upper_limb__scapula_amount')}}</pre>
						</div>
					</KnFormFieldRow>
					<!-- humerus -->
					<KnFormFieldRow>
						<div class="KnEditForm__labelCell font font--medium color color--primary50"
							style="grid-column: span 4;">
							{{getFieldProp( 'left_upper_limb__humerus', '_label' )}}
						</div>
						<div style="grid-column: span 4;">
							<BaseSelect
								:value="getFieldProp( 'left_upper_limb__humerus_amount', '_value' )"
								:placeholder="'Select ...'"
								:options="getFieldProp( 'left_upper_limb__humerus_amount', '_options' )"
								:hasClearButton="true"
								@input="$store.commit('setFieldProp', {
									fieldName : 'left_upper_limb__humerus_amount',
									key       : '_value',
									value     : $event
								})"
							></BaseSelect>
							<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('left_upper_limb__humerus_amount')}}</pre>
						</div>
					</KnFormFieldRow>
					<!-- radius -->
					<KnFormFieldRow>
						<div class="KnEditForm__labelCell font font--medium color color--primary50"
							style="grid-column: span 4;">
							{{getFieldProp( 'left_upper_limb__radius', '_label' )}}
						</div>
						<div style="grid-column: span 4;">
							<BaseSelect
								:value="getFieldProp( 'left_upper_limb__radius_amount', '_value' )"
								:placeholder="'Select ...'"
								:options="getFieldProp( 'left_upper_limb__radius_amount', '_options' )"
								:hasClearButton="true"
								@input="$store.commit('setFieldProp', {
									fieldName : 'left_upper_limb__radius_amount',
									key       : '_value',
									value     : $event
								})"
							></BaseSelect>
							<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('left_upper_limb__radius_amount')}}</pre>
						</div>
					</KnFormFieldRow>
					<!-- ulna -->
					<KnFormFieldRow>
						<div class="KnEditForm__labelCell font font--medium color color--primary50"
							style="grid-column: span 4;">
							{{getFieldProp( 'left_upper_limb__ulna', '_label' )}}
						</div>
						<div style="grid-column: span 4;">
							<BaseSelect
								:value="getFieldProp( 'left_upper_limb__ulna_amount', '_value' )"
								:placeholder="'Select ...'"
								:options="getFieldProp( 'left_upper_limb__ulna_amount', '_options' )"
								:hasClearButton="true"
								@input="$store.commit('setFieldProp', {
									fieldName : 'left_upper_limb__ulna_amount',
									key       : '_value',
									value     : $event
								})"
							></BaseSelect>
							<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('left_upper_limb__ulna_amount')}}</pre>
						</div>
					</KnFormFieldRow>
					<!-- carpals -->
					<KnFormFieldRow>
						<div class="KnEditForm__labelCell font font--medium color color--primary50"
							style="grid-column: span 4;">
							{{getFieldProp( 'left_upper_limb__carpals', '_label' )}}
						</div>
						<div style="grid-column: span 4;">
							<BaseSelect
								:value="getFieldProp( 'left_upper_limb__carpals_amount', '_value' )"
								:placeholder="'Select ...'"
								:options="getFieldProp( 'left_upper_limb__carpals_amount', '_options' )"
								:hasClearButton="true"
								@input="$store.commit('setFieldProp', {
									fieldName : 'left_upper_limb__carpals_amount',
									key       : '_value',
									value     : $event
								})"
							></BaseSelect>
							<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('left_upper_limb__carpals_amount')}}</pre>
						</div>
					</KnFormFieldRow>
					<!-- metacarpals -->
					<KnFormFieldRow>
						<div class="KnEditForm__labelCell font font--medium color color--primary50"
							style="grid-column: span 4;">
							{{getFieldProp( 'left_upper_limb__metacarpals', '_label' )}}
						</div>
						<div style="grid-column: span 4;">
							<BaseSelect
								:value="getFieldProp( 'left_upper_limb__metacarpals_amount', '_value' )"
								:placeholder="'Select ...'"
								:options="getFieldProp( 'left_upper_limb__metacarpals_amount', '_options' )"
								:hasClearButton="true"
								@input="$store.commit('setFieldProp', {
									fieldName : 'left_upper_limb__metacarpals_amount',
									key       : '_value',
									value     : $event
								})"
							></BaseSelect>
							<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('left_upper_limb__metacarpals_amount')}}</pre>
						</div>
					</KnFormFieldRow>
					<!-- proximal-phalanges-hand -->
					<KnFormFieldRow>
						<div class="KnEditForm__labelCell font font--medium color color--primary50"
							style="grid-column: span 4;">
							{{getFieldProp( 'left_upper_limb__proximal-phalanges-hand', '_label' )}}
						</div>
						<div style="grid-column: span 4;">
							<BaseSelect
								:value="getFieldProp( 'left_upper_limb__proximal-phalanges-hand_amount', '_value' )"
								:placeholder="'Select ...'"
								:options="getFieldProp( 'left_upper_limb__proximal-phalanges-hand_amount', '_options' )"
								:hasClearButton="true"
								@input="$store.commit('setFieldProp', {
									fieldName : 'left_upper_limb__proximal-phalanges-hand_amount',
									key       : '_value',
									value     : $event
								})"
							></BaseSelect>
							<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('left_upper_limb__proximal-phalanges-hand_amount')}}</pre>
						</div>
					</KnFormFieldRow>
					<!-- intermediate-phalanges-hand -->
					<KnFormFieldRow>
						<div class="KnEditForm__labelCell font font--medium color color--primary50"
							style="grid-column: span 4;">
							{{getFieldProp( 'left_upper_limb__intermediate-phalanges-hand', '_label' )}}
						</div>
						<div style="grid-column: span 4;">
							<BaseSelect
								:value="getFieldProp( 'left_upper_limb__intermediate-phalanges-hand_amount', '_value' )"
								:placeholder="'Select ...'"
								:options="getFieldProp( 'left_upper_limb__intermediate-phalanges-hand_amount', '_options' )"
								:hasClearButton="true"
								@input="$store.commit('setFieldProp', {
									fieldName : 'left_upper_limb__intermediate-phalanges-hand_amount',
									key       : '_value',
									value     : $event
								})"
							></BaseSelect>
							<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('left_upper_limb__intermediate-phalanges-hand_amount')}}</pre>
						</div>
					</KnFormFieldRow>
					<!-- distal-phalanges-hand -->
					<KnFormFieldRow>
						<div class="KnEditForm__labelCell font font--medium color color--primary50"
							style="grid-column: span 4;">
							{{getFieldProp( 'left_upper_limb__distal-phalanges-hand', '_label' )}}
						</div>
						<div style="grid-column: span 4;">
							<BaseSelect
								:value="getFieldProp( 'left_upper_limb__distal-phalanges-hand_amount', '_value' )"
								:placeholder="'Select ...'"
								:options="getFieldProp( 'left_upper_limb__distal-phalanges-hand_amount', '_options' )"
								:hasClearButton="true"
								@input="$store.commit('setFieldProp', {
									fieldName : 'left_upper_limb__distal-phalanges-hand_amount',
									key       : '_value',
									value     : $event
								})"
							></BaseSelect>
							<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('left_upper_limb__distal-phalanges-hand_amount')}}</pre>
						</div>
					</KnFormFieldRow>
				</template>
				<!-- right_upper_limb -->
				<template v-if="3 === currentInventoryTabIndex">
					<KnColumnLabelsRow
						class="font font--sizeSmall color color--primary50"
						:items="[
							{ label : 'Bone', span : 4 },
							{ label : 'Preservation', span : 6, },
						]"
					></KnColumnLabelsRow>

					<!-- clavicle -->
					<KnFormFieldRow>
						<div class="KnEditForm__labelCell font font--medium color color--primary50"
							style="grid-column: span 4;">
							{{getFieldProp( 'right_upper_limb__clavicle', '_label' )}}
						</div>
						<div style="grid-column: span 4;">
							<BaseSelect
								:value="getFieldProp( 'right_upper_limb__clavicle_amount', '_value' )"
								:placeholder="'Select ...'"
								:options="getFieldProp( 'right_upper_limb__clavicle_amount', '_options' )"
								:hasClearButton="true"
								@input="$store.commit('setFieldProp', {
									fieldName : 'right_upper_limb__clavicle_amount',
									key       : '_value',
									value     : $event
								})"
							></BaseSelect>
							<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('right_upper_limb__clavicle_amount')}}</pre>
						</div>
					</KnFormFieldRow>
					<!-- scapula -->
					<KnFormFieldRow>
						<div class="KnEditForm__labelCell font font--medium color color--primary50"
							style="grid-column: span 4;">
							{{getFieldProp( 'right_upper_limb__scapula', '_label' )}}
						</div>
						<div style="grid-column: span 4;">
							<BaseSelect
								:value="getFieldProp( 'right_upper_limb__scapula_amount', '_value' )"
								:placeholder="'Select ...'"
								:options="getFieldProp( 'right_upper_limb__scapula_amount', '_options' )"
								:hasClearButton="true"
								@input="$store.commit('setFieldProp', {
									fieldName : 'right_upper_limb__scapula_amount',
									key       : '_value',
									value     : $event
								})"
							></BaseSelect>
							<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('right_upper_limb__scapula_amount')}}</pre>
						</div>
					</KnFormFieldRow>
					<!-- humerus -->
					<KnFormFieldRow>
						<div class="KnEditForm__labelCell font font--medium color color--primary50"
							style="grid-column: span 4;">
							{{getFieldProp( 'right_upper_limb__humerus', '_label' )}}
						</div>
						<div style="grid-column: span 4;">
							<BaseSelect
								:value="getFieldProp( 'right_upper_limb__humerus_amount', '_value' )"
								:placeholder="'Select ...'"
								:options="getFieldProp( 'right_upper_limb__humerus_amount', '_options' )"
								:hasClearButton="true"
								@input="$store.commit('setFieldProp', {
									fieldName : 'right_upper_limb__humerus_amount',
									key       : '_value',
									value     : $event
								})"
							></BaseSelect>
							<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('right_upper_limb__humerus_amount')}}</pre>
						</div>
					</KnFormFieldRow>
					<!-- radius -->
					<KnFormFieldRow>
						<div class="KnEditForm__labelCell font font--medium color color--primary50"
							style="grid-column: span 4;">
							{{getFieldProp( 'right_upper_limb__radius', '_label' )}}
						</div>
						<div style="grid-column: span 4;">
							<BaseSelect
								:value="getFieldProp( 'right_upper_limb__radius_amount', '_value' )"
								:placeholder="'Select ...'"
								:options="getFieldProp( 'right_upper_limb__radius_amount', '_options' )"
								:hasClearButton="true"
								@input="$store.commit('setFieldProp', {
									fieldName : 'right_upper_limb__radius_amount',
									key       : '_value',
									value     : $event
								})"
							></BaseSelect>
							<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('right_upper_limb__radius_amount')}}</pre>
						</div>
					</KnFormFieldRow>
					<!-- ulna -->
					<KnFormFieldRow>
						<div class="KnEditForm__labelCell font font--medium color color--primary50"
							style="grid-column: span 4;">
							{{getFieldProp( 'right_upper_limb__ulna', '_label' )}}
						</div>
						<div style="grid-column: span 4;">
							<BaseSelect
								:value="getFieldProp( 'right_upper_limb__ulna_amount', '_value' )"
								:placeholder="'Select ...'"
								:options="getFieldProp( 'right_upper_limb__ulna_amount', '_options' )"
								:hasClearButton="true"
								@input="$store.commit('setFieldProp', {
									fieldName : 'right_upper_limb__ulna_amount',
									key       : '_value',
									value     : $event
								})"
							></BaseSelect>
							<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('right_upper_limb__ulna_amount')}}</pre>
						</div>
					</KnFormFieldRow>
					<!-- carpals -->
					<KnFormFieldRow>
						<div class="KnEditForm__labelCell font font--medium color color--primary50"
							style="grid-column: span 4;">
							{{getFieldProp( 'right_upper_limb__carpals', '_label' )}}
						</div>
						<div style="grid-column: span 4;">
							<BaseSelect
								:value="getFieldProp( 'right_upper_limb__carpals_amount', '_value' )"
								:placeholder="'Select ...'"
								:options="getFieldProp( 'right_upper_limb__carpals_amount', '_options' )"
								:hasClearButton="true"
								@input="$store.commit('setFieldProp', {
									fieldName : 'right_upper_limb__carpals_amount',
									key       : '_value',
									value     : $event
								})"
							></BaseSelect>
							<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('right_upper_limb__carpals_amount')}}</pre>
						</div>
					</KnFormFieldRow>
					<!-- metacarpals -->
					<KnFormFieldRow>
						<div class="KnEditForm__labelCell font font--medium color color--primary50"
							style="grid-column: span 4;">
							{{getFieldProp( 'right_upper_limb__metacarpals', '_label' )}}
						</div>
						<div style="grid-column: span 4;">
							<BaseSelect
								:value="getFieldProp( 'right_upper_limb__metacarpals_amount', '_value' )"
								:placeholder="'Select ...'"
								:options="getFieldProp( 'right_upper_limb__metacarpals_amount', '_options' )"
								:hasClearButton="true"
								@input="$store.commit('setFieldProp', {
									fieldName : 'right_upper_limb__metacarpals_amount',
									key       : '_value',
									value     : $event
								})"
							></BaseSelect>
							<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('right_upper_limb__metacarpals_amount')}}</pre>
						</div>
					</KnFormFieldRow>
					<!-- proximal-phalanges-hand -->
					<KnFormFieldRow>
						<div class="KnEditForm__labelCell font font--medium color color--primary50"
							style="grid-column: span 4;">
							{{getFieldProp( 'right_upper_limb__proximal-phalanges-hand', '_label' )}}
						</div>
						<div style="grid-column: span 4;">
							<BaseSelect
								:value="getFieldProp( 'right_upper_limb__proximal-phalanges-hand_amount', '_value' )"
								:placeholder="'Select ...'"
								:options="getFieldProp( 'right_upper_limb__proximal-phalanges-hand_amount', '_options' )"
								:hasClearButton="true"
								@input="$store.commit('setFieldProp', {
									fieldName : 'right_upper_limb__proximal-phalanges-hand_amount',
									key       : '_value',
									value     : $event
								})"
							></BaseSelect>
							<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('right_upper_limb__proximal-phalanges-hand_amount')}}</pre>
						</div>
					</KnFormFieldRow>
					<!-- intermediate-phalanges-hand -->
					<KnFormFieldRow>
						<div class="KnEditForm__labelCell font font--medium color color--primary50"
							style="grid-column: span 4;">
							{{getFieldProp( 'right_upper_limb__intermediate-phalanges-hand', '_label' )}}
						</div>
						<div style="grid-column: span 4;">
							<BaseSelect
								:value="getFieldProp( 'right_upper_limb__intermediate-phalanges-hand_amount', '_value' )"
								:placeholder="'Select ...'"
								:options="getFieldProp( 'right_upper_limb__intermediate-phalanges-hand_amount', '_options' )"
								:hasClearButton="true"
								@input="$store.commit('setFieldProp', {
									fieldName : 'right_upper_limb__intermediate-phalanges-hand_amount',
									key       : '_value',
									value     : $event
								})"
							></BaseSelect>
							<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('right_upper_limb__intermediate-phalanges-hand_amount')}}</pre>
						</div>
					</KnFormFieldRow>
					<!-- distal-phalanges-hand -->
					<KnFormFieldRow>
						<div class="KnEditForm__labelCell font font--medium color color--primary50"
							style="grid-column: span 4;">
							{{getFieldProp( 'right_upper_limb__distal-phalanges-hand', '_label' )}}
						</div>
						<div style="grid-column: span 4;">
							<BaseSelect
								:value="getFieldProp( 'right_upper_limb__distal-phalanges-hand_amount', '_value' )"
								:placeholder="'Select ...'"
								:options="getFieldProp( 'right_upper_limb__distal-phalanges-hand_amount', '_options' )"
								:hasClearButton="true"
								@input="$store.commit('setFieldProp', {
									fieldName : 'right_upper_limb__distal-phalanges-hand_amount',
									key       : '_value',
									value     : $event
								})"
							></BaseSelect>
							<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('right_upper_limb__distal-phalanges-hand_amount')}}</pre>
						</div>
					</KnFormFieldRow>
				</template>
				<!-- left_lower_limb -->
				<template v-if="4 === currentInventoryTabIndex">
					<KnColumnLabelsRow
						class="font font--sizeSmall color color--primary50"
						:items="[
							{ label : 'Bone', span : 4 },
							{ label : 'Preservation', span : 6, },
						]"
					></KnColumnLabelsRow>

					<!-- hip-bone -->
					<KnFormFieldRow>
						<div class="KnEditForm__labelCell font font--medium color color--primary50"
							style="grid-column: span 4;">
							{{getFieldProp( 'left_lower_limb__hip-bone', '_label' )}}
						</div>
						<div style="grid-column: span 4;">
							<BaseSelect
								:value="getFieldProp( 'left_lower_limb__hip-bone_amount', '_value' )"
								:placeholder="'Select ...'"
								:options="getFieldProp( 'left_lower_limb__hip-bone_amount', '_options' )"
								:hasClearButton="true"
								@input="$store.commit('setFieldProp', {
									fieldName : 'left_lower_limb__hip-bone_amount',
									key       : '_value',
									value     : $event
								})"
							></BaseSelect>
							<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('left_lower_limb__hip-bone_amount')}}</pre>
						</div>
					</KnFormFieldRow>
					<!-- femur -->
					<KnFormFieldRow>
						<div class="KnEditForm__labelCell font font--medium color color--primary50"
							style="grid-column: span 4;">
							{{getFieldProp( 'left_lower_limb__femur', '_label' )}}
						</div>
						<div style="grid-column: span 4;">
							<BaseSelect
								:value="getFieldProp( 'left_lower_limb__femur_amount', '_value' )"
								:placeholder="'Select ...'"
								:options="getFieldProp( 'left_lower_limb__femur_amount', '_options' )"
								:hasClearButton="true"
								@input="$store.commit('setFieldProp', {
									fieldName : 'left_lower_limb__femur_amount',
									key       : '_value',
									value     : $event
								})"
							></BaseSelect>
							<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('left_lower_limb__femur_amount')}}</pre>
						</div>
					</KnFormFieldRow>
					<!-- patella -->
					<KnFormFieldRow>
						<div class="KnEditForm__labelCell font font--medium color color--primary50"
							style="grid-column: span 4;">
							{{getFieldProp( 'left_lower_limb__patella', '_label' )}}
						</div>
						<div style="grid-column: span 4;">
							<BaseSelect
								:value="getFieldProp( 'left_lower_limb__patella_amount', '_value' )"
								:placeholder="'Select ...'"
								:options="getFieldProp( 'left_lower_limb__patella_amount', '_options' )"
								:hasClearButton="true"
								@input="$store.commit('setFieldProp', {
									fieldName : 'left_lower_limb__patella_amount',
									key       : '_value',
									value     : $event
								})"
							></BaseSelect>
							<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('left_lower_limb__patella_amount')}}</pre>
						</div>
					</KnFormFieldRow>
					<!-- tibia -->
					<KnFormFieldRow>
						<div class="KnEditForm__labelCell font font--medium color color--primary50"
							style="grid-column: span 4;">
							{{getFieldProp( 'left_lower_limb__tibia', '_label' )}}
						</div>
						<div style="grid-column: span 4;">
							<BaseSelect
								:value="getFieldProp( 'left_lower_limb__tibia_amount', '_value' )"
								:placeholder="'Select ...'"
								:options="getFieldProp( 'left_lower_limb__tibia_amount', '_options' )"
								:hasClearButton="true"
								@input="$store.commit('setFieldProp', {
									fieldName : 'left_lower_limb__tibia_amount',
									key       : '_value',
									value     : $event
								})"
							></BaseSelect>
							<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('left_lower_limb__tibia_amount')}}</pre>
						</div>
					</KnFormFieldRow>
					<!-- fibula -->
					<KnFormFieldRow>
						<div class="KnEditForm__labelCell font font--medium color color--primary50"
							style="grid-column: span 4;">
							{{getFieldProp( 'left_lower_limb__fibula', '_label' )}}
						</div>
						<div style="grid-column: span 4;">
							<BaseSelect
								:value="getFieldProp( 'left_lower_limb__fibula_amount', '_value' )"
								:placeholder="'Select ...'"
								:options="getFieldProp( 'left_lower_limb__fibula_amount', '_options' )"
								:hasClearButton="true"
								@input="$store.commit('setFieldProp', {
									fieldName : 'left_lower_limb__fibula_amount',
									key       : '_value',
									value     : $event
								})"
							></BaseSelect>
							<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('left_lower_limb__fibula_amount')}}</pre>
						</div>
					</KnFormFieldRow>
					<!-- calcaneus -->
					<KnFormFieldRow>
						<div class="KnEditForm__labelCell font font--medium color color--primary50"
							style="grid-column: span 4;">
							{{getFieldProp( 'left_lower_limb__calcaneus', '_label' )}}
						</div>
						<div style="grid-column: span 4;">
							<BaseSelect
								:value="getFieldProp( 'left_lower_limb__calcaneus_amount', '_value' )"
								:placeholder="'Select ...'"
								:options="getFieldProp( 'left_lower_limb__calcaneus_amount', '_options' )"
								:hasClearButton="true"
								@input="$store.commit('setFieldProp', {
									fieldName : 'left_lower_limb__calcaneus_amount',
									key       : '_value',
									value     : $event
								})"
							></BaseSelect>
							<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('left_lower_limb__calcaneus_amount')}}</pre>
						</div>
					</KnFormFieldRow>
					<!-- talus -->
					<KnFormFieldRow>
						<div class="KnEditForm__labelCell font font--medium color color--primary50"
							style="grid-column: span 4;">
							{{getFieldProp( 'left_lower_limb__talus', '_label' )}}
						</div>
						<div style="grid-column: span 4;">
							<BaseSelect
								:value="getFieldProp( 'left_lower_limb__talus_amount', '_value' )"
								:placeholder="'Select ...'"
								:options="getFieldProp( 'left_lower_limb__talus_amount', '_options' )"
								:hasClearButton="true"
								@input="$store.commit('setFieldProp', {
									fieldName : 'left_lower_limb__talus_amount',
									key       : '_value',
									value     : $event
								})"
							></BaseSelect>
							<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('left_lower_limb__talus_amount')}}</pre>
						</div>
					</KnFormFieldRow>
					<!-- tarsals -->
					<KnFormFieldRow>
						<div class="KnEditForm__labelCell font font--medium color color--primary50"
							style="grid-column: span 4;">
							{{getFieldProp( 'left_lower_limb__tarsals', '_label' )}}
						</div>
						<div style="grid-column: span 4;">
							<BaseSelect
								:value="getFieldProp( 'left_lower_limb__tarsals_amount', '_value' )"
								:placeholder="'Select ...'"
								:options="getFieldProp( 'left_lower_limb__tarsals_amount', '_options' )"
								:hasClearButton="true"
								@input="$store.commit('setFieldProp', {
									fieldName : 'left_lower_limb__tarsals_amount',
									key       : '_value',
									value     : $event
								})"
							></BaseSelect>
							<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('left_lower_limb__tarsals_amount')}}</pre>
						</div>
					</KnFormFieldRow>
					<!-- metatarsals -->
					<KnFormFieldRow>
						<div class="KnEditForm__labelCell font font--medium color color--primary50"
							style="grid-column: span 4;">
							{{getFieldProp( 'left_lower_limb__metatarsals', '_label' )}}
						</div>
						<div style="grid-column: span 4;">
							<BaseSelect
								:value="getFieldProp( 'left_lower_limb__metatarsals_amount', '_value' )"
								:placeholder="'Select ...'"
								:options="getFieldProp( 'left_lower_limb__metatarsals_amount', '_options' )"
								:hasClearButton="true"
								@input="$store.commit('setFieldProp', {
									fieldName : 'left_lower_limb__metatarsals_amount',
									key       : '_value',
									value     : $event
								})"
							></BaseSelect>
							<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('left_lower_limb__metatarsals_amount')}}</pre>
						</div>
					</KnFormFieldRow>
					<!-- proximal-phalanges-foot -->
					<KnFormFieldRow>
						<div class="KnEditForm__labelCell font font--medium color color--primary50"
							style="grid-column: span 4;">
							{{getFieldProp( 'left_lower_limb__proximal-phalanges-foot', '_label' )}}
						</div>
						<div style="grid-column: span 4;">
							<BaseSelect
								:value="getFieldProp( 'left_lower_limb__proximal-phalanges-foot_amount', '_value' )"
								:placeholder="'Select ...'"
								:options="getFieldProp( 'left_lower_limb__proximal-phalanges-foot_amount', '_options' )"
								:hasClearButton="true"
								@input="$store.commit('setFieldProp', {
									fieldName : 'left_lower_limb__proximal-phalanges-foot_amount',
									key       : '_value',
									value     : $event
								})"
							></BaseSelect>
							<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('left_lower_limb__proximal-phalanges-foot_amount')}}</pre>
						</div>
					</KnFormFieldRow>
					<!-- intermediate-phalanges-foot -->
					<KnFormFieldRow>
						<div class="KnEditForm__labelCell font font--medium color color--primary50"
							style="grid-column: span 4;">
							{{getFieldProp( 'left_lower_limb__intermediate-phalanges-foot', '_label' )}}
						</div>
						<div style="grid-column: span 4;">
							<BaseSelect
								:value="getFieldProp( 'left_lower_limb__intermediate-phalanges-foot_amount', '_value' )"
								:placeholder="'Select ...'"
								:options="getFieldProp( 'left_lower_limb__intermediate-phalanges-foot_amount', '_options' )"
								:hasClearButton="true"
								@input="$store.commit('setFieldProp', {
									fieldName : 'left_lower_limb__intermediate-phalanges-foot_amount',
									key       : '_value',
									value     : $event
								})"
							></BaseSelect>
							<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('left_lower_limb__intermediate-phalanges-foot_amount')}}</pre>
						</div>
					</KnFormFieldRow>
					<!-- distal-phalanges-foot -->
					<KnFormFieldRow>
						<div class="KnEditForm__labelCell font font--medium color color--primary50"
							style="grid-column: span 4;">
							{{getFieldProp( 'left_lower_limb__distal-phalanges-foot', '_label' )}}
						</div>
						<div style="grid-column: span 4;">
							<BaseSelect
								:value="getFieldProp( 'left_lower_limb__distal-phalanges-foot_amount', '_value' )"
								:placeholder="'Select ...'"
								:options="getFieldProp( 'left_lower_limb__distal-phalanges-foot_amount', '_options' )"
								:hasClearButton="true"
								@input="$store.commit('setFieldProp', {
									fieldName : 'left_lower_limb__distal-phalanges-foot_amount',
									key       : '_value',
									value     : $event
								})"
							></BaseSelect>
							<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('left_lower_limb__distal-phalanges-foot_amount')}}</pre>
						</div>
					</KnFormFieldRow>
				</template>
				<!-- right_lower_limb -->
				<template v-if="5 === currentInventoryTabIndex">
					<KnColumnLabelsRow
						class="font font--sizeSmall color color--primary50"
						:items="[
							{ label : 'Bone', span : 4 },
							{ label : 'Preservation', span : 6, },
						]"
					></KnColumnLabelsRow>

					<!-- hip-bone -->
					<KnFormFieldRow>
						<div class="KnEditForm__labelCell font font--medium color color--primary50"
							style="grid-column: span 4;">
							{{getFieldProp( 'right_lower_limb__hip-bone', '_label' )}}
						</div>
						<div style="grid-column: span 4;">
							<BaseSelect
								:value="getFieldProp( 'right_lower_limb__hip-bone_amount', '_value' )"
								:placeholder="'Select ...'"
								:options="getFieldProp( 'right_lower_limb__hip-bone_amount', '_options' )"
								:hasClearButton="true"
								@input="$store.commit('setFieldProp', {
									fieldName : 'right_lower_limb__hip-bone_amount',
									key       : '_value',
									value     : $event
								})"
							></BaseSelect>
							<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('right_lower_limb__hip-bone_amount')}}</pre>
						</div>
					</KnFormFieldRow>
					<!-- femur -->
					<KnFormFieldRow>
						<div class="KnEditForm__labelCell font font--medium color color--primary50"
							style="grid-column: span 4;">
							{{getFieldProp( 'right_lower_limb__femur', '_label' )}}
						</div>
						<div style="grid-column: span 4;">
							<BaseSelect
								:value="getFieldProp( 'right_lower_limb__femur_amount', '_value' )"
								:placeholder="'Select ...'"
								:options="getFieldProp( 'right_lower_limb__femur_amount', '_options' )"
								:hasClearButton="true"
								@input="$store.commit('setFieldProp', {
									fieldName : 'right_lower_limb__femur_amount',
									key       : '_value',
									value     : $event
								})"
							></BaseSelect>
							<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('right_lower_limb__femur_amount')}}</pre>
						</div>
					</KnFormFieldRow>
					<!-- patella -->
					<KnFormFieldRow>
						<div class="KnEditForm__labelCell font font--medium color color--primary50"
							style="grid-column: span 4;">
							{{getFieldProp( 'right_lower_limb__patella', '_label' )}}
						</div>
						<div style="grid-column: span 4;">
							<BaseSelect
								:value="getFieldProp( 'right_lower_limb__patella_amount', '_value' )"
								:placeholder="'Select ...'"
								:options="getFieldProp( 'right_lower_limb__patella_amount', '_options' )"
								:hasClearButton="true"
								@input="$store.commit('setFieldProp', {
									fieldName : 'right_lower_limb__patella_amount',
									key       : '_value',
									value     : $event
								})"
							></BaseSelect>
							<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('right_lower_limb__patella_amount')}}</pre>
						</div>
					</KnFormFieldRow>
					<!-- tibia -->
					<KnFormFieldRow>
						<div class="KnEditForm__labelCell font font--medium color color--primary50"
							style="grid-column: span 4;">
							{{getFieldProp( 'right_lower_limb__tibia', '_label' )}}
						</div>
						<div style="grid-column: span 4;">
							<BaseSelect
								:value="getFieldProp( 'right_lower_limb__tibia_amount', '_value' )"
								:placeholder="'Select ...'"
								:options="getFieldProp( 'right_lower_limb__tibia_amount', '_options' )"
								:hasClearButton="true"
								@input="$store.commit('setFieldProp', {
									fieldName : 'right_lower_limb__tibia_amount',
									key       : '_value',
									value     : $event
								})"
							></BaseSelect>
							<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('right_lower_limb__tibia_amount')}}</pre>
						</div>
					</KnFormFieldRow>
					<!-- fibula -->
					<KnFormFieldRow>
						<div class="KnEditForm__labelCell font font--medium color color--primary50"
							style="grid-column: span 4;">
							{{getFieldProp( 'right_lower_limb__fibula', '_label' )}}
						</div>
						<div style="grid-column: span 4;">
							<BaseSelect
								:value="getFieldProp( 'right_lower_limb__fibula_amount', '_value' )"
								:placeholder="'Select ...'"
								:options="getFieldProp( 'right_lower_limb__fibula_amount', '_options' )"
								:hasClearButton="true"
								@input="$store.commit('setFieldProp', {
									fieldName : 'right_lower_limb__fibula_amount',
									key       : '_value',
									value     : $event
								})"
							></BaseSelect>
							<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('right_lower_limb__fibula_amount')}}</pre>
						</div>
					</KnFormFieldRow>
					<!-- calcaneus -->
					<KnFormFieldRow>
						<div class="KnEditForm__labelCell font font--medium color color--primary50"
							style="grid-column: span 4;">
							{{getFieldProp( 'right_lower_limb__calcaneus', '_label' )}}
						</div>
						<div style="grid-column: span 4;">
							<BaseSelect
								:value="getFieldProp( 'right_lower_limb__calcaneus_amount', '_value' )"
								:placeholder="'Select ...'"
								:options="getFieldProp( 'right_lower_limb__calcaneus_amount', '_options' )"
								:hasClearButton="true"
								@input="$store.commit('setFieldProp', {
									fieldName : 'right_lower_limb__calcaneus_amount',
									key       : '_value',
									value     : $event
								})"
							></BaseSelect>
							<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('right_lower_limb__calcaneus_amount')}}</pre>
						</div>
					</KnFormFieldRow>
					<!-- talus -->
					<KnFormFieldRow>
						<div class="KnEditForm__labelCell font font--medium color color--primary50"
							style="grid-column: span 4;">
							{{getFieldProp( 'right_lower_limb__talus', '_label' )}}
						</div>
						<div style="grid-column: span 4;">
							<BaseSelect
								:value="getFieldProp( 'right_lower_limb__talus_amount', '_value' )"
								:placeholder="'Select ...'"
								:options="getFieldProp( 'right_lower_limb__talus_amount', '_options' )"
								:hasClearButton="true"
								@input="$store.commit('setFieldProp', {
									fieldName : 'right_lower_limb__talus_amount',
									key       : '_value',
									value     : $event
								})"
							></BaseSelect>
							<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('right_lower_limb__talus_amount')}}</pre>
						</div>
					</KnFormFieldRow>
					<!-- tarsals -->
					<KnFormFieldRow>
						<div class="KnEditForm__labelCell font font--medium color color--primary50"
							style="grid-column: span 4;">
							{{getFieldProp( 'right_lower_limb__tarsals', '_label' )}}
						</div>
						<div style="grid-column: span 4;">
							<BaseSelect
								:value="getFieldProp( 'right_lower_limb__tarsals_amount', '_value' )"
								:placeholder="'Select ...'"
								:options="getFieldProp( 'right_lower_limb__tarsals_amount', '_options' )"
								:hasClearButton="true"
								@input="$store.commit('setFieldProp', {
									fieldName : 'right_lower_limb__tarsals_amount',
									key       : '_value',
									value     : $event
								})"
							></BaseSelect>
							<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('right_lower_limb__tarsals_amount')}}</pre>
						</div>
					</KnFormFieldRow>
					<!-- metatarsals -->
					<KnFormFieldRow>
						<div class="KnEditForm__labelCell font font--medium color color--primary50"
							style="grid-column: span 4;">
							{{getFieldProp( 'right_lower_limb__metatarsals', '_label' )}}
						</div>
						<div style="grid-column: span 4;">
							<BaseSelect
								:value="getFieldProp( 'right_lower_limb__metatarsals_amount', '_value' )"
								:placeholder="'Select ...'"
								:options="getFieldProp( 'right_lower_limb__metatarsals_amount', '_options' )"
								:hasClearButton="true"
								@input="$store.commit('setFieldProp', {
									fieldName : 'right_lower_limb__metatarsals_amount',
									key       : '_value',
									value     : $event
								})"
							></BaseSelect>
							<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('right_lower_limb__metatarsals_amount')}}</pre>
						</div>
					</KnFormFieldRow>
					<!-- proximal-phalanges-foot -->
					<KnFormFieldRow>
						<div class="KnEditForm__labelCell font font--medium color color--primary50"
							style="grid-column: span 4;">
							{{getFieldProp( 'right_lower_limb__proximal-phalanges-foot', '_label' )}}
						</div>
						<div style="grid-column: span 4;">
							<BaseSelect
								:value="getFieldProp( 'right_lower_limb__proximal-phalanges-foot_amount', '_value' )"
								:placeholder="'Select ...'"
								:options="getFieldProp( 'right_lower_limb__proximal-phalanges-foot_amount', '_options' )"
								:hasClearButton="true"
								@input="$store.commit('setFieldProp', {
									fieldName : 'right_lower_limb__proximal-phalanges-foot_amount',
									key       : '_value',
									value     : $event
								})"
							></BaseSelect>
							<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('right_lower_limb__proximal-phalanges-foot_amount')}}</pre>
						</div>
					</KnFormFieldRow>
					<!-- intermediate-phalanges-foot -->
					<KnFormFieldRow>
						<div class="KnEditForm__labelCell font font--medium color color--primary50"
							style="grid-column: span 4;">
							{{getFieldProp( 'right_lower_limb__intermediate-phalanges-foot', '_label' )}}
						</div>
						<div style="grid-column: span 4;">
							<BaseSelect
								:value="getFieldProp( 'right_lower_limb__intermediate-phalanges-foot_amount', '_value' )"
								:placeholder="'Select ...'"
								:options="getFieldProp( 'right_lower_limb__intermediate-phalanges-foot_amount', '_options' )"
								:hasClearButton="true"
								@input="$store.commit('setFieldProp', {
									fieldName : 'right_lower_limb__intermediate-phalanges-foot_amount',
									key       : '_value',
									value     : $event
								})"
							></BaseSelect>
							<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('right_lower_limb__intermediate-phalanges-foot_amount')}}</pre>
						</div>
					</KnFormFieldRow>
					<!-- distal-phalanges-foot -->
					<KnFormFieldRow>
						<div class="KnEditForm__labelCell font font--medium color color--primary50"
							style="grid-column: span 4;">
							{{getFieldProp( 'right_lower_limb__distal-phalanges-foot', '_label' )}}
						</div>
						<div style="grid-column: span 4;">
							<BaseSelect
								:value="getFieldProp( 'right_lower_limb__distal-phalanges-foot_amount', '_value' )"
								:placeholder="'Select ...'"
								:options="getFieldProp( 'right_lower_limb__distal-phalanges-foot_amount', '_options' )"
								:hasClearButton="true"
								@input="$store.commit('setFieldProp', {
									fieldName : 'right_lower_limb__distal-phalanges-foot_amount',
									key       : '_value',
									value     : $event
								})"
							></BaseSelect>
							<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('right_lower_limb__distal-phalanges-foot_amount')}}</pre>
						</div>
					</KnFormFieldRow>
				</template>

				<!-- next -->
				<KnFormFieldRow>
					<div style="grid-column: span 8; display: flex; justify-content: flex-end;">
						<div>
							<br/>
							<BaseButton
								class="font font--sizeLarge font--bold"
								:isOutlined="false"
								:isDisabled="!isStepValid('inventory')"
								@click.native="enableNextStep()"
							>
								<template slot="before"></template>
								<template slot="default">Next step</template>
								<template slot="after">
									<MhIcon type="arrow-right" ></MhIcon>
								</template>
							</BaseButton>
							<br/>
							<br/>
							<br/>
						</div>
					</div>
				</KnFormFieldRow>

			</template>
			<template v-if="'bone-changes' === _.get($store.getters.activeStep, 'slug')">

				<!-- no enough data for bone-change-search -->
				<KnFormFieldRow class="color color--red" v-if="!_.size( availableBoneIds ) || !getFieldProp( 'disease', '_value' )">
					<!--
					<div style="grid-column: span 4;"></div>
					-->
					<div style="grid-column: span 6;">
						<div class="KnEditForm__message">
							<MhIcon class="KnEditForm__messageIcon" type="info"></MhIcon>
							<p class="KnEditForm__messageLabel">
								Not enough data to perform the bone-change-search.
							</p>
						</div>
					</div>
					<div style="grid-column: span 2;"></div>
				</KnFormFieldRow>

				<!-- no results for bone-change-search -->
				<KnFormFieldRow class="color color--red" v-if="hasFetchedBoneChangesFields && !_.size(boneChangesForm)">
					<!--
					<div style="grid-column: span 4;"></div>
					-->
					<div style="grid-column: span 6;">
						<div class="KnEditForm__message">
							<MhIcon class="KnEditForm__messageIcon" type="info"></MhIcon>
							<p class="KnEditForm__messageLabel">
								No results for the bone-change-search.
							</p>
						</div>
					</div>
					<div style="grid-column: span 2;"></div>
				</KnFormFieldRow>

				<!-- tabs with methods -->
				<KnTabsRow
					class="font font--sizeDefault font--medium background background--white50"
					:inactiveClass="'color--primary50'"
					:items="boneChangesTabs"
					:activeItemIndex="currentBoneChangesFormTabIndex"
					@tabChange="gotoBoneChangesFormTabIndex"
				></KnTabsRow>

				<!-- all fields -->
				<template v-for="(tab, tabIndex) in boneChangesForm">
					<template v-if="currentBoneChangesFormTabIndex === tabIndex">
						<KnFormFieldRow :key="'bcs__' + tabIndex + '__' + fieldIndex"
							v-for="(fieldSlug, fieldIndex) in tab.fields">
							<div class="KnEditForm__labelCell font font--medium color color--primary50"
								style="grid-column: span 4;">
								{{getFieldProp( fieldSlug, '_label' )}}
							</div>
							<div style="grid-column: span 8;">
								<Treeselect
									class=""
									:value="
										_.isEmpty( getFieldProp( fieldSlug, '_value' ) ) ? null :
										getFieldProp( fieldSlug, '_value', null )
									"
									:multiple="true"
									:placeholder="'Select ...'"
									:normalizer="treeselectNormalizer"
									:options="getFieldProp( fieldSlug, '_options' )"
									@input="$store.commit('setFieldProp', {
										fieldName : fieldSlug,
										key       : '_value',
										value     : $event
									})"
								/>
								<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug( fieldSlug )}}</pre>
							</div>
						</KnFormFieldRow>
					</template>
					<!--
					<div :key="'bcs3__' + tabIndex + '__' + fieldIndex"
						 v-for="(field, fieldIndex) in tab.fields">
						<pre :key="'bcs4__' + tabIndex + '__' + fieldIndex">{{field}}</pre>
					</div>
					-->
				</template>

				<!-- next -->
				<KnFormFieldRow>
					<div style="grid-column: span 8; display: flex; justify-content: flex-end;">
						<div>
							<br/>
							<BaseButton
								class="font font--sizeLarge font--bold"
								:isOutlined="false"
								:isDisabled="!isStepValid('bone-changes')"
								@click.native="enableNextStep()"
							>
								<template slot="before"></template>
								<template slot="default">Next step</template>
								<template slot="after">
									<MhIcon type="arrow-right" ></MhIcon>
								</template>
							</BaseButton>
							<br/>
							<br/>
							<br/>
						</div>
					</div>
				</KnFormFieldRow>

			</template>
			<template v-if="'site' === _.get($store.getters.activeStep, 'slug')">

				<!-- reference_images -->
				<KnFormFieldRow>
					<div class="KnEditForm__labelCell font font--medium color color--primary50"
						style="grid-column: span 3;">
						{{getFieldProp( 'reference_images', '_label' )}}
						<template v-if="getFieldProp( 'reference_images', 'mandatory' )">*</template>
					</div>
					<div style="grid-column: span 5;">
						<BaseText
							:value="getFieldProp( 'reference_images', '_value' )"
							:placeholder="'Enter ..'"
							:required="false"
							:disabled="false"
							:hasClearButton="true"
							@change="(e)=>{}"
							@input="$store.commit('setFieldProp', {
								fieldName : 'reference_images',
								key       : '_value',
								value     : $event
							})"
						></BaseText>
						<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('reference_images')}}</pre>
					</div>
					<div class="font font--sizeSmall color color--primary50"
						style="grid-column: span 4;" v-html="getFieldProp( 'reference_images', 'help_text' )"
					></div>
				</KnFormFieldRow>
				<!-- origin -->
				<KnFormFieldRow>
					<div class="KnEditForm__labelCell font font--medium color color--primary50"
						style="grid-column: span 3;">
						{{getFieldProp( 'origin', '_label' )}}
						<template v-if="getFieldProp( 'origin', 'mandatory' )">*</template>
					</div>
					<div style="grid-column: span 5;">
						<div class="KnEditForm__radioGroup">
							<label
								class="KnEditForm__radioGroupInner"
								v-for="(option, index) in getFieldProp( 'origin', '_options' )"
								:key="'rbo' + index">
								<BaseRadio
									class="KnEditForm__radioGroupRadio"
									:value="getFieldProp( 'origin', '_value' )"
									:name="'origin'"
									:checkedValue="option.value"
									@change="()=>{}"
									@input="$store.commit('setFieldProp', {
										fieldName : 'origin',
										key       : '_value',
										value     : $event
									})"
								></BaseRadio>
								<span class="KnEditForm__radioGroupLabel">{{option.label}}</span>
							</label>
						</div>
						<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('origin')}}</pre>
					</div>
					<div class="font font--sizeSmall color color--primary50"
						style="grid-column: span 4;" v-html="getFieldProp( 'origin', 'help_text' )"
					></div>
				</KnFormFieldRow>
				<!-- archaeological_site -->
				<KnFormFieldRow>
					<div class="KnEditForm__labelCell font font--medium color color--primary50"
						style="grid-column: span 3;">
						{{getFieldProp( 'archaeological_site', '_label' )}}
						<template v-if="getFieldProp( 'archaeological_site', 'mandatory' )">*</template>
					</div>
					<div style="grid-column: span 5;">
						<div class="KnEditForm__search">
							<div class="KnEditForm__searchFieldWrapper">
								<MhIcon type="search"
									:style="{
										visibility : getFieldProp( 'archaeological_site', '_isLoading' ) ? 'hidden' : 'visible'
									}"
								></MhIcon>
								<MhIcon type="rotate-cw"
									:style="{
										visibility : getFieldProp( 'archaeological_site', '_isLoading' ) ? 'visible' : 'hidden'
									}"
								></MhIcon>
								<BaseText
									class="KnEditForm__searchField"
									:value="getFieldProp( 'archaeological_site', '_search' )"
									:placeholder="'Search ...'"
									:required="false"
									:disabled="false"
									:hasClearButton="true"
									:debounce="true"
									@change="(e)=>{}"
									@input="$store.commit('setFieldProp', {
										fieldName : 'archaeological_site',
										key       : '_search',
										value     : $event
									})"
								></BaseText>
								<span class="KnEditForm__searchCountResults" v-if="_.size( getFieldProp( 'archaeological_site', '_options' ) )">
									{{_.size( getFieldProp( 'archaeological_site', '_options' ) )}}
								</span>
							</div>

							<!--
							<pre name="_options">{{_.size(getFieldProp( 'archaeological_site', '_options' ))}}</pre>
							<pre name="_isLoading">{{getFieldProp( 'archaeological_site', '_isLoading' )}}</pre>
							-->

							<div class="KnEditForm__searchResults"
								:countResults="_.size( getFieldProp( 'archaeological_site', '_options' ) )"
								:style="getSearchResultsStyles('archaeological_site')"
							>
								<!-- nothing found message -->
								<div class="KnEditForm__searchNoResultsMsg" v-if="!_.size( getFieldProp( 'archaeological_site', '_options' ) ) && !getFieldProp( 'archaeological_site', '_isLoading' )">
									<MhIcon class="KnEditForm__searchNoResultsMsgIcon" type="info"></MhIcon>
									<span class="KnEditForm__searchNoResultsMsgLabel">Nothing found. Try another search term.</span>
								</div>
								<!-- show the results -->
								<div class="KnEditForm__searchResult"
									:class="
										_.get( item, 'prefName.title') === getFieldProp( 'archaeological_site', '_value' ) ?
										'KnEditForm__searchResult--isActive' :
										'KnEditForm__searchResult--isInactive'
									"
									v-for="(item, index) in getFieldProp( 'archaeological_site', '_options' )"
									:key="index"
									@click="
										$store.commit('setFieldProp', {
											fieldName : 'archaeological_site',
											key       : '_value',
											value     : _.get( item, 'prefName.title', '' ),
										})
										$store.commit('setFieldProp', {
											fieldName : 'position',
											key       : '_value',
											value     : _.get( item, 'prefLocation.coordinates', [] ).reverse().join(','),
										})
										$store.commit('setFieldProp', {
											fieldName : 'gazId',
											key       : '_value',
											value     : _.get( item, 'gazId', '' ),
										})
										$store.commit('setFieldProp', {
											fieldName : 'gaz_link',
											key       : '_value',
											value     : _.get( item, '@id', '' ),
										})
									">
									<MhIcon class="KnEditForm__searchResultIcon" type="map-pin"></MhIcon>
									<span class="KnEditForm__searchResultLabel">{{_.get( item, 'prefName.title', '' )}}</span>
								</div>
							</div>

						</div>
						<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('archaeological_site')}}</pre>
					</div>
					<div class="font font--sizeSmall color color--primary50"
						style="grid-column: span 4;" v-html="getFieldProp( 'archaeological_site', 'help_text' )"
					></div>
				</KnFormFieldRow>
				<!-- position -->
				<!--
				<KnFormFieldRow>
					<div class="KnEditForm__labelCell font font--medium color color--primary50"
						style="grid-column: span 3;">
						{{getFieldProp( 'position', '_label' )}}
						<template v-if="getFieldProp( 'position', 'mandatory' )">*</template>
					</div>
					<div style="grid-column: span 5;">
						<BaseText
							:value="getFieldProp( 'position', '_value' )"
							:placeholder="''"
							:required="false"
							:disabled="true"
							:hasClearButton="true"
							@change="(e)=>{}"
							@input="(value)=>{}"
						></BaseText>
						<mark>help text sollte darauf hinweißen, dass dieses feld automatisch befüllt wird und der user hier nichts tun muss.</mark>
						<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('position')}}</pre>
					</div>
					<div class="font font--sizeSmall color color--primary50"
						style="grid-column: span 4;" v-html="getFieldProp( 'position', 'help_text' )"
					></div>
				</KnFormFieldRow>
				-->
				<!-- gazId -->
				<!--
				<KnFormFieldRow v-if="'archaeological' === getFieldProp( 'origin', '_value' )">
					<div class="KnEditForm__labelCell font font--medium color color--primary50"
						style="grid-column: span 3;">
						{{getFieldProp( 'gazId', '_label' )}}
						<template v-if="getFieldProp( 'gazId', 'mandatory' )">*</template>
					</div>
					<div style="grid-column: span 5;">
						<BaseText
							:value="getFieldProp( 'gazId', '_value' )"
							:placeholder="''"
							:required="false"
							:disabled="true"
							:hasClearButton="true"
							@change="(e)=>{}"
							@input="(value)=>{}"
						></BaseText>
						<mark>dieses feld soll am schluss nicht im formular sichtbar sein. es wird nur benötigt, da seine value am ende mit abgesendet werden soll.</mark>
						<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('gazId')}}</pre>
					</div>
					<div class="font font--sizeSmall color color--primary50"
						style="grid-column: span 4;" v-html="getFieldProp( 'gazId', 'help_text' )"
					></div>
				</KnFormFieldRow>
				-->
				<!-- gaz_link -->
				<!--
				<KnFormFieldRow v-if="'archaeological' === getFieldProp( 'origin', '_value' )">
					<div class="KnEditForm__labelCell font font--medium color color--primary50"
						style="grid-column: span 3;">
						{{getFieldProp( 'gaz_link', '_label' )}}
						<template v-if="getFieldProp( 'gaz_link', 'mandatory' )">*</template>
					</div>
					<div style="grid-column: span 5;">
						<BaseText
							:value="getFieldProp( 'gaz_link', '_value' )"
							:placeholder="''"
							:required="false"
							:disabled="true"
							:hasClearButton="true"
							@change="(e)=>{}"
							@input="(value)=>{}"
						></BaseText>
						<mark>dieses feld soll am schluss nicht im formular sichtbar sein. es wird nur benötigt, da seine value am ende mit abgesendet werden soll.</mark>
						<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('gaz_link')}}</pre>
					</div>
					<div class="font font--sizeSmall color color--primary50"
						style="grid-column: span 4;" v-html="getFieldProp( 'gaz_link', 'help_text' )"
					></div>
				</KnFormFieldRow>
				-->
				<!-- archaeological_tombid -->
				<KnFormFieldRow v-if="'archaeological' === getFieldProp( 'origin', '_value' )">
					<div class="KnEditForm__labelCell font font--medium color color--primary50"
						style="grid-column: span 3;">
						{{getFieldProp( 'archaeological_tombid', '_label' )}}
						<template v-if="getFieldProp( 'archaeological_tombid', 'mandatory' )">*</template>
					</div>
					<div style="grid-column: span 5;">
						<BaseText
							:value="getFieldProp( 'archaeological_tombid', '_value' )"
							:placeholder="''"
							:required="false"
							:disabled="getFieldProp( 'archaeological_tombid', '_disabled' )"
							:hasClearButton="true"
							@change="(e)=>{}"
							@input="$store.commit('setFieldProp', {
								fieldName : 'archaeological_tombid',
								key       : '_value',
								value     : $event
							})"
						></BaseText>
						<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('archaeological_tombid')}}</pre>
					</div>
					<div class="font font--sizeSmall color color--primary50"
						style="grid-column: span 4;" v-html="getFieldProp( 'archaeological_tombid', 'help_text' )"
					></div>
				</KnFormFieldRow>
				<!-- archaeological_individualid -->
				<KnFormFieldRow v-if="'archaeological' === getFieldProp( 'origin', '_value' )">
					<div class="KnEditForm__labelCell font font--medium color color--primary50"
						style="grid-column: span 3;">
						{{getFieldProp( 'archaeological_individualid', '_label' )}}
						<template v-if="getFieldProp( 'archaeological_individualid', 'mandatory' )">*</template>
					</div>
					<div style="grid-column: span 5;">
						<BaseText
							:value="getFieldProp( 'archaeological_individualid', '_value' )"
							:placeholder="''"
							:required="false"
							:disabled="getFieldProp( 'archaeological_individualid', '_disabled' )"
							:hasClearButton="true"
							@change="(e)=>{}"
							@input="$store.commit('setFieldProp', {
								fieldName : 'archaeological_individualid',
								key       : '_value',
								value     : $event
							})"
						></BaseText>
						<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('archaeological_individualid')}}</pre>
					</div>
					<div class="font font--sizeSmall color color--primary50"
						style="grid-column: span 4;" v-html="getFieldProp( 'archaeological_individualid', 'help_text' )"
					></div>
				</KnFormFieldRow>
				<!-- archaeological_funery_context -->
				<KnFormFieldRow v-if="'archaeological' === getFieldProp( 'origin', '_value' )">
					<div class="KnEditForm__labelCell font font--medium color color--primary50"
						style="grid-column: span 3;">
						{{getFieldProp( 'archaeological_funery_context', '_label' )}}
						<template v-if="getFieldProp( 'archaeological_funery_context', 'mandatory' )">*</template>
					</div>
					<div style="grid-column: span 5;">
						<BaseSelect
							:value="getFieldProp( 'archaeological_funery_context', '_value' )"
							:placeholder="'Select ...'"
							:options="getFieldProp( 'archaeological_funery_context', '_options' )"
							:hasClearButton="true"
							@input="$store.commit('setFieldProp', {
								fieldName : 'archaeological_funery_context',
								key       : '_value',
								value     : $event
							})"
						></BaseSelect>
						<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('archaeological_funery_context')}}</pre>
					</div>
					<div class="font font--sizeSmall color color--primary50"
						style="grid-column: span 4;" v-html="getFieldProp( 'archaeological_funery_context', 'help_text' )"
					></div>
				</KnFormFieldRow>
				<!-- archaeological_burial_type -->
				<KnFormFieldRow v-if="'archaeological' === getFieldProp( 'origin', '_value' )">
					<div class="KnEditForm__labelCell font font--medium color color--primary50"
						style="grid-column: span 3;">
						{{getFieldProp( 'archaeological_burial_type', '_label' )}}
						<template v-if="getFieldProp( 'archaeological_burial_type', 'mandatory' )">*</template>
					</div>
					<div style="grid-column: span 5;">
						<BaseSelect
							:value="getFieldProp( 'archaeological_burial_type', '_value' )"
							:placeholder="'Select ...'"
							:options="getFieldProp( 'archaeological_burial_type', '_options' )"
							:hasClearButton="true"
							@input="$store.commit('setFieldProp', {
								fieldName : 'archaeological_burial_type',
								key       : '_value',
								value     : $event
							})"
						></BaseSelect>
						<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('archaeological_burial_type')}}</pre>
					</div>
					<div class="font font--sizeSmall color color--primary50"
						style="grid-column: span 4;" v-html="getFieldProp( 'archaeological_burial_type', 'help_text' )"
					></div>
				</KnFormFieldRow>
				<!-- storage_place -->
				<KnFormFieldRow>
					<div class="KnEditForm__labelCell font font--medium color color--primary50"
						style="grid-column: span 3;">
						{{getFieldProp( 'storage_place', '_label' )}}
						<template v-if="getFieldProp( 'storage_place', 'mandatory' )">*</template>
					</div>
					<div style="grid-column: span 5;">
						<!--
						<BaseSelect
							:value="getFieldProp( 'storage_place', '_value' )"
							:placeholder="'Select ...'"
							:options="getFieldProp( 'storage_place', '_options' )"
							:hasClearButton="true"
							@input="$store.commit('setFieldProp', {
								fieldName : 'storage_place',
								key       : '_value',
								value     : $event
							})"
						></BaseSelect>
						-->
						<Treeselect
							class=""
							:value="
								_.isEmpty( getFieldProp( 'storage_place', '_value' ) ) ? null :
								getFieldProp( 'storage_place', '_value', null )
							"
							:multiple="true"
							:placeholder="'Select ...'"
							:valueConsistsOf="'LEAF_PRIORITY'"
							:options="storagePlaceOptions"
							@input="$store.commit('setFieldProp', {
								fieldName : 'storage_place',
								key       : '_value',
								value     : $event
							})"
						/>
						<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('storage_place')}}</pre>
					</div>
					<div class="font font--sizeSmall color color--primary50"
						style="grid-column: span 4;" v-html="getFieldProp( 'storage_place', 'help_text' )"
					></div>
				</KnFormFieldRow>
				<!-- storage_place_checkbox -->
				<KnFormFieldRow>
					<div class="KnEditForm__labelCell font font--medium color color--primary50"
						style="grid-column: span 3;">
						{{getFieldProp( 'storage_place_checkbox', '_label' )}}
						<template v-if="getFieldProp( 'storage_place_checkbox', 'mandatory' )">*</template>
					</div>
					<div style="grid-column: span 5;">
						<div class="flex">
							<BaseCheckbox
								:value="getFieldProp( 'storage_place_checkbox', '_value' )"
								@input="$store.commit('setFieldProp', {
									fieldName : 'storage_place_checkbox',
									key       : '_value',
									value     : $event
								})"
							></BaseCheckbox>
							<span class="KnEditForm__labelInline" v-html="getFieldProp( 'storage_place_checkbox', 'help_text' )"></span>
						</div>
					</div>
					<div class="font font--sizeSmall color color--primary50" style="grid-column: span 4;"></div>
				</KnFormFieldRow>
				<!-- storage_place_freetext -->
				<KnFormFieldRow v-if="getFieldProp( 'storage_place_checkbox', '_value' )">
					<div class="KnEditForm__labelCell font font--medium color color--primary50"
						style="grid-column: span 3;">
						{{getFieldProp( 'storage_place_freetext', '_label' )}}
						<template v-if="getFieldProp( 'storage_place_freetext', 'mandatory' )">*</template>
					</div>
					<div style="grid-column: span 5;">
						<BaseTextarea
							:value="getFieldProp( 'storage_place_freetext', '_value' )"
							:placeholder="'Enter ...'"
							:required="false"
							:disabled="getFieldProp( 'storage_place_freetext', '_disabled' )"
							:hasClearButton="true"
							@change="(e)=>{}"
							@input="$store.commit('setFieldProp', {
								fieldName : 'storage_place_freetext',
								key       : '_value',
								value     : $event
							})"
						></BaseTextarea>
						<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('storage_place_freetext')}}</pre>
					</div>
					<div class="font font--sizeSmall color color--primary50"
						style="grid-column: span 4;" v-html="getFieldProp( 'storage_place_freetext', 'help_text' )"
					></div>
				</KnFormFieldRow>
				<!-- storage_condition -->
				<!--
				<KnFormFieldRow>
					<div class="KnEditForm__labelCell font font--medium color color--primary50"
						style="grid-column: span 3;">
						{{getFieldProp( 'storage_condition', '_label' )}}
						<template v-if="getFieldProp( 'storage_condition', 'mandatory' )">*</template>
					</div>
					<div style="grid-column: span 5;">
						<BaseSelect
							:value="getFieldProp( 'storage_condition', '_value' )"
							:placeholder="'Select ...'"
							:options="getFieldProp( 'storage_condition', '_options' )"
							:hasClearButton="true"
							@input="$store.commit('setFieldProp', {
								fieldName : 'storage_condition',
								key       : '_value',
								value     : $event
							})"
						></BaseSelect>
						<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('storage_condition')}}</pre>
					</div>
					<div class="font font--sizeSmall color color--primary50"
						style="grid-column: span 4;" v-html="getFieldProp( 'storage_condition', 'help_text' )"
					></div>
				</KnFormFieldRow>
				-->
				<!-- chronology -->
				<KnFormFieldRow>
					<div class="KnEditForm__labelCell font font--medium color color--primary50"
						style="grid-column: span 3;">
						{{getFieldProp( 'chronology', '_label' )}}
						<template v-if="getFieldProp( 'chronology', 'mandatory' )">*</template>
					</div>
					<div style="grid-column: span 5;">
						<div class="KnEditForm__search">
							<div class="KnEditForm__searchFieldWrapper">
								<MhIcon type="search"
									:style="{
										visibility : getFieldProp( 'chronology', '_isLoading' ) ? 'hidden' : 'visible'
									}"
								></MhIcon>
								<MhIcon type="rotate-cw"
									:style="{
										visibility : getFieldProp( 'chronology', '_isLoading' ) ? 'visible' : 'hidden'
									}"
								></MhIcon>
								<BaseText
									class="KnEditForm__searchField"
									:value="getFieldProp( 'chronology', '_search' )"
									:placeholder="'Search ...'"
									:required="false"
									:disabled="false"
									:hasClearButton="true"
									:debounce="true"
									@change="(e)=>{}"
									@input="$store.commit('setFieldProp', {
										fieldName : 'chronology',
										key       : '_search',
										value     : $event
									})"
								></BaseText>
								<span class="KnEditForm__searchCountResults" v-if="_.size( getFieldProp( 'chronology', '_options' ) )">
									{{_.size( getFieldProp( 'chronology', '_options' ) )}}
								</span>
							</div>

							<!--
							<pre>{{_.size(getFieldProp( 'chronology', '_options' ))}}</pre>
							-->

							<div class="KnEditForm__searchResults"
								:countResults="_.size( getFieldProp( 'chronology', '_options' ) )"
								:style="getSearchResultsStyles('chronology')">
								<div class="KnEditForm__searchNoResultsMsg" v-if="!_.size( getFieldProp( 'chronology', '_options' ) ) && !getFieldProp( 'chronology', '_isLoading' )">
									<MhIcon class="KnEditForm__searchNoResultsMsgIcon" type="info"></MhIcon>
									<span class="KnEditForm__searchNoResultsMsgLabel">Nothing found. Try another search term.</span>
								</div>
								<div class="KnEditForm__searchResult"
									:class="item === getFieldProp( 'chronology', '_value' ) ? 'KnEditForm__searchResult--isActive' : 'KnEditForm__searchResult--isInactive'"
									v-for="(item, index) in getFieldProp( 'chronology', '_options' )"
									:key="'ffff'+index"
									@click="
										$store.commit('setFieldProp', {
											fieldName : 'chronology',
											key       : '_value',
											value     : item
										})
									">
									<MhIcon class="KnEditForm__searchResultIcon" type="calendar"></MhIcon>
									<span class="KnEditForm__searchResultLabel">{{item}}</span>
								</div>
							</div>
						</div>
						<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('chronology')}}</pre>
						<div class="chronologySubForm">
							<div class="chronologySubForm__row">
								<hr class="chronologySubForm__hr" />
								<span class="chronologySubForm__or font font--sizeSmall color color--primary50">or</span>
								<hr class="chronologySubForm__hr" />
							</div>
							<div class="chronologySubForm__row">
								<!-- chronology_fromYear -->
								<BaseText class="chronologySubForm__text chronologySubForm__text--from"
									:value="getFieldProp( 'chronology_fromYear', '_value' )"
									:placeholder="'From'"
									:required="false"
									:disabled="false"
									:hasClearButton="false"
									:debounce="false"
									:debounceDelay="250"
									@change="(e)=>{}"
									@input="$store.commit('setFieldProp', {
										fieldName : 'chronology_fromYear',
										key       : '_value',
										value     : $event
									})"
								></BaseText>
								<!-- chronology_timePeriodFrom -->
								<BaseSelect class="chronologySubForm__cSelect--from"
									:value="getFieldProp( 'chronology_timePeriodFrom', '_value' )"
									:placeholder="'Choose ...'"
									:options="getFieldProp( 'chronology_timePeriodFrom', '_options' )"
									:hasClearButton="false"
									@change="()=>{}"
									@input="$store.commit('setFieldProp', {
										fieldName : 'chronology_timePeriodFrom',
										key       : '_value',
										value     : $event
									})"
								></BaseSelect>
								<!-- chronology_toYear -->
								<BaseText class="chronologySubForm__text chronologySubForm__text--to"
									:value="getFieldProp( 'chronology_toYear', '_value' )"
									:placeholder="'To'"
									:required="false"
									:disabled="false"
									:hasClearButton="false"
									:debounce="false"
									:debounceDelay="250"
									@change="(e)=>{}"
									@input="$store.commit('setFieldProp', {
										fieldName : 'chronology_toYear',
										key       : '_value',
										value     : $event
									})"
								></BaseText>
								<!-- chronology_timePeriodTo -->
								<BaseSelect class="chronologySubForm__cSelect--to"
									:value="getFieldProp( 'chronology_timePeriodTo', '_value' )"
									:placeholder="'Choose ...'"
									:options="getFieldProp( 'chronology_timePeriodTo', '_options' )"
									:hasClearButton="false"
									@change="()=>{}"
									@input="$store.commit('setFieldProp', {
										fieldName : 'chronology_timePeriodTo',
										key       : '_value',
										value     : $event
									})"
								></BaseSelect>
							</div>
							<div class="chronologySubForm__row">
								<!-- chronology_isApproximated -->
								<BaseCheckbox class="chronologySubForm__approximatedCheckbox"
									:value="getFieldProp( 'chronology_isApproximated', '_value' )"
									@input="$store.commit('setFieldProp', {
										fieldName : 'chronology_isApproximated',
										key       : '_value',
										value     : $event
									})"
								></BaseCheckbox> Approximated value
							</div>
							<!--
							<div class="chronologySubForm__row" style="flex-direction: column;">
								<pre name="chronology_fromYear">{{getFieldProp( 'chronology_fromYear', '_value' )}}</pre>
								<pre name="chronology_toYear">{{getFieldProp( 'chronology_toYear', '_value' )}}</pre>
								<pre name="chronology_timePeriod">{{getFieldProp( 'chronology_timePeriod', '_value' )}}</pre>
								<pre name="chronology_isApproximated">{{getFieldProp( 'chronology_isApproximated', '_value' )}}</pre>
							</div>
							-->
						</div>
					</div>
					<div class="font font--sizeSmall color color--primary50"
						style="grid-column: span 4;" v-html="getFieldProp( 'chronology', 'help_text' )"
					></div>
				</KnFormFieldRow>
				<!-- chronology_checkbox -->
				<KnFormFieldRow>
					<div class="KnEditForm__labelCell font font--medium color color--primary50"
						style="grid-column: span 3;">
						{{getFieldProp( 'chronology_checkbox', '_label' )}}
						<template v-if="getFieldProp( 'chronology_checkbox', 'mandatory' )">*</template>
						<!--
						-->
					</div>
					<div style="grid-column: span 5;">
						<BaseCheckbox
							:value="getFieldProp( 'chronology_checkbox', '_value' )"
							@input="$store.commit('setFieldProp', {
								fieldName : 'chronology_checkbox',
								key       : '_value',
								value     : $event
							})"
						></BaseCheckbox>
						<span class="KnEditForm__labelInline" v-html="getFieldProp( 'chronology_checkbox', 'help_text' )"></span>
					</div>
					<div class="font font--sizeSmall color color--primary50" style="grid-column: span 4;"></div>
				</KnFormFieldRow>
				<!-- chronology_freetext -->
				<KnFormFieldRow v-if="getFieldProp( 'chronology_checkbox', '_value' )">
					<div class="KnEditForm__labelCell font font--medium color color--primary50"
						style="grid-column: span 3;">
						{{getFieldProp( 'chronology_freetext', '_label' )}}
						<template v-if="getFieldProp( 'chronology_freetext', 'mandatory' )">*</template>
					</div>
					<div style="grid-column: span 5;">
						<BaseTextarea
							:value="getFieldProp( 'chronology_freetext', '_value' )"
							:placeholder="'Enter ..'"
							:required="false"
							:disabled="false"
							:resizeable="'vertical'"
							@change="(e)=>{}"
							@input="$store.commit('setFieldProp', {
								fieldName : 'chronology_freetext',
								key       : '_value',
								value     : $event
							})"
						></BaseTextarea>
						<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('chronology_freetext')}}</pre>
					</div>
					<div class="font font--sizeSmall color color--primary50"
						style="grid-column: span 4;" v-html="getFieldProp( 'chronology_freetext', 'help_text' )"
					></div>
				</KnFormFieldRow>
				<!-- dating_method -->
				<KnFormFieldRow>
					<div class="KnEditForm__labelCell font font--medium color color--primary50"
						style="grid-column: span 3;">
						{{getFieldProp( 'dating_method', '_label' )}}
						<template v-if="getFieldProp( 'dating_method', 'mandatory' )">*</template>
					</div>
					<div style="grid-column: span 5;">
						<!--
						<BaseSelect
							:value="getFieldProp( 'dating_method', '_value' )"
							:placeholder="'Select ...'"
							:options="getFieldProp( 'dating_method', '_options' )"
							:hasClearButton="true"
							@input="$store.commit('setFieldProp', {
								fieldName : 'dating_method',
								key       : '_value',
								value     : $event
							})"
						></BaseSelect>
						-->
						<Treeselect
							class=""
							:value="
								_.isEmpty( getFieldProp( 'dating_method', '_value' ) ) ? null :
								getFieldProp( 'dating_method', '_value', null )
							"
							:multiple="true"
							:placeholder="'Select ...'"
							:valueConsistsOf="'LEAF_PRIORITY'"
							:options="datingMethodOptions"
							@input="$store.commit('setFieldProp', {
								fieldName : 'dating_method',
								key       : '_value',
								value     : $event
							})"
						/>
						<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('dating_method')}}</pre>
					</div>
					<div class="font font--sizeSmall color color--primary50"
						style="grid-column: span 4;" v-html="getFieldProp( 'dating_method', 'help_text' )"
					></div>
				</KnFormFieldRow>

				<!-- next -->
				<KnFormFieldRow>
					<div style="grid-column: span 8; display: flex; justify-content: flex-end;">
						<div>
							<br/>
							<BaseButton
								class="font font--sizeLarge font--bold"
								:isOutlined="false"
								:isDisabled="!isStepValid('site')"
								@click.native="enableNextStep()"
							>
								<template slot="before"></template>
								<template slot="default">Next step</template>
								<template slot="after">
									<MhIcon type="arrow-right" ></MhIcon>
								</template>
							</BaseButton>
							<br/>
							<br/>
							<br/>
						</div>
					</div>
				</KnFormFieldRow>

			</template>
			<template v-if="'publication' === _.get($store.getters.activeStep, 'slug')">

				<!-- dna_analyses -->
				<KnFormFieldRow>
					<div class="KnEditForm__labelCell font font--medium color color--primary50"
						style="grid-column: span 3;">
						{{getFieldProp( 'dna_analyses', '_label' )}}
						<template v-if="getFieldProp( 'dna_analyses', 'mandatory' )">*</template>
					</div>
					<div style="grid-column: span 5;">
						<BaseSelect
							:value="getFieldProp( 'dna_analyses', '_value' )"
							:placeholder="'Select ...'"
							:options="getFieldProp( 'dna_analyses', '_options' )"
							:hasClearButton="true"
							@input="$store.commit('setFieldProp', {
								fieldName : 'dna_analyses',
								key       : '_value',
								value     : $event
							})"
						></BaseSelect>
						<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('dna_analyses')}}</pre>
					</div>
					<div class="font font--sizeSmall color color--primary50"
						style="grid-column: span 4;" v-html="getFieldProp( 'dna_analyses', 'help_text' )"
					></div>
				</KnFormFieldRow>
				<!-- dna_analyses_link -->
				<KnFormFieldRow>
					<div class="KnEditForm__labelCell font font--medium color color--primary50"
						style="grid-column: span 3;">
						{{getFieldProp( 'dna_analyses_link', '_label' )}}
						<template v-if="getFieldProp( 'dna_analyses_link', 'mandatory' )">*</template>
					</div>
					<div style="grid-column: span 5;">
						<BaseText
							:value="getFieldProp( 'dna_analyses_link', '_value' )"
							:placeholder="'Enter URL ...'"
							:required="false"
							:disabled="getFieldProp( 'dna_analyses_link', '_disabled' )"
							:hasClearButton="true"
							@change="(e)=>{}"
							@input="$store.commit('setFieldProp', {
								fieldName : 'dna_analyses_link',
								key       : '_value',
								value     : $event
							})"
						></BaseText>
						<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('dna_analyses_link')}}</pre>
					</div>
					<div class="font font--sizeSmall color color--primary50"
						style="grid-column: span 4;" v-html="getFieldProp( 'dna_analyses_link', 'help_text' )"
					></div>
				</KnFormFieldRow>
				<!-- differential_diagnosis -->
				<KnFormFieldRow>
					<div class="KnEditForm__labelCell font font--medium color color--primary50"
						style="grid-column: span 3;">
						{{getFieldProp( 'differential_diagnosis', '_label' )}}
						<template v-if="getFieldProp( 'differential_diagnosis', 'mandatory' )">*</template>
					</div>
					<div style="grid-column: span 5;">
						<BaseTextarea
							:value="getFieldProp( 'differential_diagnosis', '_value' )"
							:placeholder="'Enter Text ...'"
							:required="false"
							:disabled="getFieldProp( 'differential_diagnosis', '_disabled' )"
							:hasClearButton="true"
							@change="(e)=>{}"
							@input="$store.commit('setFieldProp', {
								fieldName : 'differential_diagnosis',
								key       : '_value',
								value     : $event
							})"
						></BaseTextarea>
						<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('differential_diagnosis')}}</pre>
					</div>
					<div class="font font--sizeSmall color color--primary50"
						style="grid-column: span 4;" v-html="getFieldProp( 'differential_diagnosis', 'help_text' )"
					></div>
				</KnFormFieldRow>
				<!-- published -->
				<KnFormFieldRow>
					<div class="KnEditForm__labelCell font font--medium color color--primary50"
						style="grid-column: span 3;">
						{{getFieldProp( 'published', '_label' )}}
						<template v-if="getFieldProp( 'published', 'mandatory' )">*</template>
					</div>
					<div style="grid-column: span 5;">
						<BaseCheckbox
							:value="getFieldProp( 'published', '_value' )"
							@input="$store.commit('setFieldProp', {
								fieldName : 'published',
								key       : '_value',
								value     : $event
							})"
						></BaseCheckbox>
						<span class="KnEditForm__labelInline" v-html="getFieldProp( 'published', 'help_text' )"></span>
					</div>
				</KnFormFieldRow>
				<!-- doi -->
				<KnFormFieldRow v-if="getFieldProp( 'published', '_value' )">
					<div class="KnEditForm__labelCell font font--medium color color--primary50"
						style="grid-column: span 3;">
						{{getFieldProp( 'doi', '_label' )}}
						<template v-if="getFieldProp( 'doi', 'mandatory' )">*</template>
					</div>
					<div style="grid-column: span 5;">
						<BaseText
							:value="getFieldProp( 'doi', '_value' )"
							:placeholder="''"
							:required="false"
							:disabled="getFieldProp( 'doi', '_disabled' )"
							:hasClearButton="true"
							@change="(e)=>{}"
							@input="$store.commit('setFieldProp', {
								fieldName : 'doi',
								key       : '_value',
								value     : $event
							})"
						></BaseText>
						<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('doi')}}</pre>
					</div>
					<div class="font font--sizeSmall color color--primary50"
						style="grid-column: span 4;" v-html="getFieldProp( 'doi', 'help_text' )"
					></div>
				</KnFormFieldRow>
				<!-- references as repeater -->
				<KnFormFieldRow v-if="getFieldProp( 'published', '_value' )">
					<div class="KnEditForm__labelCell font font--medium color color--primary50"
						style="grid-column: span 3;">
						{{getFieldProp( 'references', '_label' )}}
						<template v-if="getFieldProp( 'references', 'mandatory' )">*</template>
					</div>
					<div style="grid-column: span 5;">
						<!--
							2022-09-26
							Nachstehendes Repeater-Field ist neu in den Anforderungen hinzugekommen.
							Perspektifisch wäre hierfür eine eigene UI-Komponente sinnvoll.
							Ich baue es hier erstmal als Prototype.
						-->
						<div class="repeaterField">
							<div class="repeaterField__body" v-for="(referenceItem, referenceIndex) in getFieldProp( 'referencesArray', '_value' )" :key="'rA' + referenceIndex">
								<div class="repeaterField__bodyRow">
									<div class="repeaterField__bodyRowFields">
										<BaseTextarea
											:value="referenceItem"
											:placeholder="''"
											:required="false"
											:resizeable="'none'"
											:disabled="false"
											@change="(e)=>{}"
											@input="changeReferencesArrayByIndex( $event, referenceIndex )"
										></BaseTextarea>
									</div>
									<div class="repeaterField__bodyRowBtns">
										<a class="repeaterField__rowBtn" @click="removeFromReferencesArrayByIndex( referenceIndex )">
											<MhIcon
												XXXtype="'minus-circle'"
												:type="'trash'"
											></MhIcon>
										</a>
									</div>
								</div>
							</div>
							<div class="repeaterField__footer">
								<BaseButton
									class="font font--sizeSmall font--medium"
									:isOutlined="true"
									:isDisabled="false"
									@click.native="addToReferencesArray()"
								>
									<template slot="before"></template>
									<template slot="default">Add reference</template>
									<template slot="after"></template>
								</BaseButton>
							</div>
						</div>
						<!--
						-->
						<pre class="KnEditForm__pre" maxheight>{{getFieldBySlug('referencesArray')}}</pre>

					</div>
					<div class="font font--sizeSmall color color--primary50"
						style="grid-column: span 4;" v-html="getFieldProp( 'references', 'help_text' )"
					></div>
				</KnFormFieldRow>

				<!-- spacer -->
				<KnFormFieldRow>
					<br/><br/>
				</KnFormFieldRow>
				<!-- privacyConsent -->
				<KnFormFieldRow>
					<div class="KnEditForm__labelCell font font--medium color color--primary50"
						style="grid-column: span 3;">
						{{getFieldProp( 'privacyConsent', '_label' )}}
						<template v-if="getFieldProp( 'privacyConsent', 'mandatory' )">*</template>
					</div>
					<div style="grid-column: span 6;" class="flex">
						<BaseCheckbox
							class="flex--noShrink"
							:value="getFieldProp( 'privacyConsent', '_value' )"
							@input="$store.commit('setFieldProp', {
								fieldName : 'privacyConsent',
								key       : '_value',
								value     : $event
							})"
						></BaseCheckbox>
						<span class="KnEditForm__labelInline richText" v-html="getFieldProp( 'privacyConsent', 'help_text' )"></span>
					</div>
				</KnFormFieldRow>

				<!-- error message after submit -->
				<KnFormFieldRow class="color color--red" v-if="finalSubmitErrorMessage">
					<div style="grid-column: span 12; display: flex; flex-direction: column;">
						Sorry, something went wrong!<br/>
						Please copy the follwing message and e-mail it to
						<a href="mailto:bugreport@csgis.de">bugreport@csgis.de</a>
						<br/>
						<pre>{{finalSubmitErrorMessage}}</pre>
					</div>
				</KnFormFieldRow>
				<!-- finish with submit button -->
				<KnFormFieldRow>
					<div style="grid-column: span 8; display: flex; justify-content: flex-end;">
						<div>
							<br/>
							<BaseButton
								class="BaseButton--finish font font--sizeLarge font--medium"
								:isOutlined="false"
								:isLoading="true"
								:isDisabled="!isStepValid('publication') || !isStepValid('all')"
								@click.native="doFinishAndSubmitData"
							>
								<template slot="before"></template>
								<template slot="default">Submit record</template>
								<template slot="after">
									<MhIcon
										:isSpinning="isRunningFinalSubmit ? true :false"
										:type="isRunningFinalSubmit ? 'loader' : 'arrow-right'"
									></MhIcon>
								</template>
							</BaseButton>

							<br/>
							<br/>
							<br/>
						</div>
					</div>
				</KnFormFieldRow>

			</template>

			<!-- debug infos -->
			<hr class="KnEditForm__debug" />
			<div class="KnEditForm__debug background--white15 flex">
				<div class="background--white15 vhSpace vhSpace--default">
					<strong>Step • isValid</strong>
					<div v-for="(step, index) in $store.getters.steps" :key="'s'+index">
						{{step.title}} • {{step.slug}}  •
						<template v-if="isStepValid( step.slug )">true</template>
						<template v-else>false</template>
					</div>
				</div>
				<div class="vhSpace vhSpace--default">
					<strong>Step • isEnabled</strong>
					<div v-for="(step, index) in $store.getters.steps" :key="'s'+index">
						<label>
							{{step.title}}
							<input type="checkbox" v-model="step.isEnabled" />
						</label>
					</div>
				</div>
			</div>
			<hr class="KnEditForm__debug" />
			<div class="KnEditForm__debug background--white15 vhSpace vhSpace--default">
				<pre name="$store.getters.finalSubmitObject">{{$store.getters.finalSubmitObject}}</pre>
				<pre name="$store.getters.steps" maxheight>{{$store.getters.steps}}</pre>
				<pre name="$store.getters.fields" maxheight>{{$store.getters.fields}}</pre>
			</div>

			<br /><br />

		</div>
	</div>
</template>

<script>
	// @ is an alias to /src
	//import DevInfos from '@/components/DevInfos.vue'
	import EventBus from '@/helper/EventBus.js'
	import { mapGetters } from 'vuex'
	import Treeselect from '@riophae/vue-treeselect'
	import '@riophae/vue-treeselect/dist/vue-treeselect.css'
	import RestHandler from '@/components/RestHandler/RestHandler.js'
	import _ from 'lodash'

	import KnFormHeaderRow from '@/molecules/KnFormHeaderRow.vue'
	import KnTabsRow from '@/molecules/KnTabsRow.vue'
	import KnColumnLabelsRow from '@/molecules/KnColumnLabelsRow.vue'
	import KnTextRow from '@/molecules/KnTextRow.vue'
	import KnFormFieldRow from '@/molecules/KnFormFieldRow.vue'

	import MhIcon from '@/components/MhIcon/v2/MhIcon.vue'

	import '/Users/Mario/Dropbox/htdocs/2020-09-17__MhForm/vue-cli-dev/src/components/MhForm/v5/FormField.less'
	import BaseCheckbox from '/Users/Mario/Dropbox/htdocs/2020-09-17__MhForm/vue-cli-dev/src/components/MhForm/v5/BaseCheckbox.vue'
	import BaseRadio from '/Users/Mario/Dropbox/htdocs/2020-09-17__MhForm/vue-cli-dev/src/components/MhForm/v5/BaseRadio.vue'
	import BaseText from '/Users/Mario/Dropbox/htdocs/2020-09-17__MhForm/vue-cli-dev/src/components/MhForm/v5/BaseText.vue'
	import BaseTextarea from '/Users/Mario/Dropbox/htdocs/2020-09-17__MhForm/vue-cli-dev/src/components/MhForm/v5/BaseTextarea.vue'
	import BaseButton from '/Users/Mario/Dropbox/htdocs/2020-09-17__MhForm/vue-cli-dev/src/components/MhForm/v5/BaseButton.vue'
	import BaseSelect from '/Users/Mario/Dropbox/htdocs/2020-09-17__MhForm/vue-cli-dev/src/components/MhForm/v5/BaseSelect.vue'
	import BaseSearchSelect from '/Users/Mario/Dropbox/htdocs/2020-09-17__MhForm/vue-cli-dev/src/components/MhForm/v5/BaseSearchSelect.vue'

	export default {
		name: 'KnEditForm',
		components: {
			Treeselect,
			KnFormHeaderRow,
			KnTabsRow,
			KnColumnLabelsRow,
			KnTextRow,
			KnFormFieldRow,
			BaseCheckbox,
			BaseRadio,
			BaseSelect,
			BaseText,
			BaseTextarea,
			MhIcon,
			BaseButton,
			BaseSearchSelect,
		},
		mixins: [ RestHandler ],
		props: {},
		data(){
			return {
				currentInventoryTabIndex : 0,
				currentBoneChangesFormTabIndex : 0,
				hasFetchedBoneChangesFields : false,
				loadingValueDisappearDelay : 500,
				stickyObserver : undefined,
				isRunningFinalSubmit : false,
				finalSubmitErrorMessage : null,
			}
		},
		watch: {
			'fields.adults._value': {
				handler: function( to, from ){
					//if( !this._.isEqual(to, from) ) this.fetchDiseases()
					if( to ) this.fetchDiseases()
				},
				immediate : true,
				//deep: true,
			},
			'fields.subadults._value': {
				handler: function( to, from ){
					//if( !this._.isEqual(to, from) ) this.fetchDiseases()
					if( to ) this.fetchDiseases()
				},
				immediate : true,
				//deep: true,
			},
			'fields.disease._value': {
				handler: function( to, from ){
					if( !this._.isEqual(to, from) ) this.fetchBoneChangesFields()
				},
				//immediate : true,
				//deep: true,
			},
			'availableBoneIds': {
				handler: function( to, from ){
					if( !this._.isEqual(to, from) ) this.fetchBoneChangesFields()
				},
				//immediate : true,
				//deep: true,
			},
			'fields.archaeological_site._search': {
				handler: function( to, from ){
					if( !this._.isEqual(to, from) ) this.fetchSiteSuggestions()
				},
			},
			'fields.chronology._search': {
				handler: function( to, from ){
					if( !this._.isEqual(to, from) ) this.fetchChronologyTerms()
				},
				//immediate : true,
				//deep: true,
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
			stepTabs(){
				const stepTabs = []

				this.$store.getters.steps.forEach( (item, index) => {
					stepTabs.push({
						label     : '<span class=circleNumber nr='+(index+1)+'></span> ' + item.title,
						isEnabled : item.isEnabled,
					})
				})

				return stepTabs
			},
			boneChangesTabs(){
				const labels = this._.map( this.boneChangesForm, 'label')
				const tabs = []

				labels.forEach((label, index)=>{
					tabs.push({
						label : label,
						isEnabled : true,
					})
				})

				return tabs
			},
			deciduousTeethTreeselectOptions(){
				const options = this.getFieldProp( 'cranial_district__deciduous-teeth', '_options' )
				const children = []

				options.forEach( item=>{
					children.push({
						id    : item.value,
						label : item.label,
					})
				})

				const values = [
					{ id : 'all', label: 'All', children : children }
				]

				return values
			},
			permanentTeethTreeselectOptions(){
				const options = this.getFieldProp( 'cranial_district__permanent-teeth', '_options' )
				const children = []

				options.forEach( item=>{
					children.push({
						id    : item.value,
						label : item.label,
					})
				})

				const values = [
					{ id : 'all', label: 'All', children : children }
				]

				return values
			},
			storagePlaceOptions(){
				const options = this.getFieldProp( 'storage_place', '_options' )
				const children = []

				options.forEach( item=>{
					children.push({
						id    : item.value,
						label : item.label,
					})
				})

				/*
				const values = [
					{ id : 'all', label: 'All', children : children }
				]
				*/
				const values = children

				return values
			},
			datingMethodOptions(){
				const options = this.getFieldProp( 'dating_method', '_options' )
				const children = []

				options.forEach( item=>{
					children.push({
						id    : item.value,
						label : item.label,
					})
				})

				/*
				const values = [
					{ id : 'all', label: 'All', children : children }
				]
				*/
				const values = children

				return values
			},
			...mapGetters([
				'currentEnv',
				'requestToken',
				'accessToken',
				'steps',
				'activeStep',
      			'activeStepIndex',
      			'isStepValid',
      			'fields',
      			'getStepProp',
      			'getFieldBySlug',
      			'getFieldProp',
      			'availableBoneIds',
      			'boneChangesForm',
      			'finalSubmitObject',
    		])
		},
		methods: {
			addToReferencesArray(){
				let referencesArray = this._.clone( this.getFieldProp( 'referencesArray', '_value' ) )
				//let newItem = 'Sara' + this._.random(10, 99)
				let newItem = ''

				referencesArray.splice(referencesArray.length, 0, newItem);

				console.log('referencesArray:', referencesArray)

				this.$store.commit('setFieldProp', {
					fieldName : 'referencesArray',
					key       : '_value',
					value     : referencesArray
				}, true)
				/*
				*/
			},
			removeFromReferencesArrayByIndex( index ){
				let referencesArray = this._.clone( this.getFieldProp( 'referencesArray', '_value' ) )

				referencesArray.splice( index, 1 )

				console.log('removeFromReferencesArrayByIndex( index )', index)
				console.log('referencesArray:', referencesArray)

				this.$store.commit('setFieldProp', {
					fieldName : 'referencesArray',
					key       : '_value',
					value     : referencesArray
				}, true)
			},
			changeReferencesArrayByIndex( e, index ){
				let referencesArray = this._.clone( this.getFieldProp( 'referencesArray', '_value' ) )

				referencesArray[index] = e

				console.log('changeReferencesArrayByIndex( e, index )', e, index )

				this.$store.commit('setFieldProp', {
					fieldName : 'referencesArray',
					key       : '_value',
					value     : referencesArray
				}, true)
			},
			getSearchResultsStyles( fieldSlug ){
				const _options   = this.getFieldProp( fieldSlug, '_options' )
				const _value     = this.getFieldProp( fieldSlug, '_value' )
				const _search    = this.getFieldProp( fieldSlug, '_search' )
				const _isLoading = this.getFieldProp( fieldSlug, '_isLoading' )
				let rows         = 0
				let borderWidth  = 0

				if( !this._.isEmpty(_search) && !this._.size( _options ) && !_isLoading ) rows = 1
				if( !this._.isEmpty(_search) && this._.size( _options ) ) rows = this._.size( _options )

				// limit max-height
				if( rows > 10 ) rows = 10
				// we need to add the borders to prevent scrollbars if there's just one result
				if( rows > 0 ) borderWidth = 2

				return {
					height : 'calc(' + rows * 2 + 'em + ' + borderWidth + 'px)',
					borderWidth : rows > 0 ? '1px' : '0px'
				}
			},
			gotoStepIndex( stepIndex, doLog = false ){
				const newRouteStep         = this.$store.getters.steps.find( (item, index)=>{ return index === stepIndex } )
				const newRouteStepSlug     = this._.get( newRouteStep, 'slug' )
				const currentRouteStepSlug = this.$route.params.stepSlug

				// groupCollapsed group
				if( doLog ){
					console.groupCollapsed( this.$options.name, '• gotoStepIndex()' )
					console.log('stepIndex:', stepIndex)
					console.groupEnd()
				}

				if( newRouteStepSlug != currentRouteStepSlug ){
					this.$router.push({ name: 'EditView', params: { stepSlug: newRouteStepSlug } })
				}
			},
			gotoInventoryTabIndex( tabIndex, doLog = false ){
				// groupCollapsed group
				if( doLog ){
					console.groupCollapsed( this.$options.name, '• gotoInventoryTabIndex()' )
					console.log('tabIndex:', tabIndex)
					console.groupEnd()
				}

				this.currentInventoryTabIndex = tabIndex
			},
			setAgeGroup( value ){
				if( 'Subadult' === value ){
					this.$store.commit('setFieldProp', {
						fieldName : 'subadults',
						key       : '_value',
						value     : true
					})
					this.$store.commit('setFieldProp', {
						fieldName : 'adults',
						key       : '_value',
						value     : false
					})
				}
				if( 'Adult' === value ){
					this.$store.commit('setFieldProp', {
						fieldName : 'adults',
						key       : '_value',
						value     : true
					})
					this.$store.commit('setFieldProp', {
						fieldName : 'subadults',
						key       : '_value',
						value     : false
					})
				}
			},
			gotoBoneChangesFormTabIndex( tabIndex, doLog = false ){
				// groupCollapsed group
				if( doLog ){
					console.groupCollapsed( this.$options.name, '• gotoBoneChangesFormTabIndex()' )
					console.log('tabIndex:', tabIndex)
					console.groupEnd()
				}

				this.currentBoneChangesFormTabIndex = tabIndex
			},
			treeselectNormalizer( item ){
				return {
					id    : item.value,
					label : item.label,
				}
			},
			enableNextStep( currentStepSlug, doLog = true ){
				//'activeStep',
								const activeStepIndex = this.activeStepIndex
				const nextStep = this.steps[activeStepIndex+1]

				// groupCollapsed group
				if( doLog ){
					console.groupCollapsed( this.$options.name, '• enableNextStep()' )
					console.log('activeStepIndex:', activeStepIndex)
					console.log('nextStep:', nextStep)
					console.groupEnd()
				}

				this.$store.commit('setStepProp', {
					stepSlug : nextStep.slug,
					key      : 'isEnabled',
					value    : true,
				})

				this.gotoStepIndex( activeStepIndex+1 )
			},
			fetchDiseases( doLog = true ){
				const field       = this.getFieldBySlug('disease')
				let   doFetch     = false
				let   fetchParams = {
					fields : 'id,name,adults,subadults,aliases'
				}

				// erzeuge age-filter anhand der zuvor vom user gewählten values
				let searchAges = []
				if( this.fields.subadults._value ) searchAges.push('subadults')
				if( this.fields.adults._value ) searchAges.push('adults')
				if( searchAges.length ) fetchParams.search_age = searchAges.join(',')
				if( searchAges.length ) doFetch = true

				// groupCollapsed group
				if( doLog ){
					console.groupCollapsed( this.$options.name, '• fetchDiseases()' )
					console.log('fetchParams:', fetchParams)
					console.log('doFetch:', doFetch)
					console.groupEnd()
				}

				if( doFetch ){

					this.$store.commit('setFieldProp', {
						fieldName : 'disease',
						key       : '_isLoading',
						value     : true,
					})

					this.restHandler__fetch({
						action   : 'GET',
						route    : this.$store.getters.restBase + field.url,
						params   : fetchParams,
						callback : (response) => {
							const results = response.data
							const options = []

							this._.forEach( results, (result)=>{
								options.push({
									//value : result.name,
									value : result.id,
									label : result.name,
									aliases : result.aliases,
								})
							})

							//console.log('options:', options)

							this.$store.commit('setFieldProp', {
								fieldName : 'disease',
								key       : '_options',
								value     : options,
							})
							setTimeout(()=>{
								this.$store.commit('setFieldProp', {
									fieldName : 'disease',
									key       : '_isLoading',
									value     : false,
								})
							}, this.loadingValueDisappearDelay)
						},
					})
				}
				else{
					this.$store.commit('setFieldProp', {
						fieldName : 'disease',
						key       : '_options',
						value     : [],
					})
					this.$store.commit('setFieldProp', {
						fieldName : 'disease',
						key       : '_value',
						value     : '',
					})
				}
			},
			fetchBoneChangesFields( useSampleData = false, doLog = true ){
				const boneIds = useSampleData ? [3,4,5,6,99] : this.availableBoneIds
				const disease = useSampleData ? 'Pituitary Dwarfism' : this.getFieldProp( 'disease', '_value' )
				const doFetch = this._.size( boneIds ) > 0 && disease ? true : false

				// groupCollapsed group
				if( doLog ){
					console.group( this.$options.name, '• fetchBoneChangesFields()' )
					console.log('boneIds:', boneIds)
					console.log('disease:', disease)
					console.log('doFetch:', doFetch)
					console.groupEnd()
				}

				this.currentBoneChangesFormTabIndex = 0

				if( doFetch ){

					// remove previous added fields
					//const fieldsToRemove = this._.flatten( this._.map( this.boneChangesForm, 'fields' ) )
					this.$store.commit('removeStepFields', {
						stepSlug : 'bone-changes',
						//fieldSlug : fieldsToRemove,
					})
					//console.log( fieldsToRemove )

					// do fetch and add data to store
					this.restHandler__fetch({
						action   : 'GET',
						route    : this.$store.getters.restBase + '/api/bone-change-search/',
						params   : {
							q : disease,
							bone_ids : boneIds.join(','),
							//ts : Date.now(),
						},
						callback : (response) => {
							const results = this._.cloneDeep( response.data ) // clone is needed to stop vue reactivity
							let boneChangesForm = [] // is later commited to store
							let fieldSlugs = [] //

							this.hasFetchedBoneChangesFields = true

							// groupCollapsed group
							if( doLog ){
								console.group( this.$options.name, '• fetchBoneChangesFields() • callback(response)' )
								console.log('results:', results)
							}

							// walk the results with all the methods and their fields
							this._.forEach( results, ( boneFields, method )=>{
								if( doLog ){
									console.log('-----')
									console.log('method:', method)
									console.log('boneFields:', boneFields)
								}

								// walk the method fields
								// commit them as field to store
								// get them back and collect the fields for boneChangesForm
								// to commit that finally
								let boneChangesFormTabFields = []
								this._.forEach( boneFields, ( boneField, boneId )=>{

									// fix options inconsistency
									let fixedOptions = []
									boneField.options.forEach( ( item ) => {
										const option = {
											name: item.name,
											value: item.name,
										}
										fixedOptions.push( option )
									} )
									//this.$set( boneField, 'options', fixedOptions )
									boneField.options = fixedOptions

									// set some basic that are missing in response
									//this.$set(boneField, 'name', boneField.name + '__' + boneField.id )
									//boneField.name = boneField.name + '__' + this._.toLower(method)
									//this.$set( boneField, 'name', boneField.name + '__' + this._.toLower(method) )
									//this.$set( boneField, 'type', 'selectfield' )
									//this.$set( boneField, 'label', boneField.name_complete )

									boneField.name = boneField.name + '__' + this._.toLower(method)
									boneField.type = 'selectfield'
									boneField.label = boneField.name_complete
									boneField.technic = method

									// use custom slug to make shure that this field is unique
									const fieldSlug = boneField.section + '__' + boneField.name

									// commit field to store
									this.$store.commit('addStepField', {
										stepSlug : 'bone-changes',
										field    : this._.cloneDeep( boneField ),
									})

									// console.log('boneField:', boneField)

									// get the field back to get the normalized version of it
									//const getFieldBack = this._.cloneDeep( this.getFieldBySlug( fieldSlug ) )
									const getFieldBack = this.getFieldBySlug( fieldSlug )

									// collect the normalized field
									//boneChangesFormTabFields.push( getFieldBack )
									boneChangesFormTabFields.push( fieldSlug )

									// collect the field slug
									fieldSlugs.push( getFieldBack._slug )

									if( doLog ){
										console.log('-----')
										console.log('fieldSlug:', fieldSlug)
										console.log('boneField:', boneField)
										console.log('getFieldBack:', getFieldBack)
									}
								})

								if( doLog ){
									console.log('-----')
									console.log('boneChangesForm:', boneChangesForm)
								}

								boneChangesForm.push({
									label : method,
									fields : boneChangesFormTabFields,
								})

							})
							// commit boneChangesForm to store
							// with all the methods and their fields
							this.$store.commit('setBoneChangesForm', boneChangesForm)

							this.$store.commit('setStepProp', {
								stepSlug : 'bone-changes',
								key : 'fields',
								value : fieldSlugs,
							})

							// groupCollapsed group
							if( doLog ){
								console.groupEnd()
							}
						},
					})
				}
			},
			fetchSiteSuggestions( doLog = true ){
				const field       = this.getFieldBySlug('archaeological_site')
				const search      = field._search
				let   doFetch     = false
				let   fetchParams = {}

				if( !this._.isEmpty( search ) ){
					//fetchParams.q    = field._search
					//fetchParams.task = 'suggestion'
					doFetch          = true
				}

				// groupCollapsed group
				if( doLog ){
					console.groupCollapsed( this.$options.name, '• fetchSiteSuggestions()', search )
					console.log('field:', field)
					console.log('fetchParams:', fetchParams)
					console.log('doFetch:', doFetch)
					console.groupEnd()
				}

				if( doFetch ){
					this.$store.commit('setFieldProp', {
						fieldName : 'archaeological_site',
						key       : '_isLoading',
						value     : true,
					})

					const url = "https://gazetteer.dainst.org/search.json?q="
					const query = encodeURIComponent(`{"bool":{"must":[{"bool":{"should":[{"nested":{"path":"names","query":{"match":{"names.title":{"query":"${search}","operator":"and"}}}}},{"match":{"prefName.title":{"query":"${search}","operator":"and"}}}]}}]}}`);
					const options = "&fq=_exists_:prefLocation.coordinates&limit=1000&type=extended&pretty=true"

					fetch(`${url}${query}${options}`)
						.then( response => response.json() )
						.then( data => {
							const latestSearchQuery = this.getFieldBySlug('archaeological_site')._search
							const isLatestFetch = latestSearchQuery === search

							// groupCollapsed group
							if( doLog ){
								console.groupCollapsed( this.$options.name, '• fetchSiteSuggestions() return', search, isLatestFetch )
								console.log('isLatestFetch:', isLatestFetch)
								console.log('latestSearchQuery:', latestSearchQuery)
								console.log('data:', data)
								console.groupEnd()
							}

							// um eine rase condition bei dem fetchen der results
							// zu verhindern, werden die results nur verarbeitet,
							// wenn sie vom letzten fetch stammen.
							// dies wird geprüft anhand des search queries
							if( isLatestFetch ){
								const suggestion = this._.get( data, 'result', [] )
								const options = []
								suggestion.forEach((item)=>{
									options.push( item )
								})

								this.$store.commit('setFieldProp', {
									fieldName : 'archaeological_site',
									key       : '_options',
									value     : options
								})

								setTimeout(()=>{
									this.$store.commit('setFieldProp', {
										fieldName : 'archaeological_site',
										key       : '_isLoading',
										value     : false,
									})
								}, this.loadingValueDisappearDelay)
							}
						})
				}
				else{
					this.$store.commit('setFieldProp', {
						fieldName : 'archaeological_site',
						key       : '_options',
						value     : [],
					})
					this.$store.commit('setFieldProp', {
						fieldName : 'archaeological_site',
						key       : '_value',
						value     : '',
					})
					this.$store.commit('setFieldProp', {
						fieldName : 'position',
						key       : '_value',
						value     : '',
					})
					this.$store.commit('setFieldProp', {
						fieldName : 'gazId',
						key       : '_value',
						value     : '',
					})
					this.$store.commit('setFieldProp', {
						fieldName : 'gaz_link',
						key       : '_value',
						value     : '',
					})
				}
			},
			fetchChronologyTerms( doLog = true ){
				const field       = this.getFieldBySlug('chronology')
				let   doFetch     = false
				let   fetchParams = {}

				if( !this._.isEmpty( field._search ) ){
					fetchParams.q = field._search
					doFetch       = true
				}

				// groupCollapsed group
				if( doLog ){
					console.groupCollapsed( this.$options.name, '• fetchChronologyTerms()' )
					console.log('field:', field)
					console.log('fetchParams:', fetchParams)
					console.log('doFetch:', doFetch)
					console.groupEnd()
				}

				if( doFetch ){

					this.$store.commit('setFieldProp', {
						fieldName : 'chronology',
						key       : '_isLoading',
						value     : true,
					})

					this.restHandler__fetch({
						action   : 'GET',
						route    : this.$store.getters.restBase + field.url,
						params   : fetchParams,
						callback : (response) => {
							const results    = response.data
							const values = this._.get( results, 'values', [] )

							//console.log('results:', results)

							let options = []
							values.forEach((item)=>{
								options.push( item )
							})

							this.$store.commit('setFieldProp', {
								fieldName : 'chronology',
								key       : '_options',
								value     : options,
							})
							this.$store.commit('setFieldProp', {
								fieldName : 'chronology',
								key       : '_value',
								value     : options,
							})
							setTimeout(()=>{
								this.$store.commit('setFieldProp', {
									fieldName : 'chronology',
									key       : '_isLoading',
									value     : false,
								})
							}, this.loadingValueDisappearDelay)
						},
					})
				}
				else{
					this.$store.commit('setFieldProp', {
						fieldName : 'chronology',
						key       : '_options',
						value     : [],
					})
					this.$store.commit('setFieldProp', {
						fieldName : 'chronology',
						key       : '_value',
						value     : '',
					})
				}
			},
			doFinishAndSubmitData( doLog = true ){
				const requestUrl = this.$store.getters.restBase + '/api/disease-case/'
				let hasError = false
				let dataToSubmit = this.finalSubmitObject

				// for dev: force type error
				//dataToSubmit.disease = 'helbing'

				this.isRunningFinalSubmit = true

				// groupCollapsed group
				if( doLog ){
					console.groupCollapsed( this.$options.name, '• doFinishAndSubmitData()' )
					console.log('requestUrl:', requestUrl)
					console.log('dataToSubmit:', dataToSubmit)
					console.groupEnd()
				}

				let res = fetch( requestUrl, {
					method: "POST",
					body: JSON.stringify( dataToSubmit ),
					headers: {
						'Authorization': `Bearer ${this.accessToken}`,
						'Content-Type': 'application/json',
					},
				})
				.then( response => {
    				if ( !response.ok ) hasError = true
					return response.json()
				})
				.then( data => {
					this.isRunningFinalSubmit = false
					if( hasError ){
						this.finalSubmitErrorMessage = data
					}else{
						this.$router.push('/thank-you/')
					}
					console.log('data:', data )
				})
			},
		},
		created(){},
		mounted(){
			// apply isSticky class via IntersectionObserver
			// taken from https://stackoverflow.com/a/57991537

			// define the observer
			this.stickyObserver = new IntersectionObserver(
				([e]) => e.target.classList.toggle('KnEditForm__stepTabs--isSticky', e.intersectionRatio < 1),
				{threshold: [1]}
			);

			// apply the observer
			this.stickyObserver.observe( this.$refs.stepTabs.$el )
		},
		destroyed(){},
	}
</script>

<style lang="less">
	@import (reference) "@/less/vars.less";
	@import (reference) "@/less/mixins.less";
	@import (reference) "@/less/atoms.less";

	.repeaterField {
		//outline: 1px solid red;
		background-color: @swatches[primary5];
		border-style: solid;
		border-width: 1px;
		border-color: @swatches[primary15];

		&__body { }
		&__bodyRow { border-bottom: 1px solid @swatches[primary15]; }
		&__bodyRow { display: flex; }
		&__bodyRowFields { flex-grow: 1; padding: 0.5em; }
		&__bodyRowBtns { width: 1.5em; padding-top: 0.5em; display: flex; justify-content: flex-start; }

		&__footer { padding: 0.5em; }

		&__rowBtn { transition: all 0.2s ease; opacity: 0.5; }
		&__rowBtn:hover { opacity: 0.85; }
	}

	.KnEditForm { // debug
		&__pre { display: none; }

		[showBorders1] &__debug { display: block; }
		[showBorders5] &__pre { display: block; }
	}
	.KnEditForm { // layout
		&__stepTabs {
			position: sticky;
			top: -1px; // needed for stickyObserver
			z-index: 10;

			&::after { // shadow below
				position: absolute;
				bottom: 0px; left: 0; right: 0;
				content: "";
				height: 10px;
				background: linear-gradient(fade(black, 100), fade(black, 0));
				opacity: 0;
				pointer-events: none;
				transform: translateY(100%);
				transition: all 0.15s ease;
			}
		}
		&__stepTabs--isSticky {
			&::after {
				opacity: 0.15;
			}
		}
		&__debug {
			display: none;
		}

		.chronologySubForm {
			&__row { display: flex; outline: 0px solid red; align-items: center; }
			&__row:not(:first-child) { padding-top: 0.5em; }

			&__hr{ width: 100%; }
			&__or{ margin: 0 2%; }

			&__text--from{ width: 27%; margin-right: 2%; }
			&__text--to{ width: 27%; margin-right: 2%; }
			&__cSelect--from{ width: 20%; margin-right: 2%; }
			&__cSelect--to{ width: 20%; }

			&__approximatedCheckbox{ margin-right: 1em; }
		}
	}
	.KnEditForm { // styling
		.FormField {
			--color                 : currentColor;
			--colorOpacity          : 1;
			--colorOpacity-hover    : 1;
			--colorOpacity-focus    : 1;
			--colorOpacity-disabled : 0.5;

			--bgColor            : currentColor;
			--bgOpacity          : 0.1;
			--bgOpacity-hover    : 0.2;
			--bgOpacity-focus    : 0.2;
			--bgOpacity-disabled : 0.05;
		}

		&__labelCell {
			//background-color: fade( red, 20 );
			padding-top: 0.4em;
		}
		&__labelInline {
			//background-color: fade( red, 20 );
			padding-top: 0.4em;
			display: inline-block;
			height: 100%;
			vertical-align: top;
			padding-left: 1em;
			//overflow: hidden;
			//white-space: nowrap;
			//text-overflow: ellipsis;
		}

		&__radioGroup {
			//display: flex;

			&Inner {
				display: inline-flex;
				flex-grow: 1;
			}
			&Radio {}
			&Label {
				display: inline-flex;
				align-items: center;
				padding: 0 2em 0 0.5em;
			}
		}

		&__search {}
		&__searchFieldWrapper {
			position: relative;
		}
		&__searchField {
			--padding: 2em;
		}

		&__search .MhIcon--type-search {
			position: absolute;
			top: 0.5em; left: 0.5em;
			margin-right: 0.5em;

			opacity: 0.35;
		}
		&__search .MhIcon--type-rotate-cw {
			position: absolute;
			top: 0.5em; left: 0.5em;
			margin-right: 0.5em;
			pointer-events: none;

			opacity: 0.75;

			animation-name: spin;
			animation-duration: 1000ms;
			animation-iteration-count: infinite;
			animation-timing-function: linear;
		}
		&__search .MhIcon--type-calendar,
		&__search .MhIcon--type-map-pin {
			margin-right: 0.5em;
			flex-shrink: 0;
			opacity: 0.75;
		}

		&__searchResults {
			//background-color: fade( red, 5 );
			transition: all 0.5s ease;
			margin-top: 0.5em;
			overflow: hidden;
			overflow-y: auto !important;

			background-color: @swatches[primary5];
			border-color: @swatches[primary15];
			border-style: solid;

			//&[countResults="0"] { border: none; }
		}
		&__searchCountResults {
			position: absolute;
			top: 0.45em; right: 2em;
			opacity: .75;
			pointer-events: none;
		}

		&__searchNoResultsMsg {
			//background-color: @swatches[primary5];
			//border: 1px solid @swatches[primary15];
			transition: all 0.1s ease;
			height: 2em;
			display: flex;
			align-items: center;
			padding-left: 0.5em;
			padding-right: 0.5em;

			&Icon {
				opacity: 0.75 !important;
				margin-right: 0.5em;
			}
			&Label {
				opacity: 0.75;
			}
		}
		&__searchResult {
			//outline: 1px solid fade( red, 15 );
			transition: all 0.1s ease;
			height: 2em;
			display: flex;
			align-items: center;
			padding-left: 0.5em;
			padding-right: 0.5em;
			cursor: pointer;

			//margin-bottom: -1px;
			//display: flex;
			//justify-content: space-between;
			//&::after { content: "→"; }
		}
		&__searchResultLabel {
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}
		&__searchResult + &__searchResult {
			border-top: 1px solid @swatches[primary15];
		}
		&__searchResult--isInactive {}
		&__searchResult--isInactive:hover {
			background-color: @swatches[primary15];
		}
		&__searchResult--isActive {
			background-color: @swatches[primary75];
			color: white;
		}

		@keyframes spin {
			from { transform:rotate(0deg); }
			to { transform:rotate(360deg); }
		}
	}

	.KnEditForm__message {
		//background-color: @swatches[primary5];
		position: relative;
		transition: all 0.1s ease;

		display: flex;
		align-items: center;
		padding: 0.5em;

		&::before { // background
			position: absolute;
			top: 0; left: 0; right: 0; bottom: 0;
			content: "";
			border-radius: 0.15em;
			background-color: currentColor;
			opacity: 0.25;
		}
		&::after { // border
			position: absolute;
			top: 0; left: 0; right: 0; bottom: 0;
			content: "";
			border-radius: 0.15em;
			border: 1px solid;
			opacity: 0.5;
		}

		&Icon {
			//opacity: 0.75 !important;
			margin-right: 0.5em;
			flex-shrink: 0;

		}
		&Label {
			//opacity: 0.75;
		}
	}

	@media @mq[xs] {}
	@media @mq[sm] {}
	@media @mq[md] {}
	@media @mq[dt] {}
	@media @mq[lg] {}
	@media @mq[xl] {}
</style>
