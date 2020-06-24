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
                <!-- Renders either chips or the list of selected entries -->
                <span v-if="isMultiSelect && !displayAsChip"
                      class="baseSelectBox__chips"
                      v-for="item in chipList">
                    {{item.label}}
                </span>
                <component :is="chipsComponent"
                           v-if="isMultiSelect && displayAsChip"
                           class="baseSelectBox__chips"
                           v-model="chipList"
                />
                
                <!-- The search inputfield -->
                <component :is="inputFieldComponent"
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
            </div>
            <transition name="fade">
                <div v-show="isMenuShown" class="baseSelectBox__menu" :class="menuClasses">
                    <slot name="beforeItems"/>
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
                            <slot name="singleSelectItem" :item="item">
					            {{item.label}}
                            </slot>
					    </span>
                    </div>
                    <slot name="afterItems"/>
                </div>
            </transition>
        </div>
    </div>
</template>

<script lang="ts">
	import {PlainObject} from "@labor-digital/helferlein/lib/Interfaces/PlainObject";
	import {filter} from "@labor-digital/helferlein/lib/Lists/filter";
	import {forEach} from "@labor-digital/helferlein/lib/Lists/forEach";
	import {map} from "@labor-digital/helferlein/lib/Lists/map";
	import {getPath} from "@labor-digital/helferlein/lib/Lists/Paths/getPath";
	import {isArray} from "@labor-digital/helferlein/lib/Types/isArray";
	import {isEmpty} from "@labor-digital/helferlein/lib/Types/isEmpty";
	import {isPlainObject} from "@labor-digital/helferlein/lib/Types/isPlainObject";
	import {isUndefined} from "@labor-digital/helferlein/lib/Types/isUndefined";
	import Checkbox from "../Checkbox/Checkbox.vue";
	import Chips from "../Chips/Chips.vue";
	import InputField from "../InputField/InputField.vue";
	
	interface PreparedItem {
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
		name: "BaseSelectBox",
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
			 * If "items" contains an array of objects, this prop is used to select the object's property
			 * which should be used as a label.
			 */
			itemText: {
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
			}
		},
		data() {
			return {
				searchInput: "",
				isMenuShown: false,
				firstKeyPress: true,
				keyStroke: 0,
				
				highlightedValue: null,
				preventNextBlur: false,
				closeMenuTimeout: 0
			};
		},
		computed: {
			/**
			 * The unified, comparable version of value,
			 * because there are multiple optional input variants that should be handled correctly
			 */
			preparedValue(): Array<PreparedItem> | PreparedItem | null {
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
							console.error("Invalid value given! The value key \"" +
								this.itemValue + "\" was not found on the input value:", value);
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
						console.error("Invalid value given! The following value was not found in the list of items:", value);
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
			preparedItems(): Array<PreparedItem> {
				// Make items comparable
				return map(this.items, (item) => {
					// Create an empty item
					const _item: PreparedItem = {
						label: "",
						labelLc: "",
						value: null,
						classes: {},
						raw: item
					};
					
					// Convert simple string or number items
					if (!isPlainObject(item)) {
						_item.label = item + "";
						_item.value = _item.label;
					} else {
						_item.label = getPath(item, [this.itemText], "") + "";
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
			filteredItems() {
				this.forcedFilteredItemsUpdate;
				
				// Prepare working values
				const searchInputLc = (this.searchInput + "").toLowerCase();
				
				// First filter the items
				return filter(map(this.preparedItems, (item: PreparedItem) => {
					// Filter the items based on the query string
					if (!item.labelLc.includes(searchInputLc))
						return null;
					
					// Check if the item is currently highlighted
					const _item = {...item};
					_item.classes = {
						"checkbox__label--highlighted": item.value === this.highlightedValue
					};
					
					return _item;
				}), v => v !== null);
			},
			searchFieldPlaceholder() {
				if (!this.isMultiSelect) {
					if (!isEmpty(this.preparedValue)) {
						return this.preparedValue.label;
					} else {
						return this.placeholder;
					}
				}
			},
			searchValueOrPlaceholder: {
				get: function () {
					if (this.isMenuShown) {
						return this.searchInput;
					}
					
					if (this.isMultiSelect) {
						return "";
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
							this.$emit("input", item);
							return false;
						}
					});
				}
			},
			chipList: {
				get: function () {
					if (isEmpty(this.preparedValue)) return [];
					return isArray(this.preparedValue) ? this.preparedValue : [this.preparedValue];
				},
				set: function (newChipItems) {
					const valueFiltered = [];
					const newValues = getPath(newChipItems, ["*", "value"], []);
					forEach(this.preparedValue, (item: PreparedItem) => {
						if (newValues.indexOf(item.value) !== -1) {
							valueFiltered.push(item);
						}
					});
					this.$emit("input", valueFiltered);
				}
			},
			menuClasses() {
				return {
					"baseSelectBox__menu--show": this.isMenuShown
				};
			}
		},
		methods: {
			showMenu() {
				clearTimeout(this.closeMenuTimeout);
				this.isMenuShown = true;
			},
			singleSelectItemClasses(item: PreparedItem) {
				return {
					"baseSelectBox__item--highlighted": item.value === this.highlightedValue
				};
			},
			onInputFocus() {
				this.showMenu();
			},
			onInputBlur() {
				if (this.preventNextBlur) {
					this.preventNextBlur = false;
					return;
				}
				this.closeMenuTimeout = setTimeout(() => {
					this.searchInput = "";
					this.firstKeyPress = true;
					this.highlightedValue = null;
					this.isMenuShown = false;
					this.keyStroke = 0;
				}, 40);
			},
			onSingleSelectItemClick(item: PreparedItem) {
				clearTimeout(this.closeMenuTimeout);
				this.$emit("input", item);
			},
			onDeleteKeyDown() {
				if (
					!this.isMultiSelect ||
					this.searchInput !== "" ||
					isEmpty(this.value)
				) return;
				
				const valueClone = [...this.preparedValue];
				valueClone.pop();
				this.$emit("input", valueClone);
			},
			onEnterKeyDown() {
				if (this.firstKeyPress) return;
				
				if (this.isMultiSelect) {
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
							this.searchInput = "";
							this.onInputBlur();
							this.$emit("input", item);
							return false;
						}
					});
				}
			},
			onUpDownKeyDown(down: boolean) {
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
			onMultiSelectCheckboxInput(val) {
				this.preventNextBlur = true;
				// Translate the items
				const newValues = getPath(val, ["*", "value"], []);
				this.$emit("input",
					this.preparedItems.filter((item: PreparedItem) =>
						newValues.indexOf(item.value) !== -1));
			},
			onDocumentClick() {
				this.onInputBlur();
			}
		},
		watch: {
			isMenuShown(n, o) {
				if (n === o) {
					return;
				}
				if (n) {
					document.addEventListener("click", this.onDocumentClick);
				} else {
					document.removeEventListener("click", this.onDocumentClick);
				}
			}
		},
		destroyed(): void {
			document.removeEventListener("click", this.onDocumentClick);
		}
	};
</script>

<style lang="sass" src="./BaseSelectBox.sass"></style>