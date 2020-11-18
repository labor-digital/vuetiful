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
    <div class="inputField" :class="classes">
        <label v-if="hasLabel" class="inputField__label">
            <!-- @slot default slot for label. you can parse the label also with a parameter. -->
            <slot>{{ label }}</slot>
        </label>
        <span class="inputField__inputContainer">
			<!-- @slot Optional content at the start of the input container -->
			<slot name="beforeInput"></slot>

            <span v-if="type === 'date' && !focus && this.placeholder !== ''" class="inputField__placeholder">
                {{ isEmpty ? placeholder : '' }}
            </span>

            <input class="inputField__input"
                   ref="input"
                   :style="stylesDate"
                   :value="value + ''"
                   :type="type"
                   :placeholder="isEmpty ? placeholder : ''"
                   :required="required"
                   :readonly="readOnly"
                   :disabled="disabled"
                   v-bind="filteredAttributes"
                   @input="updateValue"
                   @change="updateValue"
                   @blur="onBlur"
                   @focus="onFocus"/>

            <!-- @slot if you want to place an icon inside the input. Dont forget to style it! -->
            <slot name="icon"></slot>

            <!-- @slot Optional content in front of the clear icon -->
            <slot name="beforeClearIcon"></slot>

            <span v-show="hasValue" class="inputField__clear" @click="clearInput">
				<!-- @slot set your custom clear icon. As default: &times; -->
				<slot name="clearIcon">&times;</slot>
			</span>

            <!-- @slot Optional content at the end of the input container -->
            <slot name="afterInput"></slot>
		</span>
        <span v-if="hasError || errorEmail" class="inputField__error">
			<!-- @slot Use the prop or the slot to set your own error message.  -->
			<slot name="error">{{ error }} {{ errorEmail }}</slot>
		</span>
    </div>
</template>

<script lang="ts">
import {PlainObject} from '@labor-digital/helferlein/lib/Interfaces/PlainObject';
import {forEach} from '@labor-digital/helferlein/lib/Lists/forEach';
import {isEmpty} from '@labor-digital/helferlein/lib/Types/isEmpty';
import {isUndefined} from '@labor-digital/helferlein/lib/Types/isUndefined';

export default {
    name: 'InputField',
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
         * If email is set the mail will be validated with a simple regex. A default error message will show up. To override this error message simply put your custom error in the error prop or in the error slot.
         */
        type: {
            default: 'text',
            type: String
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
         * The field value to be injected via v-model
         */
        value: [String, Number],

        /**
         * The label to show if the mail validation fails
         */
        emailValidationLabel: {
            type: String,
            default: 'Please enter a valid email address! (Example: \'example@example.org\')'
        }
    },
    data()
    {
        return {
            focus: false,
            validEmail: true,
            errorEmail: ''
        };
    },
    computed: {
        filteredAttributes(): PlainObject
        {
            const allowedAttrs = [
                'accept', 'alt', 'autofocus', 'autocomplete', 'form', 'formaction',
                'list', 'maxlength', 'minlength', 'size'
            ];
            const result = {};
            forEach(allowedAttrs, (attr) => {
                if (this.$attrs[attr]) {
                    result[attr] = this.$attrs[attr];
                }
            });
            return result;
        },
        isEmpty(): boolean
        {
            return isEmpty(this.value);
        },
        hasLabel(): boolean
        {
            return !isEmpty(this.$slots.default) || !isEmpty(this.label);
        },
        hasError(): boolean
        {
            return !isEmpty(this.$slots.error) || !isEmpty(this.error);
        },
        hasValue(): boolean
        {
            return this.clearIcon && !this.isEmpty;
        },
        classes(): Object
        {
            return {
                'inputField--required': this.required,
                'inputField--disabled': this.disabled,
                'inputField--readonly': this.readOnly,
                'inputField--error': this.error !== '' && !isUndefined(this.error) || !this.validEmail
            };
        },
        stylesDate(): Object
        {
            return {
                color: this.isEmpty
                       && !this.focus
                       && this.type === 'date'
                       && this.placeholder !== ''
                    ? 'transparent' : ''
            };
        }
    },
    methods: {
        updateValue(event: Event)
        {
            this.$emit('input', event.target.value ?? '');
        },
        onBlur(e)
        {
            this.focus = false;
            this.$emit('blur', e);
        },
        onFocus(e)
        {
            this.focus = true;
            this.$emit('focus', e);
        },
        validateEmail(value): boolean
        {
            value = value + '';
            if (value.trim() === '') {
                this.validEmail = true;
                this.errorEmail = null;
                return;
            }
            this.validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$/.test(value);
            if (!this.hasError) {
                this.validEmail ?
                    this.errorEmail = null :
                    this.errorEmail = this.emailValidationLabel;
            }
        },
        clearInput()
        {
            this.$emit('input', '');
            this.$emit('clear');
        }
    },
    watch: {
        value(v)
        {
            if (this.type === 'email') {
                this.validateEmail(v);
            }
        }
    }
};
</script>

<style lang="sass" src="./InputField.sass"></style>
