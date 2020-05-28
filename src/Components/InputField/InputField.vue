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
                        <!-- @slot Optional content at the start of the input container -->
			<slot name="beforeInput"></slot>
			<input class="inputField__input" :class="classes" ref="inputField"
				   :value="value"
				   :type="type"
				   :placeholder="placeholder"
				   :required="required"
				   :readonly="readOnly"
				   :disabled="disabled"
				   @input="updateValue"
				   @change="updateValue"
				   @blur="onBlur"
				   @focus="$emit('focus')"
				   @keyup.enter="$event.target.blur()"/>
			<!-- @slot Optional content at the end of the input container -->
		<slot name="afterInput"></slot>
			<span v-show="hasValue" class="inputField__clear" @click="clearInput">
				<!-- @slot set your custom clear icon. As default: &times; -->
				<slot name="clearIcon">&times;</slot>
			</span>
		</span>
		
		<!-- @slot if you want to place an icon inside the input. Dont forget to style it! -->
		<slot name="icon"></slot>
		<span v-if="hasError || errorEmail" class="inputField__error">
			<!-- @slot Use the prop or the slot to set your own error message.  -->
			<slot name="error">{{error}} {{errorEmail}}</slot>
		</span>
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
			 * ('text', 'url', 'email', 'password')
			 * css class: inputField__input
			 * If email is set the mail will be validated with a simple regex. A default error message will show up. To override this error message simply put your custom error in the error prop or in the error slot.
			 */
			type: {
				default: "text",
				type: String,
				validate: (v) => {
					return ["text", "password", "email", "url"].indexOf(v) !== -1;
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
			value: String
		},
		data() {
			return {
				isEmpty: !isEmpty(this.value),
				validEmail: true,
				errorEmail: ""
			};
		},
		computed: {
			hasLabel(): boolean {
				return !isEmpty(this.$slots.default) || !isEmpty(this.label);
			},
			hasError(): boolean {
				return !isEmpty(this.$slots.error) || !isEmpty(this.error);
			},
			hasValue(): boolean {
				return this.clearIcon && this.isEmpty;
			},
			classes(): Object {
				return {
					"inputField__input--required": this.required,
					"inputField__input--disabled": this.disabled,
					"inputField__input--readonly": this.readOnly,
					"inputField__input--error": this.error !== "" && !isUndefined(this.error) || !this.validEmail
				};
			}
		},
		methods: {
			updateValue() {
				if (isUndefined(this.$refs.inputField)) return;
				this.isEmpty = !isEmpty(this.$refs.inputField.value);
				this.$emit("input", this.$refs.inputField.value);
			},
			onBlur() {
				this.$emit("blur");
				if (this.type === "email") this.validateEmail();
			},
			validateEmail(): boolean {
				if (isEmpty(this.$refs.inputField.value)) {
					this.validEmail = true;
					this.errorEmail = null;
					return;
				}
				this.validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.$refs.inputField.value);
				if (!this.hasError) this.validEmail ? this.errorEmail = null : this.errorEmail = "Please enter a valid email address! (Example: 'example@example.de')";
			},
			clearInput() {
				this.$refs.inputField.value = "";
				this.updateValue();
				this.onBlur();
			}
		},
		mounted(): void {
			if (!isEmpty(this.value)) this.$refs.inputField.value = this.value;
			this.onBlur();
		}
	};
</script>

<style lang="sass" src="./InputField.sass"></style>