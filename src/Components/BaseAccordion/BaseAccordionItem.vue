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
  - Last modified: 2020.11.11 at 15:11
  -->
<template>
    <div class="accordionItem"
         :id="elementId"
         :class="classes">

        <!-- @todo remove all accordion__ classes in the next major release -->
        <div
            class="accordionItem__container accordion__container"
            :class="{
            ...api.legacyContainerClasses(),
            // @deprecated you should use 'accordionItem--open' on the container instead!
            'accordion__container--open': isOpen
        }">

            <!-- @todo this should be a header element -> aria -->
            <dt @click="onToggleClick"
                class="accordionItem__labelWrap"
                :class="{
                // @deprecated accordion__label--active will be removed together with accordion__label--open
                // you should use 'accordionItem--open' on the container instead!
                'accordion__label--active': isOpen,
                'accordion__label--open': isOpen,
            }">
                <!-- @slot a wrapper around the whole label link tag -->
                <slot name="labelWrap">
                    <!-- aria support | NOTE: Yeah it's a button now, if I broke your code, I'm sorry -->
                    <button
                        class="accordionItem__label accordion__label"
                        :tabindex="disabled ? -1 : null"
                        @click.prevent
                        :id="elementId + '_label'"
                        :aria-expanded="isOpen ? 'true': 'false'"
                        :aria-controls="elementId + '_content'"
                    >
                        <!-- @slot Used to add additional elements before the label -->
                        <slot name="beforeLabel"/>

                        <!-- @slot Default label slot for your elements. As default the label from the given items will be used -->
                        <slot name="label" :label="label">{{ label }}</slot>

                        <!-- @slot Used to add additional elements after the label -->
                        <slot name="afterLabel"/>
                    </button>
                </slot>
            </dt>

            <!-- @todo move the styles (sass file) into this element -->
            <transition
                name="accordion"
                @enter="onBeforeTransition($event, true)"
                @after-enter="onAfterTransition($event, true)"
                @before-leave="onBeforeTransition($event, false)"
                @after-leave="onAfterTransition($event, false)">

                <!-- @todo this should be a section element -> aria-->
                <dd
                    v-show="isOpen"
                    class="accordion__item"
                    :id="elementId + '_content'"
                    :aria-labelledby="elementId + '_label'"
                    :class="{
                                // @deprecated accordion__item--active will be removed together with accordion__item--open
                                // you should use 'accordionItem--open' on the container instead!
                                'accordion__item--active': isOpen,
                                'accordion__item--open': isOpen
                            }">

                    <!-- @slot Used to add additional elements before the content -->
                    <slot name="beforeContent"/>

                    <!-- @slot Default item slot for your elements -->
                    <slot/>

                    <!-- @slot Used to add additional elements after the content -->
                    <slot name="afterContent"/>
                </dd>
            </transition>
        </div>
    </div>
</template>
<script lang="ts">
import {PlainObject} from '@labor-digital/helferlein/lib/Interfaces/PlainObject';
import {getGuid} from '@labor-digital/helferlein/lib/Misc/getGuid';
import {AccordionApi} from './AccordionApi';

export default {
    name: 'BaseAccordionItem',
    inject: {
        api: {
            from: 'accordion',
            default: null
        } as unknown as AccordionApi
    },
    props: {
        /**
         * A label for this item
         */
        label: {
            type: String,
            required: true,
            default: ''
        },

        /**
         * Allows you to disable this item
         */
        disabled: {
            type: Boolean,
            default: false
        }

    },
    data()
    {
        return {
            identifier: this.$attrs.id ?? this.$vnode.key ?? getGuid('accordionItem_')
        };
    },
    computed: {
        /**
         * Returns the api instance
         */
        api(): AccordionApi
        {
            return this.tabs;
        },

        /**
         * Returns true if the parent told us that we are open
         */
        isOpen(): boolean
        {
            return this.api.isOpen(this.identifier);
        },

        /**
         * The unique id for this element
         */
        elementId(): string
        {
            return this.api.id + '_' + this.identifier;
        },

        /**
         * The list of css classes for this element
         */
        classes(): PlainObject
        {
            return {
                'accordionItem--disabled': this.disabled,
                'accordionItem--open': this.isOpen
            };
        }
    },
    methods: {
        /**
         * Public api to open this accordion item
         * @public
         */
        open()
        {
            this.api.openItem(this.identifier);
        },

        /**
         * Public api to close this accordion item
         * @public
         */
        close()
        {
            this.api.closeItem(this.identifier);
        },

        /**
         * Handles a click on the action toggle to open/close the element
         */
        onToggleClick()
        {
            if (this.isOpen) {
                this.close();
            } else {
                this.open();
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
            this.api.emit((
                              open ? 'open' : 'close'
                          ) + ':transition:start', this);
        },

        /**
         * Triggered when the vue transition of a single item container was finished
         * @param el the html element that was transitioned
         * @param open True if the element was opened or false if it was closed
         */
        onAfterTransition(el: HTMLElement, open: boolean): void
        {
            el.style.height = '';
            this.api.emit((
                              open ? 'open' : 'close'
                          ) + ':transition:end', this);
        }
    },
    mounted()
    {
        if (this.api === null) {
            throw new Error('You have to place the accordion items inside a accordion element!');
        }
        this.api.registerItem(this.identifier, this, this.disabled);
    },
    beforeDestroy()
    {
        this.api.removeItem(this.identifier);
    },
    watch: {
        disabled(n)
        {
            this.api.updateItem(this.identifier, n);
        }
    }
};
</script>

<style lang="sass" src="BaseAccordionItem.sass"></style>
