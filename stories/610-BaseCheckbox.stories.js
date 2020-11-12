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
 * Last modified: 2020.07.22 at 14:26
 */

import {boolean, text, withKnobs} from '@storybook/addon-knobs';
import BaseCheckbox from '../src/Components/BaseCheckbox/BaseCheckbox.vue';

// Global configuration of your component
export default {
    title: 'BaseCheckbox',
    component: BaseCheckbox,
    decorators: [withKnobs]
};

// Create the stories
export const Default = () => {
    return (
        {
            components: {BaseCheckbox},
            template: `
                <div>
                <base-checkbox
                    v-model="v"
                    :value="value"
                    :disabled="disable"
                    :label-left="labelLeft"
                    :error="error"
                    :name="name"
                >{{ label }}</base-checkbox>
                <span style="display:block;color:#888;margin-top: 50px">Current model value:
                    <pre>{{ v }}</pre>
                </span>
                </div>`,
            props: {
                label: {
                    default: text('A label to show', 'Radio Label')
                },
                labelLeft: {
                    default: boolean('Render the label on the left side', false)
                },
                value: {
                    default: text('The value for the when the item was checked', 'Checked')
                },
                name: {
                    default: text('Add an optional group name', 'input')
                },
                disable: {
                    default: boolean('Disable the input', false)
                },
                error: {
                    /* Error message for input field after your validation failed */
                    default: text('Set an error message', '')
                }
            },
            data()
            {
                return {
                    v: false
                };
            }
        }
    );
};

export const MultipleInputsWithTheSameValue = () => {
    return (
        {
            components: {BaseCheckbox},
            template: `
                <div>

                <base-checkbox
                    v-model="v"
                    value="A"
                >
                    Value: A
                </base-checkbox>

                <base-checkbox
                    v-model="v"
                    value="A"
                >
                    Value: A, too
                </base-checkbox>

                <base-checkbox
                    v-model="v"
                    value="B"
                >
                    Value: B
                </base-checkbox>

                <span style="display:block;color:#888;margin-top: 50px">Current model value:
                    <pre>{{ v }}</pre>
                </span>
                </div>`,
            data()
            {
                return {
                    v: ''
                };
            }
        }
    );
};
