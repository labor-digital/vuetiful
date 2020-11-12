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

import {array, boolean, button, number, object, text, withKnobs} from '@storybook/addon-knobs';
import BaseCheckbox from '../src/Components/BaseCheckbox/BaseCheckbox.vue';
import BaseCheckboxGroup from '../src/Components/BaseCheckbox/BaseCheckboxGroup.vue';

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
            components: {BaseCheckboxGroup, BaseCheckbox},
            template: `
                <div>
                <BaseCheckboxGroup
                    v-model="v"
                    :name="name"
                    :error="error"
                >
                    <BaseCheckbox
                        value="A"
                        :disabled="disable"
                        :label-left="labelLeft">
                        Value: A
                    </BaseCheckbox>
                    <BaseCheckbox
                        value="B"
                        disabled
                        :label-left="labelLeft">
                        Value: B (disabled)
                    </BaseCheckbox>
                    <BaseCheckbox
                        value="C"
                        :disabled="disable"
                        :label-left="labelLeft">
                        Value: C
                    </BaseCheckbox>
                    <BaseCheckbox
                        :value="randomValue"
                        :disabled="disable"
                        :label-left="labelLeft">
                        Value: {{ randomValue }}
                    </BaseCheckbox>
                    <BaseCheckbox
                        v-for="value in additionalValues"
                        :key="value"
                        :disabled="disable"
                        :value="value"
                        :label-left="labelLeft"
                    >
                        Value: {{ value }}
                    </BaseCheckbox>
                </BaseCheckboxGroup>
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
                    v: []
                };
            }
        }
    );
};

export const WithInitialSelectedValue = () => {
    return (
        {
            components: {BaseCheckboxGroup, BaseCheckbox},
            template: `
                <div>
                <BaseCheckboxGroup v-model="v">
                    <BaseCheckbox value="A">Value: A</BaseCheckbox>
                    <BaseCheckbox value="B">Value: B (default)</BaseCheckbox>
                    <BaseCheckbox value="C">Value: C</BaseCheckbox>
                </BaseCheckboxGroup>
                <span style="display:block;color:#888;margin-top: 50px">
                    Current model value:
                    <pre>{{ v }}</pre>
                </span>
                </div>`,
            data()
            {
                return {
                    v: ['B']
                };
            }
        }
    );
};

export const WithRequiredValue = () => {
    return (
        {
            components: {BaseCheckboxGroup, BaseCheckbox},
            template: `
                <div>
                <form @submit.prevent.stop>
                    <BaseCheckboxGroup v-model="v">
                        <BaseCheckbox value="A">Value: A</BaseCheckbox>
                        <BaseCheckbox value="B" required>Value: B (required)</BaseCheckbox>
                    </BaseCheckboxGroup>
                    <button>You can't click me without checking B first!</button>
                </form>
                <span style="display:block;color:#888;margin-top: 50px">
                    Current model value:
                    <pre>{{ v }}</pre>
                </span>
                </div>`,
            data()
            {
                return {
                    v: []
                };
            }
        }
    );
};

export const WithMaxItems = () => {
    return (
        {
            components: {BaseCheckboxGroup, BaseCheckbox},
            template: `
                <div>
                You can't select more than {{ max }} items at once
                <BaseCheckboxGroup v-model="v" :max-items="max">
                    <BaseCheckbox value="A">Value: A</BaseCheckbox>
                    <BaseCheckbox value="B">Value: B</BaseCheckbox>
                    <BaseCheckbox value="C">Value: C</BaseCheckbox>
                    <BaseCheckbox value="D">Value: D</BaseCheckbox>
                    <BaseCheckbox value="E">Value: E</BaseCheckbox>
                    <BaseCheckbox value="F">Value: F</BaseCheckbox>
                    <BaseCheckbox value="G">Value: G</BaseCheckbox>
                </BaseCheckboxGroup>
                <span style="display:block;color:#888;margin-top: 50px">
                    Current model value:
                    <pre>{{ v }}</pre>
                </span>
                </div>`,
            props: {
                max: {
                    default: number('Maximum number of selectable items', 2)
                }
            },
            data()
            {
                return {
                    v: []
                };
            }
        }
    );
};

export const Legacy = () => {
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
                    v: ['Test2', 'Test1']
                };
            }
        }
    );
};
