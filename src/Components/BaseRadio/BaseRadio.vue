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
  - Last modified: 2020.07.22 at 14:26
  -->

<template>
    <div class="radio" :class="classes">
        <label class="radio__label" :class="labelClasses" ref="radio" @click="onClick">
            <span v-if="labelSide === 'left' || labelLeft" class="radio__labelText radio__labelText--left">
                <slot :label="label">
                    {{ label }}
                </slot>
            </span>

            <input v-show="hasCustomCheckIcon" class="radio__input"
                   ref="input"
                   type="radio"
                   v-model="checkedProxy"
                   :value="value"
                   :required="required"
                   :disabled="disabled"
                   :groupName="realName"/>

            <!-- @slot Add your custom check icon if needed. -->
            <slot name="customCheckIcon"
                  :checked="checkedProxy"
                  :value="value"
                  :required="required"
                  :disabled="disabled"
                  :groupName="realName">
            </slot>

            <span v-if="labelSide === 'right' && !labelLeft" class="radio__labelText radio__labelText--right">
                <slot :label="label">
                    {{ label }}
                </slot>
            </span>
        </label>

        <span v-if="hasError" class="radio__error">
			<!-- @slot Use the prop or the slot to set your own error message.  -->
			<slot name="error" :error="error">{{ error }}</slot>
		</span>
    </div>
</template>

<script lang="ts">
import {isEmpty, PlainObject} from '@labor-digital/helferlein';
import {RadioGroupApi} from './RadioGroupApi';

// @todo we could abstract methods from baseCheckbox and baseRadio into a mixin to save one half of the code
// The best would be to do this in the v2 refactoring orgy where the old stuff can be dropped
export default {
    name: 'BaseRadio',
    model: {
        prop: 'checked',
        event: 'input'
    },
    inject: {
        api: {
            from: 'radioGroup',
            default: null
        } as unknown as RadioGroupApi
    },
    props: {

        /**
         * Set input as required for your forms and adds class radio--required.
         */
        required: {
            type: Boolean,
            default: false
        },

        /**
         * Disable input field and adds class radio--disabled.
         */
        disabled: {
            type: Boolean,
            default: false
        },

        /**
         * Set your value for the input
         * type: [String, Number, Boolean, Object]
         */
        value: {
            required: true
        },

        /**
         * Set the name for the input.
         */
        name: String,

        /**
         * Set error message in span and adds class radio__error
         */
        error: {
            type: String
        },

        /**
         * v-model, keeps track of the "checked" state of this radio button
         */
        checked: {
            // @todo add this back in the next major version where only boolean values are supported here
            // type: Boolean,
            default: false
        },

        /**
         * If set to true the label will be rendered on the left side instead of the right one
         */
        labelLeft: {
            type: Boolean,
            default: false
        },


        /**
         * Change the side of the label.
         * Default right
         * validate: [right, left]
         * @deprecated use label-left instead!
         */
        labelSide: {
            default: 'right',
            type: String,
            validate: (v) => {
                return ['left', 'right'].indexOf(v) !== -1;
            }
        },

        /**
         * Set a Label for your Checkbox.
         * You can change the side of the label with labelSide[right, left]
         * @deprecated will be removed in the next major version -> use the default slot instead
         */
        label: String,

        /**
         * If needed you can set a value in case the input is not checked.
         * type: [String, Number, Boolean, Object]
         * Does not work within a checkbox group
         * @deprecated will be removed in the next major version, the uncheck value will be NULL then
         */
        uncheckedValue: {
            default: false
        }

    },
    computed: {
        /**
         * Returns the api instance if displayed in a group
         */
        api(): RadioGroupApi | null
        {
            return this.radioGroup;
        },

        /**
         * Used as a reactive proxy to be passed to the input element
         */
        checkedProxy: {
            set()
            {
                if (this.isInGroup) {
                    this.api.setValueTo(this.value);
                    return;
                }

                if (this.checked !== this.value) {
                    this.$emit('input', this.value);
                }
            }, get()
            {
                if (this.isInGroup) {
                    return this.api.getStateFor(this.value) ? this.value : null;
                }

                return this.checked === this.value ? this.value : this.uncheckedValue;
            }
        },

        /**
         * Resolves the value of the name attribute, either using the current group or the local
         * name if the group does not resolve one
         */
        realName(): string | undefined
        {
            if (this.isInGroup && this.api.name !== '') {
                return this.api.name;
            }
            return this.name;
        },

        /**
         * True if the radio group was injected
         */
        isInGroup(): boolean
        {
            return this.api !== null;
        },

        /**
         * The modifier classes for the radio button based on the provided slots
         */
        classes(): PlainObject
        {
            return {
                'radio--required': this.required,
                'radio--disabled': this.disabled,
                'radio--checked': this.checkedProxy === this.value
            };
        },

        /**
         * @deprecated the label classes will be removed in the next major version use the block modifiers in "classes" instead
         */
        labelClasses(): PlainObject
        {
            return {
                'radio__label--required': this.required,
                'radio__label--disabled': this.disabled,
                'radio__label--checked': this.checkedProxy === this.value
            };
        },

        /**
         * Checks if a custom radio icon has been added and we should therefore hide the input element
         */
        hasCustomCheckIcon(): boolean
        {
            return isEmpty(this.$slots.customCheckIcon);
        },

        /**
         * Returns true if an error was given
         */
        hasError(): boolean
        {
            return !isEmpty(this.$slots.error) || !isEmpty(this.error);
        }
    },
    methods: {
        onClick()
        {
            // Allow the radio to be uncheck if it is used without a group
            if (!this.isInGroup && !this.disabled && this.checked === this.value) {
                setTimeout(() => {
                    this.$emit('input', this.uncheckedValue);
                }, 50);
            }
        }
    },
    mounted()
    {
        if (this.isInGroup) {
            this.api.registerValue(this.value);
        }
    },
    beforeDestroy()
    {
        if (this.isInGroup) {
            this.api.removeValue(this.value);
        }
    },
    watch: {
        value(n, o)
        {
            if (this.isInGroup) {
                this.api.replaceValue(n, o);
            }
        }
    }

};
</script>

<style scoped lang="sass"></style>
