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
import {Component, Inject, Prop, Vue} from 'vue-property-decorator';
import {resolveId} from '../../../../Utils/resolveId';
import viewFactory from '../../../../Utils/viewFactory';
import {VuDropdownApi} from '../VuDropdownApi';
import VuDropdownItemTemplate from './VuDropdownItemTemplate.vue';

@Component({
    name: 'VuDropdownItem',
    components: {
        VuView: viewFactory(VuDropdownItemTemplate)
    }
})
export default class VuDropdownItemAbstract extends Vue
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
     * If set to true the item will be shown as disabled
     */
    @Prop({type: Boolean, default: false})
    readonly disabled: boolean;

    /**
     * The unique id of this element
     */
    public id = '';

    public created()
    {
        this.id = this.api.makeItemId(resolveId(this));
        this.api.registerInstance(this.id, this);
    }

    public beforeDestroy()
    {
        this.api.removeInstance(this.id);
    }
}
</script>
