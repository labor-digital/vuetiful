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
  - Last modified: 2020.12.04 at 18:54
  -->

<template>
    <component :is="tag"
               v-if="useDefaultLink"
               class="vuLinkTag"
               :class="classes"
               :href="link"
               v-bind="attributes"
               v-on="listeners">
        <slot/>
    </component>
    <nuxt-link class="vuLinkTag"
               v-else-if="useNuxtLink"
               :class="classes"
               :tag="tag"
               :to="link"
               v-bind="attributes"
               v-on="listeners">
        <slot/>
    </nuxt-link>
    <router-link
        class="vuLinkTag"
        v-else
        :class="classes"
        :tag="tag"
        :to="link"
        v-bind="attributes"
        v-on="listeners">
        <slot/>
    </router-link>
</template>

<script lang="ts">

import {escapeRegex, forEach, isUndefined, PlainObject, validateEmail} from '@labor-digital/helferlein';
import URL from 'url-parse';
import {Component, Vue} from 'vue-property-decorator';
import {VuLinkTagType} from './VuLinkTag.interfaces';
import VuLinkTagAbstract from './VuLinkTagAbstract.vue';

let canUseVueRouterLink: boolean = null;
let canUseNuxtLink: boolean = null;

@Component({
    name: 'VuLinkTagTemplate'
})
export default class VuLinkTagTemplate extends Vue
{

    get p(): VuLinkTagAbstract
    {
        return this.$parent as any;
    }

    get tag(): string | object
    {
        return this.p.tagFilter(this.p.tag);
    }

    get useDefaultLink(): boolean
    {
        return !canUseVueRouterLink || this.type !== 'internal';
    }

    get useNuxtLink(): boolean
    {
        return canUseNuxtLink;
    }

    /**
     * Tires to find the correct type of the link if "auto" is selected as type
     */
    get type(): VuLinkTagType
    {
        const p = this.p;
        const link = p.link;
        const type = p.type;

        if (type !== 'auto') {
            return type;
        }

        // PHONE
        if (link.match(/[^0-9\s+\-/():]/) === null && link.length >= 8) {
            return 'phone';
        }

        // E-MAIL
        if (validateEmail(link)) {
            return 'mail';
        }

        // EXTERNAL or INTERNAL
        return p.externalTypeFilter(link, canUseVueRouterLink) ? 'external' : 'internal';
    }

    /**
     * Processes the href/link attribute based on the type of the given link
     */
    get link(): string
    {
        return this.p.linkFilter((() => {
            if (this.p.disabled) {
                return '#';
            }

            const link = this.p.link;
            switch (this.type) {
                case 'mail':
                    return '#open-email-client';
                case 'phone':
                    let number = link;
                    forEach(this.p.phoneIntlMap, (v, k) => {
                        if (number.indexOf(k + '') === 0) {
                            number = number.replace(new RegExp('^' + k + ''), v);
                            return false;
                        }
                    });
                    return 'tel:' + number;
                case 'internal':
                    const url = new URL(link);
                    const pattern = new RegExp('^' + escapeRegex(url.protocol + '//' + url.host));
                    return link.replace(pattern, '');
                case 'external':
                    if (link.match(/^https?:/) === null) {
                        return 'http://' + link;
                    }
                    return link;
                default:
                    return link;
            }
        })());
    }

    /**
     * The list of generated css classes for this link
     */
    get classes(): PlainObject<boolean>
    {
        return {
            'vuLinkTag--disabled': this.p.disabled,
            ['vuLinkTag--' + this.type]: true
        };
    }

    /**
     * The list of required event handlers on the button component
     */
    get listeners(): PlainObject
    {
        const listeners: PlainObject = {};
        if (this.p.disabled) {
            listeners.click = this.onNoopClick;
        } else {
            switch (this.type) {
                case 'js':
                    listeners.click = this.onClick;
                    break;
                case 'mail':
                    listeners.click = this.onMailClick;
                    break;
            }
        }
        return listeners;
    }

    /**
     * The list of required html attributes to add to the button node
     */
    get attributes(): PlainObject
    {
        const attr: PlainObject = {};
        if (this.type === 'external') {
            attr.target = '_blank';
            attr.rel = 'noopener,noreferrer';
        }
        if (this.p.disabled) {
            attr.disabled = true;
            attr['aria-disabled'] = true;
        }
        return attr;
    }

    onClick(e: MouseEvent)
    {
        e.preventDefault();
        this.$emit('click', e);
    }

    onNoopClick(e: MouseEvent)
    {
        e.preventDefault();
        e.stopPropagation();
    }

    onMailClick(e: MouseEvent)
    {
        e.preventDefault();
        window.location.href = 'mailto:' + this.p.link;
    }

    public created()
    {
        // Only check for those once per creation
        if (canUseVueRouterLink === null) {
            canUseVueRouterLink = !isUndefined((this as any).$router);
            canUseNuxtLink = !isUndefined((this as any).$nuxt);
        }
    }

};
</script>
