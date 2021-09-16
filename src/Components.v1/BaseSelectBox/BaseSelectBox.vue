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
  - Last modified: 2020.05.11 at 12:06
  -->

<template>
    <div class="baseSelectBox" @click.stop>
        <div class="baseSelectBox__container">
            <div class="baseSelectBox__containerInput">
                <!-- @slot Used to add additional content before the input field is rendered -->
                <slot name="input-before"/>

                <!-- Renders either chips or the list of selected entries -->
                <span v-if="isMultiSelect && !displayAsChip"
                      class="baseSelectBox__chips"
                      v-for="item in chipList">
                    {{ item.label }}
                </span>
                <component :is="chipsComponent"
                           v-if="isMultiSelect && displayAsChip"
                           class="baseSelectBox__chips"
                           v-model="chipList"
                />

                <!-- The search inputfield -->
                <component :is="inputFieldComponent"
                           ref="selectBoxInput"
                           v-model="searchValueOrPlaceholder"
                           class="baseSelectBox__input"
                           :placeholder="searchFieldPlaceholder"
                           :clear-icon="false"
                           @focus="onInputFocus"
                           @blur="onInputBlur"
                           @keydown.enter.native.prevent="onEnterKeyDown"
                           @keydown.down.native="onUpDownKeyDown(true)"
                           @keydown.up.native="onUpDownKeyDown"
                           @keydown.delete.native="onDeleteKeyDown"
                />

                <!-- @slot additional content at the end of the input field -->
                <slot name="input-end"/>

            </div>

            <div class="baseSelectBox__error">
                <!-- @slot error slot after the input field -->
                <slot name="error">{{ error }}</slot>
            </div>

            <transition name="fade">
                <div v-show="isMenuShown" class="baseSelectBox__menu" :class="menuClasses" ref="selectBoxMenu" :style="menuStyles">

                    <!-- @slot Used to add additional content before the list of items -->
                    <slot name="before-items-fixed"/>

                    <!-- @slot Used to add additional content as the first element before
                    the other items in the list -->
                    <slot name="before-items"/>

                    <div class="baseSelectBox__menuInner"
                         @focusout="onInputBlur"
                         tabindex="0">

                        <!-- Utilize the checkbox component to render a multi-select -->
                        <component :is="checkboxComponent"
                                   v-if="isMultiSelect"
                                   ref="checkboxList"
                                   :value="preparedValue"
                                   :items="filteredItems"
                                   class="baseSelectBox__item baseSelectBox__item--checkbox"
                                   @click.native="showMenu"
                                   @input="onMultiSelectCheckboxInput"
                        />

                        <!-- Render the simple list of items to be selected -->
                        <span v-else
                              v-for="(item) in filteredItems"
                              class="baseSelectBox__item"
                              :class="singleSelectItemClasses(item)"
                              @click="onSingleSelectItemClick(item)">

                            <!-- @slot Used to overwrite the rendered label for a single select box -->
                            <slot name="single-select-item-label" :item="item">
					            {{ item.label }}
                            </slot>
					    </span>
                    </div>

                    <!-- @slot Used to add additional content as the first element after the
                    other items in the list -->
                    <slot name="after-items"/>

                    <!-- @slot Used to add additional content after the list of items -->
                    <slot name="after-items-fixed"/>
                </div>
            </transition>
        </div>
    </div>
</template>

<script lang="ts">
import {ComponentProxy} from '@labor-digital/helferlein/lib/Entities/ComponentProxy';
import {isBrowser} from '@labor-digital/helferlein/lib/Environment/isBrowser';
import {PlainObject} from '@labor-digital/helferlein/lib/Interfaces/PlainObject';
import {filter} from '@labor-digital/helferlein/lib/Lists/filter';
import {forEach} from '@labor-digital/helferlein/lib/Lists/forEach';
import {map} from '@labor-digital/helferlein/lib/Lists/map';
import {getPath} from '@labor-digital/helferlein/lib/Lists/Paths/getPath';
import {isArray} from '@labor-digital/helferlein/lib/Types/isArray';
import {isEmpty} from '@labor-digital/helferlein/lib/Types/isEmpty';
import {isNull} from '@labor-digital/helferlein/lib/Types/isNull';
import {isPlainObject} from '@labor-digital/helferlein/lib/Types/isPlainObject';
import {isString} from '@labor-digital/helferlein/lib/Types/isString';
import {isUndefined} from '@labor-digital/helferlein/lib/Types/isUndefined';
import Checkbox from '../Checkbox/Checkbox.vue';
import Chips from '../Chips/Chips.vue';
import InputField from '../InputField/InputField.vue';

interface PreparedItem
{
    /**
     * The visible label of this item
     */
    label: string,

    /**
     * The lower case version of this item for search purposes
     */
    labelLc: string,

    /**
     * The value of this item to pass as model data
     */
    value: any,

    /**
     * Additional css classes to apply to the item
     */
    classes: PlainObject,

    /**
     * The raw, given value for this item
     */
    raw: any
}

/**
 * This component is the internal (WIP) successor to the "selectBox" component.
 * You should use it with caution as it may still contain bugs!
 *
 */
export default {
    name: 'BaseSelectBox',
    props: {
        /**
         * Set this to true if you want to render the component as a "multi-select" box,
         * that allows you to select multiple items as an array
         */
        isMultiSelect: {
            type: Boolean,
            default: false
        },
        /**
         * The value/list of values to set for this component.
         * Normally injected via v-model.
         *
         * It should be an array of values when "isMultiSelect" is set to true,
         * or a single value if "isMultiSelect" is set to false.
         *
         * The value will be automatically converted into objects,
         * so you can either pass the values as String/Number or as object literal.
         * If an object is given you can use itemText and itemValue to determine
         * the correct properties to read from your value.
         */
        value: {
            type: [Array, Object, String, Number],
            default: function () {
                return this.isMultiSelect === true ? [] : null;
            }
        },

        /**
         * The list of items that should be
         */
        items: Array,

        /**
         * A placeholder to display as long as there is no value selected
         */
        placeholder: String,

        /**
         * Used for "is-multi-select" fields to overwrite the placeholder
         * when the box contains selected items. If not given,
         * the default placeholder is shown
         */
        multiSelectAltPlaceholder: String,

        /**
         * If "items" contains an array of objects, this prop is used to select the object's property
         * which should be used as a label.
         */
        itemText: {
            type: String,
            default: 'label',
            note: 'property in item for text.'
        },

        /**
         * If "items" contains an array of objects, this prop is used to select the object's property
         * which should be used as a value.
         */
        itemValue: {
            type: String,
            default: 'value',
            note: 'property in item for value.'
        },

        // @todo implement this
        // disableFilterSearch: {
        // 	type: Boolean,
        // 	default: false
        // },
        // maxMultiInput: {
        // 	type: Number,
        // 	default: 2
        // },

        displayAsChip: {
            type: Boolean,
            default: false
        },

        /**
         * Optional: Allows you to inject a custom checkbox component
         * with your own style if required
         */
        checkboxComponent: {
            type: Object,
            default: () => Checkbox
        },

        /**
         * Optional: Allows you to inject a custom input field component
         * with your own style if required
         */
        inputFieldComponent: {
            type: Object,
            default: () => InputField
        },

        /**
         * Optional: Allows you to inject a custom chips component
         * with your own style if required
         */
        chipsComponent: {
            type: Object,
            default: () => Chips
        },

        /**
         * set error message in span
         * css class: baseSelectBox__error
         */
        error: {
            type: String
        }
    },
    data()
    {
        return {
            proxy: new ComponentProxy(this),

            searchInput: '',
            isMenuShown: false,
            firstKeyPress: true,
            keyStroke: 0,

            highlightedValue: null,
            preventNextBlur: false,
            closeMenuTimeout: 0,

            menuDirectionBottom: true,
            inputHeight: 0
        };
    },
    computed: {
        /**
         * The unified, comparable version of value,
         * because there are multiple optional input variants that should be handled correctly
         */
        preparedValue(): Array<PreparedItem> | PreparedItem | null
        {

            // Empty value
            if (isEmpty(this.value)) {
                return this.isMultiSelect ? [] : null;
            }

            // Find matching items for values
            const rawValueList = isArray(this.value) ? this.value : [this.value];
            const cleanValueList = [];
            forEach(rawValueList, value => {
                // Exact match
                if (this.filteredItems.indexOf(value) !== -1) {
                    cleanValueList.push(value);
                    return;
                }
                // Object with a value key
                if (isPlainObject(value)) {
                    const _val = getPath(value, [this.itemValue]);
                    if (!isUndefined(_val)) {
                        value = _val;
                    } else {
                        console.error('Invalid value given! The value key "' +
                                      this.itemValue + '" was not found on the input value:', value);
                    }
                }
                // Try to find the value in the list of items
                let found = false;
                forEach(this.filteredItems, (item: PreparedItem) => {
                    if (item.value === value || item.label === value) {
                        cleanValueList.push(item);
                        found = true;
                        return false;
                    }
                });
                if (!found) {
                    console.error('Invalid value given! The following value was not found in the list of items:', value);
                }
            });

            // Handle single/multi select lists
            if (this.isMultiSelect) {
                return cleanValueList;
            } else {
                return cleanValueList.shift();
            }
        },
        /**
         * The list of all items without any filter applied,
         * this is used to convert all incoming "items" to be comparable with each other.
         * @internal
         */
        preparedItems(): Array<PreparedItem>
        {
            // Make items comparable
            return map(this.items, (item) => {
                // Create an empty item
                const _item: PreparedItem = {
                    label: '',
                    labelLc: '',
                    value: null,
                    classes: {},
                    raw: item
                };

                // Convert simple string or number items
                if (!isPlainObject(item)) {
                    _item.label = item + '';
                    _item.value = _item.label;
                } else {
                    _item.label = getPath(item, [this.itemText], '') + '';
                    _item.value = getPath(item, [this.itemValue], item);
                }

                // Generate additional flags
                _item.labelLc = _item.label.toLowerCase();

                return _item;
            });
        },
        /**
         * The list of all items based on the current input value.
         */
        filteredItems()
        {
            this.forcedFilteredItemsUpdate;

            // Prepare working values
            const searchInputLc = (
                this.searchInput + ''
            ).toLowerCase();

            // First filter the items
            return filter(map(this.preparedItems, (item: PreparedItem) => {
                // Filter the items based on the query string
                if (item.labelLc.indexOf(searchInputLc) === -1) {
                    return null;
                }

                // Check if the item is currently highlighted
                const _item = {...item};
                _item.classes = {
                    'checkbox__label--highlighted': item.value === this.highlightedValue
                };

                return _item;
            }), v => v !== null);
        },
        searchFieldPlaceholder()
        {
            if (!isEmpty(this.preparedValue)) {
                if (this.isMultiSelect) {
                    return isString(this.multiSelectAltPlaceholder) ?
                        this.multiSelectAltPlaceholder : this.placeholder;
                }
                return this.preparedValue.label;
            } else {
                return this.placeholder;
            }
        },
        searchValueOrPlaceholder: {
            get: function () {
                if (this.isMenuShown) {
                    return this.searchInput;
                }

                if (this.isMultiSelect) {
                    return '';
                }

                if (isEmpty(this.preparedValue)) {
                    return this.placeholder;
                }

                return this.preparedValue.label;
            },
            set: function (value) {

                // Update the search input if required
                if (this.isMenuShown) {
                    this.searchInput = value;
                }

                // Update the value
                forEach(this.preparedItems, (item: PreparedItem) => {
                    if (value === this.highlightedValue) {
                        this.$emit('input', item);
                        return false;
                    }
                });
            }
        },
        chipList: {
            get: function () {
                if (isEmpty(this.preparedValue)) {
                    return [];
                }
                return isArray(this.preparedValue) ? this.preparedValue : [this.preparedValue];
            },
            set: function (newChipItems) {
                const valueFiltered = [];
                const newValues = getPath(newChipItems, ['*', 'value'], []);
                forEach(this.preparedValue, (item: PreparedItem) => {
                    if (newValues.indexOf(item.value) !== -1) {
                        valueFiltered.push(item);
                    }
                });
                this.$emit('input', valueFiltered);
            }
        },
        menuClasses()
        {
            return {
                'baseSelectBox__menu--show': this.isMenuShown
            };
        },
        menuStyles()
        {
            return {
                bottom: !this.menuDirectionBottom ? this.inputHeight + 'px' : ''
            };
        }
    },
    methods: {

        /**
         * Shows the dropdown menu
         */
        showMenu()
        {
            clearTimeout(this.closeMenuTimeout);
            this.isMenuShown = true;
        },

        /**
         * Closes the dropdown menu and resets the search input
         */
        hideMenu()
        {
            clearTimeout(this.closeMenuTimeout);
            this.closeMenuTimeout = setTimeout(() => {
                this.searchInput = '';
                this.firstKeyPress = true;
                this.highlightedValue = null;
                this.isMenuShown = false;
                this.keyStroke = 0;
            }, 40);
        },

        singleSelectItemClasses(item: PreparedItem)
        {
            return {
                'baseSelectBox__item--highlighted': item.value === this.highlightedValue
            };
        },

        onSingleSelectItemClick(item: PreparedItem)
        {
            clearTimeout(this.closeMenuTimeout);
            this.$emit('input', item);
        },

        onDeleteKeyDown()
        {
            if (
                !this.isMultiSelect ||
                this.searchInput !== '' ||
                isEmpty(this.value)
            ) {
                return;
            }

            const valueClone = [...this.preparedValue];
            valueClone.pop();
            this.$emit('input', valueClone);
        },

        onEnterKeyDown()
        {
            if (this.firstKeyPress) {
                return;
            }

            if (this.isMultiSelect) {
                if (isUndefined(this.$refs.checkboxList)) {
                    return;
                }

                // Search the correct item on the checkbox component
                const checkboxList = this.$refs.checkboxList;
                const targetItem = this.filteredItems[this.keyStroke];
                forEach(checkboxList.prepareItems, (item: PlainObject) => {
                    if (item.value === targetItem.value) {
                        checkboxList.updateValue(item);
                        return false;
                    }
                });
                return;
            } else {
                // Emit the input event
                if (this.highlightedValue === null) {
                    return;
                }
                forEach(this.preparedItems, (item: PreparedItem) => {
                    if (item.value === this.highlightedValue) {
                        this.searchInput = '';
                        this.hideMenu();
                        this.$emit('input', item);
                        return false;
                    }
                });
            }
        },

        onUpDownKeyDown(down: boolean)
        {
            this.showMenu();
            if (!this.firstKeyPress) {
                this.keyStroke += down === true ? 1 : -1;
                this.keyStroke = Math.max(0, Math.min(this.keyStroke, this.filteredItems.length - 1));
            }
            this.firstKeyPress = false;

            // Update the highlight list
            const item = this.filteredItems[this.keyStroke];
            this.highlightedValue = item.value;
        },

        onMultiSelectCheckboxInput(val)
        {
            this.preventNextBlur = true;
            // Translate the items
            const newValues = getPath(val, ['*', 'value'], []);
            this.$emit('input',
                this.preparedItems.filter((item: PreparedItem) =>
                    newValues.indexOf(item.value) !== -1));
        },

        onInputFocus()
        {
            this.showMenu();
        },

        onDocumentClick()
        {
            this.hideMenu();
        },

        onInputBlur()
        {
            if (this.preventNextBlur) {
                this.preventNextBlur = false;
                return;
            }
            this.hideMenu();
        },

        checkMenuDirection()
        {

            if (isUndefined(this.$refs.selectBoxMenu)
                || isUndefined(this.$refs.selectBoxInput)
                || !isBrowser()
                || isEmpty(this.$refs.selectBoxInput.$el)) {
                return;
            }

            const $inputEl = this.$refs.selectBoxInput.$el;
            this.inputHeight = $inputEl.scrollHeight;
            const inputOffset = isNull($inputEl.offsetParent) ? 0 : $inputEl.offsetParent.offsetTop;
            const remainingHeight = window.innerHeight - inputOffset;

            const $menuEl = this.$refs.selectBoxMenu;
            const menuStyle = $menuEl.style;
            const displayBackup = menuStyle.display;
            const visibilityBackup = menuStyle.visibility;

            menuStyle.display = 'block';
            menuStyle.visibility = 'hidden';

            let menuHeight = $menuEl.scrollHeight;

            menuStyle.display = displayBackup;
            menuStyle.visibility = visibilityBackup;

            return this.menuDirectionBottom = menuHeight >= inputOffset || remainingHeight >= menuHeight;
        }
    },
    mounted()
    {
        this.checkMenuDirection();

        this.proxy.bind(window, 'resize', () => this.checkMenuDirection());
        this.proxy.bind(window, 'scroll', () => this.checkMenuDirection());
    },
    watch: {
        isMenuShown(n, o)
        {
            if (n === o) {
                return;
            }
            if (n) {
                this.proxy.bind(document, 'click', () => this.onDocumentClick());
            } else {
                this.proxy.unbind(document, 'click', () => this.onDocumentClick());
            }
        }
    },
    beforeDestroy(): void
    {
        this.proxy.destroy();
    }
};
</script>

<style lang="sass" src="./BaseSelectBox.sass"></style>
