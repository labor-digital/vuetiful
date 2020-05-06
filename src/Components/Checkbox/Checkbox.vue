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
		<label v-for="(input, index) in inputs" v-if="hasLabel(input.label)" class="checkbox__label">
			<span v-if="labelSide === 'left'">{{input.label}}</span>
			<input v-show="hasCustomCheckIcon" class="checkbox__input" :class="classes(input)"
					type="checkbox"
					:checked="input.checked"
					:required="input.required"
					:readonly="input.readOnly"
					:disabled="input.disabled"
					@input="updateValue(index, $event)"
			/>
			<!-- @slot Add your custom check icon if needed.  -->
			<slot name="customCheckIcon"></slot>
			<span v-if="labelSide === 'right'">{{input.label}}</span>
		</label>
		<span v-if="hasError" class="checkbox__error">
			<!-- @slot Use the prop or the slot to set your own error message.  -->
			<slot name="error">{{error}}</slot>
		</span>
	</div>
</template>

<script lang="ts">
	import {isEmpty} from "@labor-digital/helferlein/lib/Types/isEmpty";
	import {isUndefined} from "@labor-digital/helferlein/lib/Types/isUndefined";
	import {CheckboxInputs} from "./Checkbox";

	export default {
		name: "Checkbox",
		props: {
			/**
			 * parse checkboxes as array
			 */
			inputs: Array as CheckboxInputs,
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
			classes(item): Object {
				return {
					"checkbox__input--required": item.required,
					"checkbox__input--disabled": item.disabled,
					"checkbox__input--readonly": item.readOnly,
					"checkbox__input--error": item.error !== "" && !isUndefined(this.error)
				};
			},
			updateValue(index, e) {
				let element = {id: index, label: e.target.labels[0].innerText};
				if (e.target.checked) {
					this.values.push(element);
				} else {
					for (let i = 0; i < this.values.length; i++) {
						if (this.values[i].id == index) {
							this.values.splice(i, 1);
							break;
						}
					}
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