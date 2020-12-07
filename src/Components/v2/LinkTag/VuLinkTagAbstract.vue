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

<template></template>

<script lang="ts">
import {isBrowser, PlainObject} from '@labor-digital/helferlein';
import URL from 'url-parse';
import {Component, Prop, Vue} from 'vue-property-decorator';
import templateFactory from '../../../Utils/templateFactory';
import {VuLinkTagType} from './VuLinkTag.interfaces';
import VuLinkTagTemplate from './VuLinkTagTemplate.vue';

@Component({
    name: 'VuLinkTagAbstract',
    components: {
        VuTemplate: templateFactory(VuLinkTagTemplate)
    }
})
export default class VuLinkTagAbstract extends Vue
{

    /**
     * Defines the forced type of the button to render
     * Values are:
     *  - "auto" automatically select the type based on the given link prop
     *  - "external" always open the link in a new window
     *  - "phone" always handle the link as a phone number
     *  - "js" emits a vue event "click" when the button was clicked, but does nothing else
     *  - "mail" executes a "mailto:" to the given "link"
     *  - any custom type which might by implemented by your wrapper component
     */
    @Prop({type: String, default: 'auto'})
    readonly type: VuLinkTagType;

    /**
     * Defines which link tag should be generated
     * Can be either a html tag, or a component definition
     */
    @Prop({type: [String, Object], default: 'a'})
    readonly tag: string | object;

    /**
     * If set to true the link will not do anything
     */
    @Prop({type: Boolean, default: false})
    readonly disabled: boolean;

    /**
     * The link to open when a user clicks on this element
     */
    @Prop({type: String, default: ''})
    readonly link: string;

    /**
     * Allows you to provide a map of a phone number prefix "key" that should be converted into an
     * international prefix "value"
     */
    @Prop({type: Object, default: () => ({'0': '+49'})})
    readonly phoneIntlMap: PlainObject<string>;

    /**
     * Allows you tou change the tag based on your own, custom props
     * @api Designed to be overwritten by the implementing component.
     * @param tag
     */
    public tagFilter(tag: string | object): string | object
    {
        return tag;
    }

    /**
     * Allows you to modify the link with your custom filter
     * @api Designed to be overwritten by the implementing component.
     * @param link
     */
    public linkFilter(link: string): string
    {
        return link;
    }

    /**
     * Allows you to modify the logic that determines if a url should be handled as "external" or not.
     * @api Designed to be overwritten by the implementing component.
     * @param link The link to check the status for
     * @param canUseVueRouterLink True if the vue router can be used
     */
    public externalTypeFilter(link: string, canUseVueRouterLink: boolean): boolean
    {
        const baseUrl =
            canUseVueRouterLink ?
                new URL((this as any).$route.fullPath)
                : new URL(process.env.baseUrl ??
                          isBrowser() ? window.location.origin : 'https://localhost');
        return (new URL(link)).host !== baseUrl.host;
    }
}
</script>
