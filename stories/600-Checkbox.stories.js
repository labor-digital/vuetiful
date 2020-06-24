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

import {object, select, text, withKnobs} from '@storybook/addon-knobs';
import Checkbox from '../src/Components/Checkbox/Checkbox.vue';
import '../src/Components/SelectBox/Storybook.sass';

// Global configuration of your component
export default {
    title: 'Checkbox',
    component: Checkbox,
    decorators: [withKnobs]
};

// Create the stories
export const Default = () => {
    return (
        {
            components: {Checkbox},
            template: `
			<div>
				<checkbox
				    v-model="v"
                    :items="inputs"
                    :label-side="labelSide"
                    :error="error"
                    @input="onInput"
				/>
                <span style="display:block;color:#888;margin-top: 50px">Emitted value:
                    <pre>{{value}}</pre>
                </span>
			</div>`,
            methods: {
                onInput()
                {
                    console.log('da');
                }
            },
            props: {
                inputs: {
                    default: object('Items', [
                        {label: 'Test1', required: true},
                        {label: 'Test2'},
                        {label: 'Test3'}
                    ])
                },
                labelSide: {
                    default: select('Label side', {left: 'left', right: 'right'}, 'right')
                },
                error: {
                    /* Error message for input field after your validation failed */
                    default: text('Error', '')
                }
            },
            data()
            {
                return {
                    v: [],
                    boo: true
                };
            }
        }
    );
};
