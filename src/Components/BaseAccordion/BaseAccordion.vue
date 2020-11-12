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
  - Last modified: 2020.06.26 at 11:40
  -->

<template>
    <!-- @todo Remove the :key in the next major release -> This should not be required-->
    <!-- @todo this should be a simple div element-->
    <dl class="accordion" :key="'ba_' + _uid" :id="identifier">
        <slot/>

        <!-- @deprecated removed in the next major release -->
        <BaseAccordionItem
            v-if="useLegacyItems"
            v-for="label in legacyItems"
            :key="label"
            :label="label">
            <slot :name="label"/>
        </BaseAccordionItem>

    </dl>
</template>

<script lang="ts">
import {PlainObject} from '@labor-digital/helferlein/lib/Interfaces/PlainObject';
import {forEach} from '@labor-digital/helferlein/lib/Lists/forEach';
import {getGuid} from '@labor-digital/helferlein/lib/Misc/getGuid';
import {isArray} from '@labor-digital/helferlein/lib/Types/isArray';
import {isEmpty} from '@labor-digital/helferlein/lib/Types/isEmpty';
import {isPlainObject} from '@labor-digital/helferlein/lib/Types/isPlainObject';
import {isString} from '@labor-digital/helferlein/lib/Types/isString';
import {ReactiveSet} from '../../Utils/ReactiveSet';
import {AccordionApi} from './AccordionApi';
import BaseAccordionItem from './BaseAccordionItem.vue';

export default {
    name: 'BaseAccordion',
    components: {BaseAccordionItem},
    provide()
    {
        return {
            accordion: new AccordionApi(this)
        };
    },
    props: {
        /**
         * Set this to true if you want to open multiple accordion entries at the same time
         * without closing the other ones.
         */
        openMultiple: {
            type: Boolean,
            default: false
        },

        /**
         * Allows you to add additional css classes to the accordion container.
         * @deprecated set the classes on the child component directly
         */
        containerClass: [String, Object],

        /**
         * Add custom classes if necessary to the accordion container.
         * @deprecated set the classes on the child component directly
         */
        classes: [String, Object],

        /**
         * The list of items that should be used. The items are also the name
         * for the looped slots in which you can put your content in.
         * @deprecated You should migrate to the new child component based variant. This will be removed in the next major version
         */
        items: {
            type: Array,
            default: () => []
        },

        /**
         * If index of the element given it opens the accordion. Use open.sync to get the value back if needed.
         * The component will listen to changes of the prop. If openMultiple is true you can give an array of indexes to open multiple
         * @deprecated This will not work with the new child component based api and will be removed in the next major release
         * please use the "openItem()" method we provide as public api
         */
        open: [Number, Array],

        /**
         * If "items" contains an array of objects, this prop is used to select the object's property
         * which should be used as a label.
         * @deprecated You should migrate to the new child component based variant. This will be removed in the next major version
         */
        itemLabel: String
    },
    data()
    {
        return {
            registeredItems: new ReactiveSet<string>(),
            disabledItems: new ReactiveSet<string>(),
            openItems: new ReactiveSet<string>(),
            identifier: this.$attrs.id ?? this.$vnode.key ?? getGuid('accordion_')
        };
    },
    computed: {
        /**
         * Contains all prepared given classes for the container.
         * Both the legacy "classes" and the "containerClass" props are combined into a single plain object.
         */
        givenContainerClasses(): PlainObject
        {
            const classes = {};
            forEach([this.classes, this.containerClass], list => {
                let givenClasses = list ?? {};
                if (isString(givenClasses)) {
                    forEach(givenClasses.split(' '), part => {
                        if (!isEmpty(part)) {
                            classes[part] = true;
                        }
                    });
                } else if (isPlainObject(givenClasses)) {
                    forEach(givenClasses, (v, k) => {
                        classes[k] = !!(
                            v
                        );
                    });
                }
            });
            return classes;
        },

        /**
         * True if we should use the legacy item definition instead of using child components
         * @deprecated only here to support the legacy mode
         */
        useLegacyItems(): boolean
        {
            return isEmpty(this.$slots.default);
        },

        /**
         * The legacy item definition normalized into a simple array
         * @deprecated
         */
        legacyItems(): Array<String>
        {
            let items = [];
            forEach(this.items, item => {
                items.push(item.label ?? item[this.itemLabel] ?? item);
            });
            return items;
        }

    },
    methods: {
        /**
         * Allows you to open a single accordion element with a given id
         * @param id The id of the element to open
         * @param closeOthers By default all other items will be closed if you open a new one
         * (except if you are using openMultiple!). If you set this to false all currently opened items stay open.
         * @public
         */
        openItem(id: number | string, closeOthers?: boolean): void
        {
            if (!this.registeredItems.has(id) || this.openItems.has(id) || this.disabledItems.has(id)) {
                return;
            }

            if (closeOthers ?? !this.openMultiple) {
                this.openItems.clear();
            }

            this.openItems.add(id);
            this.$emit('open', id);
        },

        /**
         * Allows you to close the item with the given id programmatically
         * @public
         */
        closeItem(id: number | string): void
        {
            if (!this.registeredItems.has(id) || !this.openItems.has(id)) {
                return;
            }
            this.openItems.delete(id);
            this.$emit('close', id);
        },

        /**
         * Closes all currently open items
         * @public
         */
        closeAllItems(): void
        {
            forEach(this.openItems, (item) => this.closeItem(item));
        },

        /**
         * Opens the first item, or all items if openMultiple is set to true
         * @public
         */
        openAllItems(): void
        {
            if (this.openMultiple) {
                forEach(this.registeredItems, (item) => this.openItem(item));
            } else {
                this.openItem(this.registeredItems.getFirst());
            }
        },

        /**
         * @deprecated will be removed in next major version
         */
        onChangeOpen()
        {
            const isOpenArray = isArray(this.open);
            if (isOpenArray && !this.openMultiple) {
                return;
            }
            forEach(this.registeredItems, (item) => {
                if (isOpenArray ? this.open.includes(item) : this.open === item) {
                    this.openItems.add(item);
                } else {
                    this.openItems.delete(item);
                }
            });
        },

        /**
         * Internal helper to force the opened tab to be in the valid range
         * @internal
         */
        forceValidValue(): void
        {
            let openCountLimit = this.openMultiple ? 9999 : 1;
            let openCount = 0;
            forEach(this.openItems, id => {
                if (this.disabledItems.has(id)) {
                    this.closeItem(id);
                    return;
                }

                if (++openCount > openCountLimit) {
                    this.closeItem(id);
                }
            });
        }
    },
    mounted()
    {
        this.onChangeOpen();
        this.forceValidValue();
    },
    watch: {
        open()
        {
            this.onChangeOpen();
        },
        openMultiple()
        {
            this.forceValidValue();
        }
    }
};
</script>

<style lang="sass" src="./BaseAccordion.sass"></style>

