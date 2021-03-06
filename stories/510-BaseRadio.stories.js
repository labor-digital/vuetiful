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
import BaseRadio from '../src/Components/BaseRadio/BaseRadio.vue';

// Global configuration of your component
export default {
    title: 'BaseRadio',
    component: BaseRadio,
    decorators: [withKnobs]
};

// Create the stories
export const Default = () => {
    return (
        {
            components: {BaseRadio},
            template: `
                <div>
                <base-radio
                    v-model="v"
                    :value="_value"
                    :label-left="labelLeft"
                    :disabled="disable"
                    :error="error"
                    :name="name"
                >{{ label }}</base-radio>

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
                _value: {
                    default: () => text('The value for the when the item was checked', 'Checked')
                },
                name: {
                    default: text('Add an optional name', 'input')
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
                    v: 'Checked'
                };
            },
            watch: {
                _value(n)
                {
                    this.v = n;
                }
            }
        }
    );
};
