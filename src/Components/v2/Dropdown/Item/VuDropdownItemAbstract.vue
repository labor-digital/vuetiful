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
  - Last modified: 2020.11.23 at 00:54
  -->

<template></template>

<script lang="ts">
import {PlainObject} from '@labor-digital/helferlein';
import {ComponentOptions} from 'vue';
import {Component, Inject, Mixins, Prop, Vue} from 'vue-property-decorator';
import {ElementIdAwareMixin} from '../../../../Utils/Mixin/ElementIdAwareMixin';
import templateFactory from '../../../../Utils/templateFactory';
import VuLinkTag from '../../LinkTag/VuLinkTag.vue';
import {VuDropdownApi} from '../VuDropdownApi';
import VuDropdownItemTemplate from './VuDropdownItemTemplate.vue';

@Component({
    name: 'VuDropdownItemAbstract',
    components: {
        VuTemplate: templateFactory(VuDropdownItemTemplate)
    }
})
export default class VuDropdownItemAbstract extends Mixins(ElementIdAwareMixin)
{
    @Inject({from: 'dropdownApi'})
    readonly api: VuDropdownApi;

    /**
     * Defines the type of element to render
     */
    @Prop({
        type: String,
        default: 'default',
        validator(value: any): boolean
        {
            return ['default', 'text', 'header', 'line'].indexOf(value) !== -1;
        }
    })
    readonly type: 'default' | 'text' | 'header' | 'line';

    /**
     * Allows you to override the VuLinkTag component which is used for the dropdown item body
     */
    @Prop({type: [Object, String], default: () => VuLinkTag})
    readonly linkComponent: ComponentOptions<Vue>;

    /**
     * Allows you to add additional props to be passed to the link component
     */
    @Prop({type: Object, default: () => ({})})
    readonly linkComponentProps: PlainObject;

    /**
     * Can be a link if you want to open a certain url when the user clicks on the item
     */
    @Prop({type: String, default: ''})
    readonly link: string;

    /**
     * If set to true the item will be shown as disabled
     */
    @Prop({type: Boolean, default: false})
    readonly disabled: boolean;

    public created()
    {
        this.id = this.api.makeItemId(this.id);
        this.api.registerInstance(this.id, this);
    }

    public beforeDestroy()
    {
        this.api.removeInstance(this.id);
    }
}
</script>

