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
  - Last modified: 2020.11.23 at 00:55
  -->

<template>
    <li class="vuDropdownItem"
        :id="p.id"
        :class="classes">


        <component
            :is="p.linkComponent"
            v-bind="{
                type: p.link === '' ? 'js' : 'auto',
                link: p.link,
                tabindex: p.disabled ? '-1' : null,
                'aria-disabled': p.disabled ? 'true' : null,
                role: p.api.isListBox ? 'option' : 'presentation',
                ...linkComponentProps,
                ...p.linkComponentProps
            }"

            v-if="p.type === 'default'"
            ref="focusPoint"

            @keydown.native="onKeyDown"
            @keyup.native.prevent="onKeyUp"
            @focus.native="p.api.focusItem(p.id)"
            @blur.native="p.api.blurItem(p.id)"
            @click="onClick"
        >
            <slot/>
        </component>

        <hr v-else-if="p.type==='line'" role="separator" aria-orientation="horizontal"/>

        <slot v-else/>
    </li>
</template>

<script lang="ts">
import {focusNextElement, focusPreviousElement, PlainObject} from '@labor-digital/helferlein';
import {Component, Prop, Vue} from 'vue-property-decorator';
import VuDropdownItemAbstract from './VuDropdownItemAbstract.vue';

@Component
export default class VuDropdownItemTemplate extends Vue
{

    @Prop({type: Object, default: () => ({})})
    readonly linkComponentProps: PlainObject;

    get p(): VuDropdownItemAbstract
    {
        return this.$parent as any;
    }

    get classes(): PlainObject
    {
        return {
            'vuDropdownItem--focused': this.p.api.isItemFocused(this.p.id),
            'vuDropdownItem--disabled': this.p.disabled,
            ['vuDropdownItem--' + this.p.type]: true
        };
    }

    public onKeyUp(e: KeyboardEvent): void
    {
        if (e.code === 'ArrowDown') {
            focusNextElement(this.$refs.focusPoint as HTMLElement);
        } else if (e.code === 'ArrowUp') {
            focusPreviousElement(this.$refs.focusPoint as HTMLElement);
        }
    }

    public onKeyDown(e: KeyboardEvent): void
    {
        if (e.code === 'ArrowDown' || e.code === 'ArrowUp') {
            e.stopPropagation();
            e.preventDefault();
        }
    }

    public onClick(e: MouseEvent)
    {
        if (!this.p.disabled) {
            this.p.$emit('click');
        } else {
            e.stopPropagation();
        }
    }

}
</script>
