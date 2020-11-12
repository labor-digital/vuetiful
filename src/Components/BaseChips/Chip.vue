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
  - Last modified: 2020.05.10 at 16:56
  -->

<template>
    <a href="#"
       :class="classes"
       class="chip"
       @click.prevent="onClick"
       @keyup="onKeyUp"
       role="option"
       :tabindex="disabledInternal ? -1 : null"
       :aria-disabled="disabledInternal ? 'true': 'false'"
    >
		<span class="chip__item">
            <slot/>

            <span v-if="removableInternal && !disabledInternal"
                  aria-hidden="true"
                  class="chip__removeBtn"
                  @click.stop.prevent="onRemoveClick">
                <slot name="removeIcon">&times;</slot>
            </span>

		</span>
    </a>
</template>

<script lang="ts">

export default {
    name: 'Chip',
    props: {

        /**
         * By default all chips can be removed again, if you set this to false this one can't
         */
        removable: {
            type: Boolean,
            default: true
        },

        /**
         * Allows you to disable the chip's interaction
         */
        disabled: {
            type: Boolean,
            default: false
        },

        /**
         * @deprecated it does nothing(?) o.O
         */
        item: String,

        /**
         * @deprecated use "disabled" instead
         */
        isDisabled: {
            type: [Boolean, Number],
            validator: (v) => [-1, true, false].indexOf(v) !== -1,
            default: -1
        },

        /**
         * @deprecated use "removable" instead
         */
        isRemovable: {
            type: [Boolean, Number],
            validator: (v) => [-1, true, false].indexOf(v) !== -1,
            default: -1
        }
    },
    computed: {
        /**
         * The list of the css classes based on the given props
         */
        classes(): Object
        {
            return {
                'chip--nonRemovable': !this.removableInternal,
                'chip--disabled': this.disabledInternal
            };
        },

        /**
         * @deprecated temporary helper to handle both the legacy and the new disabled state
         */
        removableInternal(): boolean
        {
            if (this.isRemovable !== -1) {
                return this.isRemovable;
            }
            return this.removable;
        },

        /**
         * @deprecated temporary helper to handle both the legacy and the new disabled state
         */
        disabledInternal(): boolean
        {
            if (this.isDisabled !== -1) {
                return this.isDisabled;
            }
            return this.disabled;
        }
    },
    methods: {
        /**
         * Removes this chip from the chip list
         * This has an effect only if triggered inside a chips list
         * @public
         */
        remove(): void
        {
            this.$emit('remove');
        },

        /**
         * Handles keyboard events
         */
        onKeyUp(e: KeyboardEvent): void
        {
            if (e.code === 'Delete' && this.removableInternal) {
                this.remove();
            }
        },

        /**
         * Emits a non-native "click" event if the chip was clicked
         */
        onClick()
        {
            if (!this.disabledInternal) {
                this.$emit('click');
            }
        },

        /**
         * Emits the close event if the chip is allowed to be closed
         */
        onRemoveClick()
        {
            this.remove();
        }
    }
};
</script>

<style scoped lang="sass" src="./Chip.sass"></style>
