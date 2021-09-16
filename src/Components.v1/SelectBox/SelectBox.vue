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
  - Last modified: 2020.04.24 at 16:44
  -->

<!--
DEPRECATED
================================
This component is deprecated use BaseSelectBox instead!
It will be removed in the next major version!
-->
<template>
    <div ref="IZ-select" :tabindex="disableSearch ? 0 : -1"
         :class="{
				'selectBox': true,
				'selectBox--withValue': inputValue,
				...(size === SIZES.DEFAULT ? null : ({ ['selectBox--' + size]: true }))}"

         @keydown.up="onSelectByArrow"
         @keydown.down="onSelectByArrow"
         @keydown.enter="onEnter"
         @keydown.tab.esc="setBlured"
         @mousedown="onClick"
         @focus="setFocused">
        <div class="selectBox__inputWrap">
            <!-- @slot Used to add additional content before the input field is rendered -->
            <slot name="input-before"/>

            <div ref="IZ-select__input"
                 :class="{
						'selectBox__input': true,
						'selectBox__input--focused': focused,
						'selectBox__input--hasMenu': hasMenu,
						'selectBox__input--hasError': hasError,
						'selectBox__input--successful': successful,
						'selectBox__input--selectionSlot': showSelectionSlot,
						'selectBox__input--disabled': disabled,
						'selectBox__input--readonly': readonly}"
                 :style="inputStyles">

                <!-- @slot additional content at the beginning of the input field -->
                <slot name="input-start"/>


                <slot v-if="showSelectionSlot" :item="selectedItem" name="selection"/>

                <input v-if="simpleInput" ref="IZ-select__input-for-text"
                       v-bind="{
							value,
							placeholder,
							class: inputForTextClass,
							disabled,
							readonly,
							tabindex: 0,
							type: 'text',
							autocomplete: 'new-password',
							...inputElCustomAttributes,
							style: inputForTextStyles,}"

                       @keyup="onSearchKeyUp"
                       @keydown="onSearchKeyDown"
                       @input="$emit('input', $event.target.value)"
                       @mousedown="onClick"
                       @focus="setFocused(true)">
                <input v-else ref="IZ-select__input-for-text"
                       v-bind="{
							value: inputValue,
							placeholder,
							class: inputForTextClass,
							disabled: disableSearch || disabled,
							readonly,
							tabindex: disableSearch ? -1 : 0,
							type: 'text',
							role: 'combobox',
							autocomplete: 'new-password',
							...inputElCustomAttributes,
							style: inputForTextStyles,}"

                       @keyup="onSearchKeyUp"
                       @keydown="onSearchKeyDown"
                       @input="onSearch"
                       @mousedown="onClick"
                       @focus="setFocused(true)">

                <!-- @slot additional content at the end of the input field -->
                <slot name="input-end"/>
            </div>

            <!-- @slot Used to add additional content after the input field was rendered -->
            <slot name="input-after"/>
        </div>

        <template v-if="!simpleInput">
            <div v-for="menuPos of [MENU_POSITIONS.TOP, MENU_POSITIONS.BOTTOM]"
                 :key="'menu-position-' + menuPos"
                 :ref="'IZ-select__menu-' + menuPos"
                 :style="{
						'pointer-events': hasMenu ? 'auto' : 'none',
						...getMenuDynamicStyles(menuPos)}"
                 :class="{
						[`selectBox__menu selectBox__menu--at-${menuPos}`]: true,
						'selectBox__menu--disableSearch': disableSearch }">

                <!-- @slot Used to add additional content before the list of items -->
                <slot name="before-items-fixed"/>

                <div ref="IZ-select__menu-items"
                     :style="{'max-height': menuItemsMaxHeight}"
                     class="selectBox__menuItems"
                     @scroll="onScroll">

                    <!-- @slot Used to add additional content as the first element before
                    the other items in the list -->
                    <slot name="before-items">
                        <div style="height: 8px;"/>
                    </slot>

                    <!--itemsComputedWithScrollLimit-->
                    <div v-for="(item, i) in itemsComputed"
                         v-show="i < scrollItemsLimitCurrent || (arrowsIndex && i <= arrowsIndex)"
                         ref="items"
                         :key="'IZ-item-' + i"
                         :class="{
							  'selectBox__item': true,
							  'selectBox__item--selected': isItemSelected(item)}"

                         @click="onClickSelectItem(item)">

                        <!-- @slot the template of a single item in the option list-->
                        <slot :item="item" name="item">
							<span>
								{{ getItemText(item) }}
							</span>
                        </slot>
                    </div>

                    <div v-if="!itemsComputed.length && !loading" class="selectBox__noData">

                        <!-- @slot The label that is shown when no items were found based on the given search string -->
                        <slot name="no-data">
                            {{ noDataLabel }}
                        </slot>
                    </div>

                    <!-- @slot Used to add additional content as the first element after the
                    other items in the list -->
                    <slot name="after-items">
                        <div style="height: 8px;"/>
                    </slot>
                </div>

                <!-- @slot Used to add additional content after the list of items -->
                <slot name="after-items-fixed"/>

                <div style="position: absolute; top: 0; left: 0; right: 0;">
                    <slot name="before-items-fixed-absolute"/>
                </div>
                <div style="position: absolute; bottom: 0; left: 0; right: 0;">
                    <slot name="after-items-fixed-absolute"/>
                </div>
            </div>
        </template>

        <transition name="fade">
            <div v-show="errorMessage" class="selectBox__error">

                <!-- @slot The template of an error message -->
                <slot :errorMessage="errorMessage" name="error">
                    {{ errorMessage }}
                </slot>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import {CoolSelect} from 'vue-cool-select';
import {MENU_POSITIONS, SIZES} from 'vue-cool-select/src/constants';


/**
 * This component is a multi-purpose select box that works either as a normal select field
 * or an auto-complete including API requests.
 *
 * Under the hood we use [Cool Select](https://github.com/iliyaZelenko/vue-cool-select) for the business logic,
 * but we adjusted the CSS class names to match the naming schema of our other components.
 *
 * You can use the [official documentation](https://iliyazelenko.github.io/vue-cool-select/#/) as a reference for the usage.
 */
export default {
    name: 'SelectBox',
    extends: CoolSelect,
    props: {
        /**
         * The selected value for v-model
         */
        value: {
            type: null,
            default: () => null,
            note: 'value for "v-model".'
        },
        /**
         * A static array of suggestions (data fetched from backend, etc)
         */
        items: {
            type: Array,
            default: () => [],
            required: false,
            note: 'array of suggestions (data fetched from backend, etc).'
        },
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
            default: 'value', // значит вернуть весь объект, 'value'
            note: 'property in item for value.'
        },
        /**
         * A placeholder to display as long as there is no value selected
         */
        placeholder: {
            type: String,
            default: null,
            note: 'placeholder for input.'
        },
        /**
         * Set this to TRUE to tell the auto-complete that you are currently loading data.
         * If this is TRUE the dropdown will NOT show the "no-data" slot.
         */
        loading: {
            type: Boolean,
            default: false,
            note: 'display the loading indicator.'
        },
        /**
         * Set this to TRUE to disable the user interaction with the auto-complete field
         */
        disabled: {
            type: Boolean,
            default: false,
            note: 'disable the select.'
        },
        /**
         * Set this to TRUE to mark this
         */
        readonly: {
            type: Boolean,
            default: false,
            note: 'readonly state.'
        },

        /**
         * An optional callback which can be used to filter the items in the list.
         * By default all entries will be removed that don't match a part of the current query text
         */
        filter: {
            type: Function,
            default: (item, queryText, itemText) => {
                const hasValue = val => val != null ? val : '';

                const text = hasValue(itemText);
                const query = hasValue(queryText);

                return text.toString()
                           .toLowerCase()
                           .indexOf(query.toString().toLowerCase()) > -1;
            },
            note: 'filter function for search.'
        },
        /**
         * Can be used to programmatically modify the currently active search query.
         * The search query is NOT the same as the current value. The current value will only be
         * updated if the search is confirmed
         */
        searchText: {
            type: String,
            default: '',
            note: 'search string for input, you can use this with ".sync" modifier.'
        },
        /**
         * Additional html attributes to pass to the input element.
         * Please note that the "style" attribute can not be overwritten!
         */
        inputElCustomAttributes: {
            type: Object,
            default: () => (
                {}
            ),
            note: 'you can pass your attributes to the input element. Note: the attributes that are used by the component itself inside are not available, for example, "style".'
        },
        /**
         * If you set this to TRUE the element will be handled like a normal select box,
         * meaning you don't have an autocomplete field
         */
        disableSearch: {
            type: Boolean,
            default: false,
            note: 'disable search input element.'
        },
        /**
         * If you set this to true the items in the dropdown will not get filtered while you type.
         * This can be used if you query the results from a server instead of a fixed option list.
         */
        disableFilteringBySearch: {
            type: Boolean,
            default: false,
            note: 'disable filtering by search (you can use search for manually getting items).'
        },
        /**
         * You can set this to FALSE if you want the search field to be blured when the dropdown
         * is closed
         */
        resetSearchOnBlur: {
            type: Boolean,
            default: true,
            note: 'reset search on blur event.'
        },
        /**
         * The maximal height of the dropdown menu height as a CSS definition -> MUST INCLUDE px or rem...
         */
        menuItemsMaxHeight: {
            type: String,
            default: '300px',
            note: 'max menu height (any css value).'
        },
        /**
         * An error message to show below the field if your input validation failed
         */
        errorMessage: {
            type: String,
            default: null
        },
        /**
         * If this is set to TRUE the selectBox--successful class is toggled.
         */
        successful: {
            type: Boolean,
            default: false,
            note: 'does the component have a successful state. If true, then apply green colors.'
        },
        /**
         * The default position to show the dropdown / dropup menu at.
         * Can be either "top" | "bottom"
         */
        menuDefaultPosition: {
            type: String,
            default: MENU_POSITIONS.BOTTOM,
            note: 'sets menu\'s default position'
        },
        /**
         * Set this to false if you want to manually set the menu position
         * instead of letting the script choose where to display it
         */
        menuDynamicPosition: {
            type: Boolean,
            default: true,
            note: 'sets the dynamic position behavior for the menu (based on viewport)'
        },
        /**
         * Set this to true if you don't want a dropdown of options.
         * NOTE: This will only work if you use v-model to store the data! Otherwise the field
         * will always snap back to an empty state after it looses focus
         */
        simpleInput: {
            type: Boolean,
            default: false,
            note: 'works as simple input (no menu)'
        },
        /**
         * A string that should be shown if no data was found based on the options
         */
        noDataLabel: {
            type: String,
            default: 'No data found'
        },
        /**
         * Additional css style rules to add to the outer wrapper div
         */
        inputStyles: {
            type: Object,
            default: () => (
                {}
            ),
            note: 'custom styles for the input field. You can specify dynamic styles.'
        },
        /**
         * (?) Observer pattern, helps manage events from parent to child.
         */
        eventEmitter: {
            type: Object,
            note: 'Observer pattern, helps manage events from parent to child.'
        },
        /**
         * (?) the initial limit of the displayed items to scroll. So that there are not many elements in the scrolling at the beginning. Also see scrollItemsLimitAddAfterScroll prop.
         */
        scrollItemsLimit: {
            type: Number,
            default: 20,
            note: 'the initial limit of the displayed items to scroll. So that there are not many elements in the scrolling at the beginning. Also see scrollItemsLimitAddAfterScroll prop.'
        },
        /**
         * (?) the number of items added to the scrollItemsLimit prop after scrolling to the end of the scroll. Also see scrollItemsLimitAddAfterScroll prop.
         */
        scrollItemsLimitAddAfterScroll: {
            type: Number,
            default: 10,
            note: 'the number of items added to the scrollItemsLimit prop after scrolling to the end of the scroll. Also see scrollItemsLimitAddAfterScroll prop.'
        },
        /**
         * (?) disable the selection of the first item from the list of items in menu when to press enter (when no item is selected).
         */
        disableFirstItemSelectOnEnter: {
            type: Boolean,
            default: false,
            note: 'disable the selection of the first item from the list of items in menu when to press enter (when no item is selected).'
        },
        /**
         * (?) to scroll to an item if it has moved beyond the scroll bar.
         */
        scrollToItemIfNeeded: {
            type: Boolean,
            default: true,
            note: 'to scroll to an item if it has moved beyond the scroll bar.'
        },
        /**
         * (?) custom "class" attribute for the input field. You can specify dynamic class.
         */
        inputForTextClass: {
            type: [Array, String, Object],
            default: () => '',
            note: 'custom "class" attribute for the input field. You can specify dynamic class.'
        },
        /**
         * (?) if true, fully select a chosen item on focus so the user can instantly search for a new item.
         */
        selectTextOnFocus: {
            type: Boolean,
            default: false,
            note: 'if true, fully select a chosen item on focus so the user can instantly search for a new item.'
        },
        /**
         * (?) sets size
         */
        size: {
            type: String,
            default: SIZES.DEFAULT,
            note: 'sets size'
        },
        /**
         * (?) allow scrolling to an item on mobile devices.
         */
        allowMobileScroll: {
            type: Boolean,
            default: true,
            note: 'allow scrolling to an item on mobile devices.'
        },
        /**
         * (?) disable auto select when up or down with key arrow.
         */
        arrowsDisableInstantSelection: {
            type: Boolean,
            default: true,
            note: 'disable auto select when up or down with key arrow.'
        }
    }
};
</script>

<style lang="sass" src="./SelectBox.sass"></style>
