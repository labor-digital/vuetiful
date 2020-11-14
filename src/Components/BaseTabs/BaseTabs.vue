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
  - Last modified: 2020.07.01 at 10:22
  -->

<template>
    <div class="tabs" :id="identifier">
        <!-- @todo remove tabs__titleContainer class -->
        <div role="tablist" class="tabs__labels tabs__titleContainer">

            <!-- @todo this should be an ul > li construct -> aria -->
            <div v-for="item in renderItems"
                 role="presentation"
                 class="tabs__label"
                 :class="makeLabelClasses(item)"
                 @click="onClickTabLabel(item.id)"
                 ref="titles">

                <!-- @slot a wrapper around the whole label link tag -->
                <slot name="labelWrap" :item="item">

                    <!-- aria support | NOTE: Yeah it's a link now, if I broke your code, I'm sorry -->
                    <a href="#"
                       :id="makeItemElementId(item) + '_label'"
                       @click.prevent
                       role="tab"
                       :tabindex="selectedItem === item.id ? null : -1"
                       :aria-setsize="registeredItems.size"
                       :aria-posinset="item.index + 1"
                       :aria-selected="selectedItem === item.id ? 'true' : 'false'"
                       :aria-disabled="disabledItems.has(item.id) ? 'true' : 'false'"
                       :aria-controls="makeItemElementId(item)"
                       @keyup="onKeyUp"
                       :ref="'link_' + item.id"
                    >

                        <!-- @slot Used to add additional elements before the label -->
                        <slot name="beforeLabel" :item="item"/>

                        <!-- @todo it seems wrong that ":label" gets item here... -->
                        <!-- @slot Default label slot for your elements. As default the label from the given items will be used -->
                        <slot name="label"
                              :item="item"
                              :label="item">
                            {{ item.label }}
                        </slot>

                        <!-- @slot Used to add additional elements after the label -->
                        <slot name="afterLabel" :item="item"/>

                    </a>
                </slot>
            </div>
        </div>

        <div class="tabs__tabs" :class="classes">
            <slot/>

            <!-- @deprecated removed in the next major release -->
            <BaseTabItem
                :class="classes"
                v-if="useLegacyItems"
                v-for="item in preparedItems"
                :key="item.id"
                :label="item.label">
                <template v-slot:beforeContent>
                    <slot name="beforeContent"/>
                </template>
                <template v-slot:afterContent>
                    <slot name="afterContent"/>
                </template>
                <slot :name="item.label">{{ item.label }}</slot>
            </BaseTabItem>
        </div>

    </div>
</template>

<script lang="ts">

import {PlainObject} from '@labor-digital/helferlein/lib/Interfaces/PlainObject';
import {forEach} from '@labor-digital/helferlein/lib/Lists/forEach';
import {getGuid} from '@labor-digital/helferlein/lib/Misc/getGuid';
import {isEmpty} from '@labor-digital/helferlein/lib/Types/isEmpty';
import {ReactiveMap} from '../../Utils/ReactiveMap';
import {ReactiveSet} from '../../Utils/ReactiveSet';
import BaseTabItem from './BaseTabItem.vue';
import {TabsApi} from './TabsApi';

interface RenderItemDefinition
{
    id: string,
    label: string,
    index: number
}

export default {
    name: 'BaseTabs',
    components: {BaseTabItem},
    provide()
    {
        return {
            tabs: new TabsApi(this)
        };
    },
    props: {
        /**
         * The list of items that should be used. The items are also the name
         * for the looped slots in which you can put your content in.
         * @deprecated You should migrate to the new child component based variant. This will be removed in the next major version
         */
        items: {
            type: Array
        },

        /**
         * If "items" contains an array of objects, this prop is used to select the object's property
         * which should be used as a label.
         * @deprecated You should migrate to the new child component based variant. This will be removed in the next major version
         */
        itemLabel: String,

        /**
         * If "items" contains an array of objects, this prop is used to select the object's property
         * which should be used for the url hash. With the hash you can open tabs directly over the url
         * @deprecated as it has no use anymore
         */
        itemHash: String,

        /**
         * Add custom classes if necessary to the tabs content container.
         * @deprecated set the classes on the child component directly
         */
        classes: String,

        /**
         * If index of the element given it opens the tab. Use open.sync to get the value back if needed.
         * The component will listen to changes of the prop.
         * @deprecated This will not work with the new child component based api and will be removed in the next major release
         * please use the "openItem()" method we provide as public api
         */
        open: {
            type: Number,
            default: 0
        }
    },
    data()
    {
        return {
            selectedItem: null,
            registeredItems: new ReactiveMap<string, string>(),
            disabledItems: new ReactiveSet<string>(),
            identifier: this.$attrs.id ?? this.$vnode.key ?? getGuid('tabs_')
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
         * Helper to convert the registered item list for the rendering process
         */
        renderItems(): Array<RenderItemDefinition>
        {
            const items = [];
            let i = 0;
            forEach(this.registeredItems, (item, key) => {
                items.push({
                    id: key,
                    label: item,
                    index: i++
                });
            });
            return items;
        },

        /**
         * The legacy item definition normalized into a simple array
         * @deprecated
         */
        preparedItems()
        {
            const items = [];
            forEach(this.items, (item, index) => {
                items[index] = {
                    id: index,
                    label: item.label ?? item[this.itemLabel] ?? item
                };
            });
            return items;
        }
    },
    methods: {
        /**
         * Sets the item with the given identifier as open
         * @param identifier
         * @public
         */
        openItem(identifier: string): void
        {
            if (this.selectedItem === identifier) {
                this.$emit('open:wasOpen', identifier);
                return;
            }

            if (this.registeredItems.has(identifier)
                && !this.disabledItems.has(identifier)) {
                this.selectedItem = identifier;

                // Try to focus the link element
                try {
                    this.$refs['link_' + identifier][0].focus();
                } catch (e) {
                }

                this.$emit('open', identifier);
                // @deprecated removed in the next major version
                this.$emit('update:open', identifier);
            }
        },

        /**
         * Allows you to programmatically open the item after the currently selected one
         * If the item is the last one in the list, nothing happens
         * @public
         */
        openNextItem(): void
        {
            let key = this.registeredItems.getAfter(this.selectedItem, true);
            while (this.disabledItems.has(key) && key !== null) {
                key = this.registeredItems.getAfter(key, true);
            }
            this.openItem(key);
        },

        /**
         * Allows you to programmatically open the item before the currently selected one
         * If the item is the first in the list, nothing happens
         * @public
         */
        openPreviousItem(): void
        {
            let key = this.registeredItems.getBefore(this.selectedItem, true);
            while (this.disabledItems.has(key) && key !== null) {
                key = this.registeredItems.getBefore(key, true);
            }
            this.openItem(key);
        },

        /**
         * Event listener to execute when a tab is clicked
         * @param identifier
         * @internal
         */
        onClickTabLabel(identifier: string): void
        {
            this.openItem(identifier);
        },

        /**
         * Handler for the keyboard steering between the tabs
         * @param e
         * @internal
         */
        onKeyUp(e): void
        {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                this.openPreviousItem();
            } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                this.openNextItem();
            }
        },

        /**
         * Helper to create the label classes for a specific item
         * @param item
         */
        makeLabelClasses(item: RenderItemDefinition): PlainObject
        {
            return {
                'tabs__label--disabled': this.disabledItems.has(item.id),
                'tabs__label--open': this.selectedItem === item.id,
                // @deprecated use --open instead
                'tabs__label--active': this.selectedItem === item.id
            };
        },

        /**
         * Generates the unique html id for an item
         */
        makeItemElementId(item: RenderItemDefinition): string
        {
            return this.identifier + '_' + item.id;
        },

        /**
         * Internal helper to force the opened tab to be in the valid range
         * @internal
         */
        forceValidValue(): void
        {
            if (this.disabledItems.has(this.selectedItem) ||
                !this.registeredItems.has(this.selectedItem)) {
                this.selectedItem = this.registeredItems.getFirst(true);
            }
        }
    },
    mounted()
    {
        this.forceValidValue();
    },
    watch: {
        open(v)
        {
            this.openInternal = v;
        }
    }
};
</script>

<style scoped lang="sass" src="./BaseTabs.sass"></style>
