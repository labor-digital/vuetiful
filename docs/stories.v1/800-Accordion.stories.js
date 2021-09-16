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

import {array, boolean, button, object, text, withKnobs} from '@storybook/addon-knobs';
import BaseAccordion from '../src/Components/BaseAccordion/BaseAccordion.vue';
import BaseAccordionItem from '../src/Components/BaseAccordion/BaseAccordionItem.vue';

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
            components: {BaseAccordion, BaseAccordionItem},
            template: `
                <div>
                <base-accordion
                    ref="accordion"
                    :open-multiple="openMultiple"
                    use-items>
                    <BaseAccordionItem label="Label: A">
                        A Content
                    </BaseAccordionItem>
                    <BaseAccordionItem label="Label: B">
                        B Content
                    </BaseAccordionItem>
                    <!--
                    use "key" to define a unique name for this item
                    you can later use this in openItem() and closeItem() for programmatic access
                    -->
                    <BaseAccordionItem label="Label: C" key="c">
                        C Content
                    </BaseAccordionItem>
                    <BaseAccordionItem :label="'Label: D' + (disabled ? ' (Disabled)' : '')" :disabled="disabled">
                        You {{ disabled ? 'can\\'t' : 'can' }} touch this
                    </BaseAccordionItem>
                </base-accordion>
                </div>`,
            props: {
                disabled: {
                    default: boolean('Disable element D', true)
                },
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
            }
        }
    );
};

export const UsingItemsWithDynamicContent = () => {
    return (
        {
            components: {BaseAccordion, BaseAccordionItem},
            template: `
                <div>
                <pre>A dynamic counter as baseline: {{ count }}</pre>
                <base-accordion
                    ref="accordion"
                    use-items>
                    <BaseAccordionItem
                        v-for="el in elements"
                        :label="'Label ' + el.label + ' (' + count + ')'"
                        :key="el.key">
                        Dynamic item content: {{ count }} ({{ el.label }})
                    </BaseAccordionItem>
                </base-accordion>
                </div>`,
            props: {
                addItemBottom: {
                    default()
                    {
                        button('Add a section to the bottom', () => {
                            const chars = ['A', 'B', 'C', 'D', 'E'];
                            this.elements.push({
                                label: chars[Math.round(Math.random() * (
                                    chars.length - 1
                                ))],
                                key: this.nextKey++
                            });
                        });
                    }
                },
                addItemTop: {
                    default()
                    {
                        button('Add a section to the top', () => {
                            const chars = ['A', 'B', 'C', 'D', 'E'];
                            this.elements.unshift({
                                label: chars[Math.round(Math.random() * chars.length)],
                                key: this.nextKey++
                            });
                        });
                    }
                },
                removeItemFromTop: {
                    default()
                    {
                        button('Remove section from top', () => {
                            this.elements.shift();
                        });
                    }
                },
                removeRandomItem: {
                    default()
                    {
                        button('Remove random section', () => {
                            this.elements.splice(
                                Math.round(Math.random() * this.elements.length),
                                1
                            );
                        });
                    }
                }
            },
            data()
            {
                return {
                    nextKey: 0,
                    count: 0,
                    i: 0,
                    elements: [{label: 'Initial Element', key: -1}]
                };
            },
            mounted()
            {
                this.i = setInterval(() => {
                    this.count++;
                }, 500);
            },
            beforeDestroy()
            {
                clearInterval(this.i);
            }
        }
    );
};


export const Legacy = () => {
    return (
        {
            components: {BaseAccordion},
            template: `
                <div>
                <base-accordion :open="open" :items="it" :open-multiple="openMultiple" :item-label="itemLabel">
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
                    default: () => array('Allows you to manually open specific ids', [])
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
