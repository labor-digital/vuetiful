<!--
  - Copyright 2020 LABOR.digital
  -
  - Licensed under the Apache License, Version 2.0 (the "License");
  - you may not use this file except in compliance with the License.
  - You may obtain a copy of the License at
  -
  -     http://www.apache.org/licenses/LICENSE-2.0
  -
  - Unless required by applicable law or agreed to in writing, software
  - distributed under the License is distributed on an "AS IS" BASIS,
  - WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  - See the License for the specific language governing permissions and
  - limitations under the License.
  -
  - Last modified: 2020.05.03 at 13:05
  -->

<template>
	<div class="radioButton">
		<label v-for="(input, index) in inputs" v-if="hasLabel(input.label)" class="radioButton__label" :class="classes">
			<span v-if="labelSide === 'left'">{{input.label}}</span>
			<input v-show="hasCustomRadioIcon" :name="groupName"
					class="radioButton__input" :class="classesItem(input)"
					type="radio"
					:checked="input.checked"
					:required="input.required"
					:disabled="input.disabled"
					@input="updateValue(index, $event)"
			/>
			<!-- @slot Add your custom radio icon if needed.  -->
			<slot name="customRadioIcon"></slot>
			<span v-if="labelSide === 'right'">{{input.label}}</span>
		</label>
		<span v-if="error" class="radioButton__error">{{ error }}</span>
	</div>
</template>

<script lang="ts">
	import {RadioButtonInputs} from "./RadioButton";
	import {isUndefined} from "@labor-digital/helferlein/lib/Types/isUndefined";
	import {isEmpty} from "@labor-digital/helferlein/lib/Types/isEmpty";

	export default {
		name: "RadioButton",
		props: {
			/**
			 * set group name to group radio buttons
			 */
			groupName: String,
			/**
			 * parse checkboxes as array
			 */
			inputs: Array as RadioButtonInputs,
			/**
			 * choose label side right or left
			 */
			labelSide: {
				default: "right",
				type: String,
				validate: (v) => {
					return ["left", "right"].indexOf(v) !== -1;
				}
			},
			/**
			 * set error message in span
			 * css class: radio__error
			 */
			error: {
				type: String
			}
		},
		data() {
			return {
				value: [],
				oldValue: []
			}
		},
		computed: {
			hasCustomRadioIcon(): boolean {
				return isEmpty(this.$slots.customRadioIcon);
			},
			hasError(): boolean {
				return !isEmpty(this.$slots.error) || !isEmpty(this.error);
			},
			classes(): Object {
				return {
					"radioButton__label--required": this.required,
					"radioButton__label--error": this.error !== "" && !isUndefined(this.error)
				}
			}
		},
		methods: {
			hasLabel(v): boolean {
				return !isUndefined(v) || isEmpty(v);
			},
			classesItem(item): Object {
				return {
					"radioButton__input--disabled": item.disabled
				}
			},
			updateValue(index, e) {
				this.value.unshift({id: index, label: e.target.labels[0].innerText, element: e.target});
				if (this.value.length > 2) this.value.splice(-1, 1);
				if (!isUndefined(this.value[1])) this.value[1].element.checked = false;
				this.$emit("input", this.value[0])
			}
		}
	}
</script>

<style lang="sass"></style>