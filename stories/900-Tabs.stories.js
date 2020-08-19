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

import {number, object, text, withKnobs} from '@storybook/addon-knobs';
import BaseAccordion from '../src/Components/BaseAccordion/BaseAccordion.vue';
import BaseTabs from '../src/Components/BaseTabs/BaseTabs.vue';
import '../src/Components/SelectBox/Storybook.sass';

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
            components: {BaseTabs, BaseAccordion},
            template: `
                <div>
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
                <div style="height: 100px; width: 100%; background: red"></div>
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
