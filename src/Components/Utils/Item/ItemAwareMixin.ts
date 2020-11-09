/*
 * Copyright 2020 LABOR.digital
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Last modified: 2020.11.05 at 22:19
 */
import {PlainObject} from '@labor-digital/helferlein/lib/Interfaces/PlainObject';
import {forEach} from '@labor-digital/helferlein/lib/Lists/forEach';
import Vue, {VNode} from 'vue';

export interface ItemDefinition
{
    id: number,
    data: PlainObject,
    label: string,
    vNode: VNode
}

/**
 * Returns an array either of the scoped slots or the default slots
 * @param context
 * @param slotProps
 */
function normalizeVueChildren(context, slotProps = {})
{
    if (context.$scopedSlots.default) {
        return context.$scopedSlots.default(slotProps) || [];
    }

    return context.$slots.default || [];
}

export default {
    data()
    {
        return {
            iamItemStates: {}
        };
    },
    methods: {
        /**
         * Designed to be overwritten in your implementing component
         * It can be used to store additional data for your item elements
         */
        defaultItemState()
        {
            return {};
        },

        /**
         * Allows you to reset the internal item state list
         * This must be used if items are removed from the list without specific keys/ids
         */
        resetItemStates(): void
        {
            this.iamItemStates = {};
        },

        /**
         * Resolves the list of item elements inside the parent that uses this mixin
         */
        getItems(): Array<ItemDefinition>
        {
            const items: Array<ItemDefinition> = [];
            let index = 0;
            forEach(normalizeVueChildren(this), item => {
                const ctor = item.componentOptions && item.componentOptions.Ctor;
                if (!ctor || !ctor.options || !ctor.options.isVuetifulItem) {
                    return;
                }

                const id = item.componentOptions.propsData.id ?? item.key ?? 'itemAutoIndex_' + index++;

                if (typeof this.iamItemStates[id] === 'undefined') {
                    this.iamItemStates[id] = Vue.observable(this.defaultItemState());
                }

                item.componentOptions.propsData.id = id;
                item.data.key = id;
                item.key = id;

                items.push({
                    id,
                    data: this.iamItemStates[id],
                    label: item.componentOptions.propsData.label,
                    vNode: item
                });
            });

            return items;
        }
    }
};
