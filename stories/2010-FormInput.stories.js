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
 * Last modified: 2020.04.24 at 16:54
 */

import {boolean, number, select, text, withKnobs} from '@storybook/addon-knobs';
import VuFormInput from '../src/Components/v2/FormInput/VuFormInput.vue';

// Global configuration of your component
export default {
    title: 'v2.0 - Form Input',
    component: VuFormInput,
    decorators: [withKnobs]
};

// Create the stories
export const Default = () => {
    return (
        {
            components: {VuFormInput},
            template: `
                <div>
                <pre>
- This field has a "formatter" that makes sure the text is lower-case when you focus the field and upper-case when you blur it again
- It also has a "validator" which does not allow numbers in the field</pre>
                <VuFormInput
                    v-model="value"
                    :validator="validator"
                    :formatter="formatter"
                    :type="fieldType"
                    :no-clear="noClear"
                    :error="error"
                    :placeholder="placeholder"
                    :required="required"
                    maxlength="50"
                    :label-right="labelRight"
                    :debounce="debounce"
                >Input field label
                </VuFormInput>
                Characters left: {{
                50 - (
                    value + ''
                ).length
                }}
                <span style="display:block;color:#888;margin-top: 50px;">Emitted value:</span>
                <span style="display:block;color:#333;margin-top: 10px">{{ value }}</span>
                </div>`,
            props: {
                required: {
                    default: boolean('Mark the field as being required', false)
                },
                labelRight: {
                    default: boolean('Show the label on the right side', false)
                },
                fieldType: {
                    default: select('Types', {
                        text: 'text',
                        password: 'password',
                        email: 'email',
                        search: 'search',
                        url: 'url',
                        date: 'date',
                        time: 'time',
                        range: 'range'
                    }, 'text')
                },
                label: {
                    default: text('Label', 'Your field label')
                },
                noClear: {
                    default: boolean('Hide clear icon', false)
                },
                error: {
                    /* Error message for input field after your validation failed */
                    default: text('Force Error Message', '')
                },
                placeholder: {
                    default: text('Placeholder', 'This field is empty :)')
                },
                debounce: {
                    default: number('"Debounce" the input event for this number of milliseconds, (0 for no debounce)',
                        0)
                }
            },
            data()
            {
                return {
                    value: null
                };
            },
            methods: {
                validator(v, type)
                {
                    // Ignore some fields we can't validate here...
                    if (this.fieldType === 'date' || this.fieldType === 'time' || this.fieldType === 'range') {
                        return true;
                    }

                    if (/[0-9]/g.test(v + '')) {
                        return 'Numbers are not allowed in here!';
                    }
                    return true;
                },
                formatter(v, type)
                {
                    // Ignore some fields we can't format here...
                    if (this.fieldType === 'date' || this.fieldType === 'time' || this.fieldType === 'range') {
                        return v;
                    }

                    console.log('format', v, type);
                    if (type === 'focus') {
                        return (
                            v + ''
                        ).toLowerCase();
                    }
                    if (type === 'blur') {
                        return (
                            v + ''
                        ).toUpperCase();
                    }
                    return v;
                }
            }
        }
    );
};

export const SpecialTypes = () => {
    return (
        {
            components: {VuFormInput},
            template: `
                <div>
                <h3>Special field types</h3>
                <pre>All html5 field types are supported, here are some examples:</pre>
                <VuFormInput v-model="text">Type: "text" (default, no type required) ({{ text }})</VuFormInput>
                <br>
                <VuFormInput v-model="date" type="date">Type: "date" ({{ date }})</VuFormInput>
                <br>
                <VuFormInput v-model="pw" type="password">Type: "password" ({{ pw }})</VuFormInput>
                <br>
                <VuFormInput v-model="range" type="range" :min="10" :max="20">Type: "range" (min: 10, max: 20)
                    ({{ range }})
                </VuFormInput>
                <br>
                <VuFormInput v-model="number" type="number" :min="10" :max="20">Type: "number" (min: 10, max: 20)
                    ({{ number }})
                </VuFormInput>
                <br>

                <h3>Special cases&trade;</h3>
                <VuFormInput v-model="date"
                             placeholder="Placeholder"
                             type="date">Type: "date" with placeholder ({{ date }})
                </VuFormInput>
                <br>
                </div>`,
            props: {},
            data()
            {
                return {
                    text: '',
                    date: '',
                    pw: '',
                    range: 0,
                    number: 0
                };
            }
        }
    );
};
