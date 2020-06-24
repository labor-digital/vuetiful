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
    <div class="checkbox" v-if="hasItems">
        <label v-for="(item, index) in prepareItems" v-show="item.show"
               class="checkbox__label"
               :class="intClasses(item)"
               :ref="'checkbox-'+index">
            <span v-if="labelSide === 'left'"
                  class="checkbox__labelText checkbox__labelText--left">{{item.label}}</span>
            <input v-show="hasCustomCheckIcon" class="checkbox__input"
                   type="checkbox"
                   :required="item.required"
                   :disabled="item.disabled"
                   v-model="item.checked"
                   @input="updateValue(item)"
            />
            <!-- @slot Add your custom check icon if needed. -->
            <slot name="customCheckIcon"></slot>
            <span v-if="labelSide === 'right'"
                  class="checkbox__labelText checkbox__labelText--right">{{item.label}}</span>
        </label>
        <span v-if="hasError" class="checkbox__error">
			<!-- @slot Use the prop or the slot to set your own error message.  -->
			<slot name="error">{{error}}</slot>
		</span>
    </div>
</template>

<script lang="ts">
	import {forEach} from "@labor-digital/helferlein/lib/Lists/forEach";
	import {map} from "@labor-digital/helferlein/lib/Lists/map";
	import {isArray} from "@labor-digital/helferlein/lib/Types/isArray";
	import {isEmpty} from "@labor-digital/helferlein/lib/Types/isEmpty";
	import {isUndefined} from "@labor-digital/helferlein/lib/Types/isUndefined";
	import {CheckboxInputs} from "./Checkbox.interfaces";
	
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
			},
			
			value: {
				type: Array,
				default: []
			}
		},
		computed: {
			prepareItems() {
				let selectedItems = isEmpty(this.value) ? [] : map(this.value, (e) => e.value);
				let preparedItems = [];
				forEach(this.items, (item, index) => {
					preparedItems.push({
						value: isUndefined(item.value) ? item : item.value,
						label: isUndefined(item.label) ? item : item.label,
						checked: isUndefined(item.checked) ?
							selectedItems.indexOf(item.value) !== -1 :
							item.checked,
						required: isUndefined(item.required) ? false : item.required,
						disabled: isUndefined(item.disabled) ? false : item.disabled,
						show: isUndefined(item.show) ? true : item.show
					});
				});
				return preparedItems;
			},
			hasCustomCheckIcon(): boolean {
				return isEmpty(this.$slots.customCheckIcon);
			},
			hasError(): boolean {
				return !isEmpty(this.$slots.error) || !isEmpty(this.error);
			}
		},
		methods: {
			hasItems() {
				return !isEmpty(this.items) || !isUndefined(this.items);
			},
			intClasses(item) {
				return {
					"checkbox__label--required": item.required,
					"checkbox__label--disabled": item.disabled,
					"checkbox__label--checked": item.checked
				};
			},
			updateValue(item) {
				const isChecked = !item.checked;
				const valueClone = isArray(this.value) ? [...this.value] : [];
				if (isChecked) valueClone.push(item);
				else valueClone = valueClone.filter(val => val.id !== item.id);
				this.$emit("input", valueClone);
			}
		}
	};
</script>

<style lang="sass"></style>
