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
	<div class="textArea">
		<label v-if="hasLabel" class="textArea__label">
			<!-- @slot default slot for label. you can parse the label also with a parameter. -->
			<slot>{{label}}</slot>
		</label>
		<textarea class="textArea__input" :class="classes" ref="textarea"
				:rows="rows"
				:placeholder="placeholder"
				:required="required"
				:readonly="readOnly"
				:disabled="disabled"
				@input="updateValue"
				@change="updateValue"
				@blur="$emit('blur')"
				@focus="$emit('focus')"/>
		<!-- @slot if you want to place an icon inside the textArea. Dont forget to style it! -->
		<slot name="icon"></slot>
		<span v-if="error" class="textArea__error">{{ error }}</span>
	</div>
</template>

<script lang="ts">
	import {isUndefined} from "@labor-digital/helferlein/lib/Types/isUndefined";
	import {isEmpty} from "@labor-digital/helferlein/lib/Types/isEmpty";

	export default {
		name: "TextArea",
		props: {
			/**
			 * set label for input field or use default slot
			 * css class: inputField__label
			 */
			label: {
				type: String
			},
			/**
			 * set rows for the textarea to determine the initial height
			 */
			rows: {
				default: 6,
				type: Number
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
				return !isEmpty(this.$slots.default) || !isEmpty(this.label);
			},
			classes(): Object {
				return {
					"textArea__input--required": this.required,
					"textArea__input--disabled": this.disabled,
					"textArea__input--readonly": this.readOnly,
					"textArea__input--error": this.error !== "" && !isUndefined(this.error)
				}
			}
		},
		methods: {
			updateValue() {
				this.$emit("input", this.$refs.textarea.value);
			}
		},
		mounted(): void {
			if (!isEmpty(this.value)) this.$refs.textarea.value = this.value;
		}
	}
</script>

<style lang="sass" src="./TextArea.sass"></style>