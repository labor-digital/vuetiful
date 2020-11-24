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
 * Last modified: 2020.04.24 at 16:54
 */

import {array, withKnobs} from '@storybook/addon-knobs';
import VuFormTypeahead from '../src/Components/v2/FormTypeahead/VuFormTypeahead.vue';

// Global configuration of your component
export default {
    title: 'v2.0 - Form Typeahead',
    component: VuFormTypeahead,
    decorators: [withKnobs]
};

// Create the stories
export const Default = () => {
    return (
        {
            components: {VuFormTypeahead},
            template: `
                <div>
                <VuFormTypeahead
                    v-model="value"
                    :list-items="items"
                    :maxlength="10"
                >
                    Field label
                </VuFormTypeahead>
                <span style="display:block;color:#888;margin-top: 50px;">Emitted value:</span>
                <span style="display:block;color:#333;margin-top: 10px">{{ value }}</span>
                </div>`,
            props: {
                items: {
                    default: () => array('The list of possible autocomplete items',
                        ['Hello', 'World', 'How', 'are', 'you'])
                }
            },
            data()
            {
                return {
                    value: ''
                };
            },
            methods: {}
        }
    );
};

export const WithAsyncData = () => {
    return (
        {
            components: {VuFormTypeahead},
            template: `
                <div>
                <VuFormTypeahead
                    v-model="value"
                    :debounce="250"
                    :list-item-resolver="itemResolver"
                    :maxlength="25"
                >
                    Field label
                </VuFormTypeahead>
                <span style="display:block;color:#888;margin-top: 50px;">Emitted value:</span>
                <span style="display:block;color:#333;margin-top: 10px">{{ value }}</span>
                </div>`,
            props: {},
            data()
            {
                return {
                    value: ''
                };
            },
            methods: {
                itemResolver(value)
                {
                    return new Promise(resolve => {
                        console.log('resolve items for', value);

                        // Simulate some async request
                        setTimeout(() => {
                            resolve(['Hello ' + value, value + 'Foo!', value]);
                        }, 800);
                    });
                }
            }
        }
    );
};

export const Events = () => {
    return (
        {
            components: {VuFormTypeahead},
            template: `
                <div>
                <pre>Interact with the element to see which elements are emitted</pre>
                <pre>Try some planet names...</pre>
                <VuFormTypeahead
                    v-model="value"
                    :list-item-resolver="itemResolver"
                    @focus="onEmit('focus')"
                    @blur="onEmit('blur')"
                    @input="onEmit('input (' + $event + ')')"
                    @open="onEmit('open')"
                    @close="onEmit('close')"
                    @resolve="onEmit('resolve')"
                    @resolveDone="onEmit('resolveDone')"
                    @select="onEmit('select (' + $event.label + ')')"
                    @keydown.native="onEmit('keydown.native (' + $event.code + ')')"
                    @keyup.native="onEmit('keyup.native (' + $event.code + ')')"
                    @clear="onEmit('clear')"
                >field label
                </VuFormTypeahead>
                <ul style="margin-top: 150px">
                    <li v-for="event in events">Emitted event: {{ event }}</li>
                </ul>
                </div>`,
            props: {},
            data()
            {
                return {
                    value: null,
                    events: []
                };
            },
            methods: {
                onEmit(event)
                {
                    this.events.unshift(event);
                    setTimeout(() => {
                        this.events.pop();
                    }, 2000);
                },
                itemResolver()
                {
                    return Promise.resolve(
                        ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto']);
                }
            }
        }
    );
};
