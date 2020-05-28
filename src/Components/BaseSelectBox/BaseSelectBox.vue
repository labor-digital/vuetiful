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
	<div class="baseSelectBox">
		<div class="baseSelectBox__container">
			<div class="baseSelectBox__containerInput">
				<span v-if="isMultiSelect && !displayAsChip" class="baseSelectBox__chips" v-for="item in chipList">{{item}}</span>
				<chips v-if="displayAsChip && isMultiSelect" class="baseSelectBox__chips" :items="chipList"></chips>
				<input-field v-model="searchInput"
							 class="baseSelectBox__input"
							 :placeholder="placeholder"
							 @focus="inputFocus"
							 @blur="inputBlur"
							 @input="isFilter = true"
							 @keydown.enter.native="onEnterKey"
							 @keydown.down.native="selectItem('down')"
							 @keydown.up.native="selectItem('up')"
							 @keydown.delete.native="backspaceDelete"/>
			</div>
			<transition name="fade">
				<div v-show="showMenu" class="baseSelectBox__menu" :class="menuClasses">
					<slot name="beforeItems"/>
					<div class="baseSelectBox__menuInner"
						 @focusout="inputBlur"
						 tabindex="0">
						<checkbox v-if="isMultiSelect" v-model="multiInput" :items="filteredList" class="baseSelectBox__item baseSelectBox__item--checkbox"
								  @click.native="showMenu = true" @input="searchInput = ''"/>
						<span v-if="!isMultiSelect" v-for="(item,index) in filteredList" class="baseSelectBox__item" :ref="'item-'+index"
							  @click="selectedItem(item)">
					{{item}}
					</span>
					</div>
					<slot name="afterItems"/>
				</div>
			</transition>
		</div>
	</div>
</template>

<script lang="ts">
	import {forEach} from "@labor-digital/helferlein/lib/Lists/forEach";
	import {isEmpty} from "@labor-digital/helferlein/lib/Types/isEmpty";
	import {isUndefined} from "@labor-digital/helferlein/lib/Types/isUndefined";
	import Checkbox from "../Checkbox/Checkbox.vue";
	import Chips from "../Chips/Chips";
	import InputField from "../InputField/InputField.vue";
	
	export default {
		name: "BaseSelectBox",
		components: {Checkbox, InputField, Chips},
		props: {
			value: Array,
			items: Array,
			placeholder: String,
			isMultiSelect: {
				type: Boolean,
				default: false
			},
			disableFilterSearch: {
				type: Boolean,
				default: false
			},
			maxMultiInput: {
				type: Number,
				default: 2
			},
			displayAsChip: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				searchInput: "",
				multiInput: [],
				showMenu: false,
				firstKeyPress: true,
				keyStroke: 0,
				isFilter: false,
				loading: false
			};
		},
		computed: {
			filteredList() {
				if (this.isMultiSelect) {
					let filteredMultiSelect = [];
					forEach(this.items, item => {
						filteredMultiSelect.push({label: item, show: item.toLowerCase().includes(this.searchInput.toLowerCase())});
					});
					return filteredMultiSelect;
				}
				
				return this.items.filter(item => {
					return item.toLowerCase().includes(this.searchInput.toLowerCase());
				});
			},
			chipList: {
				get: function () {
					let tempChips = [];
					forEach(this.multiInput, item => {
						tempChips.push(item.label);
					});
					return tempChips;
				},
				set: function (newValue) {
					forEach(this.multiInput, (item, index) => {
						if (item.label === newValue[index]) return;
						this.multiInput.splice(index, 1);
					});
				}
			},
			menuClasses() {
				return {
					"baseSelectBox__menu--show": this.hasMenu
				};
			},
			hasMenu() {
				return this.showMenu && !this.loading;
			}
		},
		methods: {
			showMenuHandler() {
				if (this.hasMenu) return;
				this.showMenu = true;
			},
			inputFocus() {
				this.showMenuHandler();
			},
			inputBlur() {
				this.firstKeyPress = true;
				if (isEmpty(this.searchInput)) this.isFilter = true;
				this.showMenu = false;
				this.isFilter = false;
				this.keyStroke = 0;
			},
			selectedItem(item) {
				if (!isUndefined(item.label) || !isEmpty(item.label)) this.searchInput = item.label;
				else this.searchInput = item;
			},
			backspaceDelete({which}) {
				which == 8 && this.searchInput === "" && this.multiInput.splice(this.multiInput.length - 1);
			},
			onEnterKey() {
				if (this.isMultiSelect) return;
				this.searchInput = this.filteredList[this.keyStroke];
			},
			selectItem(k) {
				if (this.isMultiSelect) return;
				this.showMenuHandler();
				if (this.firstKeyPress) this.firstKeyPress = false;
				else {
					if (k === "down") this.keyStroke++;
					else this.keyStroke--;
				}
				if (this.keyStroke < 0) this.keyStroke = 0;
				if (this.keyStroke > this.filteredList.length - 1) this.keyStroke = this.filteredList.length - 1;
				
				forEach(this.filteredList, (item, index) => {
					this.$refs["item-" + index][0].classList.remove("baseSelectBox__item--selected");
				});
				
				this.$refs["item-" + this.keyStroke][0].classList.add("baseSelectBox__item--selected");
			}
		}
	};
</script>

<style scoped lang="sass" src="./BaseSelectBox.sass"></style>