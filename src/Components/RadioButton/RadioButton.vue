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
  - Last modified: 2020.05.03 at 13:05
  -->

<template>
    <div class="radioButton" v-if="hasItems">
        <label v-for="(item, index) in prepareItems" class="radioButton__label" :class="intClasses(item)"
               :ref="'radioButton-'+index">
            <span v-if="labelSide === 'left'" class="radioButton__labelText radioButton__labelText--left">{{hasLabel(item)}}</span>
            <input v-show="hasCustomRadioIcon" :name="groupName"
                   class="radioButton__input"
                   type="radio"
                   v-model="item.checked"
                   :required="item.required"
                   :disabled="item.disabled"
                   @input="updateValue(item, $event)"
            />
            <!-- @slot Add your custom radio icon if needed.  -->
            <slot name="customRadioIcon"></slot>
            <span v-if="labelSide === 'right'" class="radioButton__labelText radioButton__labelText--left">{{hasLabel(item)}}</span>
        </label>
        <span v-if="error" class="radioButton__error">{{ error }}</span>
    </div>
</template>

<script lang="ts">
    import {asArray} from "@labor-digital/helferlein/lib/FormatAndConvert/asArray";
    import {forEach} from "@labor-digital/helferlein/lib/Lists/forEach";
    import {isArray} from "@labor-digital/helferlein/lib/Types/isArray";
    import {isBool} from "@labor-digital/helferlein/lib/Types/isBool";
    import {isEmpty} from "@labor-digital/helferlein/lib/Types/isEmpty";
    import {isUndefined} from "@labor-digital/helferlein/lib/Types/isUndefined";
    import {CheckboxInputs} from "../Checkbox/Checkbox.interfaces";

    export default {
        name: "RadioButton",
        props: {
            /**
             * set group name to group radio buttons
             */
            groupName: {
                type: String,
                required: true
            },
            /**
             * parse checkboxes as array
             */
            items: Array,
            /**
             * choose label side right or left
             */
            labelSide: {
                default: "right",
                type: String,
                validate: (v) => {
                    return ["left", "right"].indexOf(v) !== -1;
                }
            },
            /**
             * set error message in span
             * css class: radio__error
             */
            error: {
                type: String
            },

            value: {
                type: Array,
                default: () => []
            }
        },
        computed: {
            prepareItems() {
                let preparedItems = [];

                // Build a unique value map
                const value = isArray(this.value) ? this.value : [];
                const items = isArray(this.items) ? this.items : [];
                const newValueMap = new Map();
                const selectedItemValues = [];
                forEach(value, (item: CheckboxInputs) => {
                    selectedItemValues.push(item.value);
                    newValueMap.set(item.value, item);
                });

                // Build the prepared item list
                forEach(items, (item) => {
                    const value = item.value ?? item;
                    const _item = {
                        value,
                        label: item.label ?? item,
                        checked: isBool(item.checked) ? item.checked :
                            selectedItemValues.indexOf(value) !== -1,
                        required: item.required ?? false,
                        disabled: item.disabled ?? false,
                        show: item.show ?? true,
                        classes: item.classes ?? {}
                    };
                    if (_item.checked) {
                        newValueMap.set(value, _item);
                    } else {
                        newValueMap.delete(value);
                    }
                    preparedItems.push(_item);
                });

                // Emit the input event after an update
                // We need this here for baseSelectBox -> So don't delete it
                if (JSON.stringify(asArray(newValueMap.keys())) !== JSON.stringify(selectedItemValues)) {
                    this.$emit("input", asArray(newValueMap));
                }
                return preparedItems;
            },
            hasCustomRadioIcon(): boolean {
                return isEmpty(this.$slots.customRadioIcon);
            },
            hasError(): boolean {
                return !isEmpty(this.$slots.error) || !isEmpty(this.error);
            }
        },
        methods: {
            hasItems() {
                return !isEmpty(this.items) || !isUndefined(this.items);
            },
            hasLabel(v): boolean {
                return isUndefined(v.label) || isEmpty(v.label) ? v : v.label;
            },
            intClasses(item) {
                return {
                    ...item.classes,
                    "radioButton__label--required": item.required,
                    "radioButton__label--disabled": item.disabled,
                    "radioButton__label--checked": item.checked
                };
            },
            updateValue(item, e) {
                item.checked = e.target.checked;
                let valueClone = isArray(this.value) ? [...this.value] : [];
                valueClone = [item];
                this.$emit("input", valueClone);
            }
        }
    };
</script>

<style lang="sass"></style>
