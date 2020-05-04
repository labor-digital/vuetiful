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
 * Last modified: 2020.04.27 at 15:43
 */

import {object, select, text, withKnobs} from "@storybook/addon-knobs";
import Radio from "../src/Components/Radio/Radio.vue";
import "../src/Components/SelectBox/Storybook.sass";

// Global configuration of your component
export default {
	title: "Radio",
	component: Radio,
	decorators: [withKnobs]
};

// Create the stories
export const Default = () => {
	return ({
		components: {Radio},
		template: `
			<div>
				<radio v-model="value" group-name="test-radio" :inputs="inputs" :label-side="labelSide" :error="error">
					{{label}}
				</radio>
				<span style="display:block;color:#888;margin-top: 50px">Emitted value: {{value}}</span></div>`,
		props: {
			inputs: {
				default: object("Input", [
					{label: "Test1"}, {label: "Test2"}, {label: "Test3"}
				])
			},
			labelSide: {
				default: select("Label side", {left: "left", right: "right"}, "right")
			},
			error: {
				/* Error message for input field after your validation failed */
				default: text("Error", "")
			}
		},
		data() {
			return {
				value: ""
			}
		}
	});
};