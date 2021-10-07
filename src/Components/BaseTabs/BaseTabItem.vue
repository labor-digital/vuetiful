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
  - Last modified: 2020.11.11 at 21:45
  -->

<template>
    <!-- @todo remove tabs__item class -->
    <div class="tabItem tabs__item"
         :id="elementId"
         :aria-labelledby="elementId + '_label'"
         role="tabpanel"
         :aria-hidden="isOpen ? 'false' : 'true'"
         v-show="isOpen"
         :key="elementId"
         :class="classes">

        <!-- @slot Default item slot for your elements -->
        <slot/>
    </div>
</template>

<script lang="ts">
import {getGuid, PlainObject} from '@labor-digital/helferlein';
import Vue from 'vue';
import {TabsApi} from './TabsApi';

export default {
    name: 'BaseTabItem',
    inject: {
        tabs: {
            from: 'tabs',
            default: null
        } as unknown as TabsApi
    },
    props: {
        /**
         * A label for this tab
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
            identifier: this.$attrs.id ?? this.$vnode.key ?? getGuid('tabItem_')
        };
    },
    computed: {
        /**
         * Returns the api instance
         */
        api(): TabsApi
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
                'tabItem--open': this.isOpen,
                // @deprecated use --open instead!
                'tabs__item--active': this.isOpen
            };
        }
    },
    mounted()
    {
        if (this.api === null) {
            throw new Error('You have to place the tab items inside a tabs element!');
        }
        this.api.registerItem(this.identifier, Vue.observable(this.label), this.disabled);
    },
    beforeDestroy()
    {
        this.api.removeItem(this.identifier);
    },
    watch: {
        disabled(n)
        {
            this.api.updateItem(this.identifier, n, this.label);
        },
        label(n)
        {
            this.api.updateItem(this.identifier, this.disabled, n);
        }
    }
};
</script>

<style scoped lang="sass"></style>
