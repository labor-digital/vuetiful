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
    <div class="checkboxGroup">
        <slot/>

        <!-- @deprecated will be removed when items prop is removed -->
        <base-checkbox v-for="(item,index) in prepareItems" :key="'checkbox-' + index"
                       :class="item.classes"
                       :label="item.label"
                       :value="item.value"
                       :required="item.required"
                       :disabled="item.disabled">
        </base-checkbox>

        <span v-if="hasError" class="checkboxGroup__error">
			<!-- @slot Use the prop or the slot to set your own error message.  -->
			<slot name="error" :error="error">{{ error }}</slot>
		</span>
    </div>
</template>

<script lang="ts">
import {filter} from '@labor-digital/helferlein/lib/Lists/filter';
import {forEach} from '@labor-digital/helferlein/lib/Lists/forEach';
import {isArray} from '@labor-digital/helferlein/lib/Types/isArray';
import {isEmpty} from '@labor-digital/helferlein/lib/Types/isEmpty';
import {ReactiveSet} from '../../Utils/ReactiveSet';
import BaseCheckbox from './BaseCheckbox.vue';
import {CheckboxApi} from './CheckboxApi';

export default {
    name: 'BaseCheckboxGroup',
    components: {BaseCheckbox},
    model: {
        prop: 'checked',
        event: 'input'
    },
    provide()
    {
        return {
            checkboxGroup: new CheckboxApi(this),

            // @deprecated
            isCheckGroup: this
        };
    },
    props: {
        /**
         * Set the required group name so that the inputs work together.
         */
        name: {
            type: String,
            default: ''
        },

        /**
         * v-model -> The currently selected value
         */
        checked: {
            type: Array,
            default: () => []
        },

        /**
         * Set error message in span and adds class checkbox__error
         */
        error: {
            type: String
        },

        /**
         * The maximal number of items that can be selected at once
         */
        maxItems: {
            type: Number,
            default: -1
        },

        /**
         * Set your items/checkboxes as an Array or Object.
         * @deprecated will be removed in the next major version use BaseCheckbox child components instead!
         */
        items: {
            type: [Array, Object],
            default: () => []
        },

        /**
         * If "items" contains an array of objects, this prop is used to select the object's property
         * which should be used as a label.
         * @deprecated will be removed in the next major version use BaseCheckbox child components instead!
         */
        itemLabel: {
            type: String,
            default: 'label',
            note: 'property in item for text.'
        },

        /**
         * If "items" contains an array of objects, this prop is used to select the object's property
         * which should be used as a value.
         * @deprecated will be removed in the next major version use BaseCheckbox child components instead!
         */
        itemValue: {
            type: String,
            default: 'value',
            note: 'property in item for value.'
        }
    },
    data()
    {
        return {
            values: new ReactiveSet<any>()
        };
    },
    computed: {
        /**
         * True if we should use the legacy item definition instead of using child components
         * @deprecated only here to support the legacy mode
         */
        useLegacyItems(): boolean
        {
            return isEmpty(this.$slots.default);
        },

        /**
         * Returns the prepared item list for the legacy api
         * @deprecated use checkbox child elements instead
         */
        prepareItems()
        {
            let preparedItems = [];

            // Build a unique value map
            const items = isArray(this.items) ? this.items : [];

            // Build the prepared item list
            forEach(items, (item) => {
                const _item = {
                    value: item.value ?? item[this.itemValue] ?? item,
                    label: item.label ?? item[this.itemLabel] ?? item,
                    required: item.required ?? false,
                    disabled: item.disabled ?? false,
                    classes: item.classes ?? {}
                };

                preparedItems.push(_item);
            });
            return preparedItems;
        },

        /**
         * Returns true if an error was given
         */
        hasError(): boolean
        {
            return !isEmpty(this.$slots.error) || !isEmpty(this.error);
        },

        /**
         * True when the max item limit is reached or exceeded
         */
        isLimitReached(): boolean
        {
            return this.maxItems > -1 && this.checked.length >= this.maxItems;
        }
    },
    methods: {
        /**
         * Internal helper to force the value to be in the valid range
         * @internal
         */
        forceValidValue(): void
        {
            const filteredValues = filter(this.checked, (v) => this.values.has(v));
            if (filteredValues.length !== this.checked.length) {
                this.$emit('input', filteredValues);
            }
        }
    },
    updated()
    {
        this.forceValidValue();
    },
    mounted()
    {
        this.forceValidValue();
    },
    watch: {
        maxItems(n)
        {
            // Remove excess items we don't want anymore
            if (this.maxItems > -1 && n < this.checked.length) {
                this.$emit('input', this.checked.splice(0, n));
            }
        }
    }
};
</script>

<style scoped lang="sass"></style>
