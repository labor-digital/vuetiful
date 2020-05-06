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

import {boolean, text, withKnobs} from "@storybook/addon-knobs";
import "../src/Components/SelectBox/Storybook.sass";
import TextArea from "../src/Components/TextArea/TextArea";

// Global configuration of your component
export default {
	title: "TextArea",
	component: TextArea,
	decorators: [withKnobs]
};

// Create the stories
export const Default = () => {
	return ({
		components: {TextArea},
		template: `
			<div>
				<text-area v-model="value" :error="error" :placeholder="placeholder" :required="required">
					{{label}}
				</text-area>
				<span style="display:block;color:#888;margin-top: 50px;">Emitted value:</span>
				<span style="display:block;color:#333;margin-top: 10px;white-space: pre-wrap;">{{value}}</span></div>`,
		props: {
			required: {
				default: boolean("Required?", false)
			},
			label: {
				default: text("Label", "Label for input field")
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