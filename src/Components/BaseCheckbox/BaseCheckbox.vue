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
    <div class="checkbox">
        <label class="checkbox__label" :class="classes" ref="checkbox">
            <span v-if="labelSide === 'left'" class="checkbox__labelText checkbox__labelText--left">
                {{ label }}
            </span>

            <input v-show="hasCustomCheckIcon"
                   ref="input"
                   class="checkbox__input"
                   type="checkbox"
                   :value="value"
                   :required="required"
                   :disabled="disabled"
                   :name="getName"
                   @change="onChange"
            />

            <!-- @slot Add your custom check icon if needed. -->
            <slot name="customCheckIcon"></slot>

            <span v-if="labelSide === 'right'" class="checkbox__labelText checkbox__labelText--right">
                {{ label }}
            </span>
        </label>

        <span v-if="hasError" class="checkbox__error">
			<!-- @slot Use the prop or the slot to set your own error message.  -->
			<slot name="error">{{ error }}</slot>
		</span>
    </div>
</template>

<script lang="ts">
import {isArray} from '@labor-digital/helferlein/lib/Types/isArray';
import {isEmpty} from '@labor-digital/helferlein/lib/Types/isEmpty';

export default {
    name: 'BaseCheckbox',
    model: {
        prop: 'checked',
        event: 'input'
    },
    inject: {
        inGroup: {
            from: 'isCheckGroup',
            default: false
        }
    },
    props: {
        /**
         * Set a Label for your Checkbox.
         * You can change the side of the label with labelSide[right, left]
         */
        label: String,

        /**
         * Change the side of the label.
         * Default right
         * validate: [right, left]
         */
        labelSide: {
            default: 'right',
            type: String,
            validate: (v) => {
                return ['left', 'right'].indexOf(v) !== -1;
            }
        },

        /**
         * Set input as required for your forms and adds class checkbox__required.
         */
        required: false,

        /**
         * Disable input field and adds class checkbox__disabled.
         */
        disabled: false,

        /**
         * Set your value for the input
         * type: [String, Number, Boolean, Object]
         */
        value: {
            default: true
        },

        /**
         * If needed you can set a value in case the input is not checked.
         * type: [String, Number, Boolean, Object]
         * Does not work within a checkbox group
         */
        uncheckedValue: {
            default: false
        },

        /**
         * Set the name for the input.
         */
        name: String,

        /**
         * Set error message in span and adds class checkbox__error
         */
        error: {
            type: String
        },

        /**
         * v-model -> If you need preselected Items set this to the same as the value.
         * Within a checkbox group use an array. If the values match it will preselect them.
         * type: [String, Number, Boolean, Object, Array]
         */
        checked: {
            default: null
        }
    },
    computed: {
        computedLocalChecked: {
            set(v)
            {
                if (this.isGroup) {
                    this.inGroup.localChecked = v;
                } else {
                    this.localChecked = v;
                }
            }, get()
            {
                return this.isGroup ? this.inGroup.localChecked : this.localChecked;
            }
        },
        isGroup()
        {
            // Is this check/radio a child of check-group or radio-group?
            return Boolean(this.inGroup);
        },
        getName()
        {
            // Group name preferred over local name
            return (
                       this.isGroup ? this.inGroup.name : this.name
                   ) || null;
        },
        classes()
        {
            return {
                'checkbox__label--required': this.required,
                'checkbox__label--disabled': this.disabled,
                'checkbox__label--checked': this.checked
            };
        },
        hasCustomCheckIcon(): boolean
        {
            return isEmpty(this.$slots.customCheckIcon);
        },
        hasError(): boolean
        {
            return !isEmpty(this.$slots.error) || !isEmpty(this.error);
        }
    },
    data()
    {
        return {
            localChecked: this.isGroup ? this.inGroup.checked : this.checked
        };
    },
    methods: {
        onChange({target: {checked}})
        {
            let localChecked = this.computedLocalChecked;
            const value = this.value;
            const isArr = isArray(localChecked);
            const uncheckedValue = isArr ? null : this.uncheckedValue;
            // Update computedLocalChecked
            if (isArr) {
                const idx = localChecked.indexOf(value);
                if (checked && idx < 0) {
                    // Add value to array
                    localChecked = localChecked.concat(value);
                } else if (!checked && idx > -1) {
                    // Remove value from array
                    localChecked = localChecked.slice(0, idx).concat(localChecked.slice(idx + 1));
                }
            } else {
                localChecked = checked ? value : uncheckedValue;
            }
            this.computedLocalChecked = localChecked;
        }
    },
    mounted()
    {
        if (!this.isGroup) {
            if (this.checked === this.value) {
                this.$refs.input.checked = true;
            } else {
                this.computedLocalChecked = this.checked === this.value ? this.value : this.uncheckedValue;
            }
        } else {
            if (this.inGroup.checked.includes(this.value)) {
                this.$refs.input.checked = true;
            }
        }
    },
    watch: {
        checked(newVal)
        {
            this.computedLocalChecked = newVal;
        },
        computedLocalChecked(newVal)
        {
            this.$emit('input', newVal);
        }
    }

};
</script>

<style scoped lang="sass"></style>
