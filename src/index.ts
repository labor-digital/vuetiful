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
import 'vue-class-component/hooks';
import VuDropdownItem from './Components/Dropdown/Item/VuDropdownItem.vue';
import VuDropdownItemAbstract from './Components/Dropdown/Item/VuDropdownItemAbstract';
import VuDropdownItemTemplate from './Components/Dropdown/Item/VuDropdownItemTemplate.vue';
import VuDropdownTrigger from './Components/Dropdown/Trigger/VuDropdownTrigger.vue';
import VuDropdownTriggerAbstract from './Components/Dropdown/Trigger/VuDropdownTriggerAbstract';
import VuDropdownTriggerTemplate from './Components/Dropdown/Trigger/VuDropdownTriggerTemplate.vue';
import VuDropdown from './Components/Dropdown/VuDropdown.vue';
import VuDropdownAbstract from './Components/Dropdown/VuDropdownAbstract';
import VuDropdownTemplate from './Components/Dropdown/VuDropdownTemplate.vue';
import VuFormInput from './Components/FormInput/VuFormInput.vue';
import VuFormInputAbstract from './Components/FormInput/VuFormInputAbstract';
import VuFormInputTemplate from './Components/FormInput/VuFormInputTemplate.vue';
import VuFormRangeSlider from './Components/FormRangeSlider/VuFormRangeSlider.vue';
import VuFormRangeSliderAbstract from './Components/FormRangeSlider/VuFormRangeSliderAbstract';
import VuFormRangeSliderTemplate from './Components/FormRangeSlider/VuFormRangeSliderTemplate.vue';
import VuFormTypeahead from './Components/FormTypeahead/VuFormTypeahead.vue';
import VuFormTypeaheadAbstract from './Components/FormTypeahead/VuFormTypeaheadAbstract';
import VuFormTypeaheadTemplate from './Components/FormTypeahead/VuFormTypeaheadTemplate.vue';
import VuLinkTag from './Components/LinkTag/VuLinkTag.vue';
import VuLinkTagAbstract from './Components/LinkTag/VuLinkTagAbstract';
import VuLinkTagTemplate from './Components/LinkTag/VuLinkTagTemplate.vue';

// Reexport all ts interfaces
export * from './Components/Dropdown/VuDropdownApi';
export * from './Components/FormInput/types';
export * from './Components/FormRangeSlider/types';
export * from './Components/LinkTag/types';

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

// export default {
//     install(Vue: VueConstructor)
//     {
//         [
//             VuFormInput, VuDropdown, VuDropdownTrigger, VuFormTypeahead, VuDropdownItem, VuFormRangeSlider,
//             VuLinkTag
//         ].forEach((component) => {
//             Vue.component(component!.name, component);
//         });
//     }
// };
