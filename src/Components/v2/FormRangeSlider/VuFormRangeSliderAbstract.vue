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
  - Last modified: 2020.12.01 at 19:13
  -->

<template></template>

<script lang="ts">
import {PlainObject} from '@labor-digital/helferlein';
import {noUiSlider} from 'nouislider';
import {Component, Prop, Vue} from 'vue-property-decorator';
import {resolveId} from '../../../Utils/resolveId';
import templateFactory from '../../../Utils/templateFactory';
import {RangeSliderFormatter, RangeSliderRangeDefinition} from './VuFormRangeSlider.interfaces';
import VuFormRangeSliderTemplate from './VuFormRangeSliderTemplate.vue';

@Component({
    name: 'VuFormRangeSliderAbstract',
    components: {
        VuTemplate: templateFactory(VuFormRangeSliderTemplate)
    }
})
export default class VuFormRangeSliderAbstract extends Vue
{
    /**
     * The value of either a single handle (as number) or multiple handle values (as an array)
     */
    @Prop({type: [Number, String, Array], default: 0})
    readonly value: number | Array<number>;

    /**
     * If set to true, the slider will be rendered vertically, instead of horizontally.
     * NOTE: Vertical sliders don't assume a default height, so a height needs to be set.
     * Any unit can be used, including % or px.
     */
    @Prop({type: Boolean, default: false})
    readonly vertical: boolean;

    /**
     * By default the sliders are top-to-bottom and left-to-right,
     * but this can be changed using this option option.
     */
    @Prop({type: Boolean, default: false})
    readonly rtl: boolean;

    /**
     * When a non-linear slider has been configured, the snap option can be set to true to force the slider to jump
     * between the specified values.
     */
    @Prop({type: Boolean, default: false})
    readonly snap: boolean;

    /**
     * Allows you to disable the slider from accepting any input
     */
    @Prop({type: Boolean, default: false})
    readonly disabled: boolean;

    /**
     * The connect option can be used to control the bar between the handles or the edges of the slider.
     * If you are using one handle, set the value to either `upper` or `lower`.
     * For sliders with 2 or more handles, pass an array with a boolean for every connecting element,
     * including the edges of the slider. The length of this array must match the handle `count + 1`.
     * Setting `true` sets the bars between the handles, but not between the handles and the sliders edges.
     */
    @Prop({type: [String, Boolean, Array], default: false})
    readonly connect: 'lower' | 'upper' | boolean | boolean[];

    /**
     * By default the handle will never go over it's base container.
     * If you set this prop to true the padding of the base container is removed.
     */
    @Prop({type: Boolean, default: false})
    readonly fullWidth: boolean;

    /**
     * By default, the slider slides fluently.
     * In order to make the handles jump between intervals, the step option can be used.
     */
    @Prop({type: Number, default: 0})
    readonly step: number;

    /**
     * All values on the slider are part of a range.
     * The range has a minimum and maximum value.
     * The minimum value cannot be equal to the maximum value.
     * @see https://refreshless.com/nouislider/slider-values/#section-range
     * @see RangeSliderRangeDefinition
     */
    @Prop({type: Object})
    readonly range: RangeSliderRangeDefinition;

    /**
     * Allows you easily set the minimum slider value without providing a "range" object.
     * ATTENTION: If you set the range prop, this value will be ignored!
     */
    @Prop({type: Number, default: 0})
    readonly min: number;

    /**
     * Allows you easily set the maximum slider value without providing a "range" object.
     * ATTENTION: If you set the range prop, this value will be ignored!
     */
    @Prop({type: Number, default: 100})
    readonly max: number;

    /**
     * noUiSlider can provide a basic tooltip using the tooltips option.
     * This option can also accept formatting options to format the tooltips content.
     * In that case, pass an array with a formatter for each handle,
     * true to use the default or false to display no tooltip.
     *
     * Tooltips can be removed from a slider using the removeTooltips() method.
     */
    @Prop({type: [Boolean, Array], default: false})
    readonly tooltips: boolean | RangeSliderFormatter | Array<RangeSliderFormatter | boolean>;

    /**
     * If set to true the label will be rendered after the slider instead of before
     */
    @Prop({type: Boolean, default: false})
    readonly labelAfter: boolean;

    /**
     * Allows you to provide an aria label for the input field
     */
    @Prop({type: String, default: null})
    readonly ariaLabel: string | null;

    /**
     * Allows you to manually set an error for this field
     */
    @Prop({type: String})
    readonly error: string;

    /**
     * This field supports debouncing user input, updating the v-model after a period of
     * idle time from when the last character was entered by the user (or a change event occurs).
     * If the user enters a new character (or deletes characters) before the idle timeout expires,
     * the timeout is re-started.
     *
     * To enable debouncing, set the prop debounce to any integer greater than zero.
     * The value is specified in milliseconds. Setting debounce to 0 will disable debouncing.
     */
    @Prop({type: Number, default: 0})
    readonly debounce: number;

    /**
     * Additional slider options that can't be controlled directly through the props.
     * Note: The options passed in here will overwrite all props you have set!
     * @see https://refreshless.com/nouislider/slider-options/
     */
    @Prop({type: Object, default: () => ({})})
    readonly options: PlainObject;

    /**
     * The unique id of this element
     */
    public id = resolveId(this);

    /**
     * The reference of the slider instance in the template
     * @api
     */
    public instance: null | noUiSlider = null;

    /**
     * Contains the debounce handler that is currently waiting for it's execution
     */
    protected debounceHandler: Function | any;

    /**
     * Contains the currently waiting debounce handler id to kill the timeout again
     */
    protected debounceTimeout: 0;

    /**
     * @internal value proxy
     */
    public setValue(v: number | Array<number>): void
    {
        if (this.debounce > 0 && v !== null) {
            clearTimeout(this.debounceTimeout);
            this.debounceHandler = () => this.$emit('input', v);
            this.debounceTimeout = setTimeout(this.debounceHandler, this.debounce) as any;
        } else {
            this.$emit('input', v);
        }
    }
}
</script>
