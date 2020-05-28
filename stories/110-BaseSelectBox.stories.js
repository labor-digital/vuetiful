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
 * Last modified: 2020.04.24 at 17:23
 */

import {boolean, object, withKnobs} from "@storybook/addon-knobs";
import BaseSelectBox from "../src/Components/BaseSelectBox/BaseSelectBox";
import "../src/Components/SelectBox/Storybook.sass";

// Global configuration of your component
export default {
	title: "BaseSelectBox",
	component: BaseSelectBox,
	decorators: [withKnobs]
};

// Create the stories
export const Default = () => {
	return ({
		components: {BaseSelectBox},
		template: "<base-select-box :items='inputs' :is-multi-select='MultiSelect' :display-as-chip='DisplayChip' placeholder='Foo :)'></base-select-box>",
		props: {
			inputs: {
				default: object("Input", [
					"Foo",
					"Bar",
					"Foba",
					"Test",
					"Drone",
					"Labor"
				])
			},
			MultiSelect: {
				default: boolean("MultiSelect?", false)
			},
			DisplayChip: {
				default: boolean("Display as chip?", false)
			}
		},
		data() {
			return {
				v: ""
			};
		}
	});
};