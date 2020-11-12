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

import {array, object, withKnobs} from '@storybook/addon-knobs';
import BaseChips from '../src/Components/BaseChips/BaseChips.vue';
import Chips from '../src/Components/Chips/Chips.vue';

// Global configuration of your component
export default {
    title: 'Chips',
    component: Chips,
    decorators: [withKnobs]
};

// Create the stories
export const Default = () => {
    return (
        {
            components: {BaseChips},
            template: `
                <div>
                <chips
                    v-model="v"
                    :labels="labelList"
                    :disabled="disabledItems"
                    :non-removable="nonRemovableItems"
                    @chip:click="onChipClick"
                    @chip:remove="onChipRemove"
                />
                <pre v-if="output.length > 0">{{ output }}</pre>
                <span style="display:block;color:#888;margin-top: 50px">Emitted value:
                    <pre>{{ v }}</pre>
                </span>
                </div>`,
            props: {
                items: {
                    default: array('A list of chips to show, those are the values:', ['a', 'b', 'c'])
                },
                disabledItems: {
                    default: array('A list of values that should be "disabled"', ['c'])
                },
                nonRemovableItems: {
                    default: array('A list of values can\'t be removed', ['b'])
                },
                labelList: {
                    default()
                    {
                        return object('You can provide an object with optional labels for your values', {
                            a: 'Label A',
                            b: 'Label B'
                        });
                    }
                }
            },
            data()
            {
                return {
                    v: this.items,
                    output: []
                };
            },
            methods: {
                onChipClick(item)
                {
                    this.addToOutput('You clicked on chip: ' + item.value);
                },
                onChipRemove(item)
                {
                    this.addToOutput('You removed the chip: ' + item.value);
                },
                addToOutput(text)
                {
                    this.output.push(text);
                    setTimeout(() => {
                        this.output.shift();
                    }, 1200);
                }
            },
            watch: {
                items(n)
                {
                    this.v = n;
                }
            }
        }
    );
};

export const ObjectsAsValues = () => {
    return (
        {
            components: {BaseChips},
            template: `
                <div>
                <chips
                    v-model="v"
                    @chip:click="onChipClick"
                    @chip:remove="onChipRemove"
                />
                <pre v-if="output.length > 0">{{ output }}</pre>
                <span style="display:block;color:#888;margin-top: 50px">Emitted value:
                    <pre>{{ v }}</pre>
                </span>
                </div>`,
            props: {
                items: {
                    default: object('You can also pass a complex object as value:', [
                        {
                            value: 'a',
                            label: 'Value A'
                        },
                        {
                            value: 'b',
                            label: 'Value B',
                            disabled: true
                        },
                        {
                            value: 'c',
                            label: 'Value C',
                            removable: false
                        }
                    ])
                }
            },
            data()
            {
                return {
                    v: this.items,
                    output: []
                };
            },
            methods: {
                onChipClick(item)
                {
                    this.addToOutput('You clicked on chip: ' + item.value);
                },
                onChipRemove(item)
                {
                    this.addToOutput('You removed the chip: ' + item.value);
                },
                addToOutput(text)
                {
                    this.output.push(text);
                    setTimeout(() => {
                        this.output.shift();
                    }, 1200);
                }
            },
            watch: {
                items(n)
                {
                    this.v = n;
                }
            }
        }
    );
};


export const Legacy = () => {
    return (
        {
            components: {Chips},
            template: `
                <div>
                <chips v-model="v"/>
                <span style="display:block;color:#888;margin-top: 50px">Emitted value:
                    <pre>{{ v }}</pre>
                </span>
                <button @click="addChip">Add Chip</button>
                </div>`,
            props: {
                items: {
                    default: object('Input', ['Foo', 'Bar'])
                }
            },
            data()
            {
                return {
                    v: ['Foo', 'Bar']
                };
            },
            methods: {
                addChip()
                {
                    this.items.push('Test' + this.items.length);
                }
            },
            watch: {
                items(n)
                {
                    this.v = n;
                }
            }
        }
    );
};
