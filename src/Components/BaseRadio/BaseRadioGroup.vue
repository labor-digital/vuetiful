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
    <div class="radioGroup">
        <slot/>

        <!-- @deprecated will be removed when items prop is removed -->
        <base-radio
            v-if="useLegacyItems"
            v-for="(item,index) in prepareItems"
            :key="'checkbox-' + index"
            :class="item.classes"
            :label="item.label"
            :value="item.value"
            :required="item.required"
            :disabled="item.disabled">
        </base-radio>

        <span v-if="hasError" class="radioGroup__error">
			<!-- @slot Use the prop or the slot to set your own error message.  -->
			<slot name="error" :error="error">{{ error }}</slot>
		</span>
    </div>
</template>

<script lang="ts">
import {forEach, isArray, isEmpty} from '@labor-digital/helferlein';
import {ReactiveSet} from '../../Utils/ReactiveSet';
import BaseRadio from './BaseRadio.vue';
import {RadioGroupApi} from './RadioGroupApi';

export default {
    name: 'BaseRadioGroup',
    components: {BaseRadio},
    model: {
        prop: 'checked',
        event: 'input'
    },
    provide()
    {
        return {
            radioGroup: new RadioGroupApi(this),
            // @deprecated use radioGroup instead
            isRadioGroup: this
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
         * v-model -> An array with selected values
         */
        checked: {
            default: () => []
        },

        /**
         * Set error message in span and adds class checkbox__error
         */
        error: {
            type: String
        },

        /**
         * By default the group will always select the first item in the list,
         * if you set this flag to true, the list will start of empty.
         * NOTE: If you use this, make sure to start off with NULL as value
         */
        startEmpty: {
            type: Boolean,
            default: false
        },

        /**
         * Set your items/checkboxes as an Array or Object.
         * @deprecated will be removed in the next major version use BaseRadio child components instead!
         */
        items: {
            type: [Array, Object],
            default: () => []
        },

        /**
         * If "items" contains an array of objects, this prop is used to select the object's property
         * which should be used as a label.
         * @deprecated will be removed in the next major version use BaseRadio child components instead!
         */
        itemLabel: {
            type: String,
            default: 'label',
            note: 'property in item for text.'
        },

        /**
         * If "items" contains an array of objects, this prop is used to select the object's property
         * which should be used as a value.
         * @deprecated will be removed in the next major version use BaseRadio child components instead!
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
         * @deprecated use radio child elements instead
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
        }
    },
    methods: {
        /**
         * Internal helper to force the value to be in the valid range
         * @internal
         */
        forceValidValue(): void
        {
            // Don't force the value if we start off empty and are allowed to do so
            if (this.checked === null && this.startEmpty) {
                return;
            }

            if (!this.values.has(this.checked)) {
                this.$emit('input', this.values.getFirst());
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
    }
};
</script>

<style scoped lang="sass"></style>
