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
    <div class="vuDropdown"
         :id="p.id"
         :class="classes"
         @click.stop=""
    >

        <div class="vuDropdown__trigger" ref="trigger" v-if="hasTrigger">
            <slot name="trigger"/>
        </div>

        <div class="vuDropdown__body"
             :role="p.asListBox ? 'listbox' : 'menu'"
             :aria-labelledby="p.triggerId === '' ? null : p.triggerId"
             tabindex="-1"
             ref="body">

            <div class="vuDropdown__arrow"
                 v-if="p.withArrow"
                 tabindex="-1"
                 data-popper-arrow></div>

            <slot name="beforeItems"/>

            <ul class="vuDropdown__items">
                <slot/>
            </ul>

            <slot name="afterItems"/>
        </div>


    </div>
</template>

<script lang="ts">
import {forEach, isBrowser, isEmpty, merge, PlainObject} from '@labor-digital/helferlein';
import {createPopper, Instance as Popper, Placement} from '@popperjs/core';
import {Component, Vue} from 'vue-property-decorator';
import VuDropdownAbstract from './VuDropdownAbstract.vue';

@Component
export default class VuDropdownTemplate extends Vue
{

    get p(): VuDropdownAbstract
    {
        return this.$parent as any;
    }

    get hasTrigger(): boolean
    {
        return !isEmpty(this.$scopedSlots.trigger);
    }

    get classes(): PlainObject
    {
        const baseClass = 'vuDropdown--';
        return {
            [baseClass + this.p.type]: true,
            [baseClass + this.p.direction]: true,
            [baseClass + 'open']: this.p.isOpen,
            [baseClass + 'dynWidth']: !this.p.asBlock,
            [baseClass + 'disabled']: this.p.disabled,
            [baseClass + 'withArrow']: this.p.withArrow
        };
    }

    protected popper: Popper | null = null;

    /**
     * Creates a new popper instance based on the current configuration
     * The old instance will be destroyed automatically
     * @protected
     */
    protected createPopper(): void
    {
        this.destroyPopper();

        if (isBrowser() && this.p.isOpen) {
            const reference = (() => {
                if (this.hasTrigger) {
                    return this.$refs.trigger;
                }
                if (this.p.parentIsReference) {
                    return this.p.$parent.$el ?? this.p.$parent;
                }
                return this.$el;
            })();

            const placement = ({
                left: 'left-start',
                right: 'right-start',
                up: 'top-start',
                down: 'bottom-start'
            })[this.p.direction] as Placement;

            const modifiers = [];
            if (this.p.noFlip) {
                modifiers.push({name: 'flip', enabled: false});
            }
            if (this.p.withArrow) {
                modifiers.push({name: 'offset', options: {offset: [0, 10]}});
            }

            const config = merge({placement, modifiers}, this.p.popperOptions);

            this.popper = createPopper(
                reference as HTMLElement,
                this.$refs.body as HTMLElement, config as any);
        }
    }

    /**
     * Recreates the popper instance on the next tick
     */
    protected recreatePopper(): void
    {
        this.$nextTick(() => this.createPopper());
    }

    /**
     * Destroys the current popper instance
     * @protected
     */
    protected destroyPopper(): void
    {
        this.popper && this.popper.destroy();
        this.popper = null;
    }

    public created()
    {
        forEach([
            'noFlip', 'direction', 'value', 'popperOptions', 'asBlock', 'withArrow', 'fallbackValue'
        ], (field) => {
            this.$watch(() => this.p[field], () => this.recreatePopper());
        });
    }

    public beforeDestroy()
    {
        this.destroyPopper();
    }

}
</script>

<style lang="sass" src="VuDropdown.basic.sass"></style>
