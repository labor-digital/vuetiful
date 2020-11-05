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

import {object, select, text, withKnobs} from '@storybook/addon-knobs';
import BaseCheckboxGroup from '../src/Components/BaseCheckbox/BaseCheckboxGroup.vue';
import '../src/Components/SelectBox/Storybook.sass';

// Global configuration of your component
export default {
    title: 'BaseCheckboxGroup',
    component: BaseCheckboxGroup,
    decorators: [withKnobs]
};

// Create the stories
export const Default = () => {
    return (
        {
            components: {BaseCheckboxGroup},
            template: `
                <div>
                <base-checkbox-group
                    v-model="v"
                    :items="it"
                    :item-label="itemLabel"
                    :item-value="itemValue"
                    :label-side="labelSide"
                    :name="name"
                    :error="error"
                />
                <span style="display:block;color:#888;margin-top: 50px">Current model value:
                    <pre>{{ v }}</pre>
                </span>
                </div>`,
            props: {
                it: {
                    default: object('Items', ['Test1', 'Test2', 'Test3'])
                },
                labelSide: {
                    default: select('Label side', {left: 'left', right: 'right'}, 'right')
                },
                itemLabel: {
                    default: text('Label key', '')
                },
                itemValue: {
                    default: text('Value Key', '')
                },
                name: {
                    default: text('Error', 'input')
                },
                error: {
                    /* Error message for input field after your validation failed */
                    default: text('Error', '')
                }
            },
            data()
            {
                return {
                    v: ['Test2', 'Test1']
                };
            }
        }
    );
};
