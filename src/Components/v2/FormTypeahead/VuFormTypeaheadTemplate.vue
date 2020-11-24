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
  - Last modified: 2020.11.22 at 23:49
  -->

<template>
    <component
        :is="inputComponent"
        ref="input"
        class="vuTypeahead"
        @keyup="onKeyUp"
        @focus="onFocus"
    >
        <template v-slot:addons>
            <component
                :is="p.dropdownComponent"
                class="vuTypeahead__dropdown"
                v-model="p.dropdownOpen"
                as-block
                as-list-box
            >
                <li
                    class="vuTypeahead__dropdownLoader"
                    v-if="p.isWaitingForResolver">
                    <slot name="loader">Loading...</slot>
                </li>

                <slot name="items">
                    <component
                        :is="p.dropdownItemComponent"
                        v-for="item in p.filteredListItems"
                        :key="item.label"
                        @click.native="setValue(item.label)"
                        @keyup.native="onDropdownKeyUp($event, item.label)"
                    >
                        {{ item.label }}
                    </component>
                </slot>
            </component>
        </template>
    </component>
</template>

<script lang="ts">
import {focusNextElement, getPath, isObject} from '@labor-digital/helferlein';
import {Component, Vue} from 'vue-property-decorator';
import viewFactory from '../../../Utils/viewFactory';
import VuDropdownItem from '../Dropdown/Item/VuDropdownItem.vue';
import VuDropdown from '../Dropdown/VuDropdown.vue';
import VuFormInput from '../FormInput/VuFormInput.vue';
import VuFormTypeaheadAbstract from './VuFormTypeaheadAbstract.vue';

@Component({
    components: {VuDropdown, VuDropdownItem, VuFormInput}
})
export default class VuFormTypeaheadTemplate extends Vue
{
    get p(): VuFormTypeaheadAbstract
    {
        return this.$parent as any;
    }

    get inputComponent()
    {
        return viewFactory(this.p.inputComponent, this.p);
    }

    protected onFocus()
    {
        this.p.openDropdown();
    }

    protected onKeyUp(e: KeyboardEvent)
    {
        if (e.code === 'ArrowDown') {
            if (!this.p.isDropdownOpen) {
                this.p.openDropdown();
            } else {
                focusNextElement(document.activeElement ?? document.body as any);
            }
        }
    }

    protected setValue(value: string): void
    {
        const el: HTMLElement = getPath(this.$refs, 'input.$refs.view.$refs.input');
        if (isObject(el)) {
            el.focus();
        }
        this.p.$emit('input', value);
        this.p.closeDropdown();
    }

    protected onDropdownKeyUp(e: KeyboardEvent, value: string)
    {
        if (e.code === 'Enter') {
            this.setValue(value);
        }
    }
}
</script>

<style lang="sass" src="VuTypeahead.basic.sass"></style>
