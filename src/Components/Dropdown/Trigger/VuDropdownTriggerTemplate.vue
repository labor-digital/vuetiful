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

<template>
    <component
        :is="p.tag"
        :id="p.id"
        class="vuDropdownTrigger"
        :class="{'vuDropdownTrigger--disabled': p.api.isDisabled}"
        @click.prevent.stop="p.toggle()"
        @keydown="onKeyDown"
        @keyup.prevent.stop="onKeyUp"
        aria-haspopup="true"
        :tabindex="p.api.isDisabled ? '-1' : null"
        :aria-disabled="p.api.isDisabled ? 'true' : null"
        :aria-expanded="p.api.isOpen ? 'true' : 'false'"
        v-bind="attr">
        <slot/>
    </component>
</template>

<script lang="ts">
import {focusNextElement, PlainObject} from '@labor-digital/helferlein';
import {Component, Vue} from 'vue-property-decorator';
import type VuDropdownTriggerAbstract from './VuDropdownTriggerAbstract.vue';

@Component
export default class VuDropdownTriggerTemplate extends Vue
{
    get p(): VuDropdownTriggerAbstract
    {
        return this.$parent as any;
    }

    get attr(): PlainObject
    {
        return {
            href: this.p.tag === 'a' ? '#' : null
        };
    }

    public onKeyUp(e: KeyboardEvent): void
    {
        if (e.code === 'ArrowDown' || e.code === 'ArrowUp') {
            if (!this.p.api.isOpen) {
                this.p.toggle();
            }
            this.$nextTick(() => {
                focusNextElement(this.$el as HTMLElement);
            });
        }
    }

    public onKeyDown(e: KeyboardEvent): void
    {
        if (e.code === 'ArrowDown' || e.code === 'ArrowUp') {
            e.stopPropagation();
            e.preventDefault();
        }
    }
}
</script>

<style lang="sass"></style>
