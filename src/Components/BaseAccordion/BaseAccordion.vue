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
    <dl class="accordion" :key="'ba_' + _uid">
        <!-- @todo remove the :id in the next major release -> we provide them as refs instead -->
        <div
            :id="'ba_' + _uid + '-' + item.id"

            :ref="'item_' + item.id"
            v-for="item in preparedItems"
            class="accordion__container"
            :class="{...givenContainerClasses, 'accordion__container--open': item.open}">

            <dt @click="onClickToggle(item)"
                class="accordion__label"
                :class="{
                // @deprecated accordion__label--active will be removed together with accordion__label--open
                // you should use 'accordion__container--open' on the container instead!
                'accordion__label--active': item.open,
                'accordion__label--open': item.open,
            }">

                <!-- @slot Used to add additional elements before the label -->
                <slot name="beforeLabel"/>

                <!-- @slot Default label slot for your elements. As default the label from the given items will be used -->
                <slot name="label" :label="item.label">{{ item.label }}</slot>

                <!-- @slot Used to add additional elements after the label -->
                <slot name="afterLabel"/>
            </dt>

            <transition
                name="accordion"
                @enter="onBeforeTransition($event, true)"
                @after-enter="onAfterTransition($event, true)"
                @before-leave="onBeforeTransition($event, false)"
                @after-leave="onAfterTransition($event, false)">

                <dd v-show="item.open"
                    class="accordion__item"
                    :class="{
                    // @deprecated accordion__item--active will be removed together with accordion__item--open
                    // you should use 'accordion__container--open' on the container instead!
                    'accordion__item--active': item.open,
                    'accordion__item--open': item.open
                }">

                    <!-- @slot Used to add additional elements before the content -->
                    <slot name="beforeContent"/>
                    <!-- @slot Default item slot for your elements -->
                    <slot :name="item.label" v-if="!useItems"></slot>
                    <ItemContentRenderer :vnode="item.vNode" v-else/>

                    <!-- @slot Used to add additional elements after the content -->
                    <slot name="afterContent"/>
                </dd>
            </transition>
        </div>
    </dl>
</template>

<script lang="ts">
import {PlainObject} from '@labor-digital/helferlein/lib/Interfaces/PlainObject';
import {forEach} from '@labor-digital/helferlein/lib/Lists/forEach';
import {map} from '@labor-digital/helferlein/lib/Lists/map';
import {isArray} from '@labor-digital/helferlein/lib/Types/isArray';
import {isEmpty} from '@labor-digital/helferlein/lib/Types/isEmpty';
import {isPlainObject} from '@labor-digital/helferlein/lib/Types/isPlainObject';
import {isString} from '@labor-digital/helferlein/lib/Types/isString';
import {isUndefined} from '@labor-digital/helferlein/lib/Types/isUndefined';
import Vue from 'vue';
import ItemAwareMixin, {ItemDefinition} from '../Utils/Item/ItemAwareMixin';
import ItemContentRenderer from '../Utils/Item/ItemContentRenderer.vue';

export default {
    name: 'BaseAccordion',
    components: {ItemContentRenderer},
    mixins: [ItemAwareMixin],
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
         * @todo in the next major version this should only be allowed to receive an object to make
         * merging of the classes less painful...
         */
        containerClass: [String, Object],

        /**
         * If this is set to true the component expects the new, "item" sub-component based definition
         * @todo remove this in the next major release and make it the new default
         */
        useItems: {
            type: Boolean,
            default: false
        },

        /**
         * Add custom classes if necessary to the accordion container.
         * @deprecated use "containerClass" instead!
         */
        classes: [String, Object],

        /**
         * The list of items that should be used. The items are also the name
         * for the looped slots in which you can put your content in.
         * @deprecated You should migrate to the new "use-item" variant. This will be removed in the next major version
         */
        items: {
            type: Array,
            default: () => []
        },

        /**
         * If index of the element given it opens the accordion. Use open.sync to get the value back if needed.
         * The component will listen to changes of the prop. If openMultiple is true you can give an array of indexes to open multiple
         * @deprecated This will not work with "use-items" and will be removed in the next major release
         * please use the "openItem()" method we provide as public api
         */
        open: [Number, Array],

        /**
         * If "items" contains an array of objects, this prop is used to select the object's property
         * which should be used as a label.
         * @deprecated You should migrate to the new "use-item" variant. This will be removed in the next major version
         */
        itemLabel: String
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
         * Returns the list of items that have been found using either the items prop, or the items child objects
         */
        preparedItems(): Array<ItemDefinition>
        {

            let items = [];

            if (this.useItems) {
                items = this.resolveItemList();
            } else {

                // Legacy support
                forEach(this.items, (item, index) => {
                    items[index] = {
                        id: index,
                        label: item.label ?? item[this.itemLabel] ?? item
                    };
                });

            }

            return Vue.observable(
                map(items, (item) => {
                    item.open = false;
                    return item;
                })
            );
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
            if (isUndefined(closeOthers)) {
                closeOthers = !this.openMultiple;
            }
            forEach(this.preparedItems, item => {
                if (item.id === id) {
                    if (!item.open) {
                        item.open = true;
                        this.$emit('open', item.id);
                    }

                    // Break if we should not close the other tabs
                    if (closeOthers === false) {
                        return false;
                    }
                } else if (closeOthers !== false && item.open) {
                    item.open = false;
                    this.$emit('close', item.id);
                }
            });
        },

        /**
         * Allows you to close the item with the given id programmatically
         * @public
         */
        closeItem(id: number | string): void
        {
            forEach(this.preparedItems, item => {
                if (item.id === id) {
                    if (item.open) {
                        item.open = false;
                        this.$emit('close', item.id);
                    }
                    return false;
                }
            });
        },

        /**
         * Closes all currently open items
         * @public
         */
        closeAllItems(): void
        {
            forEach(this.preparedItems, item => {
                if (item.open) {
                    item.open = false;
                    this.$emit('close', item.id);
                }
            });
        },

        /**
         * Opens the first item, or all items if openMultiple is set to true
         * @public
         */
        openAllItems(): void
        {
            forEach(this.preparedItems, item => {
                if (!item.open) {
                    item.open = true;
                    this.$emit('open', item.id);
                }
                if (!this.openMultiple) {
                    return false;
                }
            });
        },

        /**
         * Event handler when the label of an item was clicked
         * @param item
         */
        onClickToggle(item: PlainObject)
        {
            if (!item.open) {
                this.openItem(item.id, !this.openMultiple);
                // @deprecated use "open" instead! The event will be removed in the next major release
                this.$emit('update:open', item.id);
            } else {
                this.closeItem(item.id);
            }
        },

        /**
         * Triggered when the vue transition of a single item container is started
         * @param el the html element that gets transitioned
         * @param open True if the element gets opened or false if it gets closed
         */
        onBeforeTransition(el: HTMLElement, open: boolean): void
        {
            el.style.height = el.scrollHeight + 'px';
            this.$emit((
                           open ? 'open' : 'close'
                       ) + ':transition:start', el);
        },

        /**
         * Triggered when the vue transition of a single item container was finished
         * @param el the html element that was transitioned
         * @param open True if the element was opened or false if it was closed
         */
        onAfterTransition(el: HTMLElement, open: boolean): void
        {
            el.style.height = '';
            this.$emit((
                           open ? 'open' : 'close'
                       ) + ':transition:end', el);
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
            forEach(this.preparedItems, item => {
                item.open = isOpenArray ? this.open.includes(item.id) : this.open === item.id;
            });
        }
    },
    mounted()
    {
        this.onChangeOpen();
    },
    watch: {
        open()
        {
            this.onChangeOpen();
        }
    }
};
</script>

<style scoped lang="sass" src="./BaseAccordion.sass"></style>

