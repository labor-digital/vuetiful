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
        class="vuFormTypeahead"
        v-bind="inputComponentProps"
        @keyup.native="onKeyUp"
        @focus="onFocus"
    >
        <template v-slot:addons>
            <component
                :is="p.dropdownComponent"
                v-bind="dropdownComponentProps"
                class="vuFormTypeahead__dropdown"
                v-model="p.dropdownOpen"
                parent-is-reference
                as-block
                as-list-box
            >
                <li
                    class="vuFormTypeahead__dropdownLoader"
                    v-if="!p.noLoader && p.isWaitingForResolver">
                    <slot name="loader">{{ p.loadingLabel }}</slot>
                </li>

                <slot name="items" :setValue="setValue" :items="p.filteredListItems">
                    <component
                        :is="p.dropdownItemComponent"
                        v-bind="dropdownItemComponentProps"
                        v-for="item in p.filteredListItems"
                        :key="item.label"
                        @click.native="setValue(item)"
                        @keyup.native="onDropdownKeyUp($event, item)"
                    >
                        {{ item.label }}
                    </component>
                </slot>
            </component>
        </template>
    </component>
</template>

<script lang="ts">
import {focusNextElement, getPath, isObject, PlainObject} from '@labor-digital/helferlein';
import {Component, Prop, Vue} from 'vue-property-decorator';
import type {IPreparedListItem} from '../../Utils/Mixin/ListItemMixin';
import templateFactory from '../../Utils/templateFactory';
import VuDropdownItem from '../Dropdown/Item/VuDropdownItem.vue';
import VuDropdown from '../Dropdown/VuDropdown.vue';
import VuFormInput from '../FormInput/VuFormInput.vue';
import type VuFormTypeaheadAbstract from './VuFormTypeaheadAbstract.vue';

@Component({
    components: {VuDropdown, VuDropdownItem, VuFormInput}
})
export default class VuFormTypeaheadTemplate extends Vue
{
    protected ignoreFocus: boolean = false;

    @Prop({type: Object, default: () => ({})})
    readonly inputComponentProps!: PlainObject;

    @Prop({type: Object, default: () => ({})})
    readonly dropdownComponentProps!: PlainObject;

    @Prop({type: Object, default: () => ({})})
    readonly dropdownItemComponentProps!: PlainObject;

    get p(): VuFormTypeaheadAbstract
    {
        return this.$parent as any;
    }

    get inputComponent()
    {
        return templateFactory(this.p.inputComponent, this.p);
    }

    protected onFocus()
    {
        if (!this.ignoreFocus) {
            this.p.openDropdown();
        }
    }

    protected getInputRef(): HTMLElement | null
    {
        return getPath(this.$refs, 'input.$refs.template.$refs.input') as any;
    }

    protected onKeyUp(e: KeyboardEvent)
    {
        if (e.code === 'ArrowDown') {
            if (!this.p.isDropdownOpen) {
                this.p.openDropdown();
            } else {
                const active = (document.activeElement ?? document.body as any) as HTMLElement;
                // @todo compare with getInputRef() if we dropped the old input fields
                if (active && active.tagName === 'INPUT') {
                    focusNextElement(document.activeElement ?? document.body as any);
                }
            }
        }
    }

    protected setValue(item: IPreparedListItem): void
    {
        const el = this.getInputRef();
        if (isObject(el)) {
            this.ignoreFocus = true;
            el!.focus();
            setTimeout(() => this.ignoreFocus, 100);
        }
        this.p.$emit('input', item.label);
        this.p.$emit('select', item);
        this.p.closeDropdown();
    }

    protected onDropdownKeyUp(e: KeyboardEvent, item: IPreparedListItem)
    {
        if (e.code === 'Enter' || e.code === 'NumpadEnter') {
            this.setValue(item);
        }
    }
}
</script>
