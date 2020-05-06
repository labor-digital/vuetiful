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
		<span class="inputField__inputContainer">
			<input class="inputField__input" :class="classes" ref="inputField"
					:type="type"
					:placeholder="placeholder"
					:required="required"
					:readonly="readOnly"
					:disabled="disabled"
					@input="updateValue"
					@change="updateValue"
					@blur="$emit('blur')"
					@focus="$emit('focus')"/>
			<span v-show="hasValue" class="inputField__clear" @click="clearInput">
				<!-- @slot set your custom clear icon. As default: &times; -->
				<slot name="clearIcon">&times;</slot>
			</span>
		</span>

		<!-- @slot if you want to place an icon inside the input. Dont forget to style it! -->
		<slot name="icon"></slot>
		<span v-if="error" class="inputField__error">{{ error }}</span>
	</div>
</template>

<script lang="ts">
	import {isEmpty} from "@labor-digital/helferlein/lib/Types/isEmpty";
	import {isUndefined} from "@labor-digital/helferlein/lib/Types/isUndefined";

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
			 * show clear icon on the right to easily clear the input field
			 */
			clearIcon: {
				default: true,
				type: Boolean
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
			/**
			 * use v-model
			 */
			value: String
		},
		data() {
			return {
				isEmpty: !isEmpty(this.value)
			};
		},
		computed: {
			hasLabel(): boolean {
				return this.$slots.default !== "" || this.label !== "";
			},
			hasValue(): boolean {
				return this.clearIcon && this.isEmpty;
			},
			classes(): Object {
				return {
					"inputField__input--required": this.required,
					"inputField__input--disabled": this.disabled,
					"inputField__input--readonly": this.readOnly,
					"inputField__input--error": this.error !== "" && !isUndefined(this.error)
				};
			}
		},
		methods: {
			updateValue() {
				this.isEmpty = !isEmpty(this.$refs.inputField.value);
				this.$emit("input", this.$refs.inputField.value);
			},
			clearInput() {
				this.$refs.inputField.value = "";
				this.updateValue();
			}
		},
		mounted(): void {
			if (!isEmpty(this.value)) this.$refs.inputField.value = this.value;
		}
	};
</script>

<style lang="sass" src="./InputField.sass"></style>