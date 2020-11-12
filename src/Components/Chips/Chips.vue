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
  - Last modified: 2020.05.10 at 19:50
  -->

<template>
    <div class="chips" :id="identifier">

        <chip v-for="item in preparedItems"
              class="chips__item"
              :id="item.id"
              :key="item.id"
              :disabled="item.disabled"
              :removable="item.removable"
              @click="onChipClick(item)"
              @remove="onChipRemove(item)"
              :ref="'chip_' + item.id"
        >

            <!-- @slot Used to overwrite the close icon for a single chip -->
            <template v-slot:removeIcon :item="item">
                <slot name="chipRemoveIcon">&times;</slot>
            </template>

            <!-- @slot Used to overwrite the rendered label for a single chip -->
            <slot name="chipLabel" :item="item">
                {{ item.label }}
            </slot>
        </chip>

    </div>
</template>

<script lang="ts">
import {forEach} from '@labor-digital/helferlein/lib/Lists/forEach';
import {getGuid} from '@labor-digital/helferlein/lib/Misc/getGuid';
import {md5} from '@labor-digital/helferlein/lib/Misc/md5';
import {isArray} from '@labor-digital/helferlein/lib/Types/isArray';
import {isObject} from '@labor-digital/helferlein/lib/Types/isObject';
import {isPlainObject} from '@labor-digital/helferlein/lib/Types/isPlainObject';
import Chip from './Chip.vue';

export interface ChipItemDefinition
{
    raw: any
    value: any
    label: string
    disabled: boolean
    removable: boolean
}

export default {
    name: 'Chips',
    components: {Chip},
    props: {
        /**
         * v-model Can be either an array of values or an array of objects that can contain multiple
         * properties like [{value: 'a', label: 'A', disabled: true}, ... ]
         */
        value: {
            type: Array,
            default: () => []
        },

        /**
         * Allows you to pass an object of value => label to that should be displayed
         * instead of the value behind a single chip
         */
        labels: {
            type: Object,
            default: () => {}
        },

        /**
         * Allows you to pass a list of values that should be set to "disabled"
         */
        disabled: {
            type: Array,
            default: () => []
        },

        /**
         * Allows you to pass a list of values that should not be able to be removed from the list
         */
        nonRemovable: {
            type: Array,
            default: () => []
        },

        /**
         * Determines the property to use as "label" when an array of objects is passed
         */
        labelKey: {
            default: 'label'
        },

        /**
         * Determines the property to use as "value" when an array of objects is passed
         */
        valueKey: {
            default: 'value'
        },

        /**
         * Determines the property to use as check for the "disabled" state when an array of objects is passed
         */
        disabledKey: {
            default: 'disabled'
        },

        /**
         * Determines the property to check if an item can be removed or not an array of objects is passed
         */
        removableKey: {
            default: 'removable'
        },

        /**
         * @deprecated use "value" instead
         */
        items: {
            type: [Array, null],
            default: null
        }
    },
    data()
    {
        return {
            identifier: this.$attrs.id ?? this.$vnode.key ?? getGuid('chips_')
        };
    },
    computed: {
        /**
         * Generates the list of local items we use to render the chips
         */
        preparedItems(): Array<ChipItemDefinition>
        {
            const list = isArray(this.items) ? this.items : this.value;
            const labels = isPlainObject(this.labels) ? this.labels : {};
            const disabled = isArray(this.disabled) ? this.disabled : [];
            const nonRemovables = isArray(this.nonRemovable) ? this.nonRemovable : [];
            const prepared = [];

            forEach(list, (item, index) => {
                const itemIsObject = isObject(item);
                const value = itemIsObject ? item[this.valueKey] ?? item : item;
                let id;

                try {
                    id = md5(JSON.stringify(value));
                } catch (e) {
                    id = index;
                }

                prepared.push({
                    id: this.identifier + '_' + id,
                    raw: item,
                    value: value,
                    label: itemIsObject ? item[this.labelKey] ?? labels[item] ?? item + '' : labels[item] ?? item,
                    disabled: itemIsObject
                        ? item[this.disabledKey] ?? disabled.indexOf(item) !== -1 ?? false
                        : disabled.indexOf(item) !== -1 ?? false,
                    removable: itemIsObject
                        ? item[this.removableKey] ?? nonRemovables.indexOf(item) === -1 ?? true
                        : nonRemovables.indexOf(item) === -1 ?? true
                });
            });
            return prepared;
        }
    },
    methods: {
        /**
         * Handler to remove a given item from the list of chips
         * @param removedItem
         */
        onChipRemove(removedItem: ChipItemDefinition)
        {
            const output = [];
            let i = 0;
            let index = 0;
            forEach(this.preparedItems, (item: ChipItemDefinition) => {
                if (item.value !== removedItem.value) {
                    output.push(item.raw);
                } else {
                    index = i;
                }
                i++;
            });
            this.$emit('input', output);
            this.$emit('chip:remove', removedItem);
            // @deprecated remove this event
            this.$emit('remove-chip', output, index);
        },

        /**
         * Handler to emit an event when a chip was clicked
         * @param item
         */
        onChipClick(item: ChipItemDefinition): void
        {
            this.$emit('chip:click', item);
        }
    }
};
</script>

<style scoped lang="sass"></style>
