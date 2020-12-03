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
import {forEach} from '@labor-digital/helferlein/lib/Lists/forEach';
import 'vue-class-component/hooks';

// Import defaults and local components
import VuDropdown, {VuDropdownItem, VuDropdownTrigger} from './Components/v2/Dropdown/VuDropdown.vue';
import VuFormInput from './Components/v2/FormInput/VuFormInput.vue';
import VuFormRangeSlider from './Components/v2/FormRangeSlider/VuFormRangeSlider.vue';
import VuFormTypeahead from './Components/v2/FormTypeahead/VuFormTypeahead.vue';

// Reexport all child components
export * from './Components/v2/Dropdown/VuDropdown.vue';
export * from './Components/v2/FormInput/VuFormInput.vue';
export * from './Components/v2/FormTypeahead/VuFormTypeahead.vue';
export * from './Components/v2/FormRangeSlider/VuFormRangeSlider.vue';

// Reexport component defaults
export {VuDropdown, VuFormInput, VuFormTypeahead, VuFormRangeSlider};

export default {
    install(Vue)
    {
        forEach([
            VuFormInput, VuDropdown, VuDropdownTrigger, VuFormTypeahead, VuDropdownItem, VuFormRangeSlider
        ], (component) => {
            Vue.component(component.name, component);
        });
    }
};
