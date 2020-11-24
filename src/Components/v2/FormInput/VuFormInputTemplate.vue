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
  - Last modified: 2020.11.19 at 22:30
  -->

<template>
    <div class="vuFormInput"
         :class="classes"
         :id="p.id">
        <label
            v-if="hasLabel && !p.labelRight"
            class="vuFormInput__label"
            :id="p.id + '-label'"
            :for="p.id + '-input'">
            <slot/>
        </label>

        <div class="vuFormInput__wrap">
            <div class="vuFormInput__fieldWrap">

                <!-- @slot Optional content at the start of the input wrap -->
                <slot name="beforeInput"></slot>

                <input
                    ref="input"
                    class="vuFormInput__field"
                    :style="fieldStyle"

                    :id="p.id + '-input'"
                    v-model="p._value"
                    :type="p.type"

                    :placeholder="p.placeholder"

                    :required="p.required"
                    :readonly="p.readOnly"
                    :disabled="p.disabled"
                    :aria-labelledby="!hasLabel || p._inputFieldAttr.ariaLabel ? null : p.id + '-label'"
                    :aria-disabled="p.disabled ? 'true' : null"
                    :aria-invalid="(p._inputFieldAttr.ariaInvalid ? p._inputFieldAttr.ariaInvalid : (p.isValid ? null : 'true'))"

                    v-bind="p._inputFieldAttr"
                    v-on="{...getFilteredListeners()}"

                    @blur="onBlur"
                    @focus="onFocus"
                >

                <!-- @slot Internal slot to add addons like the typeahead to the field -->
                <slot name="addons"></slot>

                <!-- Pseudo-Placeholder for date and time input fields -->
                <span v-if="showVirtualPlaceholder"
                      class="vuFormInput__virtualPlaceholder"
                      ref="virtualPlaceholder">{{ p.placeholder }}</span>

                <!-- @slot Allows you to place an icon inside the input. Don't forget to style it! -->
                <slot name="icon"></slot>

                <!-- @slot Optional content in front of the clear icon -->
                <slot name="beforeClearIcon"></slot>

                <button v-show="!isEmpty"
                        v-if="!p.noClear"
                        :tabindex="isEmpty ? -1 : null"
                        class="vuFormInput__clear"
                        @click.prevent="onClearClick"
                        :aria-label="p.ariaClearLabel"
                >
                    <!-- @slot set your custom clear icon. As default: &times; -->
                    <slot name="clearIcon">&times;</slot>
                </button>

                <!-- @slot Optional content at the end of the input wrap -->
                <slot name="afterInput"></slot>

            </div>

            <div v-if="!p.isValid" class="vuFormInput__error">
                <!-- @slot Allows you to modify the error output  -->
                <slot name="error" :error="p._error">{{ p._error }}</slot>
            </div>
        </div>

        <label
            v-if="hasLabel && p.labelRight"
            class="vuFormInput__label vuFormInput__label--right"
            :id="p.id + '-label'"
            :for="p.id + '-input'">
            <slot/>
        </label>
    </div>
</template>

<script lang="ts">
import {filter, getSize, isBrowser, isEmpty, isFunction, isUndefined, PlainObject} from '@labor-digital/helferlein';
import {Component, Vue, Watch} from 'vue-property-decorator';
import VuFormInputAbstract from './VuFormInputAbstract.vue';

@Component
export default class VuFormInputTemplate extends Vue
{
    /**
     * True when the field is in focus
     * @protected
     */
    protected hasFocus: boolean = false;

    /**
     * Holds the field min width when we show the virtual placeholder
     * @protected
     */
    protected minWith: number = 0;

    get hasLabel(): boolean
    {
        return isFunction(this.$scopedSlots.default) && !isEmpty(this.$scopedSlots.default({}));
    }

    get isEmpty(): boolean
    {
        return isEmpty(this.p._value);
    }

    get p(): VuFormInputAbstract
    {
        return this.$parent as any;
    }

    get classes(): PlainObject
    {
        return {
            'vuFormInput--required': this.p.required,
            'vuFormInput--disabled': this.p.disabled,
            'vuFormInput--readonly': this.p.readOnly,
            'vuFormInput--focus': this.hasFocus,
            'vuFormInput--invalid': !this.p.isValid,
            'vuFormInput--withLabel': this.hasLabel,
            'vuFormInput--empty': this.isEmpty,
            ['vuFormInput--' + this.p.type]: true
        };
    }

    get fieldStyle(): PlainObject
    {
        return {
            color: this.showVirtualPlaceholder ? 'transparent' : null,
            minWidth: this.minWith === 0 ? null : this.minWith + 'px'
        };
    }

    get showVirtualPlaceholder(): boolean
    {
        return !this.hasFocus && this.isEmpty && !isEmpty(this.p.placeholder) &&
               ['date', 'time'].indexOf(this.p.type) !== -1;
    }

    protected getFilteredListeners(): PlainObject
    {
        console.log(filter(this.p.$listeners, (l, k) => k !== 'input'));
        return filter(this.p.$listeners, (l, k) => k !== 'input');
    }

    protected onBlur()
    {
        this.hasFocus = false;
        this.p._triggerProcessing('blur');
        this.p.$emit('blur');
    }

    protected onFocus()
    {
        this.hasFocus = true;
        this.p._triggerProcessing('focus');
        this.p.$emit('focus');
    }

    protected onClearClick(): void
    {
        this.p._value = null;
    }

    @Watch('showVirtualPlaceholder')
    public watchShowVirtualPlaceHolder(n): void
    {
        if (!n) {
            this.minWith = 0;
        } else {
            this.$nextTick(() => {
                if (isBrowser() && !isUndefined(this.$refs.virtualPlaceholder)) {
                    this.minWith = getSize(this.$refs.virtualPlaceholder as HTMLElement).width;
                }
            });
        }
    }
}
</script>

<style lang="sass" src="VuFormInput.basic.sass"></style>
