/*
 * Copyright 2020 LABOR.digital
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Last modified: 2020.11.20 at 17:10
 */
import {forEach} from '@labor-digital/helferlein';
import 'vue-class-component/hooks';
import VuDropdownItem from './Components/v2/Dropdown/Item/VuDropdownItem.vue';
import VuDropdownItemAbstract from './Components/v2/Dropdown/Item/VuDropdownItemAbstract.vue';
import VuDropdownItemTemplate from './Components/v2/Dropdown/Item/VuDropdownItemTemplate.vue';
import VuDropdownTrigger from './Components/v2/Dropdown/Trigger/VuDropdownTrigger.vue';
import VuDropdownTriggerAbstract from './Components/v2/Dropdown/Trigger/VuDropdownTriggerAbstract.vue';
import VuDropdownTriggerTemplate from './Components/v2/Dropdown/Trigger/VuDropdownTriggerTemplate.vue';
import VuDropdown from './Components/v2/Dropdown/VuDropdown.vue';
import VuDropdownAbstract from './Components/v2/Dropdown/VuDropdownAbstract.vue';
import VuDropdownTemplate from './Components/v2/Dropdown/VuDropdownTemplate.vue';
import VuFormInput from './Components/v2/FormInput/VuFormInput.vue';
import VuFormInputAbstract from './Components/v2/FormInput/VuFormInputAbstract.vue';
import VuFormInputTemplate from './Components/v2/FormInput/VuFormInputTemplate.vue';
import VuFormRangeSlider from './Components/v2/FormRangeSlider/VuFormRangeSlider.vue';
import VuFormRangeSliderAbstract from './Components/v2/FormRangeSlider/VuFormRangeSliderAbstract.vue';
import VuFormRangeSliderTemplate from './Components/v2/FormRangeSlider/VuFormRangeSliderTemplate.vue';
import VuFormTypeahead from './Components/v2/FormTypeahead/VuFormTypeahead.vue';
import VuFormTypeaheadAbstract from './Components/v2/FormTypeahead/VuFormTypeaheadAbstract.vue';
import VuFormTypeaheadTemplate from './Components/v2/FormTypeahead/VuFormTypeaheadTemplate.vue';
import VuLinkTag from './Components/v2/LinkTag/VuLinkTag.vue';
import VuLinkTagAbstract from './Components/v2/LinkTag/VuLinkTagAbstract.vue';
import VuLinkTagTemplate from './Components/v2/LinkTag/VuLinkTagTemplate.vue';

// Reexport all ts interfaces
export * from './Components/v2/Dropdown/VuDropdownApi';
export * from './Components/v2/FormInput/VuFormInput.interfaces';
export * from './Components/v2/FormRangeSlider/VuFormRangeSlider.interfaces';
export * from './Components/v2/LinkTag/VuLinkTag.interfaces';

// Reexport component defaults
export {
    VuDropdown,
    VuDropdownAbstract,
    VuDropdownTemplate,

    VuDropdownItem,
    VuDropdownItemAbstract,
    VuDropdownItemTemplate,

    VuDropdownTrigger,
    VuDropdownTriggerAbstract,
    VuDropdownTriggerTemplate,

    VuFormInput,
    VuFormInputAbstract,
    VuFormInputTemplate,

    VuFormTypeahead,
    VuFormTypeaheadAbstract,
    VuFormTypeaheadTemplate,

    VuFormRangeSlider,
    VuFormRangeSliderAbstract,
    VuFormRangeSliderTemplate,

    VuLinkTag,
    VuLinkTagAbstract,
    VuLinkTagTemplate
};

export default {
    install(Vue)
    {
        forEach([
            VuFormInput, VuDropdown, VuDropdownTrigger, VuFormTypeahead, VuDropdownItem, VuFormRangeSlider,
            VuLinkTag
        ], (component) => {
            Vue.component(component.name, component);
        });
    }
};
