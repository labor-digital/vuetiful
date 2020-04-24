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
 * Last modified: 2020.04.24 at 16:45
 */

import {action} from "@storybook/addon-actions";
import {boolean, text, withKnobs} from "@storybook/addon-knobs";
import Dummy from "../src/App/Dummy";

// Global configuration of your component
export default {
	// Replace the title of the story to define the title in the sidebar
	title: "Example: Dummy",
	// Replace this with the component you want to create a story for
	component: Dummy,
	// Keep this as is for the most part
	decorators: [withKnobs]
};

// You need this block for each "story" you create.
// The name of the constant defines the title of your story in the sidebar
// Each story is basically a vue component in itself, so you can work with methods, props and data as you would normally
export const Default = () => {
	return ({
		// You should import your component here
		components: {Dummy},
		// This template defines how your component is used in this story
		// It also connects your "props" below with the props of the component implementation
		template: "<dummy :toggle='toggle' :text='text' @click='onClick'></dummy>",
		// You can also register "actions" those will show up in the "action" tab at the bottom of the screen.
		// They are basically a micro console output
		methods: {onClick: action("clicked")},
		// Define props on your story to create "knobs" for each of them
		props: {
			toggle: {
				default: boolean("Toggle the background color", false)
			},
			text: {
				default: text("An additional text to show in the component", "")
			}
		}
	});
};