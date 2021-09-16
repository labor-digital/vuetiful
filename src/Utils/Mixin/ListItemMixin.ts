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
 * Last modified: 2020.11.23 at 00:30
 */

import {escapeRegex, filter, forEach, getGuid, isArray, isEmpty, isFunction, isObject, PlainObject} from '@labor-digital/helferlein';
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';

export interface IPreparedListItem
{
    value: string | number;
    label: string;
    raw: string | number | PlainObject;
}

export interface IListItemResolver
{
    (value: string | number | undefined): Promise<Array<string | PlainObject>>;
}

@Component
export class ListItemMixin extends Vue
{
    /**
     * Determines the property to use as "label" when an array of objects is passed
     */
    @Prop({type: String, default: 'label'})
    readonly labelKey!: string;

    /**
     * Determines the property to use as "value" when an array of objects is passed
     */
    @Prop({type: String, default: 'value'})
    readonly valueKey!: string;

    /**
     * Defines the item list that should be used
     */
    @Prop({type: Array, default: () => []})
    readonly listItems!: Array<string | PlainObject>;

    /**
     * You can use this resolver function INSTEAD OF listItems to fetch items dynamically
     * based on the current input
     */
    @Prop({type: Function, default: null})
    readonly listItemResolver!: IListItemResolver | null;

    /**
     * A cached list of resolved items returned by the listItemResolver
     * @protected
     * @internal
     */
    protected limResolverItems: Array<string | PlainObject> | null = null;

    /**
     * A unique resolver id to debounce resolver requests
     * @protected
     * @internal
     */
    protected limResolverId: string = '';

    /**
     * True while the list item resolver waits for it's result
     * @protected
     * @internal
     */
    protected limWaitingForResolver: boolean = false;

    /**
     * Returns true if the class is currently waiting for the resolver
     * @api
     */
    public get isWaitingForResolver(): boolean
    {
        return this.limWaitingForResolver;
    }

    /**
     * Returns the list of items that have been parsed from listItems.
     * This list always contains objects with both value and label no matter the input type
     * @api
     */
    public get preparedListItems(): Array<IPreparedListItem>
    {
        const items: Array<IPreparedListItem> = [];
        const resolvedItems = isArray(this.limResolverItems)
            ? this.limResolverItems
            : this.listItems;
        forEach(resolvedItems, item => {
            if (!isObject(item)) {
                items.push({
                    value: item,
                    label: item + '',
                    raw: item
                });
            } else {
                items.push({
                    value: item[this.valueKey] ?? item,
                    label: item[this.labelKey] ?? item + '',
                    raw: item
                });
            }
        });
        return items;
    }

    /**
     * Helper to filter a list of items for a given value.
     * This is designed to filter the LABELS of the items and not their value.
     *
     * @param items The items to filter
     * @param value The value to filter their label by
     * @todo We could add a bit of regex magic here to replace the match with <strong>match</strong>. We would need html encode, tho.
     * @protected
     */
    protected applyValueFilter(
        items: Array<IPreparedListItem>,
        value: string | number | undefined
    ): Array<IPreparedListItem>
    {
        const prepared = (
            value + ''
        ).trim();

        if (prepared === '') {
            return items;
        }

        const regex = new RegExp(escapeRegex(prepared), 'ig');
        return filter(items, item => {
            // No exact matches -> This "feels" wrong
            if (item.label === value) {
                return false;
            }
            return regex.test(item.label);
        });
    }

    /**
     * Helper to be implemented in your element containing list items.
     * It should be placed where the value was updated, so the resolver can fetch new typeahead results
     *
     * @param value The value to pass to the list item resolver
     * @protected
     * @api
     */
    protected triggerListItemResolver(value: string | number | undefined): Promise<void>
    {
        if (isFunction(this.listItemResolver) && !isEmpty(value)) {
            this.$emit('resolve');
            const localId = getGuid() + '';
            this.limResolverId = localId;

            this.limWaitingForResolver = true;
            return this.listItemResolver(value).then(list => {
                if (localId + '' === this.limResolverId + '') {
                    this.$emit('resolveDone');
                    this.limResolverItems = list;
                    this.limWaitingForResolver = false;
                }
            }).catch((err) => {
                this.limWaitingForResolver = false;
                console.error('Vuetiful list item resolver failed!', err);
            });
        } else {
            this.resetListItemResolver();
        }

        // Nothing to do, go on :)
        return Promise.resolve();
    }

    /**
     * Resets the list item resolver to the initial state
     * @protected
     */
    protected resetListItemResolver(): void
    {
        this.limWaitingForResolver = false;
        this.limResolverId = '';
        this.limResolverItems = null;
    }

    /**
     * Reset all resolver data when the prop was changed
     * @protected
     */
    @Watch('listItemResolver')
    protected onListItemResolverChange()
    {
        this.resetListItemResolver();
    }
}
