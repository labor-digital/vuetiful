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
 * Last modified: 2020.12.11 at 17:06
 */

import {boolean, button, select, withKnobs} from '@storybook/addon-knobs';
import VuDropdownItem from '../../src/Components/Dropdown/Item/VuDropdownItem';
import VuDropdownTrigger from '../../src/Components/Dropdown/Trigger/VuDropdownTrigger';
import VuDropdown from '../../src/Components/Dropdown/VuDropdown';

// Global configuration of your component
export default {
    title: 'Elements/Dropdown',
    component: VuDropdown,
    decorators: [withKnobs]
};

// Create the stories
export const Default = () => {
    return (
        {
            components: {VuDropdown, VuDropdownItem, VuDropdownTrigger},
            template: `
                <div
                    style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: lightgray; padding: 20px">
                <VuDropdown v-model="value"
                            ref="dropdown"
                            :direction="dropdownDirection"
                            :as-block="asBlock"
                            :no-flip="noFlip"
                            :with-arrow="withArrow"
                            :disabled="disableDropdown">
                    <template v-slot:trigger>
                        <VuDropdownTrigger>
                            Click to toggle the dropdown
                        </VuDropdownTrigger>
                    </template>
                    <VuDropdownItem type="header">Header</VuDropdownItem>
                    <VuDropdownItem @click="onClick('Item A')">Item A</VuDropdownItem>
                    <VuDropdownItem @click="onClick('Item B')">Item B</VuDropdownItem>
                    <VuDropdownItem type="line"/>
                    <VuDropdownItem @click="onClick('Item C')"
                                    :disabled="disableC">Item C{{ disableC ? '(disabled)' : '' }}
                    </VuDropdownItem>
                    <VuDropdownItem @click="onClick('Item D')">Item D</VuDropdownItem>
                    <VuDropdownItem link="https://www.google.com">Item E (external link)</VuDropdownItem>
                </VuDropdown>
                <ul style="margin-top: 150px">
                    <li v-for="event in events">You clicked on: {{ event }}</li>
                </ul>
                </div>
            `,
            props: {
                openDropdown: {
                    default()
                    {
                        button('Open the dropdown programmatically', () => {
                            this.$refs.dropdown.open();
                        });
                    }
                },
                closeDropdown: {
                    default()
                    {
                        button('Close the dropdown programmatically', () => {
                            this.$refs.dropdown.close();
                        });
                    }
                },
                dropdownDirection: {
                    default: select('Dropdown direction', {
                        down: 'down',
                        up: 'up',
                        left: 'left',
                        right: 'right'
                    }, 'down')
                },
                asBlock: {
                    default: boolean('Render dropdown as "block" instead of "inline-block"', false)
                },
                noFlip: {
                    default: boolean('Disable automatic direction "flip"', false)
                },
                withArrow: {
                    default: boolean('Show an "arrow" pointing to the trigger', false)
                },
                disableDropdown: {
                    default: boolean('Disable the dropdown', false)
                },
                disableC: {
                    default: boolean('Disable item "C"', true)
                }
            },
            data()
            {
                return {
                    value: false,
                    events: [],
                    items: ['Hello', 'World', 'How', 'are', 'you']
                };
            },
            methods: {
                onClick(event)
                {
                    this.events.unshift(event);
                    setTimeout(() => {
                        this.events.pop();
                    }, 500);
                }
            }
        }
    );
};

export const DirectionFlip = () => {
    return (
        {
            components: {VuDropdown, VuDropdownItem, VuDropdownTrigger},
            template: `
                <div>
                <pre>The direction of the dropdown will switch if it would otherwise no longer be in the viewport
Just scroll the content to see how it behaves.</pre>
                <div style="max-width: 500px">
                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                        Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus
                        mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa
                        quis enim.</p>
                    <p>Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
                        imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer
                        tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.</p>
                    <p>Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus
                        in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque
                        rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies
                        nisi.</p>
                    <p>Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper
                        libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar,
                        hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero
                        venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis
                        leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget
                        bibendum sodales, augue velit cursus nunc,</p>
                </div>
                <VuDropdown v-model="value">
                    <template v-slot:trigger>
                        <VuDropdownTrigger>
                            Click to toggle the dropdown
                        </VuDropdownTrigger>
                    </template>
                    <VuDropdownItem type="header">Header</VuDropdownItem>
                    <VuDropdownItem>Item A</VuDropdownItem>
                    <VuDropdownItem>Item B</VuDropdownItem>
                    <VuDropdownItem type="line"/>
                    <VuDropdownItem>Item C</VuDropdownItem>
                    <VuDropdownItem>Item D</VuDropdownItem>
                </VuDropdown>

                <div style="max-width: 500px">
                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                        Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus
                        mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa
                        quis enim.</p>
                    <p>Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
                        imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer
                        tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.</p>
                    <p>Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus
                        in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque
                        rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies
                        nisi.</p>
                    <p>Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper
                        libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar,
                        hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero
                        venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis
                        leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget
                        bibendum sodales, augue velit cursus nunc,</p>
                </div>
                </div>
            `,
            props: {},
            data()
            {
                return {
                    value: false
                };
            },
            methods: {}
        }
    );
};

export const LongDropdowns = () => {
    return (
        {
            components: {VuDropdown, VuDropdownItem, VuDropdownTrigger},
            template: `
                <div>
                <pre>The content of a dropdown becomes a scrollable box if it gets to long</pre>
                <VuDropdown v-model="value">
                    <template v-slot:trigger>
                        <VuDropdownTrigger>
                            Click to toggle the dropdown
                        </VuDropdownTrigger>
                    </template>
                    <VuDropdownItem v-for="i in 100" :key="i">Item {{ i }}</VuDropdownItem>
                </VuDropdown>
                </div>
            `,
            props: {},
            data()
            {
                return {
                    value: false
                };
            },
            methods: {}
        }
    );
};

export const Interactions = () => {
    return (
        {
            components: {VuDropdown, VuDropdownItem, VuDropdownTrigger},
            template: `
                <div>
                <pre>You can nest multiple dropdowns inside eachother.
Children are closed automatically, if the parent is closed.</pre>
                <VuDropdown>
                    <template v-slot:trigger>
                        <VuDropdownTrigger>
                            Click to toggle the dropdown
                        </VuDropdownTrigger>
                    </template>
                    <VuDropdownItem disabled>Item A</VuDropdownItem>
                    <VuDropdownItem type="text">
                        <VuDropdown>
                            <template v-slot:trigger>
                                <VuDropdownTrigger>
                                    Nested Item
                                </VuDropdownTrigger>
                            </template>
                            <VuDropdownItem>Item A</VuDropdownItem>
                            <VuDropdownItem>Item B</VuDropdownItem>
                            <VuDropdownItem>Item C</VuDropdownItem>
                        </VuDropdown>
                    </VuDropdownItem>
                    <VuDropdownItem disabled>Item C</VuDropdownItem>
                </VuDropdown>
                <br>
                <pre>Only a single dropdown can be opened at a time. (If not configured otherwise)</pre>
                <div style="width: 800px; display: flex">
                    <div>
                        <strong>Dropdown A</strong>
                        <VuDropdown>
                            <template v-slot:trigger>
                                <VuDropdownTrigger>
                                    Click me
                                </VuDropdownTrigger>
                            </template>
                            <VuDropdownItem>Item A</VuDropdownItem>
                            <VuDropdownItem>Item B</VuDropdownItem>
                            <VuDropdownItem>Item C</VuDropdownItem>
                        </VuDropdown>
                    </div>
                    <div>
                        <strong>Dropdown B</strong>
                        <VuDropdown>
                            <template v-slot:trigger>
                                <VuDropdownTrigger>
                                    Click me
                                </VuDropdownTrigger>
                            </template>
                            <VuDropdownItem>Item A</VuDropdownItem>
                            <VuDropdownItem>Item B</VuDropdownItem>
                            <VuDropdownItem>Item C</VuDropdownItem>
                        </VuDropdown>
                    </div>
                    <div>
                        <strong>Don't close others when opened</strong>
                        <VuDropdown keep-others-open-when-opened>
                            <template v-slot:trigger>
                                <VuDropdownTrigger>
                                    Click me
                                </VuDropdownTrigger>
                            </template>
                            <VuDropdownItem>Item A</VuDropdownItem>
                            <VuDropdownItem>Item B</VuDropdownItem>
                            <VuDropdownItem>Item C</VuDropdownItem>
                        </VuDropdown>
                    </div>
                    <div>
                        <strong>Stay open even if another opens</strong>
                        <VuDropdown stay-open-when-other-opens>
                            <template v-slot:trigger>
                                <VuDropdownTrigger>
                                    Click me
                                </VuDropdownTrigger>
                            </template>
                            <VuDropdownItem>Item A</VuDropdownItem>
                            <VuDropdownItem>Item B</VuDropdownItem>
                            <VuDropdownItem>Item C</VuDropdownItem>
                        </VuDropdown>
                    </div>
                </div>

                <pre style="margin-top:50px">Pro tip: v-model is optional for dropdowns. If none is provided it holds its own state.</pre>
                </div>
            `,
            props: {},
            data()
            {
                return {};
            },
            methods: {}
        }
    );
};
