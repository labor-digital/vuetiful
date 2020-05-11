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
	<div class="checkbox">
		<label v-for="(item, index) in items" v-if="hasLabel(item.label)" class="checkbox__label" :class="intClasses(item)" :ref="'checkbox-'+index">
			<span v-if="labelSide === 'left'" class="checkbox__labelText checkbox__labelText--left">{{item.label}}</span>
			<input v-show="hasCustomCheckIcon" class="checkbox__input"
				   type="checkbox"
				   :checked="item.checked"
				   :required="item.required"
				   :disabled="item.disabled"
				   @input="updateValue(index, $event)"
			/>
			<!-- @slot Add your custom check icon if needed.  -->
			<slot name="customCheckIcon"></slot>
			<span v-if="labelSide === 'right'" class="checkbox__labelText checkbox__labelText--right">{{item.label}}</span>
		</label>
		<span v-if="hasError" class="checkbox__error">
			<!-- @slot Use the prop or the slot to set your own error message.  -->
			<slot name="error">{{error}}</slot>
		</span>
	</div>
</template>

<script lang="ts">
	import {forEach} from "@labor-digital/helferlein/lib/Lists/forEach";
	import {isEmpty} from "@labor-digital/helferlein/lib/Types/isEmpty";
	import {isUndefined} from "@labor-digital/helferlein/lib/Types/isUndefined";
	import {CheckboxInputs} from "./Checkbox";
	
	export default {
		name: "Checkbox",
		props: {
			/**
			 * parse checkboxes as array
			 */
			items: Array as CheckboxInputs,
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
			 * css class: checkbox__error
			 */
			error: {
				type: String
			}
		},
		data() {
			return {
				values: []
			};
		},
		computed: {
			hasCustomCheckIcon(): boolean {
				return isEmpty(this.$slots.customCheckIcon);
			},
			hasError(): boolean {
				return !isEmpty(this.$slots.error) || !isEmpty(this.error);
			}
		},
		methods: {
			hasLabel(v): boolean {
				return !isUndefined(v) || isEmpty(v);
			},
			intClasses(item) {
				let classes = "";
				item.required ? classes += "checkbox__label--required " : classes.replace("checkbox__label--required", "");
				item.disabled ? classes += "checkbox__label--disabled " : classes.replace("checkbox__label--disabled", "");
				return classes;
			},
			updateValue(index, e?) {
				let element = {
					id: index,
					label: e.target.labels[0].innerText,
					checked: e.target.checked,
					required: e.target.required,
					disabled: e.target.disabled
				};
				if (e.target.checked) {
					this.$refs["checkbox-" + index][0].classList.add("checkbox__label--checked");
					this.values.push(element);
				} else {
					this.$refs["checkbox-" + index][0].classList.remove("checkbox__label--checked");
					forEach(this.values, (value, index) => {
						if (value.id == index) {
							this.values.splice(index, 1);
						}
					});
				}
			}
		},
		watch: {
			values: function () {
				this.$emit("input", this.values);
			}
		}
		
	};
</script>

<style lang="sass"></style>