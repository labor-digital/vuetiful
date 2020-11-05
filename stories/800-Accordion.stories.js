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

import {boolean, button, number, object, text, withKnobs} from '@storybook/addon-knobs';
import BaseAccordion from '../src/Components/BaseAccordion/BaseAccordion.vue';
import '../src/Components/SelectBox/Storybook.sass';
import Item from '../src/Components/Utils/Item/Item.vue';

// Global configuration of your component
export default {
    title: 'BaseAccordion',
    component: BaseAccordion,
    decorators: [withKnobs]
};

// Create the stories
export const Default = () => {
    return (
        {
            components: {BaseAccordion},
            template: `
                <div>
                {{ it }}
                <base-accordion :open="[0,1]" :items="it" :open-multiple="openMultiple" :item-label="itemLabel">
                    <template :slot="it[0].label">
                        <div style="padding-bottom: 30px">HALLO FOO</div>
                    </template>
                    <template :slot="it[1]">
                        <div style="padding-bottom: 30px">HALLO BAR</div>
                    </template>
                </base-accordion>
                </div>`,
            props: {
                it: {
                    default: () => object('Input', [
                        {
                            'label': 'Acc Title 1'
                        },
                        'Acc Title 2'
                    ], 'group')
                },
                openMultiple: {
                    default: () => boolean('Multiple?', false)
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
                    v: []
                };
            }
        }
    );
};

export const UsingItems = () => {
    return (
        {
            components: {BaseAccordion, Item},
            template: `
                <div>
                <base-accordion
                    ref="accordion"
                    :open-multiple="openMultiple"
                    use-items>
                    <Item label="A">
                        A Content
                    </Item>
                    <Item label="B">
                        B Content
                    </Item>
                    // use either "key" or "id" to define a unique name for this item
                    // you can later use this in openItem() and closeItem() for programmatic access
                    <Item label="C" key="c">
                        C Content
                    </Item>
                </base-accordion>
                </div>`,
            props: {
                openMultiple: {
                    default: () => boolean('Allow to open multiple items', false)
                },
                openItem: {
                    default()
                    {
                        button('Open item "C" programmatically', () => {
                            this.$refs.accordion.openItem('c');
                        });
                    }
                },
                closeItem: {
                    default()
                    {
                        button('Close item "C" programmatically', () => {
                            this.$refs.accordion.closeItem('c');
                        });
                    }
                },
                closeItems: {
                    default()
                    {
                        button('Close all items programmatically', () => {
                            this.$refs.accordion.closeAllItems();
                        });
                    }
                },
                openItems: {
                    default()
                    {
                        button('Open all items programmatically (try this with: Allow to open multiple items)', () => {
                            this.$refs.accordion.openAllItems();
                        });
                    }
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
