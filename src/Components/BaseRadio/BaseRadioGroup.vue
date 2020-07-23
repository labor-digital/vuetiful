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
  - Last modified: 2020.07.22 at 14:26
  -->

<template>
    <div class="checkboxGroup">
        <base-radio v-for="(item,index) in prepareItems" :key="'checkbox-' + index"
                    :class="item.classes"
                    v-model="localChecked"
                    :label="item.label"
                    :value="item.value"
                    :required="item.required"
                    :disabled="item.disabled">
        </base-radio>
    </div>
</template>

<script lang="ts">
    import {forEach} from "@labor-digital/helferlein/lib/Lists/forEach";
    import {isArray} from "@labor-digital/helferlein/lib/Types/isArray";
    import BaseRadio from "./BaseRadio.vue";

    export default {
        name: "BaseRadioGroup",
        components: {BaseRadio},
        model: {
            prop: "checked",
            event: "input"
        },
        provide() {
            return {
                isRadioGroup: this
            };
        },
        props: {
            /**
             * Set your items/checkboxes as an Array or Object.
             */
            items: {
                type: [Array, Object],
                default: () => []
            },

            /**
             * If "items" contains an array of objects, this prop is used to select the object's property
             * which should be used as a label.
             */
            itemLabel: {
                type: String,
                default: "label",
                note: "property in item for text."
            },

            /**
             * If "items" contains an array of objects, this prop is used to select the object's property
             * which should be used as a value.
             */
            itemValue: {
                type: String,
                default: "value",
                note: "property in item for value."
            },

            /**
             * Set the required group name so that the inputs work together.
             */
            name: {
                type: String,
                required: true
            },

            /**
             * v-model -> If you need preselected Items set this to the same as the value.
             * Within a checkbox group use an array. If the values match it will preselect them.
             * type: [String, Number, Boolean]
             */
            checked: {
                default: null
            }
        },
        computed: {
            prepareItems() {
                let preparedItems = [];

                // Build a unique value map
                const items = isArray(this.items) ? this.items : [];

                // Build the prepared item list
                forEach(items, (item) => {
                    const _item = {
                        value: item.value ?? item[this.itemValue] ?? item,
                        label: item.label ?? item[this.itemLabel] ?? item,
                        required: item.required ?? false,
                        disabled: item.disabled ?? false,
                        classes: item.classes ?? {}
                    };

                    preparedItems.push(_item);
                });

                return preparedItems;
            }
        },
        data() {
            return {
                localChecked: this.checked || ""
            };
        },
        watch: {
            checked(newVal) {
                this.localChecked = newVal;
            },
            localChecked(newVal, oldVal) {
                if (newVal != oldVal) {
                    this.$emit("input", newVal);
                }
            }
        }
    };
</script>

<style scoped lang="sass"></style>
