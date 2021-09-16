/*
 * Copyright 2021 LABOR.digital
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
 * Last modified: 2021.06.15 at 12:06
 */

import {boolean, number, object, select, text, withKnobs} from '@storybook/addon-knobs';
import VuFormRangeSlider from '../../src/Components/FormRangeSlider/VuFormRangeSlider';

// Global configuration of your component
export default {
    title: 'Elements/Form Range Slider',
    component: VuFormRangeSlider,
    decorators: [withKnobs]
};

// Create the stories
export const Default = () => {
    return (
        {
            components: {VuFormRangeSlider},
            template: `
                <div>
                <VuFormRangeSlider v-model="value"
                                   :connect="connection"
                                   :rtl="rtl"
                                   :range="rangeDefinition"
                                   :disabled="disabled"
                                   :vertical="vertical"
                                   :step="step"
                                   :full-width="fullWidth"
                                   :snap="snap"
                                   :error="error"
                                   :tooltips="showTooltip"
                                   :debounce="debounce"
                >
                    <template v-slot:handle>
                        <span style="color: #fff">{{ handleSlot }}</span>
                    </template>
                    Slider label
                </VuFormRangeSlider>

                <input type="text" v-model="value">
                </div>
            `,
            props: {
                connection: {
                    default: select('Connection mode', {
                        'Default (false)': false,
                        'From start to handle (lower)': 'lower',
                        'From handle to end (upper)': 'upper'
                    })
                },
                vertical: {
                    default: boolean('Render the scroller vertically instead of horizontally', false)
                },
                rangeDefinition: {
                    default: () => object('Configure the range dynamically (default: {min: 0, max: 100})', {min: 0, '50%': 70, max: 100})
                },
                rtl: {
                    default: boolean('Use the right to left reading direction', false)
                },
                disabled: {
                    default: boolean('Disable the slider', false)
                },
                showTooltip: {
                    default: boolean('Show a tooltip', false)
                },
                handleSlot: {
                    default: text('Reactive slot inside the handle', '')
                },
                snap: {
                    default: boolean('Snap to values', false)
                },
                fullWidth: {
                    default: boolean('Let the handle slide out of the container', false)
                },
                step: {
                    default: number('Define the step size', 0)
                },
                error: {
                    default: text('Force Error Message', '')
                },
                debounce: {
                    default: number('"Debounce" the input event for this number of milliseconds, (0 for no debounce)',
                        0)
                }
            },
            data()
            {
                return {
                    value: 0
                };
            },
            methods: {}
        }
    );
};

export const MultipleHandles = () => {
    return (
        {
            components: {VuFormRangeSlider},
            template: `
                <div>
                <VuFormRangeSlider v-model="value" :connect="[false, true, false, true]">
                    Slider label
                </VuFormRangeSlider>

                <input type="text" v-model="value[0]">
                <input type="text" v-model="value[1]">
                <input type="text" v-model="value[2]">
                </div>
            `,
            props: {},
            data()
            {
                return {
                    value: [0, 10, 60]
                };
            },
            methods: {}
        }
    );
};
