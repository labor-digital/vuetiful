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
  - Last modified: 2020.11.22 at 23:45
  -->

<template></template>

<script lang="ts">
import {isEmpty} from '@labor-digital/helferlein';
import {ComponentOptions} from 'vue';
import {Component, Mixins, Prop, Vue, Watch} from 'vue-property-decorator';
import {ListItemMixin, PreparedListItem} from '../../../Utils/Mixin/ListItemMixin';
import templateFactory from '../../../Utils/templateFactory';
import VuDropdownItem from '../Dropdown/Item/VuDropdownItem.vue';
import VuDropdown from '../Dropdown/VuDropdown.vue';
import VuFormInput from '../FormInput/VuFormInput.vue';
import VuFormInputAbstract from '../FormInput/VuFormInputAbstract.vue';
import VuFormTypeaheadTemplate from './VuFormTypeaheadTemplate.vue';

@Component({
    name: 'VuFormTypeaheadAbstract',
    extends: VuFormInputAbstract,
    components: {
        VuTemplate: templateFactory(VuFormTypeaheadTemplate)
    },
    mixins: [ListItemMixin]
})
export default class VuFormTypeaheadAbstract extends Mixins(VuFormInputAbstract, ListItemMixin)
{
    value: any;

    /**
     * Allows you to override the input component which is used for the typeahead field
     */
    @Prop({type: [Object, String], default: () => VuFormInput})
    readonly inputComponent: ComponentOptions<Vue>;

    /**
     * Allows you to override the dropdown component which is used for the typeahead
     */
    @Prop({type: [Object, String], default: () => VuDropdown})
    readonly dropdownComponent: ComponentOptions<Vue>;

    /**
     * Allows you to override the dropdown item component which is used for the typeahead
     */
    @Prop({type: [Object, String], default: () => VuDropdownItem})
    readonly dropdownItemComponent: ComponentOptions<Vue>;

    /**
     * A label that is shown while the list item resolver loads the required api data
     */
    @Prop({type: String, default: 'Loading...'})
    readonly loadingLabel: string;

    /**
     * If set to true the list item resolver will not show a loader while waiting for data
     */
    @Prop({type: Boolean, default: false})
    readonly noLoader: boolean;

    /**
     * True if the dropdown is currently open
     * @internal
     */
    public dropdownOpen: boolean = false;

    /**
     * The list of list items that have been filtered
     * @api
     */
    public get filteredListItems(): Array<PreparedListItem>
    {
        return this.applyValueFilter(this.preparedListItems, this.value);
    }

    /**
     * Returns true if the dropdown is currently open
     * @api
     */
    public get isDropdownOpen(): boolean
    {
        return this.dropdownOpen;
    }

    /**
     * Opens the dropdown if we have some contents to show
     * @api
     */
    public openDropdown(): void
    {
        if (!isEmpty(this.value) && (this.filteredListItems.length > 0 || this.isWaitingForResolver && !this.noLoader)) {
            if (!this.dropdownOpen) {
                this.dropdownOpen = true;
                this.$emit('open');
            }
        } else {
            this.closeDropdown();
        }
    }

    /**
     * Closes the dropdown if it is currently open
     * @api
     */
    public closeDropdown()
    {
        if (this.dropdownOpen) {
            this.dropdownOpen = false;
            this.$emit('close');
        }
    }

    @Watch('value')
    protected onValueChange(n)
    {
        this.triggerListItemResolver(n).then(() => this.openDropdown());
        this.$nextTick(() => this.openDropdown());
    }
}
</script>
