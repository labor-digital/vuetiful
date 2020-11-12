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

import {object, text, withKnobs} from '@storybook/addon-knobs';
import Chips from '../src/Components/Chips/Chips.vue';

// Global configuration of your component
export default {
    title: 'Chips',
    component: Chips,
    decorators: [withKnobs]
};

// Create the stories
export const Default = () => {
    return (
        {
            components: {Chips},
            template: `
                <div>
                <chips v-model="v" :items="it"/>
                <span style="display:block;color:#888;margin-top: 50px">Emitted value:
                    <pre>{{ v }}</pre>
                </span>
                <button @click="addChip">Add Chip</button>
                </div>`,
            props: {
                it: {
                    default: object('Input', ['Foo', 'Bar'])
                },
                error: {
                    /* Error message for input field after your validation failed */
                    default: text('Error', '')
                }
            },
            data()
            {
                return {
                    v: []
                };
            },
            methods: {
                addChip()
                {
                    this.items.push('Test' + this.items.length);
                }
            }
        }
    );
};
