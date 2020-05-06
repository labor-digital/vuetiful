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

import {boolean, select, text, withKnobs} from "@storybook/addon-knobs";
import InputField from "../src/Components/InputField/InputField";
import "../src/Components/SelectBox/Storybook.sass";

// Global configuration of your component
export default {
	title: "InputField",
	component: InputField,
	decorators: [withKnobs]
};

// Create the stories
export const Default = () => {
	return ({
		components: {InputField},
		template: `
			<div>
				<input-field v-model="value" :type="type" :clear-icon="clearIcon" :error="error" :placeholder="placeholder" :required="required">
					{{label}}
				</input-field>
				<span style="display:block;color:#888;margin-top: 50px;">Emitted value:</span>
				<span style="display:block;color:#333;margin-top: 10px">{{value}}</span></div>`,
		props: {
			required: {
				default: boolean("Required?", false)
			},
			type: {
				default: select("Types", {text: "text", password: "password", email: "email", search: "search", url: "url"}, "text")
			},
			label: {
				default: text("Label", "Label for input field")
			},
			clearIcon: {
				default: boolean("Show clear icon", true)
			},
			error: {
				/* Error message for input field after your validation failed */
				default: text("Error", "")
			},
			placeholder: {
				default: text("Placeholder", "Placeholder for input field")
			}
		},
		data() {
			return {
				value: ""
			}
		}
	});
};