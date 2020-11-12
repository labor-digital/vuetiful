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

import {array, boolean, button, number, object, text, withKnobs} from '@storybook/addon-knobs';
import BaseAccordion from '../src/Components/BaseAccordion/BaseAccordion.vue';
import BaseTabsItem from '../src/Components/BaseTabs/BaseTabItem.vue';
import BaseTabs from '../src/Components/BaseTabs/BaseTabs.vue';
import '../src/Components/BaseTabs/Storybook.sass';

// Global configuration of your component
export default {
    title: 'BaseTabs',
    component: BaseTabs,
    decorators: [withKnobs]
};

// Create the stories
export const Default = () => {
    return (
        {
            components: {BaseTabs, BaseTabsItem},
            template: `
                <div>
                <pre>Please note, that we styled the tabs a bit here to make the demonstration
easier to understand. Normally the tabs can be styled from ground up if you
use them in your own project.</pre>
                <BaseTabs ref="tabs">
                    <BaseTabsItem label="Tab A">
                        Content A
                    </BaseTabsItem>
                    <BaseTabsItem label="Tab B">
                        Content B
                    </BaseTabsItem>
                    <BaseTabsItem label="Tab C" key="c">
                        Content C
                    </BaseTabsItem>
                    <BaseTabsItem :label="'Tab D' + (disabled ? '(Disabled)' : '')" :disabled="disabled">
                        You {{ disabled ? 'can\\'t' : 'can' }} touch this
                    </BaseTabsItem>
                    <BaseTabsItem label="Tab E">
                        Content E
                    </BaseTabsItem>
                    <BaseTabsItem
                        v-for="value in additionalValues"
                        :key="value"
                        :label="'Tab ' + value">
                        Content {{ value }}
                    </BaseTabsItem>
                </BaseTabs>
                </div>`,
            props: {
                additionalValues: {
                    default: () => array('Simply add and remove values on the fly', ['F', 'G'])
                },
                openItem: {
                    default()
                    {
                        button('Open item "C" programmatically', () => {
                            this.$refs.tabs.openItem('c');
                        });
                    }
                },
                disabled: {
                    default: boolean('Disable tab D', true)
                },
                openPrevious: {
                    default()
                    {
                        button('Open the previous item programmatically', () => {
                            this.$refs.tabs.openPreviousItem();
                        });
                    }
                },
                openNext: {
                    default()
                    {
                        button('Open the next item programmatically', () => {
                            this.$refs.tabs.openNextItem();
                        });
                    }
                }

            },
            data()
            {
                return {
                    testItems1: ['Lorem 1', 'Lorem 2'],
                    testItems2: ['Lorem 3', 'Lorem 4']
                };
            }
        }
    );
};

export const Legacy = () => {
    return (
        {
            components: {BaseTabs, BaseAccordion},
            template: `
                <div>
                <pre>Please note, that we styled the tabs a bit here to make the demonstration
easier to understand. Normally the tabs can be styled from ground up if you
use them in your own project.</pre>
                <base-tabs :open="open" :items="items" :item-label="itemLabel">
                    <template :slot="items[0].label">
                        <base-accordion :items="testItems1">
                            <template :slot="testItems1[0]">
                                HALLO FOO
                            </template>
                            <template :slot="testItems1[1]">
                                HALLO BAR
                            </template>
                        </base-accordion>
                    </template>
                    <template :slot="items[1]">
                        <base-accordion :items="testItems2">
                            <template :slot="testItems2[0]">
                                HALLO FOO
                            </template>
                            <template :slot="testItems2[1]">
                                HALLO BAR
                            </template>
                        </base-accordion>
                        <base-accordion :items="testItems2">
                            <template :slot="testItems2[0]">
                                HALLO FOO
                            </template>
                            <template :slot="testItems2[1]">
                                HALLO BAR
                            </template>
                        </base-accordion>
                    </template>
                </base-tabs>
                </div>`,
            props: {
                items: {
                    default: object('Input', [
                        {
                            'label': 'Tab Title 1'
                        },
                        'Tab Title 2',
                        {
                            'label': 'Tab Title 3'
                        },
                        'Tab Title 4'
                    ])
                },
                itemLabel: {
                    default: () => text('key from array for label', 'label')
                },
                open: {
                    default: () => number('open', 0)
                }
            },
            data()
            {
                return {
                    testItems1: ['Lorem 1', 'Lorem 2'],
                    testItems2: ['Lorem 3', 'Lorem 4']
                };
            }
        }
    );
};
