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

import {array, boolean, button, object, text, withKnobs} from '@storybook/addon-knobs';
import BaseRadio from '../src/Components/BaseRadio/BaseRadio.vue';
import BaseRadioGroup from '../src/Components/BaseRadio/BaseRadioGroup.vue';

// Global configuration of your component
export default {
    title: 'BaseRadioGroup',
    component: BaseRadioGroup,
    decorators: [withKnobs]
};

// Create the stories
export const Default = () => {
    return (
        {
            components: {BaseRadioGroup, BaseRadio},
            template: `
                <div>
                <base-radio-group
                    v-model="v"
                    :name="name"
                    :error="error"
                >
                    <base-radio
                        value="A"
                        :disabled="disable"
                        :label-left="labelLeft">
                        Value: A
                    </base-radio>
                    <base-radio
                        value="B"
                        disabled
                        :label-left="labelLeft">
                        Value: B (disabled)
                    </base-radio>
                    <base-radio
                        value="C"
                        :disabled="disable"
                        :label-left="labelLeft">
                        Value: C
                    </base-radio>
                    <base-radio
                        :value="randomValue"
                        :disabled="disable"
                        :label-left="labelLeft">
                        Value: {{ randomValue }}
                    </base-radio>
                    <base-radio
                        v-for="value in additionalValues"
                        :key="value"
                        :disabled="disable"
                        :value="value"
                        :label-left="labelLeft"
                    >
                        Value: {{ value }}
                    </base-radio>
                </base-radio-group>
                <span style="display:block;color:#888;margin-top: 50px">
                    Current model value:
                    <pre>{{ v }}</pre>
                </span>
                </div>`,
            props: {
                shuffleValue: {
                    default()
                    {
                        const chars = ['D.a', 'D.b', 'D.c', 'D.d', 'D.e'];
                        button('Shuffle value "D" to see how it responds', () => {
                            this.randomValue = chars[Math.round(Math.random() * (
                                chars.length - 1
                            ))];
                        });
                    }
                },
                additionalValues: {
                    default: () => array('Simply add and remove values on the fly', ['E', 'F'])
                },
                labelLeft: {
                    default: boolean('Render the label on the left side', false)
                },
                disable: {
                    default: boolean('Disable all inputs', false)
                },
                name: {
                    default: text('Add an optional group name', '')
                },
                error: {
                    /* Error message for input field after your validation failed */
                    default: text('Set an error message', '')
                }
            },
            data()
            {
                return {
                    randomValue: 'D',
                    v: null
                };
            }
        }
    );
};

export const WithInitialSelectedValue = () => {
    return (
        {
            components: {BaseRadioGroup, BaseRadio},
            template: `
                <div>
                <base-radio-group v-model="v">
                    <base-radio value="A">Value: A</base-radio>
                    <base-radio value="B">Value: B (default)</base-radio>
                    <base-radio value="C">Value: C</base-radio>
                </base-radio-group>
                <span style="display:block;color:#888;margin-top: 50px">
                    Current model value:
                    <pre>{{ v }}</pre>
                </span>
                </div>`,
            data()
            {
                return {
                    v: 'B'
                };
            }
        }
    );
};

export const WithRequiredValue = () => {
    return (
        {
            components: {BaseRadioGroup, BaseRadio},
            template: `
                <div>
                <form @submit.prevent.stop>
                    <base-radio-group v-model="v" start-empty name="input">
                        <base-radio value="A" required>Value: A</base-radio>
                        <base-radio value="B">Value: B</base-radio>
                        <base-radio value="C">Value: C</base-radio>
                    </base-radio-group>
                    <button>You can't click me without checking one of the above first!</button>
                </form>
                <span style="display:block;color:#888;margin-top: 50px">
                    Current model value:
                    <pre>{{ v }}</pre>
                </span>
                </div>`,
            data()
            {
                return {
                    v: null
                };
            }
        }
    );
};

export const Legacy = () => {
    return (
        {
            components: {BaseRadioGroup},
            template: `
                <div>
                <base-radio-group
                    v-model="v"
                    :items="it"
                    :item-label="itemLabel"
                    :item-value="itemValue"
                    :name="name"
                    :error="error"
                />
                <span style="display:block;color:#888;margin-top: 50px">Current model value:
                    <pre>{{ v }}</pre>
                </span>
                </div>`,
            props: {
                it: {
                    default: () => object('Items', ['Test1', 'Test2', 'Test3'])
                },
                itemLabel: {
                    default: text('Label key', '')
                },
                itemValue: {
                    default: text('Value Key', '')
                },
                name: {
                    default: text('Group name', 'input')
                },
                error: {
                    /* Error message for input field after your validation failed */
                    default: text('Error', '')
                }
            },
            data()
            {
                return {
                    v: 'Test2'
                };
            }
        }
    );
};
