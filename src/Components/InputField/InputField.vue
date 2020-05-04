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
  - Last modified: 2020.04.24 at 16:44
  -->

<template>
	<div class="inputField">
		<label v-if="hasLabel" class="inputField__label">
			<!-- @slot default slot for label. you can parse the label also with a parameter. -->
			<slot>{{label}}</slot>
		</label>
		<input class="inputField__input" :class="classes"
				:value="value"
				:type="type"
				:placeholder="placeholder"
				:required="required"
				:readonly="readOnly"
				:disabled="disabled"
				@input="updateValue"
				@change="updateValue"
				@blur="$emit('blur')"
				@focus="$emit('focus')"/>
		<!-- @slot if you want to place an icon inside the input. Dont forget to style it! -->
		<slot name="icon"></slot>
		<span v-if="error" class="inputField__error">{{ error }}</span>
	</div>
</template>

<script lang="ts">
	export default {
		name: "InputField",
		props: {
			/**
			 * set label for input field or use default slot
			 * css class: inputField__label
			 */
			label: {
				type: String
			},
			/**
			 * Change input type of field. default: text
			 * ('text', 'url', 'email', 'password', 'search')
			 * css class: inputField__input
			 */
			type: {
				default: "text",
				type: String,
				validate: (v) => {
					return ["text", "password", "email", "search", "url"].indexOf(v) !== -1;
				}
			},
			/**
			 * set error message in span
			 * css class: inputField__error
			 */
			error: {
				type: String
			},
			/**
			 * set input as disabled and removes it from the form submission
			 */
			placeholder: {
				type: String
			},
			/**
			 * set input as required
			 */
			required: {
				default: false,
				type: Boolean
			},
			/**
			 * set input as read-only
			 */
			readOnly: {
				default: false,
				type: Boolean
			},
			/**
			 * set input as disabled
			 */
			disabled: {
				default: false,
				type: Boolean
			},
			value: String
		},
		computed: {
			hasLabel(): boolean {
				return this.$slots.default !== "" || this.label !== ""
			},
			classes(): Object {
				return {
					"inputField__input--required": this.required,
					"inputField__input--disabled": this.disabled,
					"inputField__input--readonly": this.readOnly,
					"inputField__input--error": this.error !== ""
				}
			}
		},
		methods: {
			updateValue(e) {
				this.$emit("input", e.target.value);
			}
		}
	}
</script>

<style scoped lang="sass" src="./InputField.sass"></style>