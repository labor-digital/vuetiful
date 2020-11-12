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

import {boolean, object, radios, withKnobs} from '@storybook/addon-knobs';
import BaseAccordion from '../src/Components/BaseAccordion/BaseAccordion.vue';
import BaseAccordionItem from '../src/Components/BaseAccordion/BaseAccordionItem.vue';
import BaseTab from '../src/Components/BaseTabs/BaseTabItem.vue';
import BaseTabs from '../src/Components/BaseTabs/BaseTabs.vue';

// Global configuration of your component
export default {
    title: 'BaseTabs & Accordion Switchable',
    component: BaseTabs,
    decorators: [withKnobs]
};

// Create the stories
export const Default = () => {
    return (
        {
            template: `
                <div>
                <pre>BaseTabs and BaseAccordion are designed to be interchangeable with eachother.
This allows you to show tabs on a desktop and an accordion on mobile with ease.
                </pre>
                <component :is="components[component].outer" :open-multiple="openMultiple">
                    <component :is="components[component].inner" label="Label A">
                        Content A
                    </component>
                    <component :is="components[component].inner" label="Label B">
                        Content B
                    </component>
                    <component :is="components[component].inner" label="Label C">
                        Content C
                    </component>
                    <component :is="components[component].inner" label="Label D (Disabled)" disabled>
                        Disabled content
                    </component>
                </component>
                </div>`,
            props: {
                component: {
                    default: radios('Select the type you want to render', {
                        'Render as Tabs': 'tabs',
                        'Render as Accordion': 'accordion'
                    }, 'tabs')
                }
            },
            data()
            {
                return {
                    components: {
                        tabs: {
                            outer: BaseTabs,
                            inner: BaseTab
                        },
                        accordion: {
                            outer: BaseAccordion,
                            inner: BaseAccordionItem
                        }
                    }
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
                <component :is="isComponent" :items="it" :open-multiple="openMultiple">
                    <template :slot="it[0]">
                        HALLO FOO
                    </template>
                    <template :slot="it[1]">
                        HALLO BAR
                    </template>
                </component>
                </div>`,
            props: {
                it: {
                    default: object('Input', ['Tab Title 1', 'Tab Title 2'])
                },
                isComponent: {
                    default: radios('is Component', {isTab: 'BaseTabs', isAccordion: 'BaseAccordion'}, 'BaseTabs')
                },
                openMultiple: {
                    default: () => boolean('Multiple?', false)
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
