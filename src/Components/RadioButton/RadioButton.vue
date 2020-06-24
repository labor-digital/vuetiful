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
    <div class="radioButton" v-if="hasItems">
        <label v-for="(item, index) in items" class="radioButton__label" :class="intClasses(item)"
               :ref="'radioButton-'+index">
            <span v-if="labelSide === 'left'" class="radioButton__labelText radioButton__labelText--left">{{hasLabel(item)}}</span>
            <input v-show="hasCustomRadioIcon" :name="groupName"
                   class="radioButton__input"
                   type="radio"
                   :checked="item.checked"
                   :required="item.required"
                   :disabled="item.disabled"
                   @input="updateValue(index, $event)"
            />
            <!-- @slot Add your custom radio icon if needed.  -->
            <slot name="customRadioIcon"></slot>
            <span v-if="labelSide === 'right'" class="radioButton__labelText radioButton__labelText--left">{{hasLabel(item)}}</span>
        </label>
        <span v-if="error" class="radioButton__error">{{ error }}</span>
    </div>
</template>

<script lang="ts">
	import {isEmpty} from "@labor-digital/helferlein/lib/Types/isEmpty";
	import {isUndefined} from "@labor-digital/helferlein/lib/Types/isUndefined";
	
	export default {
		name: "RadioButton",
		props: {
			/**
			 * set group name to group radio buttons
			 */
			groupName: {
				type: String,
				required: true
			},
			/**
			 * parse checkboxes as array
			 */
			items: Array,
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
				value: []
			};
		},
		computed: {
			hasCustomRadioIcon(): boolean {
				return isEmpty(this.$slots.customRadioIcon);
			},
			hasError(): boolean {
				return !isEmpty(this.$slots.error) || !isEmpty(this.error);
			}
		},
		methods: {
			hasItems() {
				return !isEmpty(this.items) || !isUndefined(this.items);
			},
			hasLabel(v): boolean {
				return isUndefined(v.label) || isEmpty(v.label) ? v : v.label;
			},
			intClasses(item) {
				return item.disabled ? "radioButton__label--disabled " : "";
			},
			updateValue(index, e) {
				this.value.unshift({
					id: index,
					label: e.target.labels[0].innerText,
					checked: e.target.checked,
					disabled: e.target.disabled,
					element: e.target
				});
				this.$refs["radioButton-" + index][0].classList.add("radioButton__label--checked");
				if (!isUndefined(this.value[1])) {
					this.$refs["radioButton-" + this.value[1].id][0].classList.remove("radioButton__label--checked");
					this.value[1].checked = false;
					this.value[1].element.checked = false;
				}
				if (this.value.length > 2) this.value.splice(-1, 1);
				this.$emit("input", this.value[0]);
			}
		}
	};
</script>

<style lang="sass"></style>
