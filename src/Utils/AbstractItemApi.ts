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
 * Last modified: 2020.11.23 at 01:15
 */

import {forEach, PlainObject} from '@labor-digital/helferlein';
import {Vue} from 'vue-property-decorator';
import {ReactiveMap} from './ReactiveMap';
import {ReactiveSet} from './ReactiveSet';

export abstract class AbstractItemApi
{
    protected state: PlainObject;

    protected constructor()
    {
        const that = this;
        this.state = new Vue({
            data()
            {
                const itemSet = new ReactiveSet<string>();
                const itemMap = new ReactiveMap<string, PlainObject>();
                const data = {itemSet, itemMap};

                forEach(that.defineFlagLists(), (property: string) => {
                    data['dynamicFlagList_' + property] = function () {
                        const set = new ReactiveSet();
                        forEach(itemSet, (id) => {
                            if (itemMap.get(id)![property] === true) {
                                set.add(id);
                            }
                        });
                    };
                });

                return data;
            }
        });
    }

    /**
     * Returns a unique id that combines the given "itemId" with the id of the local "parent" element
     * @protected
     */
    public makeItemId(itemId: string): string
    {
        const parent = (this as any).parent ?? {};
        const baseId = parent.id ?? parent.identifier ?? 'vu-root-parent-';
        return baseId + '-' + itemId;
    }

    /**
     * Registers a new item instance to the state
     * @param id
     * @param instance
     */
    public registerInstance(id: string, instance: PlainObject): void
    {
        this.state.itemSet.add(id);
        this.state.itemMap.set(id, instance);
    }

    /**
     * Removes a previously registered instance from the state
     * @param id
     */
    public removeInstance(id: string)
    {
        this.state.itemSet.delete(id);
        this.state.itemMap.delete(id);
    }

    /**
     * Returns the (potentially unsorted) map of item instances by their id
     * @protected
     */
    protected get itemMap(): ReactiveMap<string, PlainObject>
    {
        return this.state.itemMap;
    }

    /**
     * Returns the ordered set of item ids
     * @protected
     */
    protected get itemSet(): ReactiveSet<string>
    {
        return this.state.itemSet;
    }

    /**
     * Allows access to a list of computed item properties
     * @param property
     * @protected
     */
    protected getListOf(property: string): ReactiveSet<any>
    {
        return this.state['dynamicPropertyList_' + property];
    }

    /**
     * Designed to be overwritten by the implementation.
     * It allows you to define a list of BOOLEAN Properties on the registered children
     * that should be tracked. This allows you to create lists of "disabled" or "open" items
     * that are completely responsive with ease.
     *
     * @protected
     */
    protected defineFlagLists(): Array<string>
    {
        return [];
    }
}
