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
import {forEach} from '@labor-digital/helferlein/lib/Lists/forEach';
import {isEmpty} from '@labor-digital/helferlein/lib/Types/isEmpty';
import Vue, {VNode} from 'vue';

export interface ItemDefinition
{
    id: number,
    label: string,
    vNode: VNode
}

export default {
    methods: {
        /**
         * Returns an array either of the scoped slots or the default slots
         * @param context
         * @param slotProps
         */
        normalizeVueChildren(context, slotProps = {})
        {
            if (context.$scopedSlots.default) {
                return context.$scopedSlots.default(slotProps) || [];
            }

            return context.$slots.default || [];
        },
        /**
         * Resolves the list of item elements inside the parent that uses this mixin
         * @param asObservable If set to true the list will be returned as vue observable object
         */
        resolveItemList(asObservable?: boolean): Array<ItemDefinition>
        {
            const items: Array<ItemDefinition> = [];
            let index = 0;
            forEach(this.normalizeVueChildren(this), item => {
                const ctor = item.componentOptions && item.componentOptions.Ctor;
                if (!ctor || !ctor.options || !ctor.options.isVuetifulItem) {
                    return;
                }

                let id;
                if (!isEmpty(item.componentOptions.propsData.id)) {
                    id = item.componentOptions.propsData.id;
                } else if (!isEmpty(item.data.key)) {
                    id = item.data.key;
                } else if (!isEmpty(item.key)) {
                    id = item.key;
                } else {
                    id = 'itemAutoIndex_' + index++;
                }

                item.componentOptions.propsData.id = id;
                item.data.key = id;
                item.key = id;
                item.data.props = {
                    ...(
                        item.data.props || {}
                    ),
                    isClone: false,
                    id
                };

                items.push({
                    id,
                    label: item.componentOptions.propsData.label,
                    vNode: item
                });
            });

            if (asObservable) {
                return Vue.observable(items);
            }
            return items;
        }
    }
};
