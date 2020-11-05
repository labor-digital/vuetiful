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
    <div class="checkbox" v-if="hasItems">
        <label v-for="(item, index) in prepareItems" v-show="item.show"
               class="checkbox__label"
               :class="intClasses(item)"
               :ref="'checkbox-'+index">
            <span v-if="labelSide === 'left'" class="checkbox__labelText checkbox__labelText--left">
                <slot name="label" v-bind:item="item">{{ item.label }}</slot>
            </span>
            <input v-show="hasCustomCheckIcon" class="checkbox__input"
                   type="checkbox"
                   :required="item.required"
                   :disabled="item.disabled"
                   v-model="item.checked"
                   @input="updateValue(item)"
            />
            <!-- @slot Add your custom check icon if needed. -->
            <slot name="customCheckIcon"></slot>
            <span v-if="labelSide === 'right'"
                  class="checkbox__labelText checkbox__labelText--right">
                <slot name="label" v-bind:item="item">{{ item.label }}</slot>
            </span>
        </label>
        <span v-if="hasError" class="checkbox__error">
			<!-- @slot Use the prop or the slot to set your own error message.  -->
			<slot name="error">{{ error }}</slot>
		</span>
    </div>
</template>

<script lang="ts">
import {asArray} from '@labor-digital/helferlein/lib/FormatAndConvert/asArray';
import {forEach} from '@labor-digital/helferlein/lib/Lists/forEach';
import {isArray} from '@labor-digital/helferlein/lib/Types/isArray';
import {isBool} from '@labor-digital/helferlein/lib/Types/isBool';
import {isEmpty} from '@labor-digital/helferlein/lib/Types/isEmpty';
import {isUndefined} from '@labor-digital/helferlein/lib/Types/isUndefined';
import {CheckboxInputs} from './Checkbox.interfaces';

/**
 * @deprecated use BaseCheckbox instead
 */
export default {
    name: 'Checkbox',
    props: {
        /**
         * parse checkboxes as array
         */
        items: Array,

        /**
         * choose label side right or left
         */
        labelSide: {
            default: 'right',
            type: String,
            validate: (v) => {
                return ['left', 'right'].indexOf(v) !== -1;
            }
        },
        /**
         * set error message in span
         * css class: checkbox__error
         */
        error: {
            type: String
        },

        value: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        prepareItems()
        {
            let preparedItems = [];

            // Build a unique value map
            const value = isArray(this.value) ? this.value : [];
            const items = isArray(this.items) ? this.items : [];
            const newValueMap = new Map();
            const selectedItemValues = [];
            forEach(value, (item: CheckboxInputs) => {
                selectedItemValues.push(item.value);
                newValueMap.set(item.value, item);
            });

            // Build the prepared item list
            forEach(items, (item) => {
                const value = item.value ?? item;
                const _item = {
                    ...item,
                    value,
                    label: item.label ?? item,
                    checked: isBool(item.checked) ? item.checked :
                        selectedItemValues.indexOf(value) !== -1,
                    required: item.required ?? false,
                    disabled: item.disabled ?? false,
                    show: item.show ?? true,
                    classes: item.classes ?? {}
                };
                if (_item.checked) {
                    newValueMap.set(value, _item);
                } else {
                    newValueMap.delete(value);
                }
                preparedItems.push(_item);
            });

            // Emit the input event after an update
            // We need this here for baseSelectBox -> So don't delete it
            if (JSON.stringify(asArray(newValueMap.keys())) !== JSON.stringify(selectedItemValues)) {
                this.$emit('input', asArray(newValueMap));
            }
            return preparedItems;
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
    methods: {
        hasItems()
        {
            return !isEmpty(this.items) || !isUndefined(this.items);
        },
        intClasses(item)
        {
            return {
                ...item.classes,
                'checkbox__label--required': item.required,
                'checkbox__label--disabled': item.disabled,
                'checkbox__label--checked': item.checked
            };
        },
        updateValue(item)
        {
            const isChecked = !item.checked;
            let valueClone = isArray(this.value) ? [...this.value] : [];
            if (isChecked) {
                valueClone.push(item);
            } else {
                valueClone = valueClone.filter(val => val.value !== item.value);
            }
            this.$emit('input', valueClone);
        }
    }
};
</script>

<style lang="sass"></style>
