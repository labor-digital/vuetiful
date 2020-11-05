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
    <dl class="accordion" :key="'ba_' + _uid">
        <div v-for="item in preparedItems" :id="'ba_' + _uid + '-' + item.id"
             class="accordion__container"
             :class="classes">

            <dt @click="onClickToggle(item)"
                class="accordion__label"
                :class="{
                // @deprecated accordion__label--active will be removed in favour of accordion__label--open
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
                @enter="startTransition"
                @after-enter="endTransition"
                @before-leave="startTransition"
                @after-leave="endTransition">

                <dd v-show="item.open"
                    class="accordion__item"
                    :class="{
                    // @deprecated accordion__item--active will be removed in favour of accordion__item--open
                    'accordion__item--active': item.open,
                    'accordion__item--open': item.open
                }"
                    ref="contents">

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
import {PlainObject} from "@labor-digital/helferlein/lib/Interfaces/PlainObject";
import {forEach} from "@labor-digital/helferlein/lib/Lists/forEach";
import {map} from "@labor-digital/helferlein/lib/Lists/map";
import {isArray} from "@labor-digital/helferlein/lib/Types/isArray";
import {isUndefined} from "@labor-digital/helferlein/lib/Types/isUndefined";
import Vue from "vue";
import ItemAwareMixin, {ItemDefinition} from "../Utils/Item/ItemAwareMixin";
import ItemContentRenderer from "../Utils/Item/ItemContentRenderer.vue";

export default {
    name: "BaseAccordion",
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
         * Returns the list of items that have been found using either the items prop, or the items child objects
         */
        preparedItems(): Array<ItemDefinition> {

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
        openItem(id: number | string, closeOthers?: boolean): void {
            if (isUndefined(closeOthers)) {
                closeOthers = !this.openMultiple;
            }
            forEach(this.preparedItems, item => {
                if (item.id === id) {
                    item.open = true;

                    // Break if we should not close the other tabs
                    if (closeOthers === false) {
                        return false;
                    }
                } else {
                    if (closeOthers !== false) {
                        item.open = false;
                    }
                }
            });
        },

        /**
         * Allows you to close the item with the given id programmatically
         * @public
         */
        closeItem(id: number | string): void {
            forEach(this.preparedItems, item => {
                if (item.id === id) {
                    item.open = false;
                    return false;
                }
            });
        },

        /**
         * Closes all currently open items
         * @public
         */
        closeAllItems(): void {
            forEach(this.preparedItems, item => {
                item.open = false;
            });
        },

        /**
         * Opens the first item, or all items if openMultiple is set to true
         * @public
         */
        openAllItems(): void {
            forEach(this.preparedItems, item => {
                item.open = true;
                if (!this.openMultiple) {
                    return false;
                }
            });
        },

        /**
         * Event handler when the label of an item was clicked
         * @param item
         */
        onClickToggle(item: PlainObject) {
            if (item.open) {
                item.open = false;
                return;
            }

            this.openItem(item.id, !this.openMultiple);

            /**
             * Emits an event with "open" and the index of the accordion
             */
            this.$emit("open", item.id);
            this.$emit("update:open", item.id);
        },

        startTransition(el) {
            el.style.height = el.scrollHeight + "px";
        },

        endTransition(el) {
            el.style.height = "";
        },

        /**
         * @deprecated will be removed in next major version
         */
        onChangeOpen() {
            const isOpenArray = isArray(this.open);
            if (isOpenArray && !this.openMultiple) return;
            forEach(this.items, item => {
                item.open = isOpenArray ? this.open.includes(item.id) : this.open === item.id;
            });
        }
    },
    mounted() {
        this.onChangeOpen();
    },
    watch: {
        open() {
            this.onChangeOpen();
        }
    }
};
</script>

<style scoped lang="sass" src="./BaseAccordion.sass"></style>

