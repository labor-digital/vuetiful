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
  - Last modified: 2020.12.03 at 00:10
  -->

<template>
    <div class="vuFormRangeSlider" :class="classes">
        <label
            v-if="hasLabel && !p.labelAfter"
            class="vuFormInput__label"
            :id="p.id + '-label'"
            :for="p.id + '-slider'">
            <slot/>
        </label>
        <div class="vuFormRangeSlider__fieldWrap">
            <div class="vuFormRangeSlider__slider"
                 ref="slider"
                 :disabled="p.disabled"
            ></div>

            <div ref="handleSlot">
                <!-- @slot Allows you to place some content inside the handle container  -->
                <slot name="handle"></slot>
            </div>

            <div v-if="p.error" class="vuFormInput__error">
                <!-- @slot Allows you to modify the error output  -->
                <slot name="error" :error="p.error">{{ p.error }}</slot>
            </div>
        </div>

        <label
            v-if="hasLabel && p.labelAfter"
            class="vuFormInput__label"
            :id="p.id + '-label'"
            :for="p.id + '-input'">
            <slot/>
        </label>
    </div>
</template>

<script lang="ts">
import {addClass, forEach, isArray, isEmpty, isFunction, map, PlainObject, setAttr, throttleEvent} from '@labor-digital/helferlein';
import noUi from 'nouislider';
import {Component, Prop, Vue} from 'vue-property-decorator';
import VuFormRangeSliderAbstract from './VuFormRangeSliderAbstract.vue';

const events = ['start', 'slide', 'update', 'change', 'set', 'end'];
@Component({
    name: 'VuFormRangeSliderTemplate'
})
export default class VuFormRangeSliderTemplate extends Vue
{
    /**
     * The list of properties on the abstract that should not trigger a recreation of the slider
     * instance when they change.
     */
    @Prop({type: Array, default: () => ([])})
    public readonly ignorePropUpdatesFor: Array<string>;

    /**
     * True while the slider is being dragged
     */
    protected isSliding: boolean = false;

    protected debounceTimeout: 0;

    get p(): VuFormRangeSliderAbstract
    {
        return this.$parent as any;
    }

    get hasLabel(): boolean
    {
        return isFunction(this.$scopedSlots.default) && !isEmpty(this.$scopedSlots.default({}));
    }

    get hasError(): boolean
    {
        return !isEmpty(this.p.error);
    }

    get classes(): PlainObject
    {
        const prefix = 'vuFormRangeSlider--';
        return {
            [prefix + 'disabled']: this.p.disabled,
            [prefix + 'fullWidth']: this.p.fullWidth,
            [prefix + 'vertical']: this.p.vertical,
            [prefix + 'horizontal']: !this.p.vertical,
            [prefix + 'invalid']: this.hasError,
            [prefix + 'withLabel']: this.hasLabel
        };
    }

    /**
     * Destroys the current slider instance and automatically creates a new one
     */
    public recreateSlider(): void
    {
        this.destroySlider();
        const p = this.p;
        const ref: HTMLElement = this.$refs.slider as any;

        // Ignore if there is no ref
        if (!ref) {
            return;
        }

        // Create the slider
        const instance = p.instance = noUi.create(ref, {
            start: this.translateValue(p.value),
            range: p.range,
            orientation: p.vertical ? 'vertical' : 'horizontal',
            direction: p.rtl ? 'rtl' : 'ltr',
            step: p.step,
            snap: p.snap,
            tooltips: p.tooltips,
            connect: p.connect,
            ...p.options
        });

        // Register the event proxy
        forEach(events, e => instance.on(e, (ev) => p.$emit(e, ev)));

        // Register our internal events
        const setter = v => p.setValue(this.translateValue(v));
        instance.on('change', setter);
        instance.on('start', () => this.isSliding = true);
        instance.on('end', () => this.isSliding = false);
        instance.on('slide', throttleEvent(setter, 50));

        // Add some additional classes
        const handles = ref.querySelectorAll('.noUi-handle');
        addClass(handles as any, 'vuFormRangeSlider__handle');
        addClass(ref.querySelector('.noUi-base') as any, 'vuFormRangeSlider__base');
        addClass(ref.querySelector('.noUi-connects') as any, 'vuFormRangeSlider__connects');
        addClass(ref.querySelectorAll('.noUi-connect') as any, 'vuFormRangeSlider__connect');

        // Add additional aria attributes
        if (handles) {
            setAttr(handles, 'aria-labelledby', isEmpty(p.ariaLabel) ? p.id + '-label' : p.ariaLabel);
            setAttr(handles, 'aria-invalid', this.hasError ? true : null);
        }

        // Attach the handle slot to the handle container
        if (handles.length === 1) {
            const touch = ref.querySelector('.noUi-touch-area') as HTMLElement;
            if (touch && this.$refs.handleSlot) {
                touch.appendChild(this.$refs.handleSlot as HTMLElement);
            }
        }
    }

    /**
     * Completely destroys the slider instance if it currently exists
     */
    protected destroySlider(): void
    {
        if (this.p.instance !== null) {
            this.p.instance.destroy();
        }
    }

    /**
     * Internal helper to transform the value between its array / number representation
     * @param v
     * @protected
     */
    protected translateValue(v: number | Array<number>): number | Array<number>
    {
        if (typeof v === 'number') {
            return [v];
        }
        if ((v as Array<number>).length > 1) {
            return v;
        }
        return v[0];
    }

    /**
     * Recreates the slider if some of the props did change
     * @protected
     */
    protected onPropChange(): void
    {
        this.recreateSlider();
    }

    public mounted()
    {
        // Listen to all prop changes on the parent element -> meaning we
        const props = this.p.$props;
        forEach(props, (v, k) => {
            if ([...this.ignorePropUpdatesFor, 'value'].indexOf(k) !== -1) {
                return;
            }
            this.$watch(() => props[k], () => this.onPropChange(), {deep: true});
        });

        // Listen for value changes
        this.$watch(() => this.p.value, (n: any) => {
            const i = this.p.instance;
            if (i !== null
                && !this.isSliding
                && n !== i.get()) {
                i.set(n);

                // We have to incorporate a bit of a delay while the user types a value
                clearTimeout(this.debounceTimeout);
                this.debounceTimeout = setTimeout(() => {
                    // Make sure that external updates will be validated using the current range
                    // And if the value is invalid get automatically updated to the correct value
                    const nIsA = isArray(n);
                    const vIsA = isArray(i.get());
                    if (!nIsA && !vIsA) {
                        if (parseFloat(n) !== parseFloat(i.get() as any)) {
                            this.p.setValue(i.get() as any);
                        }
                    } else if (nIsA && vIsA) {
                        if (JSON.stringify(map(n, parseFloat)) !== JSON.stringify(map(i.get() as any, parseFloat))) {
                            this.p.setValue(i.get() as any);
                        }
                    }
                }, 500) as any;
            }
        });

        // Start the slider
        this.recreateSlider();
    }
}
</script>

<style lang="sass" src="VuFormRangeSlider.basic.sass"></style>
