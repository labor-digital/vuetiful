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
    <dl class="accordion" :key="groupId">
        <div v-for="(item, index) in preparedItems" :id="groupId + '-' + index"
             class="accordion__container"
             :class="classes">
            <dt @click="onClickToggle(index, item.hash)" class="accordion__label"
                :class="{'accordion__label--active': open[index]}"
                ref="titles">

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
                <dd v-show="open[index]"
                    class="accordion__item"
                    :class="{'accordion__item--active': open[index]}"
                    ref="contents">

                    <!-- @slot Used to add additional elements before the content -->
                    <slot name="beforeContent"/>

                    <!-- @slot Default item slot for your elements -->
                    <slot :name="item.label"></slot>

                    <!-- @slot Used to add additional elements after the content -->
                    <slot name="afterContent"/>
                </dd>
            </transition>
        </div>
    </dl>
</template>

<script lang="ts">
import {forEach} from "@labor-digital/helferlein/lib/Lists/forEach";
import {inflectToSlug} from "@labor-digital/helferlein/lib/Strings/Inflector/inflectToSlug";
import {isEmpty} from "@labor-digital/helferlein/lib/Types/isEmpty";

export default {
    name: "BaseAccordion",
    props: {

        /**
         * The list of items that should be used. The items are also the name
         * for the looped slots in which you can put your content in.
         */
        items: {
            type: Array,
            required: true
        },

        /**
         * Set this to true if you want to open multiple accordions
         * at once without closing the other ones.
         */
        openMultiple: {
            type: Boolean,
            default: false
        },

        /**
         * If "items" contains an array of objects, this prop is used to select the object's property
         * which should be used as a label.
         */
        itemLabel: String,

        /**
         * If "items" contains an array of objects, this prop is used to select the object's property
         * which should be used for the url hash. With the hash you can open accordion directly over the url
         */
        itemHash: String,

        /**
         * Add custom classes if necessary to the accordion container.
         */
        classes: String
    },
    computed: {
        preparedItems() {
            const items = [];
            forEach(this.items, (item, index) => {
                items[index] = {
                    id: index,
                    label: item.label ?? item[this.itemLabel] ?? item,
                    hash: item.hash ?? item[this.itemHash] ?? inflectToSlug(item.label ?? item[this.itemLabel] ?? item)
                };
            });
            return items;
        }
    },
    data() {
        return {
            groupId: null,
            open: []
        };
    },
    methods: {
        onClickToggle(i, hash) {
            !this.open[i] ? window.location.hash = "#" + hash : window.location.hash = "";
            if (this.openMultiple) this.openMethod(i);
        },
        openByHash() {
            if (this.openMultiple) return;
            const openID = this.preparedItems.filter(item => item.hash === window.location.hash.replace("#", ""));

            if (!isEmpty(openID)) {
                this.openMethod(openID[0].id);
            } else {
                forEach(this.open, (item, index) => {
                    this.$set(this.open, index, false);
                });
            }
        },
        openMethod(i) {
            if (this.openMultiple) {
                this.$set(this.open, i, !this.open[i]);

                /**
                 * Emits an event with "open" and the index of the accordion
                 */
                this.$emit("open", i);
            } else {
                forEach(this.open, (item, index) => {
                    if (index === i) {
                        this.$set(this.open, index, !this.open[i]);
                    } else {
                        this.$set(this.open, index, false);
                    }
                });

                /**
                 * Emits an event with "open" and the index of the accordion
                 */
                this.$emit("open", i);
            }
        },
        startTransition(el) {
            el.style.height = el.scrollHeight + "px";
        },
        endTransition(el) {
            el.style.height = "";
        }
    },
    mounted() {
        this.groupId = "ba-" + this._uid;

        forEach(this.items, (item, index) => {
            this.open[index] = false;
        });

        this.openByHash();

        window.addEventListener("hashchange", () => {
            this.openByHash();
        });
    }
};
</script>

<style scoped lang="sass" src="./BaseAccordion.sass"></style>

