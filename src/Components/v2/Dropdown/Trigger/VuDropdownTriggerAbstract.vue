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
  - Last modified: 2020.11.23 at 11:20
  -->

<template></template>

<script lang="ts">
import {Component, Inject, Prop, Vue} from 'vue-property-decorator';
import {resolveId} from '../../../../Utils/resolveId';
import viewFactory from '../../../../Utils/viewFactory';
import {VuDropdownApi} from '../VuDropdownApi';
import VuDropdownTriggerTemplate from './VuDropdownTriggerTemplate.vue';

@Component({
    name: 'VuDropdownTrigger',
    components: {
        VuView: viewFactory(VuDropdownTriggerTemplate)
    }
})
export default class VuDropdownTriggerAbstract extends Vue
{
    @Inject({from: 'dropdownApi'})
    readonly api: VuDropdownApi;

    /**
     * The html tag to render for this trigger
     */
    @Prop({type: String, default: 'a'})
    readonly tag: string;

    /**
     * The unique id of this element
     */
    public id = '';

    /**
     * Allows you to toggle the linked value
     * @api
     */
    public toggle(): void
    {
        if (!this.api.isDisabled) {
            this.api.toggle();
        }
    }

    public created()
    {
        this.id = this.api.makeItemId(resolveId(this));
        this.api.setTriggerId(this.id);
    }

    public beforeDestroy()
    {
        this.api.setTriggerId('');
    }
}
</script>
