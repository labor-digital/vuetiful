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
    <div class="chips">
        <chip v-for="(item, index) in preparedValue" class="chips__item"
              :key="index"
              :item="item.label"
              @remove.stop="removeChip(item)">
            <!-- @slot Used to overwrite the rendered label for a single chip -->
            <slot name="chipLabel" :item="item">
                {{ item.label }}
            </slot>
        </chip>
    </div>
</template>

<script lang="ts">
import {forEach} from '@labor-digital/helferlein/lib/Lists/forEach';
import {isNull} from '@labor-digital/helferlein/lib/Types/isNull';
import {isUndefined} from '@labor-digital/helferlein/lib/Types/isUndefined';
import Chip from './Chip.vue';

export default {
    name: 'Chips',
    components: {Chip},
    props: {
        value: Array,

        /**
         * @deprecated use "value" instead
         */
        items: {
            type: [Array, null],
            default: null
        }
    },
    computed: {
        preparedValue()
        {
            const value = isNull(this.items) ? this.value : this.items;

            let preparedValue = [];
            forEach(value, (item, index) => {
                preparedValue.push({
                    id: index,
                    value: isUndefined(item.value) ? item : item.value,
                    label: isUndefined(item.label) ? item : item.label
                });
            });
            return preparedValue;
        }
    },
    methods: {
        removeChip(item)
        {
            const valueClone = [...this.preparedValue];
            const index = valueClone.indexOf(item);
            valueClone.splice(index, 1);
            this.$emit('input', valueClone);
            this.$emit('remove-chip', item, index);
        }
    }
};
</script>

<style scoped lang="sass"></style>
