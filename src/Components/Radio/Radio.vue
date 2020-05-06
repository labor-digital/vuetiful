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
	<div>
		<div v-for="(input, index) in inputs">
			<label v-if="hasLabel(input.label)" class="radio__label">
				<span v-if="labelSide === 'left'">{{input.label}}</span>
				<input :name="groupName"
						class="radio__input" :class="classes(input)"
						type="radio"
						:checked="input.checked"
						:required="input.required"
						:disabled="input.disabled"
						@input="updateValue(index, $event)"
				/>
				<span v-if="labelSide === 'right'">{{input.label}}</span>
			</label>
		</div>
		<span v-if="error" class="radio__error">{{ error }}</span>
	</div>
</template>

<script lang="ts">
	import {RadioInputs} from "./Radio";
	import {isUndefined} from "@labor-digital/helferlein/lib/Types/isUndefined";

	export default {
		name: "Radio",
		props: {
			/**
			 * set group name to group radio buttons
			 */
			groupName: String,
			/**
			 * parse checkboxes as array
			 */
			inputs: Array as RadioInputs,
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
			}
		},
		methods: {
			hasLabel(v): boolean {
				return !isUndefined(v) || v !== ""
			},
			classes(item): Object {
				return {
					"radio__input--required": item.required,
					"radio__input--disabled": item.disabled,
					"radio__input--readonly": item.readOnly,
					"radio__input--error": item.error !== "" && !isUndefined(this.error)
				}
			},
			updateValue(index, e) {
				this.value = {id: index, label: e.target.labels[0].innerText}
				this.$emit("input", this.value)
			}
		}
	}
</script>

<style lang="sass"></style>